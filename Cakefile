sys = require 'sys'
exec = (require 'child_process').exec

FILENAME = 'game'
FILES = [
  'kwing.coffee/lib/vector.coffee',
  'kwing.coffee/lib/array.coffee',
  'kwing.coffee/lib/timer.coffee',
  'kwing.coffee/lib/jukebox.coffee',
  'src/main.coffee',
  'src/mainscene.coffee'
]
HTMLFILE = 'index.html'

task 'compile', 'compile and minify game.', (options) ->
  outputErr = (err, stdout, stderr) ->
    throw err if err
    if stdout or stderr
      console.log "#{stdout} #{stderr}"
  if FILES.length is 1
    exec "coffee -c #{FILENAME}.js #{FILES[0]}", outputErr
  else
    exec "coffee -cj #{FILENAME} #{FILES.join ' '}", outputErr 
  # exec "yuicompressor #{FILENAME}.js > #{FILENAME}.min.js", outputErr
