import IndexHandler from './handler.js';

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: IndexHandler.indexHandler,
  },
];

export default routes;
