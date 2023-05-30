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
  // forrübergehend:  
  matrix[t][i].textContent = 0; 
    //matrix[t][i].textContent = cont;

  }
}
/*
elFields[1].textContent = 'hey'; 
console.log(matrix[0][1].textContent);
*/
//matrix[3][3].textContent = 5; 
// console.log(elFields[15].value);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    moveUp(matrix);
    // Pfeiltaste nach oben wurde gedrückt
    // Führe hier den entsprechenden Code aus
  } else if (event.key === "ArrowDown") {
    moveDown(matrix);
    // Pfeiltaste nach unten wurde gedrückt
    // Führe hier den entsprechenden Code aus
  } else if (event.key === "ArrowLeft") {
    moveLeft(matrix); 
    // Pfeiltaste nach links wurde gedrückt
    // Führe hier den entsprechenden Code aus
  } else if (event.key === "ArrowRight") {
    moveRight(matrix); 
    // Pfeiltaste nach rechts wurde gedrückt
    // Führe hier den entsprechenden Code aus
  }
});

randomSpawn(matrix);
randomSpawn(matrix);




function isGameOverCheck(matrix) {
    let gameOver = true;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (matrix[y][x].value === 0) {
          gameOver = false;
        }
        else {
          if (x < 4) {
            if (matrix[y][x].value === matrix[y][x + 1].value) {
              gameOver = false;
            } 
          }
          if (y < 4) {
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
          positionsYX.push([y, x]);
        }
      }
    }
    
    let amountYX = parseInt(Math.floor(Math.random() * positionsYX.length));
    let numbers = [2,2,2,2,4];
    let number = parseInt(Math.floor(Math.random() * numbers.length));
    
    matrix[positionsYX[amountYX][0]][positionsYX[amountYX][1]].value = numbers[number];
    //console.log(matrix);
     refresh(matrix);
    return matrix;
  }
  
  function moveUp(matrix) {
    
    
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (y === 0) {
          if (matrix[y][x].value === matrix[y + 1][x].value) {
            matrix[y][x].value *= 2;
            matrix[y + 1][x].value = 0;
          }
        }
        
        if (y === 1) {
          if (matrix[y][x].value === matrix[y + 1][x].value) {
            matrix[y][x].value *= 2;
            matrix[y + 1][x].value = 0;
          }
          if (matrix[y - 1][x].value === 0) {
            matrix[y - 1][x].value = matrix[y][x].value;
            matrix[y][x].value = 0;
          }
        }
        
        if (y === 2) {
          if (matrix[y][x].value === matrix[y + 1][x].value) {
            matrix[y][x].value *= 2;
            matrix[y + 1][x].value = 0;
          }
          if (matrix[y - 1][x].value === 0) {
            matrix[y - 1][x].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y - 2][x].value === 0) {
              matrix[y - 2][x].value = matrix[y - 1][x].value;
              matrix[y - 1][x].value = 0;
            }
            else if(matrix[y - 2][x].value === matrix[y - 1][x].value) {
              matrix[y - 2][x].value *= 2;
              matrix[y - 1][x].value *= 0;
            }
          }
        }
        
        if (y === 3) {
          if (matrix[y - 1][x].value === 0) {
            matrix[y - 1][x].value = matrix[y][x].value;
            matrix[y][x].value = 0;
            if (matrix[y - 2][x].value === 0) {
              matrix[y - 2][x].value = matrix[y - 1][x].value;
              matrix[y - 1][x].value = 0;
              if (matrix[y - 3][x].value === 0) {
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
    randomSpawn(matrix);
    //console.log(matrix);
    refresh(matrix);
    isGameOverCheck(matrix); 
    return matrix;
  }
  
  function moveLeft(matrix) {
    //console.log('hello world')
    
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
    //console.log(matrix);
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
    //console.log(matrix);
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
    //console.log(matrix);
    refresh(matrix);
    isGameOverCheck(matrix); 
    return matrix;
  }


function refresh(matrix) {
  for (let y = 0 ; y < 4; y++){
    for(let x = 0; x < 4 ; x++){
      matrix[x][y].classList = 'field';
      if (matrix[x][y].value !== 0){
        matrix[x][y].textContent = matrix[x][y].value; 
        matrix[x][y].classList.add('number-'  + matrix[x][y].value);
      }else{
        matrix[x][y].textContent = ''; 
        matrix[x][y].classList.add('number-0');
      }
      //console.log(matrix[x][y].classList);
      
    }
  }
  
  return matrix; 
}
 