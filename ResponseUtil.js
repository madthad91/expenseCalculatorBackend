module.exports = class ResponseUtil{
  static sendError(res, statusCode, msg){
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);
    res.end(JSON.stringify({
      status: 'error',
      msg
    }));
  }
}