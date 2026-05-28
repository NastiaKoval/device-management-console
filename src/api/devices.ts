import { Device, DeviceFormValues } from '../types/device';

import axiosInstance from './axios';

export const getDevices = (signal?: AbortSignal) => axiosInstance.get<Device[]>('/devices', { signal }).then((r) => r.data);

export const getDevice = (id: string, signal?: AbortSignal) => axiosInstance.get<Device>(`/devices/${id}`, { signal }).then((r) => r.data);

export const createDevice = (data: DeviceFormValues, signal?: AbortSignal) => axiosInstance.post<Device>('/devices', data, { signal }).then((r) => r.data);

export const updateDevice = (id: string, data: Partial<DeviceFormValues>, signal?: AbortSignal) => axiosInstance.patch<Device>(`/devices/${id}`, data, { signal }).then((r) => r.data);

export const deleteDevice = (id: string, signal?: AbortSignal) => axiosInstance.delete(`/devices/${id}`, { signal });
