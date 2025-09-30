/***************************************************************************************************************************
 * Objetivo: EndPoints referente a API de contatos e conversas.
 * Data: 24/09/2025
 * Autor: Guilherme Moreira
 * Versão: 1.0
 * 
 * Observações: Instalação do Express, Cors, Body-Parser
 * npm install express     --save
 * npm install cors        --save
 * npm install body-parser --save
 ***************************************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//import das funcoes
const dados = require('./modules/funcoes.js')

//porta
const PORT = process.PORT || 8080

const app = express()

//permissões
app.use((request, response, next) => {
    response.header('Acces-Control-Allow-Origin', '*')    //Servidor de origem da API
    response.header('Acces-Control-Allow-Methods', 'GET') //verbos permitidos / para adicionar mais métodos separar por , dentro da mesma aspas
    //carrega as configurações no cors da API 
    app.use(cors())
    next() // proximo, carregar os proximos endpoints
})

//endpoints
app.get('/v1/dados/', function (request, response) {
    let allDados = dados.getAllDados()
    response.status(allDados.status_code)
    response.json(allDados)
})

app.get('/v1/userdados/:number', function (request, response) {
    let number = request.params.number
    let userDados = dados.getAllUserDados(number)
    response.status(userDados.status_code)
    response.json(userDados)
})

app.get('/v1/contacts/:number', function (request, response) {
    let number = request.params.number
    let userDados = dados.getContactsFromUser(number)
    response.status(userDados.status_code)
    response.json(userDados)
})

app.get('/v1/user/messages/:number', function (request, response) {
    let number = request.params.number
    let userMessages = dados.getAllUserMessages(number)
    response.status(userMessages.status_code)
    response.json(userMessages)
})

app.get('/v1/user/messages', function (request, response) {
    let userNumber = request.query.userNumber
    let contactNumber = request.query.contactNumber
    let userMessages = dados.getConversation(userNumber, contactNumber)
    response.status(userMessages.status_code)
    response.json(userMessages)
})

app.get('/v1/messages', function (request, response) {
    let userNumber = request.query.userNumber
    let contactNumber = request.query.contactNumber
    let keyWord = request.query.keyWord
    let userMessages = dados.getKeywordsFromConversation(userNumber, contactNumber, keyWord)
    response.status(userMessages.status_code)
    response.json(userMessages)
})



//Start na API
app.listen(PORT, function () {
    console.log('API aguardando requisições ....')
})