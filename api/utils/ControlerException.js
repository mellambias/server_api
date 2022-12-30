process = require('process');
/*
 *   Clase para las excepciones de controlador
 */
class ControlerException {
    env = process.env.NODE_ENV || 'development';
    constructor(message, status, info = {}) {
        this.errorText = message;
        this.status = status;
        this.dev = this.env === 'development' ? [this.debugLine(), info] : {};
    }

    debugLine() {
        let debug = {};
        let e = new Error();
        // debug.stack = e.stack;
        let frame = e.stack.split('\n')[3]; // change to 3 for grandparent func
        debug.numeroLinea = frame.split(':').reverse()[1];
        debug.nameFuncion = frame.split(' ')[5];
        return debug;
    }

    get message() {
        return this.errorText;
    }
    set message(message) {
        this.errorText = message;
    }
}

module.exports = ControlerException;
