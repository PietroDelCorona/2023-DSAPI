function ler(){
    var http = new XMLHttpRequest();
    
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            document.write("Dados: " + this.responseText + "<hr>");
            var dadosXml = this.responseXML;
            var produtos = dadosXml.getElementsByTagName("produto");
            document.getElementById("divTab").innerHTML            
            for (i = 0; i < produtos.length; i++) {
                document.write("   <tr>");
                var id = produtos[i].getElementsByTagName("id");
                var nome = produtos[i].getElementsByTagName("nome");
                var preco = produtos[i].getElementsByTagName("preco");
                document.write("     <td>" + id[0].childNodes[0].nodeValue + "</td>");
                document.write("     <td>" + nome[0].childNodes[0].nodeValue + "</td>");
                document.write("     <td>" + preco[0].childNodes[0].nodeValue + "</td>");
                document.write("   </tr>");            
            }
            document.write("   </table>");
            
        }
    };
    
    http.open("GET", "servidor_xml.php", true);
    http.send();

}