import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import type { Device } from '@/types/device';
import { DeviceSchema } from '@/types/device';
import seedDevices from './data';

const store: Device[] = [...seedDevices];

const latency = () => new Promise<void>((resolve) => {
  setTimeout(resolve, 400 + Math.random() * 500);
});

const shouldFail = () => Math.random() < 0.1;

function ok<T>(data: T, status = 200): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  };
}

function mockErr(status: number, message: string): AxiosResponse {
  return {
    data: { message },
    status,
    statusText: message,
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  };
}

const ROUTE_GET_ALL = /^\/devices$/;
const ROUTE_WITH_ID = /^\/devices\/([^/]+)$/;

function parseBody(raw: unknown): unknown {
  if (typeof raw === 'string') {
    return JSON.parse(raw) as unknown;
  }
  return raw;
}

function installMockHandlers() {
  const originalAdapter = axios.defaults.adapter;

  axios.defaults.adapter = async (config) => {
    const { method, url } = config;
    const raw: unknown = config.data;

    await latency();

    const withIdMatch = url?.match(ROUTE_WITH_ID);
    const isGetAll = method === 'get' && ROUTE_GET_ALL.test(url ?? '');
    const isGetOne = method === 'get' && withIdMatch != null;
    const isPost = method === 'post' && ROUTE_GET_ALL.test(url ?? '');
    const isPatch = method === 'patch' && withIdMatch != null;
    const isDelete = method === 'delete' && withIdMatch != null;

    // GET /api/devices
    if (isGetAll) {
      return ok([...store]);
    }

    // GET /api/devices/:id
    if (isGetOne) {
      const device = store.find((d) => d.id === withIdMatch[1]);
      if (!device) return mockErr(404, 'Device not found');
      return ok({ ...device });
    }

    // POST /api/devices
    if (isPost) {
      if (shouldFail()) return mockErr(503, 'Service unavailable — simulated failure');
      const parsed = DeviceSchema.omit({ id: true, lastSeenAt: true }).safeParse(parseBody(raw));
      if (!parsed.success) return mockErr(400, parsed.error.message);
      const device: Device = {
        ...parsed.data,
        id: crypto.randomUUID(),
        lastSeenAt: new Date().toISOString(),
      };
      store.push(device);
      return ok(device, 201);
    }

    // PATCH /api/devices/:id
    if (isPatch) {
      if (shouldFail()) return mockErr(503, 'Service unavailable — simulated failure');
      const idx = store.findIndex((d) => d.id === withIdMatch[1]);
      if (idx === -1) return mockErr(404, 'Device not found');
      const schema = DeviceSchema.omit({ id: true, lastSeenAt: true }).partial();
      const parsed = schema.safeParse(parseBody(raw));
      if (!parsed.success) return mockErr(400, parsed.error.message);
      const updated: Device = {
        ...store[idx],
        ...parsed.data,
        lastSeenAt: new Date().toISOString(),
      };
      store[idx] = updated;
      return ok({ ...updated });
    }

    // DELETE /api/devices/:id
    if (isDelete) {
      if (shouldFail()) return mockErr(503, 'Service unavailable — simulated failure');
      const idx = store.findIndex((d) => d.id === withIdMatch[1]);
      if (idx === -1) return mockErr(404, 'Device not found');
      store.splice(idx, 1);
      return ok(null, 204);
    }

    // Unmatched — fall through to real network
    if (typeof originalAdapter === 'function') {
      return originalAdapter(config);
    }
    return mockErr(501, 'Not implemented');
  };
}

export default installMockHandlers;
