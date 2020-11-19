require('jest');

const { IPv4Address, IPv4Network } = require('./index');

describe('IPv4Address', () => {
  describe('constructor', () => {
    let subject;
    beforeEach(() => {
      subject = new IPv4Address(
        0b10010101_00101010_10010010_10011011,
        0b11111111_11111111_11100000_00000000
      );
    });
    it('creates an IPv4Address object', () => {
      expect(subject).toBeInstanceOf(IPv4Address);
    });

    describe('properties', () => {
      it('provides the networkID', () => {
        expect(subject).toHaveProperty('networkID');
        expect(subject.networkID).toBe(0b10010101_00101010_10000000_00000000);
      });
      it('provides the hostID', () => {
        expect(subject).toHaveProperty('hostID');
        expect(subject.hostID).toBe(0b00000000_00000000_00010010_10011011);
      });
      it('provides the prefixLength', () => {
        expect(subject).toHaveProperty('prefixLength');
        expect(subject.prefixLength).toBe(19);
      });
      it('provides the subnetMask', () => {
        expect(subject).toHaveProperty('subnetMask');
        expect(subject.subnetMask).toBe(0b11111111_11111111_11100000_00000000);
      });
      it('provides the network', () => {
        expect(subject).toHaveProperty('network');
        expect(subject.network).toBeInstanceOf(IPv4Network);
      });
    });

    describe('error handling', () => {
      it('fails on non-number IP address arguments', () => {
        expect(() => {
          subject = new IPv4Address(
            '149.42.146.155',
            0b11111111_11111111_11100000_00000000
          );
        }).toThrow(
          'Invalid first argument IPv4 address: expected 32-bit unsigned integer value'
        );
      });
      it('fails on non-number subnet mask arguments', () => {
        expect(() => {
          subject = new IPv4Address(
            0b10010101_00101010_10010010_10011011,
            '255.255.124.0'
          );
        }).toThrow(
          'Invalid first argument subnet mask: expected 32-bit unsigned integer value'
        );
      });
    });
  });

  describe('static create', () => {
    it('should accept binary values', () => {
      const addr = IPv4Address.create(
        0b10010101_00101010_10010010_10011011,
        0b11111111_11111111_11100000_00000000
      );
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr.networkID).toBe(0b10010101_00101010_10000000_00000000);
      expect(addr.hostID).toBe(0b00000000_00000000_00010010_10011011);
      expect(addr.prefixLength).toBe(19);
      expect(addr.subnetMask).toBe(0b11111111_11111111_11100000_00000000);
    });
    it('should accept string IPv4 and subnet mask values', () => {
      const addr = IPv4Address.create(
        '149.42.146.155',
        '255.255.124.0'
      );
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr.networkID).toBe(0b10010101_00101010_10000000_00000000);
      expect(addr.hostID).toBe(0b00000000_00000000_00010010_10011011);
      expect(addr.prefixLength).toBe(19);
      expect(addr.subnetMask).toBe(0b11111111_11111111_11100000_00000000);
    });
    it('should accept string CIDR notation', () => {
      const addr = IPv4Address.create(
        '149.42.146.155/19'
      );
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr).toBeInstanceOf(IPv4Address);
      expect(addr.networkID).toBe(0b10010101_00101010_10000000_00000000);
      expect(addr.hostID).toBe(0b00000000_00000000_00010010_10011011);
      expect(addr.prefixLength).toBe(19);
      expect(addr.subnetMask).toBe(0b11111111_11111111_11100000_00000000);
    });
  });

  describe('static display', () => {
    let subject;
    beforeEach(() => {
      subject = new IPv4Address(
        0b10010101_00101010_10010010_10011011,
        0b11111111_11111111_11100000_00000000
      );
    });
    it('displays an IP address with prefix length', () => {
      expect(subject.display()).toBe('149.42.146.155/19');
    });
  })
});

