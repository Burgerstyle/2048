const elFields = document.getElementsByClassName('field');

let cont = 0; 
let matrix = [[0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0]]; 
              
for(let t = 0; t < 4; t++){
  for(let i = 0; i < 4; i++){
    matrix[t][i] = elFields[cont]; 
    matrix[t][i].value = 0; 
    cont++; 
    matrix[t][i].textContent = 0; 
  }
}

function isGameOverCheck(matrix) {
  let gameOver = true;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (matrix[y][x].value === 0) {
        gameOver = false;                   //falls ein Wert gleich null ist, ist nicht gameover.
      }
      else {
        if (x < 3) {                        //zwei gleiche zahlen nebeneinander?
          if (matrix[y][x].value === matrix[y][x + 1].value) {
            gameOver = false;
          } 
        }
        if (y < 3) {
          if (matrix[y][x].value === matrix[y + 1][x].value) {
            gameOver = false;
          }
        }
      }
    }
  } 
    
  if (gameOver) {
    document.removeEventListener("keydown", (event));
    alert("gemover");
  }
  return gameOver;
}
  
function randomSpawn(matrix) {
  let positionsYX = [];

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (matrix[y][x].value === 0) {
        positionsYX.push([y, x]);             //mögliche positionen kommen in eine Liste.
      }
    }
  }
    
  let amountYX = parseInt(Math.floor(Math.random() * positionsYX.length));
  let numbers = [2,2,2,2,4];                                                  //wahrscheinlichkeit für 2 / 4
  let number = parseInt(Math.floor(Math.random() * numbers.length));
     
  matrix[positionsYX[amountYX][0]][positionsYX[amountYX][1]].value = numbers[number];    
    
  refresh(matrix);
  return matrix;
}
  
