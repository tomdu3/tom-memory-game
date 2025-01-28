// Define constants width and height of the grid
const gridWidth = 4;
const gridHeight = 4;
let grid = null; // Initialize the grid
let randomArray = null;
let prevCard = null;

// Set CSS variables for card width and height
document.documentElement.style.setProperty("--grid-width", gridWidth);
document.documentElement.style.setProperty("--grid-height", gridHeight);

// Update year element
const yearElement = document.getElementById("year");
yearElement.textContent = new Date().getFullYear();

// restart button
const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", () => {
    location.reload();
});

function makeGrid(width, height) {
  // Check if the grid is valid
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

  // Get the grid element
  const grid = document.querySelector("#board");

  // Create the cards
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
  // Generate a random image
  const image = document.createElement("img");
  image.src = `./assets/img/memory/${(idNumber < 9 ? "0" : "") + (idNumber + 1)}.webp`;
  image.alt = "Memory Card image";
  return image;
}

function generateRandomArray(width, height) {
  // Generate a random array of numbers
  const randomArray = [];
  for (let i = 0; i < (width * height) / 2; i++) {
    randomArray.push(i);
    randomArray.push(i);
  }

  // Shuffle the array
  for (let i = randomArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
  }
  return randomArray;
}

function displayGrid(grid, randomArray) {
  // Display the grid
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

// Initialize the game
grid = makeGrid(gridWidth, gridHeight);
console.log(`${grid ? "Grid created" : "Grid not created"}`);

if (grid) {
  randomArray = generateRandomArray(gridWidth, gridHeight);
  console.table(randomArray);
  displayGrid(grid, randomArray);

  let countClick = 0;
  let isChecking = false; // Flag to prevent multiple clicks during match-checking

  // Add click event listeners to all cards
  for (let i = 0; i < grid.children.length; i++) {
    const container = grid.children[i];
    container.addEventListener("click", () => {
      // Prevent clicking during match-checking
      if (isChecking) return;

      // Ignore clicks on already flipped cards
      if (container.classList.contains("flip")) return;

      // Flip the clicked card
      container.classList.add("flip");

      if (countClick === 0) {
        // First card flipped
        prevCard = container;
        countClick++;
      } else if (countClick === 1) {
        // Second card flipped
        countClick++;
        isChecking = true; // Block further clicks until match check is complete

        const prevSrc = prevCard.querySelector(".front img").src;
        const currentSrc = container.querySelector(".front img").src;

        if (prevSrc === currentSrc) {
          // Cards match
          console.log("Match!");
          prevCard = null;
          countClick = 0;
          isChecking = false; // Allow further clicks
        } else {
          // Cards do not match
          console.log("No Match!");
          setTimeout(() => {
            prevCard.classList.remove("flip");
            container.classList.remove("flip");
            prevCard = null;
            countClick = 0;
            isChecking = false; // Allow further clicks
          }, 1000);
        }
      }
    });
  }
}
