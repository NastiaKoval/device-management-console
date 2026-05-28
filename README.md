# Device Management Console

## Getting Started
- make sure you use Node v14+
- `npm install`
- `npm run dev` and wait for the Device Management Console starts in http://localhost:3000/

## Folder Structure

```
src/
├── api/              # Axios instance, typed API functions, and in-memory mock
│   └── mock/         # Seed data + custom Axios adapter (latency, 10% write failures)
├── components/       # Shared UI components
│   ├── AppShell.tsx          # Toolpad DashboardLayout — header, sidebar, language switcher
│   ├── DeviceForm.tsx        # RHF + Zod form shared by Create and Edit pages
│   └── RootErrorBoundary.tsx # Route-level error boundary (loader errors + 404s)
├── context/          # React contexts and hooks (snackbar)
├── helpers/          # Pure utility functions and constants
├── hooks/            # Custom hooks (useDebounce)
├── i18n/             # i18next setup + EN / UK locale files
├── pages/            # Route-level components (DeviceList, DeviceDetailed, DeviceNew)
├── router/           # createBrowserRouter config + per-route loaders
├── types/            # Zod schema + z.infer types for Device
└── main.tsx          # App entry — ErrorBoundary, SnackbarProvider, RouterProvider
```

## Mock API (src/api/mock/)
Choice: Axios interceptors (not MSW).
Reason: zero service-worker setup, works in all environments including vite preview, and the project has no existing SW story. 

- GET /api/devices // returns all devices in one response (no pagination params)
- GET /api/devices/:id
- POST /api/devices
- PATCH /api/devices/:id
- DELETE /api/devices/:id

All device data is persisted to `localStorage` under the key `mock_devices`. On first load the store is seeded with 40 mock devices; subsequent page reloads and refreshes preserve any changes made through the UI.

## Global state — React Context
Uses for shared state for Snackbar messages

## Code splitting
lazy() on Detail + New pages
Routes are the natural split points
The big culprits are @mui/material, @mui/icons-material, @mui/x-data-grid, and @toolpad/core all landing in one chunk. The fix is manualChunks in the Vite config to split them

## What's Not Finished

Given more time, these would have been implemented:

**Optimistic updates**
Save and delete both wait for the API to respond before updating the UI. The correct approach: snapshot the current data before the call, update the UI immediately, then roll back to the snapshot and show an error toast if the call fails. This would make interactions feel instant given the 400–900 ms simulated latency.

