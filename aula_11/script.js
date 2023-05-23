function adicionarCidade() {
    var cidadeInput = document.getElementById("txtNome").value;
    
    fetch("http://localhost:8001/cidades")
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Erro na requisição. Status: " + response.status);
            }
            return response.json();
        })
        .then(function(dados) {
            var cidades = dados;

            var cidadeEncontrada = cidades.find(function(cidade) {
                return cidade.nome === cidadeInput;
            });

            if (cidadeEncontrada) {
                var table = document.createElement("table");
                var row = table.insertRow();
                var idCell = row.insertCell();
                var nomeCell = row.insertCell();

                idCell.innerHTML = cidadeEncontrada.id;
                nomeCell.innerHTML = cidadeEncontrada.nome;

                var tableContainer = document.getElementById('tableContainer');
                tableContainer.innerHTML = ''; // Limpa o conteúdo anterior
                tableContainer.appendChild(table);
            } else {
                alert("Cidade não encontrada");
            }
        })
        .catch(function(error) {
            var tableContainer = document.getElementById('tableContainer');
            tableContainer.innerHTML = 'Erro ao adicionar cidade: ' + error.message;
        });
}
