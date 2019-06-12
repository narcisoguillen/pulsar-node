const TopicManager = require('../managers/topic');

module.exports = function(data){
  return new Promise(function(resolve, reject){
    if(typeof data.topic !== 'string'){ return reject('Malformed topic name'); }

    let message  = data.message;
    let encoding = data.encoding || 'binary';

    TopicManager.getProducer(data).then( producer =>{
      let payload = null;

      switch(encoding){
        case 'binary':
          payload = Buffer.from(message);
        break;
        case 'string':
          payload = typeof message === 'object' ? JSON.stringiy(message) : message;
        break;
        default:
          payload = message;
        break;
      }

      producer.send(payload).then( sent => {
        producer.flush().then(resolve, reject);
      }, reject);
    }, reject);
  });
};
