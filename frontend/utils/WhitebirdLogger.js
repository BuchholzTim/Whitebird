/* eslint-disable no-console */
export default class WhitebirdLogger {
  constructor(name) {
    this.name = name;
  }

  // Define different types of styles
  baseStyles = [
    'color: #fff',
    'background-color: #444',
    'padding: 2px 4px',
    'border-radius: 2px',
  ].join(';');

  errorStyles = ['color: #eee', 'background-color: red'].join(';');

  successStyles = ['background-color: green'].join(';');

  getStyle(type) {
    // Set style based on input type
    let style = `${this.baseStyles};`;
    switch (type) {
      case 'error':
        style += this.errorStyles;
        break;
      case 'success':
        style += this.successStyles;
        break;
      default:
        break;
    }

    return style;
  }

  log(msg) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof msg === 'object') {
        console.log(`%c${this.name}:`, this.getStyle());
        console.log(msg);
      } else {
        console.log(`%c${this.name}: ${msg}`, this.getStyle());
      }
    }
  }

  error(msg) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof msg === 'object') {
        console.log(`%c${this.name}:`, this.getStyle('error'));
        console.log(msg);
      } else {
        console.log(`%c${this.name}: ${msg}`, this.getStyle('error'));
      }
    }
  }

  success(msg) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof msg === 'object') {
        console.log(`%c${this.name}:`, this.getStyle('success'));
        console.log(msg);
      } else {
        console.log(`%c${this.name}: ${msg}`, this.getStyle('success'));
      }
    }
  }
}
