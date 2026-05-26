import { FC } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router';

import DevicesList from './Devices';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/devices" element={<DevicesList />} />
    </Routes>
  </BrowserRouter>
);

export default App;
