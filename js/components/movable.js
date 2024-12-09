AFRAME.registerComponent('movable', {
  schema: {
    gridId: { type: 'string', default: 'grid' }, // ID of the grid to snap to
  },
  init: function () {
    this.reticle = document.querySelector('#reticle');
    this.grid = document.querySelector(`#${this.data.gridId}`).components['grid-manager'];
    this.isHeld = false;
    this.startPosition = this.el.object3D.position.clone();

    // Listen for the reticle-complete event
    this.reticle.addEventListener('reticle-complete', (event) => {
      if (event.detail.target === this.el) {
        this.isHeld ? this.drop() : this.pickUp();
      }
    });
  },
  pickUp: function () {
    this.isHeld = true;
    console.log(`Picked up ${this.el.id}`);
  },
  drop: function () {
    this.isHeld = false;
    console.log(`Dropped ${this.el.id}`);
    this.snapToGrid();
  },
  snapToGrid: function () {
    const piecePosition = this.el.object3D.position;
    const closestGridPosition = this.grid.getMatchingCell(this.el.id, piecePosition);

    if (closestGridPosition) {
      this.el.object3D.position.copy(closestGridPosition);
      console.log(`Snapped ${this.el.id} to grid.`);
    } else {
      this.el.object3D.position.copy(this.startPosition);
      console.log(`${this.el.id} returned to start position.`);
    }
  },
  tick: function () {
    if (this.isHeld) {
      const camera = document.querySelector('[camera]');
      const direction = new THREE.Vector3();
      camera.object3D.getWorldDirection(direction);
      const cameraPosition = camera.object3D.position;
      this.el.object3D.position.copy(cameraPosition.clone().add(direction.multiplyScalar(2)));
    }
  },
});
