function validar(){
    var valor = document.getElementById("txtValor").value;
    var pInfo = document.getElementById("info");
    if( valor == ""){
        pInfo.innerHTML = "O valor deve ser preenchido!"
        return false;
    }else{
        if( isNaN(valor)){
            pInfo.innerHTML = "O valor deve ser um número!"
            return false;
        }else{
            if( valor > 0 && valor < 11){
                return true;
            }else{
                pInfo.innerHTML = "Valor não permitido!"
                return false;
            }
        }
    }
}

function lerObjeto(){
    var carro = { modelo : "Doblo" , ano : 2006 };

    var pessoa = {
        nome : "Maria" ,
        idade : 25 ,
        altura : 1.8 ,
        temFilhos : true ,
        endereco : null ,
        veiculo: carro ,
        filhos : [ {nome : "Carlos" , idade : 10 }, {nome : "Júlia" , idade: 8 } ,
        ] ,
        formacao : [ 2006 , 2013 , 2017 ] ,
        imprimir : function(){
            texto = this.nome + " - idade: " + this.idade + " - Carro: " + this.veiculo.modelo;
            return texto;
        }      


    }
    document.getElementById("divObjeto").innerHTML = pessoa.imprimir();

}

// Construir o objeto que possui os atributos largura e altura. Este objeto deverá conter um método que calcula a área do
// retângulo. Criar no HTML, dois campos para que o usuário preencha com os valores para base e altura. Criar um botão
// que irá mostrar o resultado para o usuário.

function calcularArea(){
    var retangulo = {
        base : document.getElementById("valorBase").value ,
        altura : document.getElementById("valorAltura").value ,
        areaImpressa : function(){
            area = this.base * this.altura
            return area;
        }

    }
    document.getElementById("divArea").innerHTML = retangulo.areaImpressa();
}
