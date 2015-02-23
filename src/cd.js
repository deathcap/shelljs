var fs = require('fs');
var common = require('./common');

//@
//@ ### cd('dir')
//@ Changes to directory `dir` for the duration of the script
function _cd(options, dir, cb) {
  if (!dir)
    cb(new Error('directory not specified'));

  fs.exists(dir, function(exists) {
    if (!exists) return cb(new Error('no such file or directory: ' + dir));

    fs.stat(dir, function(err, stat) {
      if (err) return cb(err);

      if (!stat.isDirectory()) return cb(new Error('not a directory: ' + dir));

      try {
        process.chdir(dir);
      } catch (err) {
        return cb(err);
      }

      cb(null, dir);
    });
  });
}
module.exports = _cd;
