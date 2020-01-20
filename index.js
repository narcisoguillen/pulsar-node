const PulsarNode = {};

PulsarNode.init = async function(settings){
  PulsarNode.core = require('./lib');
  PulsarNode.core.Settings.read(settings);

  PulsarNode.client = PulsarNode.core.Client.connect();

  return PulsarNode.core.Mechanisms;
};

module.exports = PulsarNode;
