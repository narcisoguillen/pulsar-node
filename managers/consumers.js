const Consumer = require('../lib/consumer');

const Consumers = {
  Map : {}
};

Consumers.find = function(topicName, options){
  let settings = Object.assign({ topic : topicName }, options);
  let key      = JSON.stringify(settings);

  Consumers.Map[key] || (Consumers.Map[key] = new Consumer(settings));
  return Consumers.Map[key];
};

Consumers.closeAll = async function(){
  for(let key in Consumers.Map){
    let consumer = Consumers.Map[key];
    await consumer.close();
    delete Consumers.Map[key];
  }
}

module.exports = Consumers;
