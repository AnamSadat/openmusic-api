const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.registerUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
];

export default routes;
