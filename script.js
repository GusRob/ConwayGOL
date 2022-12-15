

grid = [[], [], [], [], [], [], [], [], [], []];
for(i = 0; i < 10; i++){
  for(j = 0; j < 20; j++){
    grid[i][j] = 0;
  }
}

document.body.onload = populateGrid;

running = false;
interval = 0;

function populateGrid() {
  grid_div = document.getElementById("grid");
  lastElem = document.getElementById("empty");
  for(i = 0; i < 10; i++){
    newRow = document.createElement("div");
    for(j = 0; j < 20; j++){
      newCell = document.createElement("div");
      newCell.classList.add("gridCell");
      newCell.classList.add("cellDead");
      newCell.setAttribute("onclick","toggleAlive(this);");
      newCell.id = i + "," + j;
      newRow.appendChild(newCell);
    }
    newRow.classList.add("gridRow");
    grid_div.appendChild(newRow);
  }
}

function updateGrid(){
  for(i = 0; i < 10; i++){
    for(j = 0; j < 20; j++){
      cell = document.getElementById(i + "," + j);
      if(grid[i][j] == 0){
        cell.classList.remove("cellAlive");
        cell.classList.add("cellDead");
      } else {
        cell.classList.remove("cellDead");
        cell.classList.add("cellAlive");
      }
    }
  }

}

function toggleAlive(elem){
  i = elem.id.split(",")[0];
  j = elem.id.split(",")[1];
  if(elem.classList.contains("cellDead")){
    elem.classList.remove("cellDead");
    elem.classList.add("cellAlive");
    grid[i][j] = 1;
  } else {
    elem.classList.remove("cellAlive");
    elem.classList.add("cellDead");
    grid[i][j] = 0;
  }
}

function runSim(){
  if(!running){
    stepGrid();
    interval = setInterval(stepGrid, 1000);
    running = true;
  } else {
    clearTimeout(interval);
    running = false;
  }
}

function stepGrid(){
  new_grid = [[], [], [], [], [], [], [], [], [], []];
  for(i = 0; i < 10; i++){
    for(j = 0; j < 20; j++){
      sum = getSurroundingSum(i, j);
      if(grid[i][j] != 0 && (sum == 2 || sum == 3)){
        new_grid[i][j] = 1;
      } else if(grid[i][j] == 0 && (sum == 3)){
        new_grid[i][j] = 1;
      } else {
        new_grid[i][j] = 0;
      }
    }
  }
  for(i = 0; i < 10; i++){
    for(j = 0; j < 20; j++){
      grid[i][j] = new_grid[i][j];
    }
  }
  updateGrid();
}

function getSurroundingSum(x, y){
  sum = 0;
  for(n = -1; n < 2; n++){
    for(m = -1; m < 2; m++){
      if(!(n == 0 && m == 0)){
        a = x+n
        b = y+m
        if(a < 0){a = 9;}
        if(b < 0){b = 19;}
        if(a > 9){a = 0;}
        if(b > 19){b = 0;}
        sum += grid[a][b];
      }
    }
  }
  return sum;
}
