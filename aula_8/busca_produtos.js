const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

var mysql = require("mysql");

var conn = mysql.createConnection({
    host: "localhost" ,
    user: "root" ,
    password: "",
    database: "loja"
});

const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'text/plain');
    // res.end("Oi Mundo!");
    conn.connect( function(erro){
        if( !erro){
            sql = "SELECT * FROM produto ORDER BY nome";
            conn.query( sql, function(err, result, fields){
                if( !err ){
                    //console.log(result);
                    res.end( JSON.stringify(result));
                }else{
                    //console.log(err);
                    res.end( err );
                }
            });
        }
    });
});

server.listen( port, hostname, ()=> {
console.log("Servidor executado em: http://" + hostname + ":" + port + "/");
});