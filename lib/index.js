
var minimatch = require('minimatch')
var exec = require('child_process').exec
var dirname = require('path').dirname
var each = require('async').each

function plugin (opts) {
  return function (files, metalsmith, done) {
    var makefiles = Object.keys(files).filter(minimatch.filter('**/Makefile', {matchBase: true}))

    each(makefiles, function (file, callback) {
        var cwd = metalsmith.source() + '/' + dirname(file)
        exec('make', { cwd: cwd }, function (err, stdout, stderr) {
          callback()
        })
      }, function (err) {
        if (err) throw(err)
        done()
      }
    )

  }
}

module.exports = plugin
