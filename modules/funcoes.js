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
        message.userDados = userFind
        return message // 200
    } else {
        return MESSAGE_ERRO
    }
}


const getContactsFromUser = function (number) {
    let message = {
        status: true, status_code: 200, development: 'Guilherme Moreira', contacts: []
    }

    const userFind = dados.contatos['whats-users'].find(user => user.number === number)

    if (userFind) {
        message.contacts = userFind.contacts.map(contact => ({ //o map pega o contato e cria um objeto novo só com as informações que eu quero
            name: contact.name,
            description: contact.description,
            image: contact.image
        }))
        return message
    } else {
        return MESSAGE_ERRO
    }
}


const getAllUserMessages = function (number) {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Guilherme Moreira', allMessages: [] }

    const userFind = dados.contatos['whats-users'].find(user => user.number === number)

    if (userFind) {
        // Percorre todos os contatos do usuário
        userFind.contacts.forEach(contact => {
            // Para cada contato, pega todas as mensagens
            contact.messages.forEach(mensagem => {
                message.allMessages.push(mensagem)
            })
        })

        return message
    } else {
        return MESSAGE_ERRO
    }
}

const getConversation = function (userNumber, contactNumber) {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Guilherme Moreira', contactName: '', contactNumber: '', conversation: [] }

    const userFind = dados.contatos['whats-users'].find(user => user.number === userNumber)

    if (userFind) {

        const contactfind = userFind.contacts.find(contact => contact.number === contactNumber)
        message.contactName = contactfind.name,
        message.contactNumber = contactfind.number

        if (contactfind) {
            contactfind.messages.forEach(mensagem => {
                message.conversation.push(mensagem)
            })
            return message

        } else {
            return MESSAGE_ERRO
        }

    } else {
        return MESSAGE_ERRO
    }
}

 const getKeywordsFromConversation = function (userNumber, contactNumber, keyWord) {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Guilherme Moreira', conversation: [] }

    const userFind = dados.contatos['whats-users'].find(user => user.number === userNumber)

    if (userFind) {

        const contactfind = userFind.contacts.find(contact => contact.number === contactNumber)

        if (contactfind) {
            contactfind.messages.forEach(mensagem => {
                
                if (mensagem.content.toLowerCase().includes(keyWord.toLowerCase())) {
                    message.conversation.push(mensagem)
                    return message
                } else {
                    return MESSAGE_ERRO
                }

            })
            return message

        } else {
            return MESSAGE_ERRO
        }

    } else {
        return MESSAGE_ERRO
    }
}
// console.log(getKeywordsFromConversation('11987876567', '26999999963', 'how'))

module.exports = {
    getAllDados,
    getAllUserDados,
    getContactsFromUser,
    getAllUserMessages,
    getConversation,
    getKeywordsFromConversation
}