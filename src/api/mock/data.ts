import type { Device } from '@/types/device';

const devices: Device[] = [
  // online (~20) — seen seconds to a few hours ago
  {
    id: 'd01', name: 'Core Router Alpha', status: 'online', ipAddress: '10.0.0.1', portRange: [1024, 8080], tags: ['core', 'router'], lastSeenAt: '2026-05-27T11:59:30.000Z',
  },
  {
    id: 'd02', name: 'Core Router Beta', status: 'online', ipAddress: '10.0.0.2', portRange: [1024, 8080], tags: ['core', 'router'], lastSeenAt: '2026-05-27T11:58:00.000Z',
  },
  {
    id: 'd03', name: 'Gateway Primary', status: 'online', ipAddress: '10.0.1.1', portRange: [80, 443], tags: ['gateway'], lastSeenAt: '2026-05-27T11:55:00.000Z',
  },
  {
    id: 'd04', name: 'Gateway Secondary', status: 'online', ipAddress: '10.0.1.2', portRange: [80, 443], tags: ['gateway', 'backup'], lastSeenAt: '2026-05-27T11:50:00.000Z',
  },
  {
    id: 'd05', name: 'API Server 1', status: 'online', ipAddress: '10.1.0.1', portRange: [3000, 4000], tags: ['api', 'server'], lastSeenAt: '2026-05-27T11:45:00.000Z',
  },
  {
    id: 'd06', name: 'API Server 2', status: 'online', ipAddress: '10.1.0.2', portRange: [3000, 4000], tags: ['api', 'server'], lastSeenAt: '2026-05-27T11:40:00.000Z',
  },
  {
    id: 'd07', name: 'API Server 3', status: 'online', ipAddress: '10.1.0.3', portRange: [3000, 4000], tags: ['api', 'server'], lastSeenAt: '2026-05-27T11:30:00.000Z',
  },
  {
    id: 'd08', name: 'DB Primary', status: 'online', ipAddress: '10.2.0.1', portRange: [5432, 5433], tags: ['database', 'primary'], lastSeenAt: '2026-05-27T11:00:00.000Z',
  },
  {
    id: 'd09', name: 'DB Replica 1', status: 'online', ipAddress: '10.2.0.2', portRange: [5432, 5433], tags: ['database', 'replica'], lastSeenAt: '2026-05-27T10:30:00.000Z',
  },
  {
    id: 'd10', name: 'DB Replica 2', status: 'online', ipAddress: '10.2.0.3', portRange: [5432, 5433], tags: ['database', 'replica'], lastSeenAt: '2026-05-27T10:00:00.000Z',
  },
  {
    id: 'd11', name: 'Cache Node A', status: 'online', ipAddress: '10.3.0.1', portRange: [6379, 6380], tags: ['cache', 'redis'], lastSeenAt: '2026-05-27T09:45:00.000Z',
  },
  {
    id: 'd12', name: 'Cache Node B', status: 'online', ipAddress: '10.3.0.2', portRange: [6379, 6380], tags: ['cache', 'redis'], lastSeenAt: '2026-05-27T09:00:00.000Z',
  },
  {
    id: 'd13', name: 'Load Balancer 1', status: 'online', ipAddress: '10.4.0.1', portRange: [80, 8443], tags: ['loadbalancer'], lastSeenAt: '2026-05-27T08:30:00.000Z',
  },
  {
    id: 'd14', name: 'Load Balancer 2', status: 'online', ipAddress: '10.4.0.2', portRange: [80, 8443], tags: ['loadbalancer', 'backup'], lastSeenAt: '2026-05-27T08:00:00.000Z',
  },
  {
    id: 'd15', name: 'Monitoring Agent', status: 'online', ipAddress: '10.5.0.1', portRange: [9090, 9100], tags: ['monitoring'], lastSeenAt: '2026-05-27T07:30:00.000Z',
  },
  {
    id: 'd16', name: 'Log Aggregator', status: 'online', ipAddress: '10.5.0.2', portRange: [5044, 5045], tags: ['logging'], lastSeenAt: '2026-05-27T07:00:00.000Z',
  },
  {
    id: 'd17', name: 'Auth Service', status: 'online', ipAddress: '10.6.0.1', portRange: [8080, 8090], tags: ['auth', 'service'], lastSeenAt: '2026-05-27T06:30:00.000Z',
  },
  {
    id: 'd18', name: 'Mail Relay', status: 'online', ipAddress: '10.6.0.2', portRange: [25, 587], tags: ['mail'], lastSeenAt: '2026-05-27T06:00:00.000Z',
  },
  {
    id: 'd19', name: 'Storage Node 1', status: 'online', ipAddress: '10.7.0.1', portRange: [2049, 2050], tags: ['storage'], lastSeenAt: '2026-05-27T05:30:00.000Z',
  },
  {
    id: 'd20', name: 'Storage Node 2', status: 'online', ipAddress: '10.7.0.2', portRange: [2049, 2050], tags: ['storage'], lastSeenAt: '2026-05-27T05:00:00.000Z',
  },

  // offline (~10) — seen 1–6 days ago
  {
    id: 'd21', name: 'Edge Router West', status: 'offline', ipAddress: '192.168.1.1', portRange: [1024, 9000], tags: ['edge', 'router'], lastSeenAt: '2026-05-26T12:00:00.000Z', notes: 'Scheduled maintenance',
  },
  {
    id: 'd22', name: 'Edge Router East', status: 'offline', ipAddress: '192.168.1.2', portRange: [1024, 9000], tags: ['edge', 'router'], lastSeenAt: '2026-05-25T08:00:00.000Z', notes: 'Power failure — ticket #4821',
  },
  {
    id: 'd23', name: 'Backup DB', status: 'offline', ipAddress: '10.2.1.1', portRange: [5432, 5433], tags: ['database', 'backup'], lastSeenAt: '2026-05-24T16:00:00.000Z', notes: 'Decommissioning in progress',
  },
  {
    id: 'd24', name: 'Legacy API Server', status: 'offline', ipAddress: '10.1.1.1', portRange: [8000, 8001], tags: ['api', 'legacy'], lastSeenAt: '2026-05-23T10:00:00.000Z', notes: 'Replaced by API Server 3',
  },
  {
    id: 'd25', name: 'VPN Concentrator', status: 'offline', ipAddress: '172.16.0.1', portRange: [1194, 1195], tags: ['vpn'], lastSeenAt: '2026-05-22T14:00:00.000Z',
  },
  {
    id: 'd26', name: 'Dev Jump Host', status: 'offline', ipAddress: '172.16.1.1', portRange: [22, 23], tags: ['dev', 'ssh'], lastSeenAt: '2026-05-21T09:00:00.000Z', notes: 'Suspended — cost saving',
  },
  {
    id: 'd27', name: 'Staging Load Balancer', status: 'offline', ipAddress: '10.4.1.1', portRange: [80, 8443], tags: ['loadbalancer', 'staging'], lastSeenAt: '2026-05-26T18:00:00.000Z',
  },
  {
    id: 'd28', name: 'Archive Storage', status: 'offline', ipAddress: '10.7.1.1', portRange: [2049, 2050], tags: ['storage', 'archive'], lastSeenAt: '2026-05-25T20:00:00.000Z', notes: 'Disk replacement pending',
  },
  {
    id: 'd29', name: 'Old Mail Server', status: 'offline', ipAddress: '10.6.1.1', portRange: [25, 587], tags: ['mail', 'legacy'], lastSeenAt: '2026-05-24T06:00:00.000Z',
  },
  {
    id: 'd30', name: 'Test Runner Node', status: 'offline', ipAddress: '10.9.0.1', portRange: [8080, 9090], tags: ['ci', 'testing'], lastSeenAt: '2026-05-23T22:00:00.000Z',
  },

  // degraded (~10) — seen minutes to a few hours ago
  {
    id: 'd31', name: 'Cache Node C', status: 'degraded', ipAddress: '10.3.0.3', portRange: [6379, 6380], tags: ['cache', 'redis'], lastSeenAt: '2026-05-27T11:50:00.000Z', notes: 'High memory usage — 94%',
  },
  {
    id: 'd32', name: 'API Server 4', status: 'degraded', ipAddress: '10.1.0.4', portRange: [3000, 4000], tags: ['api', 'server'], lastSeenAt: '2026-05-27T11:30:00.000Z', notes: 'Elevated error rate',
  },
  {
    id: 'd33', name: 'DB Replica 3', status: 'degraded', ipAddress: '10.2.0.4', portRange: [5432, 5433], tags: ['database', 'replica'], lastSeenAt: '2026-05-27T11:00:00.000Z', notes: 'Replication lag > 30s',
  },
  {
    id: 'd34', name: 'Storage Node 3', status: 'degraded', ipAddress: '10.7.0.3', portRange: [2049, 2050], tags: ['storage'], lastSeenAt: '2026-05-27T10:30:00.000Z', notes: 'RAID degraded — one disk failed',
  },
  {
    id: 'd35', name: 'Monitoring Collector', status: 'degraded', ipAddress: '10.5.0.3', portRange: [9090, 9100], tags: ['monitoring'], lastSeenAt: '2026-05-27T10:00:00.000Z', notes: 'Dropping ~5% of metrics',
  },
  {
    id: 'd36', name: 'Core Switch A', status: 'degraded', ipAddress: '10.0.2.1', portRange: [1024, 2048], tags: ['core', 'network'], lastSeenAt: '2026-05-27T09:30:00.000Z', notes: 'Port 12 link flapping',
  },
  {
    id: 'd37', name: 'Auth Service Replica', status: 'degraded', ipAddress: '10.6.0.3', portRange: [8080, 8090], tags: ['auth', 'service'], lastSeenAt: '2026-05-27T09:00:00.000Z', notes: 'Certificate expiring in 3 days',
  },
  {
    id: 'd38', name: 'Log Shipper', status: 'degraded', ipAddress: '10.5.1.1', portRange: [5044, 5045], tags: ['logging'], lastSeenAt: '2026-05-27T08:30:00.000Z', notes: 'Disk 80% full — logs at risk',
  },
  {
    id: 'd39', name: 'Gateway Tertiary', status: 'degraded', ipAddress: '10.0.1.3', portRange: [80, 443], tags: ['gateway'], lastSeenAt: '2026-05-27T08:00:00.000Z', notes: 'Intermittent packet loss',
  },
  {
    id: 'd40', name: 'Load Balancer 3', status: 'degraded', ipAddress: '10.4.0.3', portRange: [80, 8443], tags: ['loadbalancer'], lastSeenAt: '2026-05-27T07:30:00.000Z', notes: 'Health checks failing on 2 backends',
  },
];

export default devices;
