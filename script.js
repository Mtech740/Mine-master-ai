let board = Array(25).fill(0);
const grid = document.getElementById("grid");

function resetGrid() {
  grid.innerHTML = "";
  board = Array(25).fill(0);
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.onclick = () => toggleTile(i, tile);
    grid.appendChild(tile);
  }
}

function toggleTile(index, tile) {
  board[index] = board[index] ? 0 : 1;
  tile.classList.toggle("clicked");
}

async function predict() {
  const input = tf.tensor([board]);
  const model = await tf.loadLayersModel("model.json");
  const prediction = model.predict(input).dataSync();
  const tiles = document.getElementsByClassName("tile");
  for (let i = 0; i < 25; i++) {
    if (prediction[i] > 0.5) {
      tiles[i].classList.add("safe");
    } else {
      tiles[i].classList.add("mine");
    }
  }
}

resetGrid();
