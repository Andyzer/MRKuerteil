// Existing Motion Tracker
AFRAME.registerComponent('motion-tracker', {
    init: function () {
      this.rotation = { alpha: 0, beta: 0, gamma: 0 };
      window.addEventListener('deviceorientation', (event) => {
        this.rotation.alpha = event.alpha; // Yaw
        this.rotation.beta = event.beta;   // Pitch
        this.rotation.gamma = event.gamma; // Roll
      });
    },
    tick: function () {
      const obj = this.el.object3D.position;
  
      // Use device orientation to move the object
      obj.x = this.rotation.gamma / 50; // Left/Right tilt
      obj.y = 1.6 + this.rotation.beta / 50; // Up/Down tilt
  
      this.el.object3D.position.set(obj.x, obj.y, obj.z);
    }
  });
  
  // AR/VR Mode Detection (Add This)
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
        document.querySelector('#ground').setAttribute('visible', true); // Default ground visibility
      });
    }
  });
  
  // Attach mode manager to the scene
  document.querySelector('a-scene').setAttribute('mode-manager', '');
  