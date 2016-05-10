var host = {urlList:"http://localhost:3000/product", urlProduct:"http://localhost:3000/product/"};

function chamaLista (){
	$.getJSON(host["urlList"], function (list){
		var lista = '';
		var i;
		for(i=0; i < list.length; i++){
			lista += list[i].id + " - " + list[i].nome +"<br>";
		}
		$("#disponivel").html(lista);
	})
}

function chamaIndividual(entrada){
	entrada=entrada.toLowerCase()
	$.getJSON(host["urlProduct"] + entrada, function (data){ //.getJSON faz uma requisição e o que retornar ele transforma em JSON
		escrevendoSaida(data);
	})
	.fail(function() {
	    $("#dados").html('Fruta não disponível!');
	})
}

function escrevendoSaida (data){
	var saida = "";
	saida = "Fruta: " + data.nome + "<br>" +
	"Valor: R$ " + data.valor + "<br>" +
	"Status: " + data.status + "<br>" +
	"Estoque: " + data.estoque + "<br>";
	$("#dados").html(saida);
}

function tipoEntrada(){
	var entrada = $("#numero").val();
		chamaIndividual(entrada);
}

$(document).ready(function(){
	$("#botao").click(function(){
		tipoEntrada();
	});
	chamaLista();
	$("#att").click(function(){
		chamaLista();
	});
}); 