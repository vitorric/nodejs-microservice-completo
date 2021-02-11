const http = require('http'),
  cluster = require('cluster'),
  os = require('os'),
  app = require('./app.js');

const CLUSTER = (process.env.CLUSTER === 'true');

process.on('unhandledRejection', rejectionErr => {
  console.log('unhandledRejection Err::', rejectionErr);
  console.log('unhandledRejection Stack::', JSON.stringify(rejectionErr.stack));
});

process.on('uncaughtException', uncaughtExc => {
  console.log('uncaughtException Err::', uncaughtExc);
  console.log('uncaughtException Stack::', JSON.stringify(uncaughtExc.stack));
});

let workers = [];
const setupWorkerProcesses = () => {
  let numCores = os.cpus().length;
  console.log(`Master cluster setting up ${numCores} workers`);
  for (let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());
    workers[i].on('message', function (message) {
      console.log(message);
    });
  }
  cluster.on('online', function (worker) {
    console.log(`Worker pid:${worker.process.pid} is listening`);
  });

  cluster.on('exit', function (worker, code, signal) {

    console.log(`'Worker ${worker.process.pid} died with code:${code} and signal:${signal}`);
    console.log('Starting a new worker');
    workers.push(cluster.fork());
    workers[workers.length - 1].on('message', function (message) {
      console.log(message);
    });
  });
};

const setUpExpress = () => {
  const server = http.createServer(app);


  server.listen(process.env.PORT, () => {
    console.log('CoreAPI listening on port', process.env.PORT);
  });

  server.on('error', (serErr, serCtx) => {
    console.error('server error', serErr.stack);
    console.error('on url', serCtx.req.url);
    console.error('with headers', serCtx.req.headers);
  });
};

/**
 * @description Caso queira iniciar como cluster ou apenas um nucleo
 * @param {Boolean} isCluster
 */
const setupServer = (isCluster) => {

  if (isCluster && cluster.isMaster) {
    return setupWorkerProcesses();
  }

  return setUpExpress();
};

setupServer(CLUSTER);
