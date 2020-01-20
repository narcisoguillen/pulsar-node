const PulsarNode = require('../index');

module.exports = class Producer {
  constructor(options){
    this.options     = options;
    this.pool        = [];
    this.connected   = false;
    this.unreachable = false;

    this.connect();
  }

  connect() {
    PulsarNode.client.createProducer(this.options).then( producer => {
      this.connected = true;
      this.engine    = producer;
      this.flushPool();
    }, error => {
      this.unreachable = true;

      this.pool.forEach( resource => { return resource.reject(error); });
      this.pool = [];
    });
  }

  send(data){
    return new Promise( (resolve, reject) => {
      if(this.unreachable){ return reject('Producer not connected'); }

      let payload = this.encode(data);
      if(!this.connected){ return this.pool.push({ resolve, reject, payload }); }

      this.produce(payload).then(resolve, reject);
    });
  }

  produce(data){
    return new Promise( (resolve, reject) => {
      return this.engine.send({ data }).then( error => {
        if(error){ return reject(error); }
        return resolve(data);
      });
    });
  }

  encode(data){
    let strategy = this.options.encoding;
    return strategy === 'binary' ? Buffer.from(data.message) : data.message;
  }

  flushPool(){
    this.pool.forEach( resource => {
      this.produce(resource.payload).then(resource.resolve, resource.reject);
    });

    this.pool = [];
  }

  close(){
    this.unreachable = true;

    return new Promise((resolve, reject) => {
      this.engine.flush().then( flushed => {
        this.engine.close().then(resolve, reject);
      }, error => {
        return reject(error); // Better notify
      });
    });
  }

};
