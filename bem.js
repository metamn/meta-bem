#!/usr/bin/env node


var fs = require('fs');
var mkdirp = require('mkdirp');


// Generators
// -----------------------------------------------------------------------------

// Create a folder
var makeFolder = function(path) {
  mkdirp(path, function (err) {
    if (err) throw err;
    console.log('Dir ok');
  });
}


// Create a file with content
var makeFile = function(file, content) {
  fs.writeFile(file, content, function(err) {
    if (err) {
      console.log("Error creating file: " + file);
    } else {
      console.log("File ok");
    }
  });
}


// Create a block
var makeBlock = function(path) {
  splits = path.split('/');
  block = splits[splits.length - 1];
  file = path + '/' + block;

  makeFolder(path);

  makeFile(file + '.html.swig', block);
  makeFile(file + '.scss', "@mixin " + block + " {}");
}





// Command line parser
// -----------------------------------------------------------------------------

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
  case 'block':
  case 'b':
    makeBlock(path);
    break;
  default:
    console.log('Wrong BEM object: ' + object);
}
