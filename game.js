document.addEventListener('DOMContentLoaded', () => {
    const gazeTime = 2000; // Time (ms) to hold gaze for interaction
  
    // Component to handle gaze interaction
    AFRAME.registerComponent('gaze-interactable', {
      schema: {
        active: { type: 'boolean', default: false },
      },
      init: function () {
        this.gazeStart = null;
        this.interactionDone = false;
      },
      tick: function (time) {
        const camera = document.querySelector('[camera]');
        const intersectedEls = camera.components.raycaster.intersectedEls;
  
        if (intersectedEls && intersectedEls[0] === this.el) {
          // Reticle is gazing at this element
          if (!this.gazeStart) {
            this.gazeStart = time; // Start gaze timer
          } else if (time - this.gazeStart > gazeTime && !this.interactionDone) {
            this.interactionDone = true;
            this.el.setAttribute('color', '#FFD700'); // Change color to gold on interaction
            console.log(`Piece ${this.el.id} interacted!`);
          }
        } else {
          // Reticle moved away, reset timer
          this.gazeStart = null;
          this.interactionDone = false;
        }
      },
    });
  
    // Add gaze-interactable to all puzzle pieces
    const puzzlePieces = document.querySelectorAll('a-box');
    puzzlePieces.forEach((piece) => {
      piece.setAttribute('gaze-interactable', '');
    });
  });
  