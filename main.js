// import { variablePrueba } from './js/prueba.js'

class App {
    constructor(){
        this.loadUIelements()
        this.loadEventListeners()
    }

    loadUIelements() {
        this.tabla = document.getElementById('tabla')
        this.btnEnviar = document.querySelector(".btnEnviar")
        this.nParejasInput = document.getElementById('nParejas')
        this.nParejas = ''
        this.contenedorCalcular = document.getElementById('contenedor-calcular')
        this.contenedorResultado = document.getElementById('contenedor-resultado')
        this.resultadoFinal = document.getElementById('resultado-final')
        this.valor = ''
    }

    loadEventListeners(){
        this.nParejasInput.addEventListener('change', cambiarValorNParejas.bind(this))

        this.btnEnviar.addEventListener('click', onCrearTabla.bind(this))

        function cambiarValorNParejas(e){
            this.nParejas = e.target.value
            console.log("Valor insertado", this.nParejas)
        }

        function onCrearTabla(){
            console.log("Enviar")
            console.log(this.nParejas)
            if (this.nParejas === ''){
                alert("No insertó valor")
                return
            } else{
                this.crearTabla()
            }
        }
    }

    crearTabla(){
        console.log("crear tabla de", this.nParejas)
        let puntosX = []
        let puntosY = []
        let tbody = document.createElement('tbody')
        
        for(let i = 0; i < this.nParejas; i++){
            let newRow = document.createElement('tr');
            let newTdX = document.createElement('td')
            let newTdY = document.createElement('td')
            let inputX = document.createElement("input");
            inputX.type = "number";
            inputX.style.textAlign = 'center'
            inputX.className = `x${i+1}`
            puntosX.push({"id": `x${i+1}`, value: undefined})
            inputX.onchange = (e) => {
                console.log("value", e.target.value)
                puntosX[i].value = e.target.value
            }
            let inputY = document.createElement("input");
            inputY.type = "number";
            inputY.style.textAlign = 'center'
            inputY.className = `y${i+1}`
            puntosY.push({"id": `y${i+1}`, value: undefined})
            inputY.onchange = (e) => {
                console.log("value", e.target.value)
                puntosY[i].value = e.target.value
            }
            newTdX.appendChild(inputX)
            newTdY.appendChild(inputY)
            newRow.appendChild(newTdX)
            newRow.appendChild(newTdY)
            console.log(newRow)
            tbody.appendChild(newRow)
        }
        this.tabla.appendChild(tbody)
        this.tabla.style.display = 'block'
        this.crearValorBuscar()
        
        this.crearBotonCalcular(puntosX, puntosY)
    }

    crearValorBuscar(){
        let titleValorABuscar = document.createElement('h5')
        titleValorABuscar.innerHTML = "Valor de x para buscar el respectivo valor de y"
        titleValorABuscar.style.marginRight = "10px"
        titleValorABuscar.style.marginBottom = "0px"
        let inputValorABuscar = document.createElement("input")
        inputValorABuscar.type = 'number'
        inputValorABuscar.className = "valorABuscar"
        inputValorABuscar.onchange = (e) => {
            this.valor = e.target.value
            console.log(this)
        }

        this.contenedorCalcular.appendChild(titleValorABuscar)
        this.contenedorCalcular.appendChild(inputValorABuscar)
    }

    crearBotonCalcular(puntosX, puntosY) {
        let botonCalcular = document.createElement('button')
        botonCalcular.innerHTML = "Calcular"
        botonCalcular.style.marginTop = "20px"
        botonCalcular.style.marginLeft = "10px"
        botonCalcular.style.className = "button-primary"
        botonCalcular.onclick = () => {
            let existeUndefined = 0
            puntosX.forEach((item) => {
                if (item.value === undefined){
                    existeUndefined++;
                    return
                }
            })
            puntosY.forEach((item) => {
                if (item.value === undefined){
                    existeUndefined++;
                    return
                }
            })
            if(existeUndefined > 0 || this.valor === ''){
                alert("Debe llenar todas los inputs")
            } else {
                this.lagrange(puntosX, puntosY, this.valor)
            }
        }
        this.contenedorCalcular.appendChild(botonCalcular)
    }

    lagrange(puntosX, puntosY, valor){
        let resultado = 0
        for (let i=0; i < this.nParejas; i++){
            let numerador = 1
            let denominador = 1
            for (let j = 0; j < this.nParejas; j++) {
                if (j != i) {
                    numerador = numerador * (valor - puntosX[j].value)
                    denominador = denominador * (puntosX[i].value - puntosX[j].value)
                }
            }
            resultado = resultado + ((numerador/denominador) * puntosY[i].value)
        }
        this.contenedorResultado.style.display = 'block'
        this.resultadoFinal.innerHTML = `Resultado: ${resultado.toFixed(5)}`
    }

}

const app = new App()


