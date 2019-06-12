const Client = require('./client');

module.exports = class Producer {

  constructor(options){
    this.options   = options;
    this.encoding  = options.encoding || 'binary';
    this.pool      = [];
    this.connected = false;

    this.connect();
  }

  connect(){
    Client.createProducer(this.options).then(this.onConnected.bind(this), this.onError.bind(this));
  }

  onConnected(engine){
    this.connected = true;
    this.engine    = engine;
    this.flush();
  }

  encode(data){
    return data.encode === 'binary' ? Buffer.from(data.message) : data.message;
  }

  send(data){
    return new Promise( (resolve, reject) => {
      let payload  = this.encode(data);
      let resource = {resolve, reject, payload};
      if(!this.connected){ return this.pool.push(resource); }
      this.produce(resource);
    });
  }

  produce(resource){
    this.engine.send(resource.payload).then( sent => {
      this.engine.flush().then(resource.resolve, resource.reject);
    }, resource.reject);
  }

  flush(){
    this.pool.forEach( resource => { this.produce(resource); });
    this.pool = [];
  }

  onError(error){
    this.pool.forEach( resource =>{
      resource.reject({
        message : resource.payload.toString(),
        error   : error
      });
    });
    this.pool = [];

    return this.connect(); // retry
  }

};
