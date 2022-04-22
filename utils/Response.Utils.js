const resOk = (data, res) =>
  res.status(200).send({
    status: true,
    codeResponse: 200,
    textResponse: "OK",
    resData: data,
  });

const resForbidden = (data, res) =>
  res.status(403).send({
    status: false,
    codeResponse: 403,
    textResponse: "Forbidden",
    resData: data,
  });

const resNotFound = (data, res) =>
  res.status(404).send({
    status: false,
    codeResponse: 404,
    textResponse: "Not Found",
    resData: data,
  });

const resBadReq = (data, res) =>
  res.status(400).send({
    status: false,
    codeResponse: 400,
    textResponse: "Bad Request",
    resData: data,
  });  

const resError = (data, res) =>
  res.status(500).send({
    status: false,
    codeResponse: 500,
    textResponse: "Internal Server Error",
    resData: data,
  });

const unauthorized = (data, res) => 
res.status(401).send({
  status: false,
  codeResponse: 401,
  textResponse: "Unauthorized",
  resData: data,
});

const resResult = (code, data, res) => {
  switch (code) {
    case 200:
      resOk(data, res);
      break;
    case 403:
      resForbidden(data, res);
      break;
    case 404:
      resNotFound(data, res);
      break;
    case 400:
      resBadReq(data, res);
      break; 
    case 401:
      unauthorized(data, res);
      break;   
    case 500:
      resError(data, res);
  }
};

module.exports =  resResult ;
