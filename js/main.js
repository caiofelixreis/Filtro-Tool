import { lista } from './lista.js'

function typeWriter(elemento) {
    const textoArray = elemento.innerHTML.split('')

    elemento.innerHTML = ''

    textoArray.forEach((letra, i) => {
        setTimeout(() => elemento.innerHTML += letra, 500 * i)
        
    });
}

const titulo = document.querySelector('#titulo')

typeWriter(titulo)



function render(listaParametro, teste) {
    const corpo = document.querySelector('#body')

    corpo.innerHTML = listaParametro.map((e, i) =>
        `${teste == true ? `<p id='nome' >${e}</p>` : `<p id = 'nome' >${e.nome}</p>`}<button id='info' codigo='${i}' ><i class="fas fa-plus-square"></i></button>`

    ).join('')



    const info = document.querySelectorAll('#info')
    const nomes = document.querySelectorAll('#nome')
    nomes.forEach((e,i) => console.log(e.innerHTML, i))



    info.forEach((e, i) => e.addEventListener('click', e => {
        let nome = nomes[i].innerHTML
        //console.log(nome)
        let sexo, idade;


        lista.forEach((e, i) => {
            if (nome.toLowerCase() === e.nome.toLowerCase()) {
                sexo = e.sexo
                idade = e.idade
            }
        })

        modal(`
        <h3>${upperFirstCase(nome)}</h3>
        <p>Sexo:${sexo}</p>
        <p>Idade:${idade}</p>
        `)

    }
    ))

}

function upperFirstCase(palavra) {

    let array = palavra.split('')

    array[0] = array[0].toUpperCase()

    palavra = array.join("")

    return palavra
}


document.querySelector('#filtro').addEventListener('keyup', e => {
    const valor = e.target.value.toLowerCase()
    const listaNomes = lista.map(e => e.nome.toLowerCase())

    const listaFiltrada = listaNomes.filter(e => e.includes(valor))
    console.log(listaFiltrada)
    render(listaFiltrada, true)

})

function modal(html) {
    const modal = document.querySelector('.modal')
    const fundo = document.querySelector('#fundo')
    fundo.className = 'in'

    fundo.style.display = 'flex'
    modal.innerHTML = html

    document.querySelector('#fundo').addEventListener('click', e => {
        console.log(e.target.id)
        if (e.target.id == 'fundo') {
            fundo.className = 'out'
            setTimeout(() => fundo.style.display = 'none', 1000)

        }
    })
}

document.querySelector('#add').addEventListener('click', e => {
    document.querySelector('form').style.display = 'flex'
    document.querySelector('form').className = 'in'

    document.querySelector('form').addEventListener('click', e => {
        if (e.target.id == 'form') {
            document.querySelector('form').className = 'out'
            setTimeout(() => document.querySelector('form').style.display = 'none', 1000)
        }
    })

})


document.querySelector('#salva').addEventListener('click', e => {
    let nome = document.querySelector('#nomeI').value
    let sexo = document.querySelector('#sexo').value
    let idade = document.querySelector('#idade').value

    lista.push({ nome, sexo, idade })
    console.log(lista)

    document.querySelector('form').className = 'out'
    setTimeout(() => document.querySelector('form').style.display = 'none', 1000)

    render(lista)
})

render(lista, false)

