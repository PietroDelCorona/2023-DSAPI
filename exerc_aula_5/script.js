function gerarObjeto(){
    var pessoa = {
        nome: 'Fernando' ,
        idade: 33 ,
        altura: 1.92 ,
        aluno: false,
        cursos: ["Graduação", "Mestrado", "Doutorado"] ,
        formaturas: [2014, 2016, 2020] ,
        cnh: { numero: "5895481", categoria: "B"},
        filhos: [
            {nome: "Dário", idade: 14},
            {nome: "Marcela", idade: 8}
        ],
        endereco: "Rua B, 8567"        
    }
    $("#dados_JSON").html(JSON.stringify(pessoa));
}

function ler_JSON(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var pessoa = JSON.parse( this.responseText);
            texto = "Nome: " + pessoa.nome + "<br>";
            texto += "Idade: " + pessoa.idade + "<br>";
            texto += "Altura: " + pessoa.altura + "<br>";
            texto += "Aluno: " + pessoa.aluno + "<br>";
            texto += "Formaturas: " + pessoa.formaturas + "<br>";
            texto += "CNH: " + pessoa.cnh.categoria + "<br>";
            texto += "Filhos: <br>";
            pessoa.filhos.forEach(filho => {
                texto += "Nome: " + filho.nome + " - Idade: " + filho.idade + "<br>";
            });
            $("#resposta").html( texto);
        
        }
    }
    xhttp.open("GET", "meu_arqJSON.json", true);
    xhttp.send();
}