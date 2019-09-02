try{
  const Pulsar = require('pulsar-client');
}catch(error){
  throw new Error('Peer dependency missing, Make sure to install pulsar-client < npm install pulsar-client >');
}

module.exports = {
  Settings   : require('./settings'),
  Client     : require('./client'),
  Mechanisms : require('../mechanisms')
};
