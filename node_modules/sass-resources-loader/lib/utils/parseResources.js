"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _glob = _interopRequireDefault(require("glob"));

var _logger = _interopRequireDefault(require("./logger"));

var _isArrayOfStrings = _interopRequireDefault(require("./isArrayOfStrings"));

var _flattenArray = _interopRequireDefault(require("./flattenArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(locations) {
  if (typeof locations === 'string') {
    _logger["default"].debug('options.resources is String:', true);

    return _glob["default"].sync(locations);
  }

  if ((0, _isArrayOfStrings["default"])(locations)) {
    _logger["default"].debug('options.resources is Array of Strings:', true);

    var paths = locations.map(function (file) {
      return _glob["default"].sync(file);
    });
    return (0, _flattenArray["default"])(paths);
  }

  return [];
};

exports["default"] = _default;