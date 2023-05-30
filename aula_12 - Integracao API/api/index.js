const restify = require('restify');
const errors = require('restify-errors');

const servidor = restify.createServer({
    name: 'loja',
    version: '1.0.0'

});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8001, function() {
    console.log("%s executando em %s", servidor.name, servidor.url);
});

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'loja'
    }
});

servidor.get('/', (req,res, next) => {
    res.send('Bem-vindo(a) à API Loja!');
});

servidor.get('/produtos', (req,res, next) => {
    knex('produto').then( (dados) => {
        res.send(dados);
    }, next);    
});

servidor.get('/clientes', (req, res, next) => {
    knex('cliente').then( (dados) => {
        res.send(dados);
    }, next);
});

servidor.get('/produtos/:idProd', (req,res, next) => {
    const idProduto = req.params.idProd;
    knex('produto')
        .where( 'id', idProduto)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto não encontrado'));
        }
        res.send(dados);
    }, next);    
});

servidor.get('/clientes/:idCliente', (req,res, next) => {
    const idClient = req.params.idCliente;
    knex('cliente')
        .where( 'id', idClient)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Cliente não encontrado'));
        }
        res.send(dados);
    }, next);
});

servidor.post('/produtos', (req,res, next) => {
    knex('produto')
        .insert(req.body)
        .then( (dados) => {
        res.send(dados);
    }, next);    
});

servidor.post('/clientes', (req,res, next) => {
    knex('cliente')
        .insert(req.body)
        .then( (dados) => {
            res.send(dados);            
    }, next);
});

servidor.put('/produtos/:idProd', (req,res, next) => {
    const idProduto = req.params.idProd;
    knex('produto')
        .where( 'id', idProduto)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Produto não encontrado'));
        }
        res.send('Produto Atualizado');
    }, next);    
});

servidor.put('/clientes/:idCliente', (req,res, next) => {
    const idClient = req.params.idCliente;
    knex('cliente')
        .where( 'id', idClient)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Cliente não encontrado'));
        }
        res.send('Cliente Atualizado');
    }, next);
});

servidor.del('/produtos/:idProd', (req,res, next) => {
    const idProduto = req.params.idProd;
    knex('produto')
        .where( 'id', idProduto)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto não encontrado'));
        }
        res.send('Produto não encontrado');
    }, next);    
});

servidor.del('/clientes/:idCliente', (req,res, next) => {
    const idClient = req.params.idCliente;
    knex('cliente')
        .where( 'id', idClient)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Cliente não encontrado'));
        }
        res.send('Cliente deletado');
    }, next);
});


 

    



