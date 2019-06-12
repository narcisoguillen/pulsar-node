const TopicManager = require('../managers/topic');
const Client       = require('../lib/client');

module.exports = async function(data){
  for(let topicName in TopicManager.Map){
    let topic = TopicManager.get(topicName);
    if(topic.consumer){ await topic.consumer.close(); }
    if(topic.producer){ await topic.producer.close(); }

    delete TopicManager.Map[topicName];
  }

  return await Client.close();
};