describe('IPv4Network', () => {
  let subject;
  beforeEach(() => {
    subject = new IPv4Network(
      0b10010101_00101010_10010010_10011011,
      0b11111111_11111111_11100000_00000000
    );
  });

  describe('constructor', () => {
    it('creates an IPv4Network object', () => {
      expect(subject).toBeInstanceOf(IPv4Network);
    });
  });

  describe('properties', () => {
    it('provides the networkID', () => {
      expect(subject).toHaveProperty('networkID');
      expect(subject.networkID).toBe(0b10010101_00101010_10000000_00000000);
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
      expect(subject.subnetMask).toBe(0b11111111_11111111_11100000_00000000);
    });
    it('provides the broadcastAddress', () => {
      expect(subject).toHaveProperty('broadcastAddress');
      expect(subject.broadcastAddress).toBe(0b10010101_00101010_10011111_11111111);
    });
    it('provides the hostAddressRange', () => {
      expect(subject).toHaveProperty('hostAddressRange');
      expect(subject.hostAddressRange).toBeInstanceOf(Array);
      expect(subject.hostAddressRange.length).toBe(2);
      expect(subject.hostAddressRange[0]).toBe(0b10010101_00101010_10000000_00000001);
      expect(subject.hostAddressRange[1]).toBe(0b10010101_00101010_10011111_11111110);
    });
  });

  describe('error handling', () => {
    it('fails on non-number IP address arguments', () => {
      expect(() => {
        subject = new IPv4Network(
          '149.42.146.155',
          0b11111111_11111111_11100000_00000000
        );
      }).toThrow(
        'Invalid first argument IPv4 address: expected 32-bit unsigned integer value'
      );
    });
    it('fails on non-number subnet mask arguments', () => {
      expect(() => {
        subject = new IPv4Network(
          0b10010101_00101010_10010010_10011011,
          '255.255.124.0'
        );
      }).toThrow(
        'Invalid first argument subnet mask: expected 32-bit unsigned integer value'
      );
    });
  });

  describe('static create', () => {
    it('should accept binary values', () => {
      const net = IPv4Network.create(
        0b10010101_00101010_10010010_10011011,
        0b11111111_11111111_11100000_00000000
      );
      expect(net).toBeInstanceOf(IPv4Network);
      expect(net.networkID).toBe(0b10010101_00101010_10000000_00000000);
      expect(net.prefixLength).toBe(19);
      expect(net.networkCIDRAddress).toBe('149.42.128.0/19');
      expect(net.subnetMask).toBe(0b11111111_11111111_11100000_00000000);
      expect(net.broadcastAddress).toBe(0b10010101_00101010_10011111_11111111);
      expect(net.hostAddressRange).toBeInstanceOf(Array);
      expect(subject.hostAddressRange.length).toBe(2);
      expect(subject.hostAddressRange[0]).toBe(0b10010101_00101010_10000000_00000001);
      expect(subject.hostAddressRange[1]).toBe(0b10010101_00101010_10011111_11111110);
    });
    it('should accept an IPv4 address in string CIDR notation', () => {
      const net = IPv4Network.create(
        '149.42.146.155/19'
      );
      expect(net).toBeInstanceOf(IPv4Network);
      expect(net.networkID).toBe(0b10010101_00101010_10000000_00000000);
      expect(net.prefixLength).toBe(19);
      expect(net.networkCIDRAddress).toBe('149.42.128.0/19');
      expect(net.subnetMask).toBe(0b11111111_11111111_11100000_00000000);
      expect(net.broadcastAddress).toBe(0b10010101_00101010_10011111_11111111);
      expect(net.hostAddressRange).toBeInstanceOf(Array);
      expect(subject.hostAddressRange.length).toBe(2);
      expect(subject.hostAddressRange[0]).toBe(0b10010101_00101010_10000000_00000001);
      expect(subject.hostAddressRange[1]).toBe(0b10010101_00101010_10011111_11111110);
    });
    it('should accept an abbreviated network address in string CIDR notation', () => {
      const net = IPv4Network.create(
        '149.42.128/19'
      );
      expect(net).toBeInstanceOf(IPv4Network);
      expect(net.networkID).toBe(0b10010101_00101010_10000000_00000000);
      expect(net.prefixLength).toBe(19);
      expect(net.networkCIDRAddress).toBe('149.42.128.0/19');
      expect(net.subnetMask).toBe(0b11111111_11111111_11100000_00000000);
      expect(net.broadcastAddress).toBe(0b10010101_00101010_10011111_11111111);
      expect(net.hostAddressRange).toBeInstanceOf(Array);
      expect(subject.hostAddressRange.length).toBe(2);
      expect(subject.hostAddressRange[0]).toBe(0b10010101_00101010_10000000_00000001);
      expect(subject.hostAddressRange[1]).toBe(0b10010101_00101010_10011111_11111110);
    });
    it('should accept string IPv4 and subnet mask values', () => {
      const net = IPv4Network.create(
        '149.42.146.155',
        '255.255.124.0'
      );
      expect(net).toBeInstanceOf(IPv4Network);
      expect(net.networkID).toBe(0b10010101_00101010_10000000_00000000);
      expect(net.prefixLength).toBe(19);
      expect(net.networkCIDRAddress).toBe('149.42.128.0/19');
      expect(net.subnetMask).toBe(0b11111111_11111111_11100000_00000000);
      expect(net.broadcastAddress).toBe(0b10010101_00101010_10011111_11111111);
      expect(net.hostAddressRange).toBeInstanceOf(Array);
      expect(subject.hostAddressRange.length).toBe(2);
      expect(subject.hostAddressRange[0]).toBe(0b10010101_00101010_10000000_00000001);
      expect(subject.hostAddressRange[1]).toBe(0b10010101_00101010_10011111_11111110);
    });
  });

  describe('subnet', () => {
    it('returns the correct Array of IPv4Network objects', () => {
      const subnets = subject.subnet(21);
      expect(subnets).toBeInstanceOf(Array);
      expect(subnets.length).toBe(4);
      expect(subnets.map((net) => net.networkCIDRAddress)).toContain('149.42.128.0/21');
      expect(subnets.map((net) => net.networkCIDRAddress)).toContain('149.42.134.0/21');
      expect(subnets.map((net) => net.networkCIDRAddress)).toContain('149.42.142.0/21');
      expect(subnets.map((net) => net.networkCIDRAddress)).toContain('149.42.150.0/21');
    });
    it('computes the correct properties for each subnet', () => {
      const subnets = subject.subnet(21);
      subnets.forEach((net) => {
        expect(net).toBeInstanceOf(IPv4Network);
        expect(net.prefixLength).toBe(21);
        expect(net.subnetMask).toBe(0b11111111_11111111_11111000_00000000);
        expect(net.hostAddressRange).toBeInstanceOf(Array);
        expect(net.hostAddressRange.length).toBe(2);
      });
      const net1 = subnets.filter(net => net.networkCIDRAddress === '149.42.128.0/21')[0];
      expect(net1.networkID).toBe(0b10010101_00101010_10000000_00000000);
      expect(net1.broadcastAddress).toBe(0b10010101_00101010_10000111_11111111);
      expect(net1.hostAddressRange[0]).toBe(0b10010101_00101010_10000000_00000001);
      expect(net1.hostAddressRange[1]).toBe(0b10010101_00101010_10000111_11111110);
      const net1 = subnets.filter(net => net.networkCIDRAddress === '149.42.134.0/21')[0];
      expect(net2.networkID).toBe(0b10010101_00101010_10001000_00000000);
      expect(net2.broadcastAddress).toBe(0b10010101_00101010_10001111_11111111);
      expect(net2.hostAddressRange[0]).toBe(0b10010101_00101010_10001000_00000001);
      expect(net2.hostAddressRange[1]).toBe(0b10010101_00101010_10001111_11111110);
      const net1 = subnets.filter(net => net.networkCIDRAddress === '149.42.142.0/21')[0];
      expect(net3.networkID).toBe(0b10010101_00101010_10010000_00000000);
      expect(net3.broadcastAddress).toBe(0b10010101_00101010_10010111_11111111);
      expect(net3.hostAddressRange[0]).toBe(0b10010101_00101010_10010000_00000001);
      expect(net3.hostAddressRange[1]).toBe(0b10010101_00101010_10010111_11111110);
      const net1 = subnets.filter(net => net.networkCIDRAddress === '149.42.150.0/21')[0];
      expect(net4.networkID).toBe(0b10010101_00101010_10011000_00000000);
      expect(net4.broadcastAddress).toBe(0b10010101_00101010_10011111_11111111);
      expect(net4.hostAddressRange[0]).toBe(0b10010101_00101010_10011000_00000001);
      expect(net4.hostAddressRange[1]).toBe(0b10010101_00101010_10011111_11111110);
    });
  });

  describe('static supernet', () => {
    let net1, net2, net3, net4;
    beforeEach(() => {
      net1 = IPv4Network.create('146.51.128.0/21');
      net2 = IPv4Network.create('146.51.134.0/21');
      net3 = IPv4Network.create('146.51.142.0/21');
      net4 = IPv4Network.create('146.51.150.0/21');
    });
    it('returns an array of supernets covering the subnetworks', () => {
      const supernets = IPv4Network.supernet([net1, net4, net2])
      expect(supernets).toBeInstanceOf(Array);
      expect(supernets.map((net) => net.networkCIDRAddress)).toContain('146.51.128.0/20');
      expect(supernets.map((net) => net.networkCIDRAddress)).toContain('146.51.150.0/21');
    });
    it('returns a minimal array of supernets covering the subnetworks', () => {
      const supernets = IPv4Network.supernet([net1, net3, net2, net4])
      expect(supernets).toBeInstanceOf(Array);
      expect(supernets.map((net) => net.networkCIDRAddress)).toContain('146.51.128.0/19');
    });
    it('computes the correct properties for each supernet', () => {
      const supernets = IPv4Network.supernet([net1, net4, net2]);
      const supernet1 = supernets.filter(net => net.networkCIDRAddress === '146.51.128.0/20')[0];
      expect(supernet1).toBeInstanceOf(IPv4Network);
      expect(supernet1.prefixLength).toBe(20);
      expect(supernet1.subnetMask).toBe(0b11111111_11111111_11110000_00000000);
      expect(supernet1.hostAddressRange).toBeInstanceOf(Array);
      expect(supernet1.hostAddressRange.length).toBe(2);
      expect(supernet1.networkID).toBe(0b10010101_00101010_10000000_00000000);
      expect(supernet1.broadcastAddress).toBe(0b10010101_00101010_10001111_11111111);
      expect(supernet1.hostAddressRange[0]).toBe(0b10010101_00101010_10000000_00000001);
      expect(supernet1.hostAddressRange[1]).toBe(0b10010101_00101010_10001111_11111110);
      const supernet2 = supernets.filter(net => net.networkCIDRAddress === '146.51.150.0/21')[0];
      expect(supernet2).toBeInstanceOf(IPv4Network);
      expect(supernet2.prefixLength).toBe(21);
      expect(supernet2.subnetMask).toBe(0b11111111_11111111_11111000_00000000);
      expect(supernet2.hostAddressRange).toBeInstanceOf(Array);
      expect(supernet2.hostAddressRange.length).toBe(2);
      expect(supernet2.networkID).toBe(0b10010101_00101010_10011000_00000000);
      expect(supernet2.broadcastAddress).toBe(0b10010101_00101010_10011111_11111111);
      expect(supernet2.hostAddressRange[0]).toBe(0b10010101_00101010_10011000_00000001);
      expect(supernet2.hostAddressRange[1]).toBe(0b10010101_00101010_10011111_11111110);
    });
  });
});
