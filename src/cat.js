var common = require('./common');
var fs = require('fs');

//@
//@ ### cat(file [, file ...])
//@ ### cat(file_array)
//@
//@ Examples:
//@
//@ ```javascript
//@ var str = cat('file*.txt');
//@ var str = cat('file1', 'file2');
//@ var str = cat(['file1', 'file2']); // same as above
//@ ```
//@
//@ Returns a string containing the given file, or a concatenated string
//@ containing the files if more than one file is given (a new line character is
//@ introduced between each file). Wildcard `*` accepted.
function _cat(options, files, cb) {
  var cat = '';

  if (!files)
    return cb(new Error('no paths given'));

  if (typeof files === 'string')
    files = [].slice.call(arguments, 1);
  // if it's array leave it as it is

  //files = common.expand(files); // TODO: async

  var completed = 0;
  files.forEach(function(file) {
    fs.exists(file, function(exists) {
      if (!exists)
        return cb(new Error('no such file or directory: ' + file));

      fs.readFile(file, 'utf8', function(err, data) {
        if (err) return cb(err);

        cat += data + '\n';

        completed += 1;
        if (completed === files.length) { // TODO: collect
          if (cat[cat.length-1] === '\n')
            cat = cat.substring(0, cat.length-1);

          cb(null, common.ShellString(cat));
        }
      });
    });
  });

}
module.exports = _cat;
