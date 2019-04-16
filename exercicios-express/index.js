const express = require('express')
const app = express()
const saudacao = require('./saudacaoMid')
const bodyParser = require('body-parser')
const usuarioApi = require('./api/usuario')
require('./api/produto')(app, 'com param!')

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(saudacao('Guilherme'))

app.use('/opa', (req, res, next) => {
    console.log('Antes...')
    next();
})

app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)

app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo = ${req.query.completo} ano = ${req.query.ano}`)
})

// relatorio deve vir primeiro por ser mais especifica, ou o :id irá conflitar com o /relatorio

app.get('/clientes/:id', (req, res) => {
    res.send(`Cliente ${req.params.id} selecionado!`)
})

app.post('/corpo', (req, res) => {
    // let corpo = ''
    // req.on('data', function(parte) {
    //     corpo += parte
    // })

    // req.on('end', function() {
    //     res.send(corpo)
    // })
    res.send(req.body)
})


app.get('/opa',(req, res, next) => {
    // res.send('<h1>Estou bem!</h1><br><h2>Tipo é HTML</h2>')
    res.json({
        data: [
            {id: 7, name: 'Ana', position: 1},
            {id: 34, name: 'Bia', position: 2},
            {id: 73, name: 'Carlos', position: 3}
        ],
        count: 30,
        skip: 0,
        limit: 3,
        status: 200
    })
    console.log('Durante ...')
    next()
})

app.use('/opa', (req, res) => {
    console.log('Depois...')
})

app.listen(3000, () => {
    console.log('Backend executando...')
})