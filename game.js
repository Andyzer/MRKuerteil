document.addEventListener('DOMContentLoaded', () => {
    // Flap Control Component
    AFRAME.registerComponent('flap-control', {
      init: function () {
        this.velocity = 0; // Vertical velocity
        this.gravity = -0.01; // Simulated gravity
        this.el.addEventListener('click', () => {
          this.velocity = 0.1; // Move the object upward when clicked
        });
      },
      tick: function () {
        const position = this.el.object3D.position;
  
        // Apply gravity
        this.velocity += this.gravity;
        position.y += this.velocity;
  
        // Prevent the object from falling below ground level
        if (position.y < 1.6) {
          position.y = 1.6;
          this.velocity = 0;
        }
  
        this.el.object3D.position.set(position.x, position.y, position.z);
      }
    });
  
    // Attach the 'flap-control' to the player object
    const player = document.querySelector('#Player');
    if (player) {
      player.setAttribute('flap-control', '');
    } else {
      console.error("Element with id 'Player' not found in the DOM.");
    }
  
    // Interactive Cube Component
    AFRAME.registerComponent('interactive-cube', {
      init: function () {
        // Add a click event listener to the cube
        this.el.addEventListener('click', () => {
          // Change the cube's color when clicked
          this.el.setAttribute('color', this.getRandomColor());
  
          // Move the cube upward slightly
          const position = this.el.object3D.position;
          this.el.object3D.position.set(position.x, position.y + 0.2, position.z);
  
          console.log('Cube clicked!');
        });
      },
  
      getRandomColor: function () {
        // Generate a random color
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    });
  
    // AR/VR Mode Manager
    AFRAME.registerComponent('mode-manager', {
      init: function () {
        this.el.sceneEl.addEventListener('enter-vr', () => {
          const isAR = this.el.sceneEl.is('ar-mode');
  
          if (isAR) {
            console.log('Entered AR mode');
            document.querySelector('#ground').setAttribute('visible', false); // Hide VR ground
          } else {
            console.log('Entered VR mode');
            document.querySelector('#ground').setAttribute('visible', true); // Show VR ground
          }
        });
  
        this.el.sceneEl.addEventListener('exit-vr', () => {
          console.log('Exited XR mode');
          document.querySelector('#ground').setAttribute('visible', true); // Reset ground visibility
        });
      }
    });
  
    // Attach the 'mode-manager' to the scene
    const scene = document.querySelector('a-scene');
    if (scene) {
      scene.setAttribute('mode-manager', '');
    } else {
      console.error("Element 'a-scene' not found in the DOM.");
    }
  });
  