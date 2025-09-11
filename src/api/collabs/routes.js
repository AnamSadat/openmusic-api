const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollabHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

export default routes;
