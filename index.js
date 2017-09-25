const os = require('os');
const ipUtils = require('./ipUtils');

const findSubnetsRange = () => {
  const networkInterfaces = os.networkInterfaces();

  return Object.keys(networkInterfaces)
    .filter(key => !networkInterfaces[key][0].internal)
    .map(key => {
      const {address, netmask} = networkInterfaces[key][1];
      const addressNumber = ipUtils.ip2number(address) >>> 0;
      const netmaskNumber = ipUtils.ip2number(netmask) >>> 0;
      const baseAddress = ipUtils.number2ip(addressNumber & netmaskNumber);
      let bitMask;

      for(let i = 32; i >= 0; i--) {
        if(netmaskNumber == (0xffffffff << (32 - i)) >>> 0) {
          bitMask = i;
        }
      }

      return {
        leftBound: bitMask <= 30
          ? ipUtils.number2ip((addressNumber & netmaskNumber) + 1) 
          : baseAddress,
        rightBound: bitMask <= 30
          ? ipUtils.number2ip((addressNumber & netmaskNumber) + Math.pow(2, 32 - bitMask) - 2)
          : ipUtils.number2ip((addressNumber & netmaskNumber) + Math.pow(2, 32 - bitMask) - 1)
      };
    });
}

console.log(findSubnetsRange())

module.exports = {findSubnetsRange};
