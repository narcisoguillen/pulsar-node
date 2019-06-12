const TopicManager = require('../managers/topic');
const Producer     = require('../lib/producer');

module.exports = function(data){
  return new Promise(function(resolve, reject){
    if(typeof data.topic !== 'string'){ return reject('Malformed topic name'); }
    if(typeof data.message !== 'string'){ return reject('Malformed message'); }

    let message = data.message;
    let encode  = data.encoding || 'binary';
    delete data.message;
    delete data.encoding;

    let topic      = TopicManager.get(data.topic);
    topic.producer = topic.producer || new Producer(data);

    topic.producer.send({message, encode}).then(resolve, reject);
  });
};
