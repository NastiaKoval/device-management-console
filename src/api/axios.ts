import axios from 'axios';
// attach mock handlers (import side-effect)
import installMockHandlers from './mock/handler';

installMockHandlers();

export default axios.create({ baseURL: '/api' });
