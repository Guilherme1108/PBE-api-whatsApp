/***************************************************************************************************************************
 * Objetivo: Arquivo de fuções para gerenciar a API de contatos e conversas.
 * Data: 24/09/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
 ***************************************************************************************************************************/

//mensagem padrão de erro
const MESSAGE_ERRO = { status: false, status_code: 500, development: 'Guilherme Moreira' }

//Import do dados do JSON
const dados = require('./contatos.js')

const getAllDados = function () {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Guilherme Moreira', allDados: [] }

    dados.contatos['whats-users'].forEach(dados => {
        message.allDados.push(dados)
    })
    if (message.allDados.length > 0)
        return message //200
    else
        return MESSAGE_ERRO //500
}

//Forma de ver no terminal oque tem dentro de outros arrays e objetos
// const teste = getAllDados()
// console.log(teste.allDados[0].contacts)

const getAllUserDados = function (number) {
    let message = { status: true, status_code: 200, development: 'Guilherme Moreira', userDados: [] }

    // o filter vai procurar em todos os usuarios algum com este numero e devovler tudo dele
    const userFind = dados.contatos['whats-users'].filter(user => user.number === number)

    if (userFind.length > 0) {
        message.userDados = encontrados
        return message // 200
    } else {
        return MESSAGE_ERRO
    }
}


const getPersonalUserDados = function (number){
    let message = { status: true, status_code: 200, development: 'Guilherme Moreira', personalDados: [] }

    const userFind = dados.contatos['whats-users'].find(user => user.number === number)

    if (userFind) {
        message.personalDados = {
            name: userFind.contacts.name,
            description: userFind.contacts.description,
            image: userFind.contacts.image
        }
        return message
    } else {
        return MESSAGE_ERRO //Falsa 500
    }
}
console.log(getPersonalUserDados())



module.exports = {
    getAllDados,
    getAllUserDados
}