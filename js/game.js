document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#grid').components['grid-manager'];

  const checkPuzzleCompletion = () => {
    if (grid.isPuzzleComplete()) {
      console.log('Puzzle Completed!');
      alert('Congratulations, you completed the puzzle!');
    }
  };

  // Listen for drop events to check puzzle completion
  const pieces = document.querySelectorAll('[movable]');
  pieces.forEach((piece) => {
    piece.addEventListener('snap-complete', () => {
      checkPuzzleCompletion();
    });
  });
});
