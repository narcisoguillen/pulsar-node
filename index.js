const PulsarBinding = require('bindings')('Pulsar');
const AuthenticationTls = require('./src/AuthenticationTls.js');
const AuthenticationAthenz = require('./src/AuthenticationAthenz.js');
const AuthenticationToken = require('./src/AuthenticationToken.js');

const Pulsar = {
  Client: PulsarBinding.Client,
  Message: PulsarBinding.Message,
  MessageId: PulsarBinding.MessageId,
  AuthenticationTls,
  AuthenticationAthenz,
  AuthenticationToken,
};

module.exports = Pulsar;
