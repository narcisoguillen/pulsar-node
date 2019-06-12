let Settings = {};

Settings.read = function(settings){
  if(!settings.serviceUrl){ throw new Error('Missing Pulsar host'); }
  Settings = Object.assign(Settings, settings);
};

module.exports = Settings;
