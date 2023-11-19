require('jest');

const { IPv4Address, IPv4Network } = require('./index');

describe('IPv4Address', () => {
  describe('constructor', () => {
    let subject;
    beforeEach(() => {
      subject = new IPv4Address(2502595227 >>> 0, 4294959104 >>> 0);
    });
    it('creates an IPv4Address object', () => {
      expect(subject).toBeInstanceOf(IPv4Address);
    });

    describe('properties', () => {
      it('provides the networkID', () => {
        expect(subject).toHaveProperty('networkID');
        expect(subject.networkID).toBe(2502590464 >>> 0);
      });
      it('provides the hostID', () => {
        expect(subject).toHaveProperty('hostID');
        expect(subject.hostID).toBe(4763 >>> 0);
      });
      it('provides the prefixLength', () => {
        expect(subject).toHaveProperty('prefixLength');
        expect(subject.prefixLength).toBe(19);
      });
      it('provides the subnetMask', () => {
        expect(subject).toHaveProperty('subnetMask');
        expect(subject.subnetMask).toBe(4294959104 >>> 0);
      });
      it('provides the network', () => {
        expect(subject).toHaveProperty('network');
        expect(subject.network).toBeInstanceOf(IPv4Network);
      });
    });

    describe('error handling', () => {
      it('fails on non-number IP address arguments', () => {
        expect(() => {
          subject = new IPv4Address('149.42.146.155', 4294959104 >>> 0);
        }).toThrow(
          'Invalid first argument IPv4 address: expected 32-bit unsigned integer value'
        );
      });
      it('fails on non-number subnet mask arguments', () => {
        expect(() => {
          subject = new IPv4Address(2502595227 >>> 0, '255.255.124.0');
        }).toThrow(
          'Invalid second argument subnet mask: expected 32-bit unsigned integer value'
        );
      });
    });
  });

  describe('static parseIPAddress', () => {
    it('parses IP Addresses strings into binary values', () => {
      const expected = 2502595227 >>> 0;
      expect(IPv4Address.parseIPAddress('149.42.146.155')).toBe(expected);
    });
  });
  describe('static create', () => {
    it('should accept binary values', () => {
      const addr = IPv4Address.create(2502595227 >>> 0, 4294959104 >>> 0);
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr.networkID).toBe(2502590464 >>> 0);
      expect(addr.hostID).toBe(4763 >>> 0);
      expect(addr.prefixLength).toBe(19);
      expect(addr.subnetMask).toBe(4294959104 >>> 0);
    });
    it('should accept string IPv4 and subnet mask values', () => {
      const addr = IPv4Address.create('149.42.146.155', '255.255.224.0');
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr.networkID).toBe(2502590464 >>> 0);
      expect(addr.hostID).toBe(4763 >>> 0);
      expect(addr.prefixLength).toBe(19);
      expect(addr.subnetMask).toBe(4294959104 >>> 0);
    });
    it('should accept string CIDR notation', () => {
      const addr = IPv4Address.create('149.42.146.155/19');
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr.networkID).toBe(2502590464 >>> 0);
      expect(addr.hostID).toBe(4763 >>> 0);
      expect(addr.prefixLength).toBe(19);
      expect(addr.subnetMask).toBe(4294959104 >>> 0);
    });
  });

  describe('display', () => {
    let subject;
    beforeEach(() => {
      subject = new IPv4Address(2502595227 >>> 0, 4294959104 >>> 0);
    });
    it('displays an IP address with prefix length', () => {
      expect(subject.display()).toBe('149.42.146.155/19');
    });
  });
});

