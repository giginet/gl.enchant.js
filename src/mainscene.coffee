class MainScene extends Scene3D
  setup : ->
    @setDirectionalLight = new DirectionalLight()
    camera = @getCamera()
    camera.y = 20
    camera.z = 80
    camera.centerY = 10
    @ball = new Cube()
    @ball.mesh.texture = new Texture "resources/images/gigicat.png"
    @ball.z = -10
    @ball.rotX = 0
    @ball.addEventListener 'enterframe', (e) ->
      @rotX += 0.01
      @rotation = [
        Math.cos(@rotX), 0, -Math.sin(@rotX), 0,
        0, 1, 0, 0,
        Math.sin(@rotX), 0, Math.cos(@rotX), 0,
        0, 0, 0, 1
      ]
    @addChild @ball
