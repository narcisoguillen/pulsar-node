const Producer = require('../lib/producer');

const Producers = {
  Map : {}
};

Producers.find = function(settings){
  let copy = Object.assign({ encoding : 'binary' }, settings);
  delete copy.message;
  let key  = JSON.stringify(copy);

  Producers.Map[key] || (Producers.Map[key] = new Producer(copy));
  return Producers.Map[key];
};

Producers.closeAll = async function(){
  for(let key in Producers.Map){
    let producer = Producers.Map[key];
    await producer.close();
    delete Producers.Map[key];
  }
}

module.exports = Producers;
