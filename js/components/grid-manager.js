AFRAME.registerComponent('grid-manager', {
  init: function () {
    this.cells = Array.from(this.el.children);
    this.cells.forEach((cell, index) => {
      cell.isOccupied = false; // Mark if a cell is occupied
      cell.matchingPiece = `piece${index + 1}`; // Assign matching piece to each cell
    });
  },
  getMatchingCell: function (pieceId, position, threshold = 1) {
    let closestCell = null;
    let closestDistance = Infinity;

    this.cells.forEach((cell) => {
      if (cell.isOccupied || cell.matchingPiece !== pieceId) return; // Skip occupied or mismatched cells

      const cellPosition = cell.object3D.position;
      const distance = position.distanceTo(cellPosition);

      if (distance < threshold && distance < closestDistance) {
        closestDistance = distance;
        closestCell = cell;
      }
    });

    if (closestCell) {
      closestCell.isOccupied = true; // Mark cell as occupied
      return closestCell.object3D.position;
    }

    return null;
  },
  isPuzzleComplete: function () {
    return this.cells.every((cell) => cell.isOccupied && cell.matchingPiece === cell.occupyingPiece);
  },
});
