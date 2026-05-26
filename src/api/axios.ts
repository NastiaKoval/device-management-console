import axios from 'axios';

import installMockHandlers from './mock/handler';

installMockHandlers();

export default axios.create({ baseURL: '/api' });
