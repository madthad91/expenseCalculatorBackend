module.exports = class ResponseUtil{
  static sendError(res, statusCode, msg){
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);
    res.end(JSON.stringify({
      status: 'error',
      msg
    }));
  }

  static sendSuccess(req, res) {
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body));
  }
}