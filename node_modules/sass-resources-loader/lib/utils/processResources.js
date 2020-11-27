"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = processResources;

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Finds any @use statement
var useRegex = '^@use .*\n?$'; // Same as above, but adds the m (multiline) flag

var useRegexTest = new RegExp(useRegex, 'm'); // Makes sure that only the last instance of `useRegex` variable is found

var useRegexReplace = new RegExp("".concat(useRegex, "(?![\\s\\S]*").concat(useRegex, ")"), 'gm');

var getOutput = function getOutput(source, resources, _ref) {
  var hoistUseStatements = _ref.hoistUseStatements;

  if (hoistUseStatements && useRegexTest.test(source)) {
    return source.replace(useRegexReplace, function (useStatements) {
      return "".concat(useStatements, "\n").concat(resources);
    });
  }

  return "".concat(resources, "\n").concat(source);
};

function processResources(error, resources, source, options, module, callback) {
  if (error) {
    _logger["default"].debug('Resources: **not found**');

    return callback(error);
  }

  var stringifiedResources = Array.isArray(resources) ? resources.join('\n') : resources;
  var output = getOutput(source, stringifiedResources, options);

  _logger["default"].debug('Resources: \n', "/* ".concat(module, " */ \n"), output);

  return callback(null, output);
}