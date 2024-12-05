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
    document.querySelector('#player').setAttribute('flap-control', '');
  
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
    document.querySelector('a-scene').setAttribute('mode-manager', '');
  });
  