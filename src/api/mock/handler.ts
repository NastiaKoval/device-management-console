import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

import { DeviceSchema } from '@/types/device';

import seedDevices from './data';

import type { Device } from '@/types/device';

// localStorage store

const STORAGE_KEY = 'mock_devices';

function loadStore(): Device[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...seedDevices];
    const parsed = DeviceSchema.array().safeParse(JSON.parse(raw) as unknown);
    return parsed.success ? parsed.data : [...seedDevices];
  } catch {
    return [...seedDevices];
  }
}

function saveStore(devices: Device[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
}

// in-memory store

const store: Device[] = loadStore();

// helpers

const latency = () => new Promise<void>((resolve) => {
  setTimeout(resolve, 400 + Math.random() * 500);
});

const shouldFail = () => Math.random() < 0.1;

function ok<T>(config: InternalAxiosRequestConfig, data: T, status = 200): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config,
  };
}

function mockErr(
  config: InternalAxiosRequestConfig,
  status: number,
  message: string,
): never {
  const response: AxiosResponse = {
    data: { message },
    status,
    statusText: message,
    headers: {},
    config,
  };
  throw new AxiosError(
    `Request failed with status code ${String(status)}`,
    status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
    config,
    null,
    response,
  );
}

// routing

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
      return ok(config, [...store]);
    }

    // GET /api/devices/:id
    if (isGetOne) {
      const device = store.find((d) => d.id === withIdMatch[1]);
      if (!device) return mockErr(config, 404, 'Device not found');
      return ok(config, { ...device });
    }

    // POST /api/devices
    if (isPost) {
      if (shouldFail()) return mockErr(config, 503, 'Service unavailable — simulated failure');
      const parsed = DeviceSchema
        .omit({ id: true, lastSeenAt: true, status: true }).safeParse(parseBody(raw));
      if (!parsed.success) return mockErr(config, 400, parsed.error.message);
      const device: Device = {
        ...parsed.data,
        id: crypto.randomUUID(),
        lastSeenAt: new Date().toISOString(),
        status: 'online',
      };
      store.push(device);
      saveStore(store);
      return ok(config, device, 201);
    }

    // PATCH /api/devices/:id
    if (isPatch) {
      if (shouldFail()) return mockErr(config, 503, 'Service unavailable — simulated failure');
      const idx = store.findIndex((d) => d.id === withIdMatch[1]);
      if (idx === -1) return mockErr(config, 404, 'Device not found');
      const schema = DeviceSchema.omit({ id: true, lastSeenAt: true }).partial();
      const parsed = schema.safeParse(parseBody(raw));
      if (!parsed.success) return mockErr(config, 400, parsed.error.message);
      const updated: Device = {
        ...store[idx],
        ...parsed.data,
        lastSeenAt: new Date().toISOString(),
      };
      store[idx] = updated;
      saveStore(store);
      return ok(config, { ...updated });
    }

    // DELETE /api/devices/:id
    if (isDelete) {
      if (shouldFail()) return mockErr(config, 503, 'Service unavailable — simulated failure');
      const idx = store.findIndex((d) => d.id === withIdMatch[1]);
      if (idx === -1) return mockErr(config, 404, 'Device not found');
      store.splice(idx, 1);
      saveStore(store);
      return ok(config, null, 204);
    }

    // Unmatched — fall through to real network
    if (typeof originalAdapter === 'function') {
      return originalAdapter(config);
    }
    return mockErr(config, 501, 'Not implemented');
  };
}

export default installMockHandlers;
