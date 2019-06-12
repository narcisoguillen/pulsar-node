const Client = require('../lib/client');
const TopicManager = {
  Map : {}
};

TopicManager.get = function(topicName){
  TopicManager.Map[topicName] || (TopicManager.Map[topicName] = {});
  return TopicManager.Map[topicName];
};

TopicManager.getProducer = function(data){
  return new Promise(function(resolve, reject){
    let topic = TopicManager.get(data.topic);
    if(topic.producer){ return resolve(topic.producer); }

    Client.createProducer(data).then( producer =>{
      topic.producer = producer;
      return resolve(producer);
    }, reject);
  });
};

module.exports = TopicManager;
