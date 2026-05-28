# Device Management Console

## Getting Started
- make sure you use Node v14+
- `npm install`
- `npm run dev` and wait for the Device Management Console starts in http://localhost:3000/

## Mock API (src/api/mock/)
Choice: Axios interceptors (not MSW).
Reason: zero service-worker setup, works in all environments including vite preview, and the project has no existing SW story. 

- GET /api/devices // returns all devices in one response (no pagination params)
- GET /api/devices/:id
- POST /api/devices
- PATCH /api/devices/:id
- DELETE /api/devices/:id

## Global state — React Context
Uses for shared state for Snackbar messages

## Code splitting
lazy() on Detail + New pages
Routes are the natural split points
The big culprits are @mui/material, @mui/icons-material, @mui/x-data-grid, and @toolpad/core all landing in one chunk. The fix is manualChunks in the Vite config to split them

##