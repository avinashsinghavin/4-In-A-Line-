var grid = [];
var row = 6, col = 7;
var UNVISITED_COLOR = 'N';
var YELLOW_COLOR = 'Y';
var RED_COLOR = 'R';
var turn = 1;
var player = true;

const { constants } = require('buffer');
const express = require('express');
const app = express();
//adding static file
var path = require('path')
//app.use(serveStatic(path.join(__dirname, 'public')));
app.use("/", express.static(path.join(__dirname,"public")));
// parse application /x-www-form-urlencoded
//app.use(bodyParser.urlencoded({extended:false}))
app.get('/',(req, res) => {
  initGrid();
  showGrid();
  res.sendFile(__dirname + "/"+"index.html");
});


app.get('/move/:id', (req, resp) => {
  indexval = req.params.id;
  startGame(indexval, resp);
  var o = {} 
  var key = 'respond';
  o[key] = []; 


  var data1 = {
      response: 'success',
      data: req.params.id
  };
    o[key].push(data1);
    data = JSON.stringify(o);
    resp.writeHead(200);
    resp.end(data, 'utf8');
  

});

app.get('/clear', (req, resp) => {
  resp.writeHead(200);
  resp.end('cleared', 'utf8');
  grid = [];
  turn = 1;
});
// ================== Fuunction ===============
function checkConsecutiveFourColors(r, c){
  var fourcolor = '';
  var validyellow = 'YYYY';
  var validred = 'RRRR';
  // Case 1 up
  for(var i = r; i > Math.max(-1, r-4); i--) {
    fourcolor += grid[i][c];
  }
  if(fourcolor === validred || fourcolor === validyellow)
    return true;
  //  case 2 Digonally Up
  fourcolor = '';
  for(var i = 0; i < Math.min(r+1, col-c, 4); i++){
    fourcolor += grid[r-i][c+i];
  }
  if(fourcolor === validred || fourcolor === validyellow)
    return true;

  //  case 3 Right 
  fourcolor = '';
  for(var i = c; i < Math.min(col, c + 4); i++){
    fourcolor += grid[r][i];
  }
  if(fourcolor === validred || fourcolor === validyellow)
    return true;
  //  case 4 Digonal Down 
  fourcolor = '';
  for(var i = 0; i < Math.min(row-r, col-c, 4); i++){
    fourcolor += grid[r+i][c+i];
  }
  if(fourcolor === validred || fourcolor === validyellow)
    return true;

  //  case 5 Down 
  fourcolor = '';
  for(var i = r; i < Math.min(row, r+4); i++){
    fourcolor += grid[i][c];
  }
  if(fourcolor === validred || fourcolor === validyellow)
    return true;
  return false;
}

function checkWinner(){
  var foundcolor = 'not found';
  for(var i = 0; i < row; i++) {
    for(var j = 0; j < col; j++){
      if(checkConsecutiveFourColors(i,j)){
        foundcolor = grid[i][j];
        break;
      }
    }
    if(foundcolor != 'not found')
      break;
  }
  return foundcolor;
}

function initGrid(){
  for(var i = 0; i < row; i++) {
    var r = [];
    for(var j = 0; j < col; j++)
      r.push(UNVISITED_COLOR);
    grid.push(r);
  }
}

function showGrid() {
  for(var i = 0; i < row; i++)
      console.log(grid[i]);
}

function startGame(col, resp) {
  showGrid();
  if(checkWinner() === 'not found' && turn <= 42){
    if(!isValidCol(col-1)){
      console.log('Invalid');
      return;
    }
    insertAtCol(col-1);
    turn = turn+1;
    showGrid();
  }
  var winner = checkWinner();
  console.log(winner);
  if(winner === 'Y') {
    var o = {} 
    var key = 'respond';
    o[key] = []; 
      var data1 = {
        response: 'success',
        data: "Yellow Won"
    };

    o[key].push(data1);
    data = JSON.stringify(o);
    resp.writeHead(200);
    resp.end(data, 'utf8');
  }
  else if(winner === 'R'){
    var o = {} 
    var key = 'respond';
    o[key] = []; 
      var data1 = {
        response: 'success',
        data: "Red Won"
    };
    o[key].push(data1);
    data = JSON.stringify(o);
    resp.writeHead(200);
    resp.end(data, 'utf8');
  }
  else if(turn === 42) {
    var o = {} 
    var key = 'respond';
    o[key] = []; 
      var data1 = {
        response: 'success',
        data: "Game Over"
    };
    o[key].push(data1);
    data = JSON.stringify(o);
    resp.writeHead(200);
    resp.end(data, 'utf8');
  };
}

function isEven(val) {
  return val % 2 == 0;
}

function isValidCol(colnum) {
  if(0 <= colnum && colnum < col && grid[0][colnum] == UNVISITED_COLOR) 
    return true;
  
  else return false;
} 

function insertAtCol(colnum) {
  console.log('col '+colnum);
  var val = '';
  if(isEven(turn)) {
    val = RED_COLOR;
  }
  else {
    val = YELLOW_COLOR;
  }
  for(var i = row-1; i > -1 ; i--){
    if(grid[i][colnum] === UNVISITED_COLOR){
      grid[i][colnum] = val;
      return;
    }
  }
}

//=============================================


const port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log("Listening to port: "+port);
});