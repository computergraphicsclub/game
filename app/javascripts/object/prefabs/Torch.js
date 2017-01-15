class Torch extends Phaser.BitmapData {

  /**
  * @param {object} config torch
  * @param {Phaser.Game} config.game the current game object
  * @param {Phaser.Tilemap} config.map for torch to interact with objects in map
  */
  constructor({ game, map }) {
    super(game);
    this.setVariables(map);
    this.addShadowTexture();
  }

  setVariables(map) {
    this.map = map;
    this.isEnabled = false;
    this.radius = 1210;
  }

  addShadowTexture() {
    this.map.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    this.map.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.map.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
    var lightBitmap = this.game.add.image(0, 0, this.map.bitmap);
    lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
  }

  redrawShadow() {
    this.map.bitmap.context.fillStyle = 'rgb(100, 100, 100)';
    this.map.bitmap.context.fillRect(0, 0, this.game.width, this.game.height);
    this.map.bitmap.dirty = true;
  }

  getWallIntersection(ray) {
    var distanceToWall = Number.POSITIVE_INFINITY;
    var closestIntersection = null;

    this.map.walls.forEach(function(wall) {
      var lines = [
        new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
        new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
        new Phaser.Line(wall.x + wall.width, wall.y, wall.x + wall.width, wall.y + wall.height),
        new Phaser.Line(wall.x, wall.y + wall.height, wall.x + wall.width, wall.y + wall.height)
      ];

      for(var i = 0; i < lines.length; i++) {
        var intersect = Phaser.Line.intersects(ray, lines[i]);
        if (intersect) {
          this.distance = this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
          if (this.distance < distanceToWall) {
              distanceToWall = this.distance;
              closestIntersection = intersect;
          }
        }
      }
    }, this);

    return closestIntersection;
  };

  redrawTriangleLight(from, to) {

    const radius = Phaser.Math.difference(from.x, to.x)
    const thetaPlus  = Phaser.Math.degToRad(from.angle - 30);
    const thetaMinus = Phaser.Math.degToRad(from.angle + 30);

    const b = {
      x: radius * Math.cos(thetaPlus) + from.x,
      y: radius * Math.cos(thetaPlus) + from.y
    }

    const c = {
      x: radius * Math.cos(thetaMinus) + from.x,
      y: radius * Math.cos(thetaMinus) + from.y
    }

    console.log('b: ' + b.x + ', ' + b.y);
    console.log('c: ' + c.x + ', ' + c.y);

    this.map.bitmap.context.beginPath();
    this.map.bitmap.context.moveTo(from.x, from.y);
    this.map.bitmap.context.lineTo(b.y, b.x);
    this.map.bitmap.context.lineTo(c.y, c.x);
    this.map.bitmap.context.closePath();

    this.map.bitmap.context.fillStyle = "rgb(255, 255, 255)";
    this.map.bitmap.context.fill();
  }

  beamUpdate( player ) {
    var x     = player.x,
        y     = player.y,
        angle = player.torchAngle();

    this.redrawTriangleLight({ x, y, angle }, {
      x: x + 600,
      y: y + 600
    });
  }

  bubbleUpdate( player ) {
    var points = [];
    for(var a = 0; a < Math.PI * 2; a += Math.PI/360) {
      // Create a ray from the light to a point on the circle
      var ray = new Phaser.Line(player.x, player.y,
      player.x + Math.cos(a) * this.radius, player.y + Math.sin(a) * this.radius);

      // Check if the ray intersected any walls
      var intersect = this.getWallIntersection(ray);

      // Save the intersection or the end of the ray
      if (intersect) points.push(intersect);
      else points.push(ray.end);
    }

    this.map.bitmap.context.beginPath();
    this.map.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.map.bitmap.context.moveTo(points[0].x, points[0].y);
    for(var i = 0; i < points.length; i++) {
      this.map.bitmap.context.lineTo(points[i].x, points[i].y);
    }
    this.map.bitmap.context.closePath();
    this.map.bitmap.context.fill();

  }

  update( player ) {
    this.redrawShadow();
    if (!player.torchEnabled) { return; }

    if (player.torchBeam) { this.beamUpdate(player); }
    else { this.bubbleUpdate(player); }
  }
}

export default Torch;
