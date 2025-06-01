let board = Array(25).fill(0);
const grid = document.getElementById("grid");

function resetGrid() {
  console.log("resetGrid() called");
  grid.innerHTML = "";
  board = Array(25).fill(0);
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.onclick = () => toggleTile(i, tile);
    grid.appendChild(tile);
  }
  console.log("✅ Grid reset: 25 tiles created");
}

function toggleTile(index, tile) {
  board[index] = board[index] ? 0 : 1;
  tile.classList.toggle("clicked");
}

async function predict() {
  console.log("🟢 predict() called");
  console.log("Current board array: ", board);

  try {
    const input = tf.tensor([board]);
    console.log("Tensor created:", input);

    console.log("Attempting to load model.json from the server…");
    const model = await tf.loadLayersModel("model.json");

    const prediction = model.predict(input).dataSync();
    const tiles = document.getElementsByClassName("tile");

    for (let i = 0; i < 25; i++) {
      if (prediction[i] > 0.5) tiles[i].classList.add("safe");
      else tiles[i].classList.add("mine");
    }

    console.log("✅ Prediction complete");
  } catch (e) {
    console.error("❌ Prediction failed with error: ", e);
  }
}

resetGrid();
