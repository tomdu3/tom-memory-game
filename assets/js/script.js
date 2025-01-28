// Define constants width and height of the grid
const gridWidth = 3;
const gridHeight = 5; 

function makeGrid(width, height) {
    // check if the grid is valid
    if (width < 1 || height < 1) {
        console.log('Invalid grid size');
        return null;
    } else if (width > 10 || height > 10 || width * height > 30) {
        console.log('Grid size too large');
        return null;
    } else if (width * height % 2 !== 0) {
        console.log('Grid size must be even');
        return null;
    }

  /* 
  <div class="container">
            <div class="card">
                <div class="front">
                    <img src="https://picsum.photos/300/300" alt="Random Pexels image">
                </div>
                <div class="back">
                    <img src="./assets/img/back.jpg" width="200" height="300" alt="Random Pexels image">
                </div>
            </div>
        </div>
  */
    // grid should have  4 rows and 4 columns
    const grid = document.querySelector('#board');
    for (let i = 0; i < width*height; i++) {
        const container = document.createElement('div');
        container.classList.add('container');
        container.id = (i < 10 ? '0' : '') + i;
        grid.appendChild(container);
        const card = document.createElement('div');
        card.classList.add('card');
        container.appendChild(card);
        const front = document.createElement('div');
        front.classList.add('front');
        card.appendChild(front);
        const back = document.createElement('div');
        back.classList.add('back');
        card.appendChild(back);
    }
    return grid;
}

const grid = makeGrid(gridWidth, gridHeight);
console.log(`${grid ? 'Grid created' : 'Grid not created'}`);
