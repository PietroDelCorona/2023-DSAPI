$(document).ready(function(){
    // $("button").hide()
    
    var v1 = $("#numValor01");
    var v2 = $("#numValor02");

    $("#btnSomar").click( function(){
        //var valor01 = $("#txtValor01").val();
        //var valor02 = $("#txtValor02").val();
        //var result = parseFloat(valor01) + parseFloat(valor02);
        var result = parseFloat( v1.val() ) + parseFloat( v2.val() );
        $("#resultado").html( "<b>" + result + "</b>");
    });
    
    $("#btnSubtrair").click( function(){
        //var valor01 = $("#txtValor01").val();
        //var valor02 = $("#txtValor02").val();
        //var result = parseFloat(valor01) - parseFloat(valor02);
        var result = parseFloat( v1.val() ) - parseFloat( v2.val() );
        $("#resultado").html( "<b>" + result + "</b");
        if( result < 0){
            $("#resultado").css("color", "red");
        }else{
            $("#resultado").css("color", "black");
        }
    })

    $("#btnMultiplicar").click( function(){
        //var valor01 = $("#txtValor01").val();
        //var valor02 = $("#txtValor02").val();
        //var result = parseFloat(valor01) * parseFloat(valor02);     
        var result = parseFloat(v1.val()) * parseFloat(v2.val());
        $("#resultado").html( "<b>" + result + "</b");
        if( result == 0){
            $("#resultado").css("color", "red");
        }else{
            $("#resultado").css("color", "black");
        }
    })

    $("#btnDividir").click( function(){
        //var valor01 = $("#txtValor01").val();
        //var valor02 = $("#txtValor02").val();
        //var result = parseFloat(valor01) / parseFloat(valor02);       
        var result = parseFloat(v1.val()) / parseFloat(v2.val());
        $("#resultado").html( "<b>" + result + "</b>");
        if( result < 1 && result > 0){
            $("#resultado").css("color", "red");
        }
               
    })




});