const PulsarBinding = require('bindings')('Pulsar');
const Settings      = require('./settings');

const Client = {};

Client.connect = function(){
  return new Promise(function(resolve, reject){
    let client = new PulsarBinding.Client(Settings);
    Client.createProducer = client.createProducer.bind(client);
    Client.subscribe = client.subscribe.bind(client);
    Client.close = client.close.bind(client);
    return resolve(Client);
  });
};

module.exports = Client;
