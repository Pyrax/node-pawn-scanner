#!/usr/bin/env node
'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var pawnScanner = require('../lib/pawn-scanner');

var args = process.argv;

if (args.length < 3 || args.length > 4) {
  console.error('Usage: scan-dir <dirname> [output file]');

  process.exit(1);
}

if (!fs.existsSync(args[2])) {
  console.error('Error: Invalid dir given');

  process.exit(1);
}

if (args.length === 4) {
  if(!fs.existsSync(path.dirname(args[3]))) {
    console.error('Error: Invalid output dir given');
    
    process.exit(1);
  }
} else {
  args[3] = './web/output.json';
}

var stats = fs.statSync(args[2]);

if (!stats.isDirectory()) {
  console.error('Error: Invalid dir given');

  process.exit(1);
}

try {
  var output = pawnScanner.scanDir(args[2]);
  
  var obj = {
    "meta": {
      "time_created": Date.now()
    },
    "code": output
  };
  
  fs.writeFileSync(args[3], JSON.stringify(obj));
} catch (e) {
  throw e;

  process.exit(1);
}
