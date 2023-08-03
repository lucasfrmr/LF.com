    function createModal() {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.textContent = 'Drag me!';
  
      document.body.appendChild(modal);
  
      modal.addEventListener('mousedown', function(event) {
        const initialX = event.clientX;
        const initialY = event.clientY;
  
        modal.style.position = 'absolute';
  
        document.addEventListener('mousemove', function(event) {
          const newX = event.clientX - initialX;
          const newY = event.clientY - initialY;
  
          modal.style.left = newX + 'px';
          modal.style.top = newY + 'px';
        });
      });
  
      document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove');
      });
    }
  
    const button = document.createElement('button');
    button.textContent = 'Create Modal';
    button.addEventListener('click', createModal);
  
    document.body.appendChild(button);
console.log("tester.js loaded");