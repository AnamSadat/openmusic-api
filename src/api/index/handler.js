class IndexHandler {
  static async indexHandler(_, h) {
    return h.response({
      status: 'success',
      message: 'OpenMusic API Running',
    });
  }
}

export default IndexHandler;
