const Settings   = require('./lib/settings');
const Client     = require('./lib/client');
const Mechanisms = require('./mechanisms');

module.exports.init = async function(settings){
  Settings.read(settings);
  let client = await Client.connect();
  return Mechanisms;
};
