// Define constants width and height of the grid
const gridWidth = 4;
const gridHeight = 4;
let grid = null;// initialize the grid
let randomArray = null;
let cardWidth = 150;
let cardHeight = 150;

// Set CSS variables for card width and height
document.documentElement.style.setProperty("--grid-width", gridWidth);
document.documentElement.style.setProperty("--grid-height", gridHeight);

function makeGrid(width, height) {
  // check if the grid is valid
  if (width < 1 || height < 1) {
    console.log("Invalid grid size");
    return null;
  } else if (width > 10 || height > 10 || width * height > 30) {
    console.log("Grid size too large");
    return null;
  } else if ((width * height) % 2 !== 0) {
    console.log("Grid size must be even");
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

  // get the grid element
  const grid = document.querySelector("#board");

  // go through the grid and create the cards
  for (let i = 0; i < width * height; i++) {
    const container = document.createElement("div");
    container.classList.add("container");
    container.id = (i < 10 ? "0" : "") + i;
    grid.appendChild(container);
    const card = document.createElement("div");
    card.classList.add("card");
    container.appendChild(card);
    const front = document.createElement("div");
    front.classList.add("front");
    card.appendChild(front);
    const back = document.createElement("div");
    back.classList.add("back");
    card.appendChild(back);
  }
  return grid;
}

function generateImageCard(idNumber) {
  // generate a random image
  const image = document.createElement("img");
  image.src = `./assets/img/memory/${(idNumber < 9 ? "0" : "") + (idNumber +1)}.webp`;
  image.alt = "Memory Card image";
  return image;
}

function generateRandomArray(width, height) {
  // generate a random array of numbers
  const randomArray = [];
  for (let i = 0; i < width * height / 2; i++) {
    randomArray.push(i);
    randomArray.push(i);
  }
  // shuffle the array
  console.log(randomArray);
  for (let i = randomArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
  }
  return randomArray;
}

function displayGrid(grid, randomArray) {
  // display the grid
  
  const backImgSrc = "./assets/img/back.jpg";
  const backImgAlt = "Memory back image";
  for (let i = 0; i < grid.children.length; i++) {
    const container = grid.children[i];
    const card = container.children[0];
    const front = card.children[0];
    const back = card.children[1];
    front.appendChild(generateImageCard(randomArray[i]));
    const backImg = document.createElement("img");
    backImg.src = backImgSrc;
    backImg.alt = backImgAlt;
    back.appendChild(backImg);
  }    
}

// call the function to get grid
grid = makeGrid(gridWidth, gridHeight);
console.log(`${grid ? "Grid created" : "Grid not created"}`);
if (grid) {
    randomArray = generateRandomArray(gridWidth, gridHeight);
    console.table(randomArray);
    const img = generateImageCard(randomArray[0]);
    console.log(img);
    displayGrid(grid, randomArray);
}