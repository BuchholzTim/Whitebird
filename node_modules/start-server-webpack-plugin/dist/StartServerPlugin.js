'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StartServerPlugin {
  constructor(options) {
    if (options == null) {
      options = {};
    }
    if (typeof options === 'string') {
      options = { name: options };
    }
    this.options = Object.assign({
      signal: false,
      // Only listen on keyboard in development, so the server doesn't hang forever
      keyboard: process.env.NODE_ENV === 'development'
    }, options);
    this.afterEmit = this.afterEmit.bind(this);
    this.apply = this.apply.bind(this);
    this.startServer = this.startServer.bind(this);

    this.worker = null;
    if (this.options.restartable !== false) {
      this._enableRestarting();
    }
  }

  _enableRestarting() {
    if (this.options.keyboard) {
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', data => {
        if (data.trim() === 'rs') {
          console.log('Restarting app...');
          process.kill(this.worker.process.pid);
          this._startServer(worker => {
            this.worker = worker;
          });
        }
      });
    }
  }

  _getArgs() {
    const options = this.options;

    const execArgv = (options.nodeArgs || []).concat(process.execArgv);
    if (options.args) {
      execArgv.push('--');
      execArgv.push.apply(execArgv, options.args);
    }
    return execArgv;
  }

  _getInspectPort(execArgv) {
    const inspectArg = execArgv.find(arg => arg.includes('--inspect'));
    if (!inspectArg || !inspectArg.includes('=')) {
      return;
    }
    const hostPort = inspectArg.split('=')[1];
    const port = hostPort.includes(':') ? hostPort.split(':')[1] : hostPort;
    return parseInt(port);
  }

  _getSignal() {
    const signal = this.options.signal;
    // allow users to disable sending a signal by setting to `false`...

    if (signal === false) return;
    if (signal === true) return 'SIGUSR2';
    return signal;
  }

  afterEmit(compilation, callback) {
    if (this.worker && this.worker.isConnected()) {
      const signal = this._getSignal();
      if (signal) {
        process.kill(this.worker.process.pid, signal);
      }
      return callback();
    }

    this.startServer(compilation, callback);
  }

  apply(compiler) {
    // Use the Webpack 4 Hooks API when possible.
    if (compiler.hooks) {
      const plugin = { name: 'StartServerPlugin' };

      compiler.hooks.afterEmit.tapAsync(plugin, this.afterEmit);
    } else {
      compiler.plugin('after-emit', this.afterEmit);
    }
  }

  startServer(compilation, callback) {
    const options = this.options;

    let name;
    const names = Object.keys(compilation.assets);
    if (options.name) {
      name = options.name;
      if (!compilation.assets[name]) {
        console.error('Entry ' + name + ' not found. Try one of: ' + names.join(' '));
      }
    } else {
      name = names[0];
      if (names.length > 1) {
        console.log('More than one entry built, selected ' + name + '. All names: ' + names.join(' '));
      }
    }
    const existsAt = compilation.assets[name].existsAt;

    this._entryPoint = existsAt;

    this._startServer(worker => {
      this.worker = worker;
      callback();
    });
  }

  _startServer(callback) {
    const execArgv = this._getArgs();
    const inspectPort = this._getInspectPort(execArgv);

    const clusterOptions = {
      exec: this._entryPoint,
      execArgv
    };

    if (inspectPort) {
      clusterOptions.inspectPort = inspectPort;
    }
    _cluster2.default.setupMaster(clusterOptions);

    _cluster2.default.on('online', worker => {
      callback(worker);
    });

    _cluster2.default.fork();
  }
}

exports.default = StartServerPlugin;
module.exports = StartServerPlugin;