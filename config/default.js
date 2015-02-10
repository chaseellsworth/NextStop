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
  'mysql': {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'travel_filters'
  },
  'ports': {
    'http': 8000,
  },
  'url': '127.0.0.1',
  'github': { // put facebook keys right here
    'clientID': '364ea3bc2b086177fd27', //////////
    'clientSecret': '2dce4e81ad618474f5c822b4567200b941a6c1b1', //////////
  },
  'timeFormat': 'YYYY-MM-DDTHH:MM:SSZ',
};
module.exports = config;