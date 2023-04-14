<?php


    header("Content-type: application");

    $user = "root";
    $password = "";
    $banco = "loja_exercicio";
    $local = "localhost";

    $connect = mysqli_connect($local, $user, $password, $banco);

    if( $connect){

        if( isset($_REQUEST['listar'])){
            $sql = "SELECT * FROM produto ORDER BY id";
            $result = mysqli_query($connect, $sql);
            $array = array();
            while( $linha = mysqli_fetch_assoc($result)){
                $array[] = $linha;
            }
            echo '{ "produtos" : '.json_encode($array) . ' } ';
        }
        if( isset( $_REQUEST['cadastrar'])){
            $nome = $_GET["nome"];
            $preco = $_GET["preco"];
            $qtd = $_GET["qtd"];
            $nota = $_GET["nota"];
            $sql = "INSERT INTO produto (nome, preco, qtd, nota) VALUES ('$nome', $preco, $qtd, $nota) ";
            mysqli_query($connect, $sql);
            $result = mysqli_insert_id($connect);

            if($result > 0){
                echo '{ "resposta" : "ok", "id" : '.$result.' } ';
            }else{
                echo '{ "resposta" : "erro" } ';
            }
        
        }
        
        mysqli_close($connect);
    }

?>