class MainScene extends Scene3D
  constructor : ->
    super
    @setDirectionalLight = new DirectionalLight()
    camera = new Camera3D()
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
