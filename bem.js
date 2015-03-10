#!/usr/bin/env node



// Generators


var fs = require('fs');

// Create a folder
var makeFolder = function(path) {
  fs.mkdirSync(path);
  console.log(path + ' created.');
}




// Command line parser

var argv = require('yargs')
  .usage('Usage: $0 <object> path')
  .command('object', 'The BEM object to be created. It can be [level, block, element, modifier] or [l, b, e, m]')
  .example('$0 level components/framework')
  .demand(2)
  .argv;

var object = argv._[0];
var path = argv._[1];


switch (object) {
  case 'level':
  case 'l':
    makeFolder(path);
    break;
  default:
    console.log('Wrong BEM object: ' + object);
}
