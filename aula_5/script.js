function gerarObjeto(){
    var pessoa = {
        nome: 'Maria' ,
        idade: 25 ,
        altura: 1.85 ,
        aluno: true ,
        formaturas: [ 2006, 2013, 2017] ,
        cursos: [ "Técnico", "Graduação", "Mestrado"] ,
        cnh: { numero: "123456", categoria: "AB"},
        filhos: [
            {nome: "Jose", idade: 10},
            {nome: "Julia", idade: 14}
        ],
        endereco: null
    }
    $("#dadosJSON").html(JSON.stringify(pessoa));
}

function lerJSON(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var pessoa = JSON.parse( this.responseText);
            texto = "Nome: " + pessoa.nome + "<br>";
            texto += "Idade: " + pessoa.idade + "<br>";
            texto += "CNH: " + pessoa.cnh.categoria + "<br>";
            texto += "Filhos: <br>";
            pessoa.filhos.forEach( filho =>{
                texto += "Nome: " + filho.nome + " - Idade: " + filho.idade + "<br>";
            });
            $("#resposta").html( texto );
        }
    
    }
    xhttp.open("GET", "meuJSON.json", true);
    xhttp.send();
}