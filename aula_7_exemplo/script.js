function ler(){
    var http = new XMLHttpRequest();
    
    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            document.write("Dados: " + this.responseText + "<hr>");
            var dadosXml = this.responseXML;
            var produtos = dadosXml.getElementsByTagName("produto");
            document.write("<table border='1'>");
            document.write("     <tr>");
            document.write("   <th>Id</th>");
            document.write("   <th>Nome</th>");
            document.write("   <th>Preço</th>");
            document.write("    </tr");
            for (i = 0; i < produtos.length; i++) {
                document.write("   <tr>");
                var id = produtos[i].getElementsByTagName("id");
                var id = produtos[i].getElementsByTagName("nome");
                var id = produtos[i].getElementsByTagName("preco");
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