randomSpawn(matrix);
randomSpawn(matrix);
  
  document.addEventListener("keydown", (event) => {      //wenn eine Pfeiltaste gedrückt wird, wird folgendes ausgelöst.
    if (event.key === "ArrowUp") {  
      if (checkIfMovePossible('up',matrix)) {            //lässt eine Fuktion nur dann aktiv werden, wenn eine Bewegung der Zahlen überhaupt möglich ist. (beeinflusst grundsätzlich nur den den randomspawn.)
        moveUp(matrix);     
      }
    } 
    else if (event.key === "ArrowDown") {
      if (checkIfMovePossible('down',matrix)) {
        moveDown(matrix);
      }
    } 
    else if (event.key === "ArrowLeft") {
      if (checkIfMovePossible('left',matrix)) {
        moveLeft(matrix); 
      }
    } 
    else if (event.key === "ArrowRight") {
      if (checkIfMovePossible('right',matrix)) {
        moveRight(matrix); 
      }
    }
  });

  function moveUp(matrix) {              //Nun kommen die vier funktionen, für die jeweiligen Pfeiltasten (aktionen im Spiel). 
    for (let y = 0; y < 4; y++) {         //Jede Funktion ist gleich aufgebaut, jedoch beginnen manche vorne, und manche am Ende der Matrix. +/- oder die y/x werte sind auch jeweils verändert. 
      for (let x = 0; x < 4; x++) {
        if (y === 0) {                                          //oberste Zeile
          if (matrix[y][x].value === matrix[y + 1][x].value) {  //gleiche Werte nebeneinander werden addiert (da sich die Zahlen in dieser Funktion nach oben bewegen sollten, oder es zumindest versuchen, vergleiche ich nur die y Werte.)
            matrix[y][x].value *= 2;
            matrix[y + 1][x].value = 0;
          }
        }
        
        if (y === 1) {                                            //2. Zeile
          if (matrix[y][x].value === matrix[y + 1][x].value) {    
            matrix[y][x].value *= 2;
            matrix[y + 1][x].value = 0;
          }
          if (matrix[y - 1][x].value === 0) {                       //eine Zeile zurück schauen
            matrix[y - 1][x].value = matrix[y][x].value;
            matrix[y][x].value = 0;
          }
        }
        
        if (y === 2) {                                            //3. Zeile
          if (matrix[y][x].value === matrix[y + 1][x].value) {
            matrix[y][x].value *= 2;
            matrix[y + 1][x].value = 0;
          }
          if (matrix[y - 1][x].value === 0) {
            matrix[y - 1][x].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y - 2][x].value === 0) {                      //zwei zeilen zurückschauen
              matrix[y - 2][x].value = matrix[y - 1][x].value;
              matrix[y - 1][x].value = 0;
            }
            else if(matrix[y - 2][x].value === matrix[y - 1][x].value) {
              matrix[y - 2][x].value *= 2;
              matrix[y - 1][x].value *= 0;
            }
          }
        }
        
        if (y === 3) {                                              //4.Zeile
          if (matrix[y - 1][x].value === 0) {
            matrix[y - 1][x].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y - 2][x].value === 0) {
              matrix[y - 2][x].value = matrix[y - 1][x].value;
              matrix[y - 1][x].value = 0;
              if (matrix[y - 3][x].value === 0) {                    //drei Zeilen Zurückschauen
                matrix[y - 3][x].value = matrix[y - 2][x].value;
                matrix[y - 2][x].value = 0;
              }
              else if (matrix[y - 3][x].value === matrix[y - 2][x].value) {
                matrix[y - 3][x].value *= 2;
                matrix[y-2][x].value = 0;
              }
            }
            else if(matrix[y - 2][x].value === matrix[y - 1][x].value) {
              matrix[y - 2][x].value *= 2;
              matrix[y - 1][x].value = 0;
            }
          }
        }
      }
    }
    
    randomSpawn(matrix);           //random Zahl wird nach ausführen der Funktion irgendwo plaziert.
    refresh(matrix);               //Das Visuelle wird auf den aktuellen Stand gebracht.
    isGameOverCheck(matrix); 
    return matrix;
  }
  
  function moveLeft(matrix) {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (x === 0) {
          if (matrix[y][x].value === matrix[y][x + 1].value) {
            matrix[y][x].value *= 2;
            matrix[y][x + 1].value = 0;
          }
        }
        
        if (x === 1) {
          if (matrix[y][x].value === matrix[y][x + 1].value) {
            matrix[y][x].value *= 2;
            matrix[y][x + 1].value = 0;
          }
          if (matrix[y][x - 1].value === 0) {
            matrix[y][x - 1].value = matrix[y][x].value;
            matrix[y][x].value = 0;
          }
        }
        
        if (x === 2) {
          if (matrix[y][x].value === matrix[y][x + 1].value) {
            matrix[y][x].value *= 2;
            matrix[y][x + 1].value = 0;
          }
          if (matrix[y][x - 1].value === 0) {
            matrix[y][x - 1].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y][x - 2].value === 0) {
              matrix[y][x - 2].value = matrix[y][x - 1].value;
              matrix[y][x - 1].value = 0;
            }
            else if(matrix[y][x - 2].value === matrix[y][x - 1].value) {
              matrix[y][x - 2].value *= 2;
              matrix[y][x - 1].value *= 0;
            }
          }
        }
        
        if (x === 3) {
          if (matrix[y][x - 1].value === 0) {
            matrix[y][x - 1].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y][x - 2].value === 0) {
              matrix[y][x - 2].value = matrix[y][x - 1].value;
              matrix[y][x - 1].value = 0;
              if (matrix[y][x - 3].value === 0) {
                matrix[y][x - 3].value = matrix[y][x - 2].value;
                matrix[y][x - 2].value = 0;
              }
              else if (matrix[y][x - 3].value === matrix[y][x - 2].value) {
                matrix[y][x - 3].value *= 2;
                matrix[y][x - 2].value = 0;
              }
            }
            else if(matrix[y][x - 2].value === matrix[y][x - 1].value) {
              matrix[y][x - 2].value *= 2;
              matrix[y][x - 1].value = 0;
            }
          }
        }
      }
    }
    randomSpawn(matrix);
    refresh(matrix);
    isGameOverCheck(matrix); 
    return matrix;
  }
  
  function moveDown(matrix) {
    for (let y = 3; y >= 0; y--) {
      for (let x = 0; x < 4; x++) {
        if (y === 3) {
          if (matrix[y][x].value === matrix[y - 1][x].value) {
            matrix[y][x].value *= 2;
            matrix[y - 1][x].value = 0;
          }
        }
        
        if (y === 2) {
          if (matrix[y][x].value === matrix[y - 1][x].value) {
            matrix[y][x].value *= 2;
            matrix[y - 1][x].value = 0;
          }
          if (matrix[y + 1][x].value === 0) {
            matrix[y + 1][x].value = matrix[y][x].value;
            matrix[y][x].value = 0;
          }
        }
        
        if (y === 1) {
          if (matrix[y][x].value === matrix[y - 1][x].value) {
            matrix[y][x].value *= 2;
            matrix[y - 1][x].value = 0;
          }
          if (matrix[y + 1][x].value === 0) {
            matrix[y + 1][x].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y + 2][x].value === 0) {
              matrix[y + 2][x].value = matrix[y + 1][x].value;
              matrix[y + 1][x].value = 0;
            }
            else if(matrix[y + 2][x].value === matrix[y + 1][x].value) {
              matrix[y + 2][x].value *= 2;
              matrix[y + 1][x].value *= 0;
            }
          }
        }
        
        if (y === 0) {
          if (matrix[y + 1][x].value === 0) {
            matrix[y + 1][x].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y + 2][x].value === 0) {
              matrix[y + 2][x].value = matrix[y + 1][x].value;
              matrix[y + 1][x].value = 0;
              if (matrix[y + 3][x].value === 0) {
                matrix[y + 3][x].value = matrix[y + 2][x].value;
                matrix[y + 2][x].value = 0;
              }
              else if (matrix[y + 3][x].value === matrix[y + 2][x].value) {
                matrix[y + 3][x].value *= 2;
                matrix[y + 2][x].value = 0;
              }
            }
            else if(matrix[y + 2][x].value === matrix[y + 1][x].value) {
              matrix[y + 2][x].value *= 2;
              matrix[y + 1][x].value = 0;
            }
          }
        }
      }
    }
    randomSpawn(matrix);
    refresh(matrix);
    isGameOverCheck(matrix); 
    return matrix;
  }
  
  function moveRight(matrix) {
    for (let y = 0; y < 4; y++) {
      for (let x = 3; x >= 0; x--) {
        if (x === 3) {
          if (matrix[y][x].value === matrix[y][x - 1].value) {
            matrix[y][x].value *= 2;
            matrix[y][x - 1].value = 0;
          }
        }
        
        if (x === 2) {
          if (matrix[y][x].value === matrix[y][x - 1].value) {
            matrix[y][x].value *= 2;
            matrix[y][x - 1].value = 0;
          }
          if (matrix[y][x + 1].value === 0) {
            matrix[y][x + 1].value = matrix[y][x].value;
            matrix[y][x].value = 0;
          }
        }
        
        if (x === 1) {
          if (matrix[y][x].value === matrix[y][x - 1].value) {
            matrix[y][x].value *= 2;
            matrix[y][x - 1].value = 0;
          }
          if (matrix[y][x + 1].value === 0) {
            matrix[y][x + 1].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y][x + 2].value === 0) {
              matrix[y][x + 2].value = matrix[y][x + 1].value;
              matrix[y][x + 1].value = 0;
            }
            else if(matrix[y][x + 2].value === matrix[y][x + 1].value) {
              matrix[y][x + 2].value *= 2;
              matrix[y][x + 1].value *= 0;
            }
          }
        }
        
        if (x === 0) {
          if (matrix[y][x + 1].value === 0) {
            matrix[y][x + 1].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y][x + 2].value === 0) {
              matrix[y][x + 2].value = matrix[y][x + 1].value;
              matrix[y][x + 1].value = 0;
              if (matrix[y][x + 3].value === 0) {
                matrix[y][x + 3].value = matrix[y][x + 2].value;
                matrix[y][x + 2].value = 0;
              }
              else if (matrix[y][x + 3].value === matrix[y][x + 2].value) {
                matrix[y][x + 3].value *= 2;
                matrix[y][x + 2].value = 0;
              }
            }
            else if(matrix[y][x + 2].value === matrix[y][x + 1].value) {
              matrix[y][x + 2].value *= 2;
              matrix[y][x + 1].value = 0;
            }
          }
        }
      }
    }
    randomSpawn(matrix);
    refresh(matrix);
    isGameOverCheck(matrix); 
    return matrix;
  }

