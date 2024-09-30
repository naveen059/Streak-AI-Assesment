const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

function dfs(grid, start, end, visited) {
  const [x, y] = start;
  if (x < 0 || x >= 20 || y < 0 || y >= 20 || visited[x][y]) {
    return null;
  }
  
  visited[x][y] = true;
  
  if (x === end[0] && y === end[1]) {
    return [{ row: x, column: y }];
  }
  
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  for (const [dx, dy] of directions) {
    const newPath = dfs(grid, [x + dx, y + dy], end, visited);
    if (newPath) {
      return [{ row: x, column: y }, ...newPath];
    }
  }
  
  return null;
}

function findPath(start, end) {
  const grid = Array(20).fill().map(() => Array(20).fill(0));
  const visited = Array(20).fill().map(() => Array(20).fill(false));
  
  return dfs(grid, start, end, visited) || [];
}

app.get("/find-path/x0=:x0&y0=:y0&x1=:x1&y1=:y1", (req, res) => {
  const { x0, y0, x1, y1 } = req.params;
  const start = [parseInt(x0), parseInt(y0)];
  const end = [parseInt(x1), parseInt(y1)];
  
  const path = findPath(start, end);
  res.json({ path });
});

app.listen(port, () => {
  console.log("Server is running at port: " + port);
});