describe('IPv4Network', () => {
  let subject;
  beforeEach(() => {
    subject = new IPv4Network(2502595227 >>> 0, 4294959104 >>> 0);
  });

  describe('constructor', () => {
    it('creates an IPv4Network object', () => {
      expect(subject).toBeInstanceOf(IPv4Network);
    });
  });

  describe('properties', () => {
    it('provides the networkID', () => {
      expect(subject).toHaveProperty('networkID');
      expect(subject.networkID).toBe(2502590464 >>> 0);
    });
    it('provides the prefixLength', () => {
      expect(subject).toHaveProperty('prefixLength');
      expect(subject.prefixLength).toBe(19);
    });
    it('provides the networkCIDRAddress', () => {
      expect(subject).toHaveProperty('networkCIDRAddress');
      expect(subject.networkCIDRAddress).toBe('149.42.128.0/19');
    });
    it('provides the subnetMask', () => {
      expect(subject).toHaveProperty('subnetMask');
      expect(subject.subnetMask).toBe(4294959104 >>> 0);
    });
    it('provides the broadcastAddress', () => {
      expect(subject).toHaveProperty('broadcastAddress');
      expect(subject.broadcastAddress).toBe(2502598655 >>> 0);
    });
    it('provides the hostAddressRange', () => {
      expect(subject).toHaveProperty('hostAddressRange');
      expect(subject.hostAddressRange).toBeInstanceOf(Array);
      expect(subject.hostAddressRange.length).toBe(2);
      expect(subject.hostAddressRange[0]).toBe(2502590465 >>> 0);
      expect(subject.hostAddressRange[1]).toBe(2502598654 >>> 0);
    });
  });

  describe('error handling', () => {
    it('fails on non-number IP address arguments', () => {
      expect(() => {
        subject = new IPv4Network('149.42.146.155', 4294959104 >>> 0);
      }).toThrow(
        'Invalid first argument IPv4 address: expected 32-bit unsigned integer value'
      );
    });
    it('fails on non-number subnet mask arguments', () => {
      expect(() => {
        subject = new IPv4Network(2502595227 >>> 0, '255.255.124.0');
      }).toThrow(
        'Invalid second argument subnet mask: expected 32-bit unsigned integer value'
      );
    });
  });

  describe('static create', () => {
    it('should accept binary values', () => {
      const net = IPv4Network.create(2502595227 >>> 0, 4294959104 >>> 0);
      expect(net).toBeInstanceOf(IPv4Network);
      expect(net.networkID).toBe(2502590464 >>> 0);
      expect(net.prefixLength).toBe(19);
      expect(net.networkCIDRAddress).toBe('149.42.128.0/19');
      expect(net.subnetMask).toBe(4294959104 >>> 0);
      expect(net.broadcastAddress).toBe(2502598655 >>> 0);
      expect(net.hostAddressRange).toBeInstanceOf(Array);
      expect(net.hostAddressRange.length).toBe(2);
      expect(net.hostAddressRange[0]).toBe(2502590465 >>> 0);
      expect(net.hostAddressRange[1]).toBe(2502598654 >>> 0);
    });
    it('should accept an IPv4 address in string CIDR notation', () => {
      const net = IPv4Network.create('149.42.146.155/19');
      expect(net).toBeInstanceOf(IPv4Network);
      expect(net.networkID).toBe(2502590464 >>> 0);
      expect(net.prefixLength).toBe(19);
      expect(net.networkCIDRAddress).toBe('149.42.128.0/19');
      expect(net.subnetMask).toBe(4294959104 >>> 0);
      expect(net.broadcastAddress).toBe(2502598655 >>> 0);
      expect(net.hostAddressRange).toBeInstanceOf(Array);
      expect(net.hostAddressRange.length).toBe(2);
      expect(net.hostAddressRange[0]).toBe(2502590465 >>> 0);
      expect(net.hostAddressRange[1]).toBe(2502598654 >>> 0);
    });
    it('should accept an abbreviated network address in string CIDR notation', () => {
      const net = IPv4Network.create('149.42.128/19');
      expect(net).toBeInstanceOf(IPv4Network);
      expect(net.networkID).toBe(2502590464 >>> 0);
      expect(net.prefixLength).toBe(19);
      expect(net.networkCIDRAddress).toBe('149.42.128.0/19');
      expect(net.subnetMask).toBe(4294959104 >>> 0);
      expect(net.broadcastAddress).toBe(2502598655 >>> 0);
      expect(net.hostAddressRange).toBeInstanceOf(Array);
      expect(net.hostAddressRange.length).toBe(2);
      expect(net.hostAddressRange[0]).toBe(2502590465 >>> 0);
      expect(net.hostAddressRange[1]).toBe(2502598654 >>> 0);
    });
    it('should accept string IPv4 and subnet mask values', () => {
      const net = IPv4Network.create('149.42.146.155', '255.255.224.0');
      expect(net).toBeInstanceOf(IPv4Network);
      expect(net.networkID).toBe(2502590464 >>> 0);
      expect(net.prefixLength).toBe(19);
      expect(net.networkCIDRAddress).toBe('149.42.128.0/19');
      expect(net.subnetMask).toBe(4294959104 >>> 0);
      expect(net.broadcastAddress).toBe(2502598655 >>> 0);
      expect(net.hostAddressRange).toBeInstanceOf(Array);
      expect(net.hostAddressRange.length).toBe(2);
      expect(net.hostAddressRange[0]).toBe(2502590465 >>> 0);
      expect(net.hostAddressRange[1]).toBe(2502598654 >>> 0);
    });
  });

  describe('subnet', () => {
    it('returns the correct Array of IPv4Network objects', () => {
      const subnets = subject.subnet(21);
      expect(subnets).toBeInstanceOf(Array);
      expect(subnets.length).toBe(4);
      expect(subnets.map((net) => net.networkCIDRAddress)).toContain('149.42.128.0/21');
      expect(subnets.map((net) => net.networkCIDRAddress)).toContain('149.42.136.0/21');
      expect(subnets.map((net) => net.networkCIDRAddress)).toContain('149.42.144.0/21');
      expect(subnets.map((net) => net.networkCIDRAddress)).toContain('149.42.152.0/21');
    });
    it('computes the correct properties for each subnet', () => {
      const subnets = subject.subnet(21);
      subnets.forEach((net) => {
        expect(net).toBeInstanceOf(IPv4Network);
        expect(net.prefixLength).toBe(21);
        expect(net.subnetMask).toBe(4294965248 >>> 0);
        expect(net.hostAddressRange).toBeInstanceOf(Array);
        expect(net.hostAddressRange.length).toBe(2);
      });
      const net1 = subnets.filter(net => net.networkCIDRAddress === '149.42.128.0/21')[0];
      expect(net1.networkID).toBe(2502590464 >>> 0);
      expect(net1.broadcastAddress).toBe(2502592511 >>> 0);
      expect(net1.hostAddressRange[0]).toBe(2502590465 >>> 0);
      expect(net1.hostAddressRange[1]).toBe(2502592510 >>> 0);
      const net2 = subnets.filter(net => net.networkCIDRAddress === '149.42.136.0/21')[0];
      expect(net2.networkID).toBe(2502592512 >>> 0);
      expect(net2.broadcastAddress).toBe(2502594559 >>> 0);
      expect(net2.hostAddressRange[0]).toBe(2502592513 >>> 0);
      expect(net2.hostAddressRange[1]).toBe(2502594558 >>> 0);
      const net3 = subnets.filter(net => net.networkCIDRAddress === '149.42.144.0/21')[0];
      expect(net3.networkID).toBe(2502594560 >>> 0);
      expect(net3.broadcastAddress).toBe(2502596607 >>> 0);
      expect(net3.hostAddressRange[0]).toBe(2502594561 >>> 0);
      expect(net3.hostAddressRange[1]).toBe(2502596606 >>> 0);
      const net4 = subnets.filter(net => net.networkCIDRAddress === '149.42.152.0/21')[0];
      expect(net4.networkID).toBe(2502596608 >>> 0);
      expect(net4.broadcastAddress).toBe(2502598655 >>> 0);
      expect(net4.hostAddressRange[0]).toBe(2502596609 >>> 0);
      expect(net4.hostAddressRange[1]).toBe(2502598654 >>> 0);
    });
  });

  describe('static supernet', () => {
    let net1, net2, net3, net4;
    beforeEach(() => {
      net1 = IPv4Network.create('146.51.128.0/21');
      net2 = IPv4Network.create('146.51.136.0/21');
      net3 = IPv4Network.create('146.51.144.0/21');
      net4 = IPv4Network.create('146.51.152.0/21');
    });
    it('returns an array of supernets covering the subnetworks', () => {
      const supernets = IPv4Network.supernet([net1, net4, net2]);
      expect(supernets).toBeInstanceOf(Array);
      expect(supernets.map((net) => net.networkCIDRAddress)).toContain('146.51.128.0/20');
      expect(supernets.map((net) => net.networkCIDRAddress)).toContain('146.51.152.0/21');
    });
    it('returns a minimal array of supernets covering the subnetworks', () => {
      const supernets = IPv4Network.supernet([net1, net3, net2, net4]);
      expect(supernets).toBeInstanceOf(Array);
      expect(supernets.map((net) => net.networkCIDRAddress)).toContain('146.51.128.0/19');
    });
    it('computes the correct properties for each supernet', () => {
      const supernets = IPv4Network.supernet([net1, net4, net2]);
      const supernet1 = supernets.filter(net => net.networkCIDRAddress === '146.51.128.0/20')[0];
      expect(supernet1).toBeInstanceOf(IPv4Network);
      expect(supernet1.prefixLength).toBe(20);
      expect(supernet1.subnetMask).toBe(4294963200 >>> 0);
      expect(supernet1.hostAddressRange).toBeInstanceOf(Array);
      expect(supernet1.hostAddressRange.length).toBe(2);
      expect(supernet1.networkID).toBe(2452848640 >>> 0);
      expect(supernet1.broadcastAddress).toBe(2452852735 >>> 0);
      expect(supernet1.hostAddressRange[0]).toBe(2452848641 >>> 0);
      expect(supernet1.hostAddressRange[1]).toBe(2452852734 >>> 0);
      const supernet2 = supernets.filter(net => net.networkCIDRAddress === '146.51.152.0/21')[0];
      expect(supernet2).toBeInstanceOf(IPv4Network);
      expect(supernet2.prefixLength).toBe(21);
      expect(supernet2.subnetMask).toBe(4294965248 >>> 0);
      expect(supernet2.hostAddressRange).toBeInstanceOf(Array);
      expect(supernet2.hostAddressRange.length).toBe(2);
      expect(supernet2.networkID).toBe(2452854784 >>> 0);
      expect(supernet2.broadcastAddress).toBe(2452856831 >>> 0);
      expect(supernet2.hostAddressRange[0]).toBe(2452854785 >>> 0);
      expect(supernet2.hostAddressRange[1]).toBe(2452856830 >>> 0);
    });
  });
});
