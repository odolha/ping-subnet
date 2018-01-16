# ping-subnet

A tiny util for discovering alive hosts in local network. It is fully compatible with the native `nodejs` [EventEmmiter](https://nodejs.org/api/events.html)

# Installation

```sh
npm install ping-subnet
```

# Usage

### You can specify the custom ranges parameter. 

Ranges parameter is represented by array of strings. There are two possible forms: just a single IP or the range.

```javascript
const SubnetsPinger = require('ping-subnet');

const ranges = [
  '192.168.0.123',
  '192.168.0.1-192.168.0.100'
];

const subnetPinger = new SubnetsPinger(ranges);

subnetPinger.on('host:alive', ip => {
  console.log('alive', ip);
});

subnetPinger.once('ping:end', () => {
  console.log('ping completed');
});

subnetPinger.ping();
```

### If the custom ranges is not specified it would be assigned using current network settings

```javascript
const SubnetsPinger = require('ping-subnet');

const subnetPinger = new SubnetsPinger();

subnetPinger.on('host:alive', ip => {
  console.log('alive', ip);
});

subnetPinger.once('ping:end', () => {
  console.log('ping completed');
});

subnetPinger.ping();
```