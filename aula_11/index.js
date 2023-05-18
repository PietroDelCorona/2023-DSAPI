const restify = require('restify');
const errors = require('restify-errors');

const servidor = restify.createServer({
    name: 'loja_dsapi',
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
            return res.send( new errors.BadRequestError('Cidade não encontrada'));
        }
        res.send('Cidade Atualizada');
    }, next);    
});

servidor.del('/cidades/:idCidade', (req,res, next) => {
    const idCity = req.params.idCidade;
    knex('cidades')
        .where( 'id', idCity)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Cidade não encontrada'));
        }
        res.send('Cidade não encontrada');
    }, next);    
});

servidor.get('/clientes/:idCliente', (req,res, next) => {
    const idClient = req.params.idCliente;
    knex('clientes')
        .join('cidades', 'clientes.id_cidade', 'cidades.id')
        .where( 'id', idClient)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Cliente não encontrado'));
        }
        res.send(dados);
    }, next);    
});

servidor.post('/clientes', (req,res, next) => {
    knex('clientes')
        .insert(req.body)
        .then( (dados) => {
        res.send(dados);
    }, next);    
});

servidor.put('/clientes/:idCliente', (req,res, next) => {
    const idClient = req.params.idCliente;
    knex('clientes')
        .join('cidades', 'clientes.id_cidade', 'cidades.id')
        .where( 'id', idClient)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Cliente não encontrado'));
        }
        res.send('Cliente Atualizado');
    }, next);    
});

servidor.del('/clientes/:idCliente', (req,res, next) => {
    const idClient = req.params.idCliente;
    knex('clientes')
        .where( 'id', idClient)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Cliente não encontrado'));
        }
        res.send('Cliente não encontrado');
    }, next);    
});

servidor.get('/pedidos/:idPedido', (req,res, next) => {
    const idOrder = req.params.idPedido;
    knex('pedidos')
        .join('clientes', 'pedidos.id_cliente', 'clientes.id')
        .where( 'id', idOrder)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Pedido não encontrado'));
        }
        res.send(dados);
    }, next);    
});

servidor.post('/pedidos', (req,res, next) => {
    knex('pedidos')
        .insert(req.body)
        .then( (dados) => {
        res.send(dados);
    }, next);    
});

servidor.put('/pedidos/:idPedido', (req,res, next) => {
    const idOrder = req.params.idPedido;
    knex('pedidos')
        .join('cidades', 'clientes.id_cidade', 'cidades.id')
        .where( 'id', idOrder)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Pedido não encontrado'));
        }
        res.send('Pedido Atualizado');
    }, next);    
});

servidor.del('/pedidos/:idPedido', (req,res, next) => {
    const idOrder = req.params.idPedido;
    knex('pedidos')
        .where( 'id', idOrder)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Pedido não encontrado'));
        }
        res.send('Pedido não encontrado');
    }, next);    
});

servidor.get('/categorias/:idCategoria', (req,res, next) => {
    const idCat = req.params.idCategoria;
    knex('categorias')
        .where( 'id', idCat)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Categoria não encontrada'));
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
            return res.send( new errors.BadRequestError('Categoria não encontrada'));
        }
        res.send('Categoria Atualizada');
    }, next);
});

servidor.del('/categorias/:idCategoria', (req,res, next) => {
    const idCat = req.params.idCategoria;
    knex('categorias')
        .where( 'id', idCat)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Categoria não encontrada'));
        }
        res.send('Categoria não encontrada');
    }, next);    
});

servidor.get('/produtos/:idProd', (req,res, next) => {
    const idProduct = req.params.idPedido;
    knex('produtos')
        .join('categorias', 'produtos.id_categoria', 'categorias.id')
        .where( 'id', idProduct)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto não encontrado'));
        }
        res.send(dados);
    }, next);    
});

servidor.post('/produtos', (req,res, next) => {
    knex('produtos')
        .insert(req.body)
        .then( (dados) => {
        res.send(dados);
    }, next);    
});

servidor.put('/produtos/:idProd', (req,res, next) => {
    const idProduct = req.params.idPedido;
    knex('produtos')
        .join('categorias', 'produtos.id_categoria', 'categorias.id')
        .where( 'id', idProduct)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Produto não encontrado'));
        }
        res.send('Produto Atualizado');
    }, next);    
});

servidor.del('/produtos/:idProd', (req,res, next) => {
    const idProduct = req.params.idProd;
    knex('produtos')
        .join('id', 'categorias', idCat)
        .where( 'id', idProduct)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto não encontrado'));
        }
        res.send('Produto não encontrado');
    }, next);    
});

servidor.get('/pedidos_produtos/:idPedidosProdutos', (req,res, next) => {
    const idOrder_Product = req.params.idPedidosProdutos;
    knex('pedidos_produtos')
        .join('pedidos', 'pedidos_produtos.id_pedido', 'pedidos.id')
        .join('produtos', 'pedidos_produtos.id_produto', 'produtos.id')
        .where( 'id', idOrder_Product)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto e Pedido não encontrados'));
        }
        res.send(dados);
    }, next);    
});

servidor.post('/pedidos_produtos', (req,res, next) => {
    knex('pedidos_produtos')
        .insert(req.body)
        .then( (dados) => {
        res.send(dados);
    }, next);    
});

servidor.put('/pedidos_produtos/:idPedidosProdutos', (req,res, next) => {
    const idOrder_Product = req.params.idPedidosProdutos;
    knex('pedidos_produtos')
        .join('pedidos', 'pedidos_produtos.id_pedido', 'pedidos.id')
        .join('produtos', 'pedidos_produtos.id_produto', 'produtos.id')
        .where( 'id', idOrder_Product)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Produto e Pedido não encontrados'));
        }
        res.send('Produto e Pedido Atualizados');
    }, next);    
});

servidor.del('/pedidos_produtos/:idPedidosProdutos', (req,res, next) => {
    const idOrder_Product = req.params.idPedidosProdutos;
    knex('pedidos_produtos')   
        .where( 'id', idOrder_Product)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto e Pedido não encontrados'));
        }
        res.send('Produto e Pedido não encontrados');
    }, next);    
});