class App {
    constructor(){
        this.loadUIelements()
        this.loadEventListeners()
    }

    loadUIelements() {
        this.tabla = document.getElementById('tabla')
        this.btnEnviar = document.querySelector(".btnEnviar")
        this.nParejasInput = document.getElementById('nParejas')
        this.contenedorCalcular = document.getElementById('contenedor-calcular')
        this.contenedorResultado = document.getElementById('contenedor-resultado')
        this.resultadoFinal = document.getElementById('resultado-final')
        this.formulaContainer = document.getElementById('formula')
        this.latex = document.getElementById('latex')
        // Variables globales
        this.valor = ''
        this.nParejas = ''
    }

    loadEventListeners(){
        this.nParejasInput.addEventListener('change', cambiarValorNParejas.bind(this))
        this.btnEnviar.addEventListener('click', onCrearTabla.bind(this))

        function cambiarValorNParejas(e){
            this.nParejas = e.target.value
        }

        function onCrearTabla(){
            if (this.nParejas === ''){
                Swal.fire({
                    title: 'Error',
                    text: "No insertó un valor",
                    type: "error",
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green'
                })
                return
            } else{
                this.crearTabla()
            }
        }
    }

    crearTabla(){
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
            inputX.style.width = "120px"
            inputX.style.fontSize = "25px"
            inputX.className = `x${i+1}`
            puntosX.push({"id": `x${i+1}`, value: undefined})
            inputX.onchange = (e) => {
                puntosX[i].value = e.target.value
            }
            let inputY = document.createElement("input");
            inputY.type = "number";
            inputY.style.textAlign = 'center'
            inputY.style.width = "120px"
            inputY.style.fontSize = "25px"
            inputY.className = `y${i+1}`
            puntosY.push({"id": `y${i+1}`, value: undefined})
            inputY.onchange = (e) => {
                puntosY[i].value = e.target.value
            }
            newTdX.appendChild(inputX)
            newTdY.appendChild(inputY)
            newRow.appendChild(newTdX)
            newRow.appendChild(newTdY)
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
        inputValorABuscar.style.fontSize = "25px"
        inputValorABuscar.style.width = "125px"
        inputValorABuscar.onchange = (e) => {
            this.valor = e.target.value
        }
        this.contenedorCalcular.appendChild(titleValorABuscar)
        this.contenedorCalcular.appendChild(inputValorABuscar)
    }

    crearBotonCalcular(puntosX, puntosY) {
        let botonCalcular = document.createElement('button')
        botonCalcular.innerHTML = "Calcular"
        botonCalcular.style.marginTop = "20px"
        botonCalcular.style.marginBottom = "40px"
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
                Swal.fire({
                    title: 'Error',
                    text: "Debe llenar todos los inputs",
                    type: "error",
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green'
                })
            } else {
                this.lagrange(puntosX, puntosY, this.valor)
            }
        }
        this.contenedorCalcular.appendChild(botonCalcular)
    }

    scriptsMathJax(latexString) {
        let script = document.createElement('script')
        script.type = "text/javascript"
        script.src = "https://polyfill.io/v3/polyfill.min.js?features=es6"
        script.setAttribute('id', 'scriptMathJax1')
        let script2 = document.createElement('script')
        script2.type = "text/javascript"
        script2.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        script2.setAttribute('id', 'scriptMathJax2')
        document.getElementsByTagName('head')[0].appendChild(script);
        document.getElementsByTagName('head')[0].appendChild(script2);
    
        this.formulaContainer.style.display = 'block'
        latex.innerText = "\\("  + latexString + "\\)" 
    
        script.parentNode.removeChild(script)
        script2.parentNode.removeChild(script2)
    }

    lagrange(puntosX, puntosY, valor){
        let resultado = 0
        let latex = "P(x) = "
        for (let i=0; i < this.nParejas; i++){
            let numerador = 1
            let denominador = 1
            let elementosNumerador = ""
            let elementosDenominador = ""
            for (let j = 0; j < this.nParejas; j++) {
                
                if (j != i) {
                    numerador = numerador * (valor - puntosX[j].value)
                    console.log("numerador")
                    console.log("valor", valor)
                    console.log("puntosX[j].value", puntosX[j].value)
                    elementosNumerador += `(${valor}-${puntosX[j].value})`
                    denominador = denominador * (puntosX[i].value - puntosX[j].value)
                    console.log("denominador")
                    console.log("puntosX[i].value", puntosX[i].value)
                    console.log("puntosX[j].value", puntosX[j].value)
                    elementosDenominador += `(${puntosX[i].value}-${puntosX[j].value})`
                }
            }
            console.log(elementosNumerador)
            console.log(elementosDenominador)
            resultado = resultado + ((numerador/denominador) * puntosY[i].value)
            console.log("Multiplicar por ", puntosY[i].value)
            console.log("resultado", resultado)
            latex += `\\frac{${elementosNumerador}}{${elementosDenominador}}\\times${puntosY[i].value}`
            if (i != this.nParejas - 1){
                latex += "+"
            }
            console.log("latex", latex)
        }
        console.log("Final latex", latex)
        this.scriptsMathJax(latex)
        this.contenedorResultado.style.display = 'block'
        this.contenedorResultado.style.marginTop = '35px'
        this.resultadoFinal.innerHTML = `Resultado: ${resultado.toFixed(3)}`
    }
}

const app = new App()


