enchant()
class Shooting extends Game
  config : {
    WIDTH : 640,
    HEIGHT : 480,
    FPS : 30,
    FONT : 'Helvetica',
    IMAGE_PATH : 'resources/images/',
    IMAGES : [
    ],
    SOUND_PATH : 'resources/sounds/',
    SOUNDS : [
    ],
    INITIAL_LEVEL : 1,
    LAST_LEVEL : 7,
    LEVEL_TIME : 30
  }
  constructor : ->
    super @config.WIDTH, @config.HEIGHT
    @fps = @config.FPS
    @keybind(90, 'a')
    @keybind(88, 'b')
    Shooting.game = @
    Shooting.config = @config
    for image in @config.IMAGES
      @preload("#{@config.IMAGE_PATH}#{image}")
    Jukebox.root = @config.SOUND_PATH
    for sound in @config.SOUNDS
      Jukebox._loadSound sound, 'audio/wav'
    root = new MainScene()
    @onload = ->
      root.setup()
      @pushScene root
    @start()

window.onload = ->
  new Shooting()
