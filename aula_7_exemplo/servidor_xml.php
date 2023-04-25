<?php 
    
    header('Content-Type: application/xml; charset=utf-8');

    $user = "root";
    $password = "";
    $banco = "loja_xml_aula";
    $local = "localhost";

    $conn = mysqli_connect($local, $user, $password, $banco);
    if( $conn){
        $result = mysqli_query( $conn, "SELECT * FROM itens");
        $xml = '<?xml version="1.0" enconding="UTF-8" ?>';
        $xml .= '<lista_produtos>';
        while( $produto = mysqli_fetch_array($result)){
            $xml .= '<produto> ';
            $xml .= '    <id>'.$produto["id"].'</id>';
            $xml .= '    <nome>'.$produto["nome"].'</nome>';
            $xml .= '    <preco>'.$produto["preco"].'</preco>';
            $xml .= '</produto>';
        }
        $xml .='</lista_produtos>';
        echo $xml;
    }

?>