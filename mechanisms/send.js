const Producers = require('../managers/producers');

module.exports = function(data){
  let producer = Producers.find(data);

  return producer.send(data);
};
