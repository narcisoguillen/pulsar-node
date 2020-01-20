const Producers  = require('../managers/producers');
const Consumers  = require('../managers/consumers');
const PulsarNode = require('../');

module.exports = async function(data){
  await Producers.closeAll();
  await Consumers.closeAll();

  return await PulsarNode.client.close();
};
