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

function escrevendoSaida (data){
	var saida = "";
	saida = "Fruta: " + data.nome + "<br>" +
	"Valor: R$ " + data.valor + "<br>" +
	"Status: " + data.status + "<br>" +
	"Estoque: " + data.estoque + "<br>";
	$("#dados").html(saida);
}

function chamaIndividual(entrada){
	$.getJSON(host["urlProduct"] + entrada, function (data){ //.getJSON faz uma requisição e o que retornar ele transforma em JSON
		escrevendoSaida(data);
	})
	.fail(function() {
	    $("#dados").html('Fruta não disponível!');
	})
}

function pesquisar(){
	var entrada = $("#numero").val();
		chamaIndividual(entrada);
		ocultarAdicionar ();
		$("#dados").show();
}

function mensagemDeletar(){
	var entrada = $("#numero").val();
	if (entrada !=''){
		$("#dados").html('Fruta apagada!');
	}
	else{
		$("#dados").html('Digite um ID para apagar!');
	}
}

function deletar(){
	var entrada = $("#numero").val();
	$.ajax({
	    type: 'DELETE',
	    url: host["urlProduct"] + entrada,
	});
	ocultarAdicionar ();
	$("#dados").show();
	mensagemDeletar();
}

function ajax (tipo,link){
	var nome = $("#nome").val();
		valor = $("#valor").val();
		estoque = $("#estoque").val();
		status = $('input[name=marcaStatus]:checked').val();

	nome = nome.toLowerCase();
	$.ajax({
		type: tipo,
		url: link,
		data: {
			nome: nome,
			valor: valor,
			status: status,
			estoque: estoque,
		}
	});
}

function editar(){
	entrada = $("#numero").val();
	ajax('PUT',host["urlProduct"] + entrada);

}

function adicionar(){
	ajax('POST',host["urlProduct"]);
}

function mostrarEditar(){
	$("#dados").hide();
    $("#novaFruta").show();
    $("#adicionar").hide();
    $("#edit").show();
}

function mostrarAdicionar (){
	$("#dados").hide();
    $("#novaFruta").show();
    $("#edit").hide();
    $("#adicionar").show();
}

function ocultarAdicionar (){
	$("#novaFruta").hide();
}

function inicia (){
	chamaLista();
	$("#dados").hide();
	$("#novaFruta").hide();
}

$(document).ready(function(){
	inicia();
	$("#atualizar").click(function(){
		chamaLista();
	});
	$("#botao").click(function(){
		pesquisar();
	});
	$("#deletar").click(function(){
		deletar();
		chamaLista();
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