function refresh(matrix) {
  for (let y = 0 ; y < 4; y++){
    for(let x = 0; x < 4 ; x++){
      matrix[x][y].classList = 'field';
      if (matrix[x][y].value !== 0){
        matrix[x][y].textContent = matrix[x][y].value;                //textContent ist das was angezeigt wird, bei value finden die ganzen Berechnungen statt.
        matrix[x][y].classList.add('number-'  + matrix[x][y].value);     //Farbe in css
      }else{
        matrix[x][y].textContent = '';                              //falls die Zahl null ist, wird nichts angezeigt, nur eine festgelegte Farbe.
        matrix[x][y].classList.add('number-0');
      }  
    }
  }
  return matrix; 
}

function checkIfMovePossible(direction,matrix){    //überprüft ob eine Bewegung der Zahlen überhaupt möglich ist.
  if(direction === "left"){
    for (let y = 0; y < 4;y++){
      for (let x = 0; x < 3;x++) {
        if (matrix[y][x].value === matrix[y][x + 1].value && matrix[y][x].value !== 0){
          return true;
        }
        else if (matrix[y][x].value === 0){
          if (x === 0) {
            if (matrix[y][x + 1].value !== 0) {  //ist eine Zahl rechts von einer null, dann kann sie nach links rutschen. Eine Bewegung ist also möglich.
              return true;
            }
            else if (matrix[y][x + 2].value !== 0) {
              return true;
            }
            else if (matrix[y][x + 3].value !== 0) {
              return true;
            }
          }
          if (x === 1) {
            if (matrix[y][x + 1].value !== 0) {
              return true;
            }
            else if (matrix[y][x + 2].value !== 0) {
              return true;
            }
          }          
          if (x === 2) {
            if (matrix[y][x + 1].value !== 0) {
              return true;
            }
          }
        }
      }
    }
  }
            
  else if(direction === "right"){                 //das gleiche Konzept, einfach für die Bewegung nach rechts angepasst.
    for (let y = 0; y < 4;y++){
      for (let x = 3; x > 0;x--) {
        if (matrix[y][x].value === matrix[y][x - 1].value && matrix[y][x].value !== 0){
          return true;
        }
        else if (matrix[y][x].value === 0){
          if (x === 3) {
            if (matrix[y][x - 1].value !== 0) {
              return true;
            }
            else if (matrix[y][x - 2].value !== 0) {
              return true;
            }
            else if (matrix[y][x - 3].value !== 0) {
              return true;
            }
          }
          if (x === 2) {
            if (matrix[y][x - 1].value !== 0) {
              return true;
            }
            else if (matrix[y][x - 2].value !== 0) {
              return true;
            }
          }          
          if (x === 1) {
            if (matrix[y][x - 1].value !== 0) {
              return true;
            }
          }
        }
      }
    }
  }
  
  else if(direction === "up"){
    for (let y = 0; y < 3;y++){
      for (let x = 0; x < 4;x++) {
        if (matrix[y][x].value === matrix[y + 1][x].value && matrix[y][x].value !== 0){
          return true;
        }
        else if (matrix[y][x].value === 0){
          if (y === 0) {
            if (matrix[y + 1][x].value !== 0) {
              return true;
            }
            else if (matrix[y + 2][x].value !== 0) {
              return true;
            }
            else if (matrix[y + 3][x].value !== 0) {
              return true;
            }
          }
          if (y === 1) {
            if (matrix[y + 1][x].value !== 0) {
              return true;
            }
            else if (matrix[y + 2][x].value !== 0) {
              return true;
            }
          }          
          if (y === 2) {
            if (matrix[y + 1][x].value !== 0) {
              return true;
            }
          }
        }
      }
    }
  }
  
  else if(direction === "down"){
    for (let y = 3; y > 0;y--){
      for (let x = 0; x < 4;x++) {
        if (matrix[y][x].value === matrix[y - 1][x].value && matrix[y][x].value !== 0){
          return true;
        }
        else if (matrix[y][x].value === 0){
          if (y === 3) {
            if (matrix[y - 1][x].value !== 0) {
              return true;
            }
            else if (matrix[y - 2][x].value !== 0) {
              return true;
            }
            else if (matrix[y - 3][x].value !== 0) {
              return true;
            }
          }
          if (y === 2) {
            if (matrix[y - 1][x].value !== 0) {
              return true;
            }
            else if (matrix[y - 2][x].value !== 0) {
              return true;
            }
          }          
          if (y === 1) {
            if (matrix[y - 1][x].value !== 0) {
              return true;
            }
          }
        }
      }
    }
  }
}