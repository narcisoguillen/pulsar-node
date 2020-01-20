const Consumers = require('../managers/consumers');

module.exports = function(topicName, options){
  return Consumers.find(topicName, options);
};
