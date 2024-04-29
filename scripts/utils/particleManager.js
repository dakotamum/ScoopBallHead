// Manages all the particles for the game
MyGame.particleManager = (function (spec) {
  "use-strict";

  function rgbToObject(rgbString) {
    const matches = rgbString.match(/rgb\((\d+),(\d+),(\d+)\)/);
    if (!matches) {
        return null; // Return null if the format doesn't match
    }
    return {
        r: parseInt(matches[1], 10),
        g: parseInt(matches[2], 10),
        b: parseInt(matches[3], 10)
    };
}

  let particle = function (particleSpec) {
    let startColor = { r: 255, g: 255, b: 255 }; // color a particle starts with
    let endColor = { r: 255, g: 255, b: 255 }; // color a particle will end with
    if (particleSpec.color)
    {
      startColor = rgbToObject(particleSpec.color);
      endColor = rgbToObject(particleSpec.color);
    }
    // function to interpolate between two colors
    function interpolateColor(color1, color2, factor) {
      if (factor > 1) factor = 1;
      else if (factor < 0) factor = 0;
      let result = { r: 0, g: 0, b: 0 };
      result.r = Math.round(color1.r + factor * (color2.r - color1.r));
      result.g = Math.round(color1.g + factor * (color2.g - color1.g));
      result.b = Math.round(color1.b + factor * (color2.b - color1.b));
      return result;
    }

    let that = {};
    that.center = { x: particleSpec.center.x, y: particleSpec.center.y };
    that.radius = particleSpec.radius;
    that.speed = particleSpec.speed;
    that.angle = particleSpec.angle;
    that.originalLifetime = particleSpec.lifetime;
    that.lifetime = particleSpec.lifetime;
    that.color = { r: startColor.r, g: startColor.g, b: startColor.b };
    that.colorString = `rgb(${that.color.r}, ${that.color.g}, ${that.color.b})`;

    that.update = function (elapsedTime) {
      that.center.x += that.speed * Math.cos(that.angle) * elapsedTime;
      that.center.y += that.speed * Math.sin(that.angle) * elapsedTime;
      that.radius += 0.00002 * elapsedTime;
      that.lifetime -= elapsedTime;
      that.color = interpolateColor(
        startColor,
        endColor,
        // (that.originalLifetime - that.lifetime) / that.originalLifetime
        1
      );
      that.colorString = `rgb(${that.color.r}, ${that.color.g}, ${
        that.color.b
      // }, ${that.lifetime / that.originalLifetime})`;
      }, ${1})`;
    };

    return that;
  };

  let particles = [];
  let particleRate = 10;
  let currentParticleInterval = 10;

  // update state of particles
  function update(elapsedTime) {
    currentParticleInterval = Math.min(
      currentParticleInterval + elapsedTime,
      particleRate
    );
    particles.forEach((particle) => particle.update(elapsedTime));
    particles = particles.filter((particle) => particle.lifetime > 0);
  }

  // add a particle to the particle system
  function addParticle(spec) {
    if (currentParticleInterval < particleRate) return;
    let radius = Math.max(Random.nextGaussian(0.002, 0.001), 0.001);
    particles.push(
      particle({
        center: {
          x:
            spec.center.x +
            (spec.size.width / 2) * Math.sin(spec.angle + Math.PI),
          y: spec.center.y + (spec.size.width / 2) * Math.cos(spec.angle),
        },
        angle: spec.angle + Math.PI / 2 + Random.nextGaussian(0, Math.PI / 8),
        radius: radius,
        speed: 0.00025,
        lifetime: Math.max(Random.nextGaussian(600, 100), 100),
      })
    );
    currentParticleInterval = 0;
  }

  function makeExplodeParticles(spec) {
    for (let i = 0; i < 25; i++) {
      let radius = Math.max(Random.nextGaussian(0.02, 0.01), 0.01);
      particles.push(
        particle({
          center: { x: spec.center.x, y: spec.center.y },
          angle: Random.nextGaussian(0, Math.PI * 2),
          radius: radius,
          speed: 0.00025,
          color: spec.fill,
          lifetime: Math.max(Random.nextGaussian(1000, 200), 100),
        })
      );
    }
  }
  
  function makeNomNomParticles(spec) {
    for (let i = 0; i < 25; i++) {
      let radius = Math.max(Random.nextGaussian(0.0002, 0.0001), 0.0001);
      particles.push(
        particle({
          center: { x: spec.slinkyDink.center.x, y: spec.slinkyDink.center.y },
          angle: Random.nextGaussian(0, Math.PI * 2),
          radius: radius,
          speed: 0.000075,
          color: spec.fill,
          lifetime: Math.max(Random.nextGaussian(200, 100), 100),
        })
      );
    }
  }

  // reset particles
  function reset() {
    particles = [];
  }

  let api = {
    update: update,
    addParticle: addParticle,
    makeExplodeParticles: makeExplodeParticles,
    makeNomNomParticles: makeNomNomParticles,
    reset: reset,
    get particles() {
      return particles;
    },
  };

  return api;
})();
