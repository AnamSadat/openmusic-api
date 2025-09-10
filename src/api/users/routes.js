const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.registerUserHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    // options: {
    //   auth: 'openmusic_jwt',
    // },
  },
];

export default routes;
