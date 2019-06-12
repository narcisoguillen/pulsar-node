const Consumer     = require('../lib/consumer');
const TopicManager = require('../managers/topic');

module.exports = function(topicName, options){
  (options) || (options = {});
  let topic      = TopicManager.get(topicName);
  topic.consumer = topic.consumer || new Consumer(topicName, options);

  return topic.consumer;
};
