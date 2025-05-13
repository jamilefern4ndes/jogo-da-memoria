let sessaoJogo = document.querySelector('.game')
let carta1 = ''
let carta2 = ''
let pontos = 0
let acertos = []

//pegar dados e criar as cartas
const url = 'cards.json'
function pegarDados() {
    fetch(url)
        .then(response => response.json())
        .then(dados => {
            if (!dados.cartas) {
                console.log("Erro: JSON não contém 'cartas'");
                return;
            }

            console.log("Quantidade de cartas: " + dados.cartas.length);

            // Limpa a sessão p criar as cartas
            sessaoJogo.innerHTML = ""

            // Crie as cartas
            dados.cartas.forEach(cartas => {
            gerarCartas(cartas)
        });
    })
    .catch(error => console.log("Erro ao carregar JSON: ", error))
}


function gerarCartas(cartas){

    let carta = document.createElement("div")
    carta.setAttribute('class', 'card') 
    sessaoJogo.appendChild(carta)

    //manter cartas viradas quando acertadas
    if (acertos.includes(cartas.cor)) {
        carta.style.background = `url(../imagens/${cartas.img})`
    }
    //click
    carta.addEventListener('click', () => {
        carta.classList.toggle('virada')
            setTimeout(() => {
            carta.style.background = `url(../imagens/${cartas.img})`
            }, 550)
        if (carta1 === '') {
            carta1 = cartas.img
            console.log('carta1: ' + carta1)
         } 
        else if (carta1 != ''){
            carta2 = cartas.img
            console.log ('carta2: '+ carta2)
            comparar(carta1, carta2, cartas.cor)
        }
    })
}
function comparar(c1, c2, cor){
    if (c1 === c2){ 
        pontos ++ 
        acertos.push(cor)
        console.log ('cartas iguais')
        console.log ('pontuação: ' + pontos)
        console.log (acertos)
        carta1 = ''
        carta2 = ''
    }
    else{
        console.log ('cartas diferentes')
        carta1 = ''
        carta2 = ''
    }
    setTimeout(() => { 
        if (pontos == 4){
            fimDeJogo()
        }else{
            pegarDados() 
        }
    },2000)
}

let sessaoFinal = document.querySelector('#finalizado')
function fimDeJogo(){
    sessaoJogo.innerHTML = ' '
    sessaoFinal.style.display = 'flex'
}
function reload(){
    location.reload()
}




