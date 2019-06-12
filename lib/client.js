const PulsarBinding        = require('bindings')('Pulsar');
const Settings             = require('./settings');
const AuthenticationAthenz = require('../src/AuthenticationAthenz');
const AuthenticationTls    = require('../src/AuthenticationTls');
const AuthenticationToken  = require('../src/AuthenticationToken');

const Client = {};

Client.connect = function(){
  return new Promise(function(resolve, reject){

    if(Settings.auth){
      if(Settings.auth.tls){ Settings.authentication = new AuthenticationTls(Settings.auth.tls); }
      if(Settings.auth.athenz){ Settings.authentication = new AuthenticationAthenz(Settings.auth); }
      if(Settings.auth.token){ Settings.authentication = new AuthenticationToken(Settings.auth); }
    }

    let client = new PulsarBinding.Client(Settings);
    Client.createProducer = client.createProducer.bind(client);
    Client.subscribe = client.subscribe.bind(client);
    Client.close = client.close.bind(client);
    return resolve(Client);
  });
};

module.exports = Client;
