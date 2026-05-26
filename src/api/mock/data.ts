import type { Device } from '@/types/device';

type Status = Device['status'];

function makeDevice(
  name: string,
  status: Status,
  ip: string,
  portRange: [number, number],
  tags: string[],
  notes?: string,
): Device {
  return {
    id: crypto.randomUUID(),
    name,
    status,
    ipAddress: ip,
    portRange,
    lastSeenAt: new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
    ).toISOString(),
    tags,
    notes,
  };
}

const devices: Device[] = [
  // online (~20)
  makeDevice('Core Router Alpha', 'online', '10.0.0.1', [1024, 8080], ['core', 'router']),
  makeDevice('Core Router Beta', 'online', '10.0.0.2', [1024, 8080], ['core', 'router']),
  makeDevice('Gateway Primary', 'online', '10.0.1.1', [80, 443], ['gateway']),
  makeDevice('Gateway Secondary', 'online', '10.0.1.2', [80, 443], ['gateway', 'backup']),
  makeDevice('API Server 1', 'online', '10.1.0.1', [3000, 4000], ['api', 'server']),
  makeDevice('API Server 2', 'online', '10.1.0.2', [3000, 4000], ['api', 'server']),
  makeDevice('API Server 3', 'online', '10.1.0.3', [3000, 4000], ['api', 'server']),
  makeDevice('DB Primary', 'online', '10.2.0.1', [5432, 5433], ['database', 'primary']),
  makeDevice('DB Replica 1', 'online', '10.2.0.2', [5432, 5433], ['database', 'replica']),
  makeDevice('DB Replica 2', 'online', '10.2.0.3', [5432, 5433], ['database', 'replica']),
  makeDevice('Cache Node A', 'online', '10.3.0.1', [6379, 6380], ['cache', 'redis']),
  makeDevice('Cache Node B', 'online', '10.3.0.2', [6379, 6380], ['cache', 'redis']),
  makeDevice('Load Balancer 1', 'online', '10.4.0.1', [80, 8443], ['loadbalancer']),
  makeDevice('Load Balancer 2', 'online', '10.4.0.2', [80, 8443], ['loadbalancer', 'backup']),
  makeDevice('Monitoring Agent', 'online', '10.5.0.1', [9090, 9100], ['monitoring']),
  makeDevice('Log Aggregator', 'online', '10.5.0.2', [5044, 5045], ['logging']),
  makeDevice('Auth Service', 'online', '10.6.0.1', [8080, 8090], ['auth', 'service']),
  makeDevice('Mail Relay', 'online', '10.6.0.2', [25, 587], ['mail']),
  makeDevice('Storage Node 1', 'online', '10.7.0.1', [2049, 2050], ['storage']),
  makeDevice('Storage Node 2', 'online', '10.7.0.2', [2049, 2050], ['storage']),

  // offline (~10)
  makeDevice('Edge Router West', 'offline', '192.168.1.1', [1024, 9000], ['edge', 'router'], 'Scheduled maintenance'),
  makeDevice('Edge Router East', 'offline', '192.168.1.2', [1024, 9000], ['edge', 'router'], 'Power failure — ticket #4821'),
  makeDevice('Backup DB', 'offline', '10.2.1.1', [5432, 5433], ['database', 'backup'], 'Decommissioning in progress'),
  makeDevice('Legacy API Server', 'offline', '10.1.1.1', [8000, 8001], ['api', 'legacy'], 'Replaced by API Server 3'),
  makeDevice('VPN Concentrator', 'offline', '172.16.0.1', [1194, 1195], ['vpn']),
  makeDevice('Dev Jump Host', 'offline', '172.16.1.1', [22, 23], ['dev', 'ssh'], 'Suspended — cost saving'),
  makeDevice('Staging Load Balancer', 'offline', '10.4.1.1', [80, 8443], ['loadbalancer', 'staging']),
  makeDevice('Archive Storage', 'offline', '10.7.1.1', [2049, 2050], ['storage', 'archive'], 'Disk replacement pending'),
  makeDevice('Old Mail Server', 'offline', '10.6.1.1', [25, 587], ['mail', 'legacy']),
  makeDevice('Test Runner Node', 'offline', '10.9.0.1', [8080, 9090], ['ci', 'testing']),

  // degraded (~10)
  makeDevice('Cache Node C', 'degraded', '10.3.0.3', [6379, 6380], ['cache', 'redis'], 'High memory usage — 94%'),
  makeDevice('API Server 4', 'degraded', '10.1.0.4', [3000, 4000], ['api', 'server'], 'Elevated error rate'),
  makeDevice('DB Replica 3', 'degraded', '10.2.0.4', [5432, 5433], ['database', 'replica'], 'Replication lag > 30s'),
  makeDevice('Storage Node 3', 'degraded', '10.7.0.3', [2049, 2050], ['storage'], 'RAID degraded — one disk failed'),
  makeDevice('Monitoring Collector', 'degraded', '10.5.0.3', [9090, 9100], ['monitoring'], 'Dropping ~5% of metrics'),
  makeDevice('Core Switch A', 'degraded', '10.0.2.1', [1024, 2048], ['core', 'network'], 'Port 12 link flapping'),
  makeDevice('Auth Service Replica', 'degraded', '10.6.0.3', [8080, 8090], ['auth', 'service'], 'Certificate expiring in 3 days'),
  makeDevice('Log Shipper', 'degraded', '10.5.1.1', [5044, 5045], ['logging'], 'Disk 80% full — logs at risk'),
  makeDevice('Gateway Tertiary', 'degraded', '10.0.1.3', [80, 443], ['gateway'], 'Intermittent packet loss'),
  makeDevice('Load Balancer 3', 'degraded', '10.4.0.3', [80, 8443], ['loadbalancer'], 'Health checks failing on 2 backends'),
];

export default devices;
