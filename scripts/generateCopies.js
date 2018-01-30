var debug = require('debug')('menu_display');
var format = require('string-format');
var gm = require('gm');
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');

format.extend(String.prototype);

var source_folder = process.env.SOURCE_FOLDER;

// go through all the folders
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

// impose the SOLD image on top of all the images in a loop
walk(source_folder, function(err, results) {
 if (err) {
  console.error(err);
 }
 for (var i = 0; i < results.length; i++) {
  // This is the composite command which superimposes the sold image on top
  // of every image in the array
  var parent_dir = path.dirname(results[i]);
  var current_filename = path.basename(results[i]);
  var output_filename = parent_dir + '/' + current_filename.split('.')[0] + '_sold.png';
  fse.copy(results[i], output_filename, function(err){
    if (err) return console.error(err);
    console.log("success!")
  });
 }
});
