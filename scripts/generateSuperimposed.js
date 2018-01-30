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

// Checking the arguments for the sold_image path
if (process.argv[2] == null) {
  console.error("You have not passed the location of the sold image.");
  return;
} else {
  var sold_image_path = process.argv[2];
}

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
  if (current_filename.indexOf('_sold.png') == -1) {
    continue;
  }
  var targetFile = results[i];
  gm()
  .command("composite")
  .in("-gravity", "center")
  .in(sold_image_path)
  .in(targetFile)
  .write(targetFile, function (err) {
    if (!err)
      console.log('Successfully wrote image.');
    else
      console.log(err);
  });
 }
});
