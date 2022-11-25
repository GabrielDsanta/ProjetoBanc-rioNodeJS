
const { response, request } = require('express')
const express = require('express')
const { User } = require('phosphor-react')
const { v4: uuidv4 } = require('uuid')

const app = express()

let Users = []

app.use(express.json())

app.post('/accounts', (request, response) => {
    const { cpf, name } = request.body

    const cpfIsValid = Users.some(
        (item) => item.cpf === cpf
    )

    if(cpfIsValid){
        return response.status(400).json({error: "Esse CPF já está cadastrado"})
    }

    console.log(cpfIsValid)

    Users.push({
        name,
        cpf,
        id: uuidv4(),
        amountCash: [],
    })

    console.log(Users)
    return response.status(201).send()
})

app.get('/statement/:cpf', (request, response) => {
    const { cpf } = request.params

    const findUser = Users.find((findUser) => findUser.cpf === cpf)

    return response.json(findUser.amountCash)
})


app.listen(3333)