'use strict';
/**
 * Configuration Structure
 *
 * default.js
 * - test.js
 * - development.js
 * - - staging.js
 * - - - production.js
 */
var config = {
  'pg': {
    'host': 'localhost',
    'database': 'travel_filter'
  },
  'ports': {
    'http': 8000,
  },
  'url': '127.0.0.1',
  'facebook': {
    'clientID': '1058973787461852',
    'clientSecret': '9de526076fd38f73aef94e990c611c29'
  },
  'timeFormat': 'YYYY-MM-DDTHH:MM:SSZ',
};
module.exports = config;