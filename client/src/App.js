import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [path, setPath] = useState([]);

  const handleClick = (row, column) => {
    if (selectedTiles.length < 2) {
      setSelectedTiles([...selectedTiles, { row, column }]);
    }
  };

  useEffect(() => {
    if (selectedTiles.length === 2) {
      const [start, end] = selectedTiles;
      axios.get(`http://localhost:5000/find-path/x0=${start.row}&y0=${start.column}&x1=${end.row}&y1=${end.column}`)
        .then(res => {
          setPath(res.data.path);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedTiles]);

  const getTileStyle = (row, column) => {
    if (selectedTiles[0] && selectedTiles[0].row === row && selectedTiles[0].column === column) {
      return { background: 'green' };
    }
    if (selectedTiles[1] && selectedTiles[1].row === row && selectedTiles[1].column === column) {
      return { background: 'red' };
    }
    if (path.some(tile => tile.row === row && tile.column === column)) {
      return { background: 'blue' };
    }
    return { background: 'grey' };
  };

  const grid = [];
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      grid.push(
        <span
          key={`${i}-${j}`}
          className="p-5 mx-1 mt-3"
          style={{ ...getTileStyle(i, j), width: "30px", height: "30px", display: "inline-block" }}
          onClick={() => handleClick(i, j)}
          data-row={i}
          data-column={j}
        ></span>
      );
    }
  }

  return (
    <div className="App">
      <div className="container mt-5">
        {grid}
      </div>
    </div>
  );
}

export default App;