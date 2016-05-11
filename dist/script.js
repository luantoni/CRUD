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
		ocultarAdicionar ()
}

function editar(){
	var entrada = $("#numero").val();
 		nome = $("#nome").val();
		valor = $("#valor").val();
		estoque = $("#estoque").val();
		status = $('input[name=marcaStatus]:checked').val();

		nome = nome.toLowerCase()
	$.ajax({
		type: 'PUT',
		url: host["urlProduct"] + entrada,
		data: {
			nome:  nome,
			valor: valor,
			status: status,
			estoque: estoque,
		}
	})
}

function deletar(){
	var entrada = $("#numero").val();
	$.ajax({
	    type: 'DELETE',
	    url: host["urlProduct"] + entrada,
	});
	$("#dados").html('Fruta apagada!');
	ocultarAdicionar ()
}

function adicionar(){
	var nome = $("#nome").val();
		valor = $("#valor").val();
		estoque = $("#estoque").val();
		status = $('input[name=marcaStatus]:checked').val();

		nome = nome.toLowerCase()
	$.ajax({
		type: "POST",
		url: host["urlProduct"],
		data: {
			nome:  nome,
			valor: valor,
			status: status,
			estoque: estoque,
		}
	});
}

function mostrarEditar(){
	$("#dados").html('');
    $("#novaFruta").show();
    $("#adicionar").hide()
    $("#edit").show()
}

function mostrarAdicionar (){
	$("#dados").html('');
    $("#novaFruta").show();
    $("#edit").hide()
    $("#adicionar").show()
}

function ocultarAdicionar (){
	$("#novaFruta").hide();
}

$(document).ready(function(){
	chamaLista();
	$("#novaFruta").hide();
	$("#atualizar").click(function(){
		chamaLista();
	});
	$("#botao").click(function(){
		tipoEntrada();
	});
	$("#deletar").click(function(){
		deletar();
	});
	$("#adicionarFruta").click(function(){
		mostrarAdicionar();
	});
	$("#adicionar").click(function(){
		adicionar();
	});
	$("#editar").click(function(){
		mostrarEditar();
	});
	$("#edit").click(function(){
		editar();
	});
}); 