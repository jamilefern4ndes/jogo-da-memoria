let gameSection = document.querySelector('#gameSection')
let headersection = document.querySelector('.title')
let cartasGanhas = [ ]

function play(){
    gameSection.innerHTML = ' '
    pegarDados()
    cronometro()
   }
let dadosCarta = ''
const url = 'projeto/js/cards.json'
let cartasEmbaralhadas = []

function pegarDados() {
    fetch(url)
        .then(response => response.json())
        .then(dados => {
            if (!dados.cartas) {
                console.log("Erro: JSON não contém 'cartas'")
                return
            }

            console.log("Quantidade de cartas: " + dados.cartas.length)

            if (cartasEmbaralhadas.length === 0) {
                cartasEmbaralhadas = dados.cartas.sort(() => Math.random() - 0.5)
            }

            cartasEmbaralhadas.forEach(cartas => {
                dadosCarta = cartas
                gerarCartas(dadosCarta)
            });
        })
        .catch(error => console.log("Erro ao carregar JSON: ", error))
}

let carta1 = ''; let carta2= ' '
function gerarCartas(dadosCarta){

    let carta = document.createElement("article")
    carta.setAttribute('class', 'card')
    let imagem = document.createElement("img")
    carta.appendChild(imagem)
    gameSection.appendChild(carta)

    if (cartasGanhas.includes(dadosCarta.nome)) {
        imagem.setAttribute('src', "projeto/images/"+ dadosCarta.img)
    }

    carta.addEventListener('click', () => {
        carta.classList.toggle("virada")
         setTimeout(() => { 
            imagem.setAttribute('src', "projeto/images/"+ dadosCarta.img)
            }, 500)

        if (carta1 === ''){
            carta1 = dadosCarta.nome
            console.log('carta 1: ' + carta1)
        }
        else{
            carta2 = dadosCarta.nome
            console.log('carta2: ' + carta2)
            setTimeout(() => { 
                comparar(carta1, carta2)
            }, 1000)
         
        }
    })
}

function  comparar(c1, c2){
    if (c1 === c2){
        console.log('cartas iguais')
        if (!cartasGanhas.includes(c1)){
            cartasGanhas.push(c1)
        }
        carta1 = ''
        carta2 = ''   
        console.log('Você acertou as cartas de: ' + cartasGanhas)
        if (cartasGanhas.length == 4){
            finalizarJogo() 
        }
    }else{
        console.log('cartas diferentes')
        carta1 = ''
        carta2 = ''
    }
    gameSection.innerHTML = ''
    pegarDados()
}

function finalizarJogo() { 
    clearInterval(intervalo)
    intervalo = null

    while (gameSection.firstChild) {
        gameSection.removeChild(gameSection.firstChild)
    }
    gameSection.style.display = 'none' // Oculta a seção do jogo
    gameSection.innerHTML = '' // Garante que todos os elementos foram removidos

    let sectionWin = document.querySelector('#flutuante')
    sectionWin.style.display = 'flex'

    let sessaoTempo = document.getElementById('sessaoTempo');
    if (sessaoTempo) {
        sessaoTempo.innerHTML = `Você conseguiu combinar todas as cartas em ${seg} segundos!`
    }

    let btnFechar = document.querySelector('#fechar')
    btnFechar.addEventListener('click', () => {
        location.reload()
    })
}

//configurando tempo da partida
let areaCronometro = document.querySelector('#cronometro')
let seg = 0
let intervalo

const formatarDoisAlgarismos = (valor) => valor.toString().padStart(2, '0')

function cronometro() {
    if (!intervalo) {
        intervalo = setInterval(() => {
            seg++
            // console.log(seg)
            atualizarTela()
        }, 1000)
    }
}

function atualizarTela() {
    areaCronometro.textContent = `${formatarDoisAlgarismos(seg)}`
}

