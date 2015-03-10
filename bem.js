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
// - if parents are not existent the file and teh folder structure will be created anyway
var makeBlock = function(path) {
  makeFolder(path);

  splits = path.split('/');
  block = splits[splits.length - 1];
  file = path + '/' + block;

  makeFile(file + '.html.swig', block);
  makeFile(file + '.scss', "@mixin " + block + " {}");
}


// Create an Element
var makeElement = function(path) {
  splits = path.split('/');
  element = splits[splits.length - 1];
  block = splits[splits.length - 2];

  folder = path.replace(element, '') + '__' + element;
  makeFolder(folder);

  filename = block + '__' + element;
  file = folder + '/' + filename;

  makeFile(file + '.html.swig', filename);
  makeFile(file + '.scss', "@mixin " + filename + " {}");
}






// Command line parser
// -----------------------------------------------------------------------------

var argv = require('yargs')
  .usage('Usage: $0 <object> path')
  .command('object', 'The BEM object to be created. It can be [level, block, element, modifier] or [l, b, e, m]')
  .example('$0 level components/framework')
  .example('$0 block components/framework/header')
  .example('$0 element components/framework/header/logo')
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
  case 'element':
  case 'e':
    makeElement(path);
    break;
  default:
    console.log('Wrong BEM object: ' + object);
}
