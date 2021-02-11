const mongoose = require('mongoose');

exports.ObjectIdCast = mongoose.Types.ObjectId;

exports.resJsonP = (res, code, sucesso, retorno) => res.status(code).jsonp({ sucesso, retorno });