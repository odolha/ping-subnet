const SubnetsPinger = require('./');

const subnetPinge = new SubnetsPinger();

subnetPinge.on('host:alive', ip => {
  console.log('alive', ip);
});

subnetPinge.once('ping:end', () => {
  console.log('ping completed');
});

subnetPinge.ping();