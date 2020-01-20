const Pulsar   = require('pulsar-client');
const Settings = require('./settings');

const Client = {};

Client.connect = function(){
  return new Pulsar.Client(Settings);
};

module.exports = Client;
