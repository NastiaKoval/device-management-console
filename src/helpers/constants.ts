import { Device } from '@/types/device';

export const STATUSES = new Set<Device['status']>(['online', 'offline', 'degraded']);

export const STATUS_TO_TOGGLE = {
  online: 'success',
  offline: 'standard',
  degraded: 'warning',
} as const;

export const STATUS_TO_CHIP = { online: 'success', offline: 'default', degraded: 'warning' } as const;
