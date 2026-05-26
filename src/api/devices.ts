import axiosInstance from './axios';
import { Device, DeviceFormValues } from '../types/device';

export const getDevices = (signal?: AbortSignal) => axiosInstance.get<Device[]>('/devices', { signal }).then((r) => r.data);

export const getDevice = (id: string, signal?: AbortSignal) => axiosInstance.get<Device>(`/devices/${id}`, { signal }).then((r) => r.data);

export const createDevice = (data: DeviceFormValues) => axiosInstance.post<Device>('/devices', data).then((r) => r.data);

export const updateDevice = (id: string, data: Partial<DeviceFormValues>) => axiosInstance.patch<Device>(`/devices/${id}`, data).then((r) => r.data);

export const deleteDevice = (id: string) => axiosInstance.delete(`/devices/${id}`);
