function mostrar(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 1){
            $("#divResposta").html("Solicitação enviada ao servidor");
        }
        if(this.readyState == 4){
            if(this.status == 200){
                $("#divResposta").html(this.responseText);
            }
            if(this.status == 404){
                $("#divResposta").html("Página não encontrada!")
            }
        }
    }
    xhttp.open("GET", "contato.txt", true);
    xhttp.send();
}