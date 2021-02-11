exports.xXssProtection = options => {
  if (options && options.setOnOldIE) {
    return function xXssProtection(req, res, next) {
      res.setHeader('X-XSS-Protection', '1; mode=block');
      next();
    };
  }

  return function xXssProtection(req, res, next) {
    let matches = /msie\s*(\d+)/i.exec(req.headers['user-agent']),
      value;

    value = '0';

    if (!matches || (parseFloat(matches[1]) >= 9)) {
      value = '1; mode=block';
    }

    res.setHeader('X-XSS-Protection', value);
    next();
  };

};

exports.nocache = (req, res, next) => {
  res.setHeader('Surrogate-Control', 'no-store');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('Expires', '0');

  next();
};

exports.hidePoweredBy = options => {
  let setTo = (options || {}).setTo;

  if (setTo) {
    return function hidePoweredBy(req, res, next) {
      res.setHeader('X-Powered-By', setTo);
      next();
    };
  }

  return function hidePoweredBy(req, res, next) {
    res.removeHeader('X-Powered-By');
    next();
  };

};