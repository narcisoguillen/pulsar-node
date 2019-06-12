const TopicManager = {
  Map : {}
};

TopicManager.get = function(topicName){
  TopicManager.Map[topicName] || (TopicManager.Map[topicName] = {});
  return TopicManager.Map[topicName];
};

module.exports = TopicManager;
