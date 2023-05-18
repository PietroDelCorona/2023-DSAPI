const restify = require('restify');
const errors = require('restify-errors');

const servidor = restify.createServer({
    name: 'loja_dsapi',
    verion: '1.0.0'
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
        database: 'loja_dsapi'
    }
});

servidor.get('/', (req,res, next) => {
    res.send('Bem-vindo(a) à API Loja!');
});

servidor.get('/cidades', (req,res, next) => {
    knex('cidades').then( (dados) => {
        res.send(dados);
    }, next);
});

servidor.get('/clientes', (req,res, next) => {
    knex('clientes').then( (dados) => {
        res.send(dados);
    }, next);
});

servidor.get('/pedidos', (req,res, next) => {
    knex('pedidos').then( (dados) => {
        res.send(dados);
    }, next);
});

servidor.get('/categorias', (req,res, next) => {
    knex('categorias').then( (dados) => {
        res.send(dados);
    }, next);
});

servidor.get('/produtos', (req,res, next) => {
    knex('produtos').then( (dados) => {
        res.send(dados);
    }, next);
});

servidor.get('/pedidos_produtos', (req,res, next) => {
    knex('pedidos_produtos').then( (dados) => {
        res.send(dados);
    })
});

servidor.get('/cidades/:idCidade', (req,res, next) => {
    const idCity = req.params.idCidade;
    knex('cidades')
        .where( 'id', idCity)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto não encontrado'));
        }
        res.send(dados);
    }, next);    
});

servidor.post('/cidades', (req,res, next) => {
    knex('cidades')
        .insert(req.body)
        .then( (dados) => {
        res.send(dados);
    }, next);    
});

servidor.put('/cidades/:idCidade', (req,res, next) => {
    const idCity = req.params.idCidade;
    knex('cidades')
        .where( 'id', idCity)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Produto não encontrado'));
        }
        res.send('Produto Atualizado');
    }, next);    
});

servidor.del('/cidades/:idCidade', (req,res, next) => {
    const idCity = req.params.idCidade;
    knex('cidades')
        .where( 'id', idCity)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto não encontrado'));
        }
        res.send('Produto não encontrado');
    }, next);    
});

servidor.get('/categorias/:idCategoria', (req,res, next) => {
    const idCat = req.params.idCategoria;
    knex('categorias')
        .where( 'id', idCat)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto não encontrado'));
        }
        res.send(dados);
    }, next);    
});

servidor.post('/categorias', (req,res, next) => {
    knex('categorias')
        .insert(req.body)
        .then( (dados) => {
            res.send(dados);            
    }, next);
});

servidor.put('/categorias/:idCategoria', (req,res, next) => {
    const idCat = req.params.idCategoria;
    knex('categorias')
        .where( 'id', idCat)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Cliente não encontrado'));
        }
        res.send('Cliente Atualizado');
    }, next);
});

servidor.del('/categorias/:idCategoria', (req,res, next) => {
    const idCat = req.params.idCategoria;
    knex('categorias')
        .where( 'id', idCat)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto não encontrado'));
        }
        res.send('Produto não encontrado');
    }, next);    
});