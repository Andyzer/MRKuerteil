AFRAME.registerComponent('movable', {
    schema: {
      gridId: { type: 'string', default: 'grid' }, // ID of the grid to snap to
    },
    init: function () {
      this.reticle = document.querySelector('#reticle');
      this.grid = document.querySelector(`#${this.data.gridId}`).components['grid-manager'];
      this.isHeld = false;
      this.startPosition = this.el.object3D.position.clone();
  
      // Listen for reticle interaction
      this.reticle.addEventListener('reticle-complete', () => {
        if (this.el === this.reticle.target) {
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
      const closestGridPosition = this.grid.getClosestGridPosition(piecePosition);
  
      if (closestGridPosition) {
        this.el.object3D.position.copy(closestGridPosition);
        console.log(`Snapped ${this.el.id} to grid at ${closestGridPosition.x}, ${closestGridPosition.y}`);
      } else {
        // Return to the start position if no valid grid cell
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
  
  AFRAME.registerComponent('grid-manager', {
    init: function () {
      this.cells = Array.from(this.el.children);
      this.cells.forEach((cell) => (cell.isOccupied = false)); // Track whether a cell is occupied
    },
    getClosestGridPosition: function (position, threshold = 1) {
      let closestCell = null;
      let closestDistance = Infinity;
  
      this.cells.forEach((cell) => {
        if (cell.isOccupied) return; // Skip occupied cells
  
        const cellPosition = cell.object3D.position;
        const distance = position.distanceTo(cellPosition);
  
        if (distance < threshold && distance < closestDistance) {
          closestDistance = distance;
          closestCell = cell;
        }
      });
  
      if (closestCell) {
        closestCell.isOccupied = true; // Mark the closest cell as occupied
        return closestCell.object3D.position;
      }
  
      return null;
    },
  });
  