module.exports.init = async function(settings){
  const core = require('./lib');

  core.Settings.read(settings);
  let client   = await core.Client.connect();
  return core.Mechanisms;
};
