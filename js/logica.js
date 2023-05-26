const tablero = document.getElementById('tablero');
const mov = document.getElementById('movimiento')
let movimiento = 0;
let t = [0,0];
let r= [0,0];
let EnJuego = false
spawn();

function spawn() {
    movimiento = 0;
    EnJuego = true
    movi();
    const tomas = Math.floor(Math.random() * 6);
    const jeremias = Math.floor(Math.random() * 6);
    t = [tomas, 0];
    r = [jeremias, 5];
    for(let i = 0; i<6; i++){
        for(let j=0;j<6;j++){
            if(i===tomas && j === 0){
                const imagen = document.createElement('img');
                imagen.src = 'img/tomas.jpg';
                imagen.className = 'imagen';
                tablero.appendChild(imagen);
            }
            else if(i === jeremias && j === 5){
                const imagen = document.createElement('img');
                imagen.src = 'img/jeremias.jpg';
                imagen.className = 'imagen';
                tablero.appendChild(imagen);
            }
            else{
                const huecos = document.createElement('div');
                huecos.className = 'huecos';
                tablero.appendChild(huecos);
            }
        }
    }
}

function clear() {
    const imagenes = document.querySelectorAll('.imagen');
    imagenes.forEach((img) => {
      const espacio = document.createElement('div');
      espacio.className = 'huecos';
      img.parentNode.replaceChild(espacio, img);
    });
}

function dibujar() {
        clear(); 
        const tablero = document.getElementById('tablero'); 
        for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            const huecos = tablero.children[i * 6 + j];
            if (i === t[0] && j === t[1]) {
            const imagen = document.createElement('img');
            imagen.src = 'img/tomas.jpg';
            imagen.className = 'imagen';
            huecos.parentNode.replaceChild(imagen, huecos);
            }
            if (i === r[0] && j === r[1]) {
            const imagen = document.createElement('img');
            imagen.src = 'img/jeremias.jpg';
            imagen.className = 'imagen';
            huecos.parentNode.replaceChild(imagen, huecos);
            }
        }
    }
}

function movi() {
    mov.innerText = "Movimientos: "+ movimiento;
}

function val(val){
    if(val <=-1 || val >=6)
    {
        return false
    }
    else{
        return true
    }
}

function turn(){
    if(EnJuego){
        let va = false
            while(va === false){
                const ran = Math.floor(Math.random()*4)
                if(ran === 0){
                    if(val(r[1] + 1))
                    {
                        if(r[1]+1 === t[1] && r[0] === t[0])
                        {
                            va = true;
                        }
                        else
                        {
                            r[1] += 1;
                            dibujar(r);
                            va = true;
                        }
                    }
                }
                else if(ran === 1){
                    if(val(r[1] - 1))
                    {
                        if(r[1]-1 === t[1] && r[0] === t[0])
                        {
                            va = true;
                        }
                        else
                        {
                            r[1] -= 1;
                            dibujar(r);
                            va = true;
                        }
                    }
                }
                else if(ran === 2){
                    if(val(r[0] + 1))
                    {
                        if(r[1] === t[1] && r[0]+1 === t[0])
                        {
                            va = true;
                        }
                        else
                        {
                            r[0] += 1;
                            dibujar(r);
                            va = true;
                        }
                    }
                } 
                else if(ran === 3){
                    if(val(r[0] - 1))
                    {
                        if(r[1] === t[1] && r[0]-1 === t[0])
                        {
                            va = true;
                        }
                        else
                        {
                            r[0] -= 1;
                            dibujar(r);
                            va = true;
                        }
                    }
                }
            }
            if(nextTo()){
                EnJuego = false;
            }
        }
}


document.addEventListener('keydown', function(event) {
    if(EnJuego){
        if (event.key === 'ArrowRight') {
            if(val(t[1] + 1))
            {
                movimiento +=1;
                t[1] += 1;
                dibujar();
                movi();
                turn();
            }
        } 
        else if (event.key === 'ArrowLeft') {
            if(val(t[1] - 1))
            {
                movimiento +=1;
                t[1] -= 1;
                dibujar();
                movi();
                turn();
            }
        }
        else if (event.key === 'ArrowUp') {
            if(val(t[0] - 1))
            {
                movimiento +=1;
                t[0] -= 1;
                dibujar();
                movi();
                turn();
            }
        }
        else if (event.key === 'ArrowDown') {
            if(val(t[0] + 1))
            {
                movimiento +=1;
                t[0] += 1;
                dibujar();
                movi();
                turn();
            }
        if(nextTo()){
            EnJuego = false;
        }
        }
    }
});

const reset = document.getElementById('reset');
    reset.addEventListener('click', function() {
    tablero.innerHTML = '';
    movimiento = 0;
    movi();
    spawn();
});

function nextTo(){
    if (t[0] === r[0]) {
        for (let col = t[1] - 1; col <= t[1] + 1; col++) {
          if (col === r[1]) {
            alert("Bacano, te tomó "+movimiento+" movimientos.")
            return true;
          }
        }
      } else if (t[1] === r[1]) {
        for (let fila = t[0] - 1; fila <= t[0] + 1; fila++) {
          if (fila === r[0]) {
            alert("Bacano, te tomó "+movimiento+" movimientos.")
            return true;
          }
        }
      }
    return false
}