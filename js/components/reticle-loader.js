AFRAME.registerComponent('reticle-loader', {
  schema: {
    loadTime: { type: 'number', default: 2000 }, // Time (ms) to complete loading
  },
  init: function () {
    this.loadStart = null;
    this.loading = false;
    this.target = null; // Track the currently hovered object
  },
  startLoading: function (target) {
    this.loadStart = performance.now();
    this.loading = true;
    this.target = target; // Set the target object

    this.el.setAttribute('geometry', {
      primitive: 'ring',
      radiusInner: 0.02,
      radiusOuter: 0.04,
      thetaStart: 0,
      thetaLength: 0,
    });
  },
  stopLoading: function () {
    this.loadStart = null;
    this.loading = false;
    this.target = null;

    this.el.setAttribute('geometry', {
      primitive: 'ring',
      radiusInner: 0.02,
      radiusOuter: 0.04,
      thetaStart: 0,
      thetaLength: 360,
    });
  },
  tick: function (time) {
    if (this.loading && this.loadStart) {
      const elapsed = time - this.loadStart;
      const progress = elapsed / this.data.loadTime;

      this.el.setAttribute('geometry', {
        primitive: 'ring',
        radiusInner: 0.02,
        radiusOuter: 0.04,
        thetaStart: 0,
        thetaLength: progress * 360,
      });

      if (progress >= 1) {
        this.loading = false;
        this.el.emit('reticle-complete', { target: this.target }); // Emit the event with the target
      }
    }
  },
});
