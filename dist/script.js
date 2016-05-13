var host = {urlProduct:"http://localhost:3000/product/"};

function chamaLista(){
	$.getJSON(host.urlProduct, function (list){
		var lista = '';
		var i;
		for(i=0; i < list.length; i++){
			lista += "<span class='"+list[i].status+"'>"+ list[i].id + " - " + list[i].nome + " - R$ " + list[i].valor + "</span><br>";
		}
		$("#disponivel").html(lista);
	})
}

function escrevendoSaida(data){
	var saida = "";
	saida = "Fruta: " + data.nome + "<br>" +
	"Valor: R$ " + data.valor + "<br>" +
	"Status: " + data.status + "<br>" +
	"Estoque: " + data.estoque + "<br>";
	$("#dados").html(saida);
}

function chamaIndividual(entrada){
	$.getJSON(host.urlProduct + entrada, function (data){ //.getJSON faz uma requisição e o que retornar ele transforma em JSON
		escrevendoSaida(data);
		$("#editar").show();
		$("#deletar").show();
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
	    url: host.urlProduct + entrada,
	    success: function(){
	    	chamaLista();
	    }
	});
	ocultarAdicionar ();
	$("#dados").show();
	mensagemDeletar();
	$("#editar").hide();
	$("#deletar").hide();
	$("#barraId").show();
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
		},
		success: function(){
			chamaLista();
		}
	});
}

function editar(){
	entrada = $("#numero").val();
	if($("#nome").val() !== '' && $("#valor").val() !== '' && $("#estoque").val() !== ''){
		ajax('PUT',host.urlProduct + entrada);
	}
	else{
		alert("Preencha todos os campos para adicionar uma nova fruta!");
	}
}

function adicionar(){
	if($("#nome").val() !== '' && $("#valor").val() !== '' && $("#estoque").val() !== ''){
		ajax('POST',host.urlProduct);
	}
	else{
		alert("Preencha todos os campos para adicionar uma nova fruta!");
	}
}

function mostrarEditar(){
	$("#dados").hide();
    $("#novaFruta").show();
    $("#adicionar").hide();
    $("#edit").show();
    $("#editar").hide();
	$("#deletar").hide();
	$("#barraId").show();
}

function mostrarAdicionar(){
	$("#dados").hide();
    $("#novaFruta").show();
    $("#edit").hide();
    $("#adicionar").show();
    $("#editar").hide();
	$("#deletar").hide();
	$("#barraId").hide();
	$("#botao").hide();
	$("#adicionarFruta").hide();
}

function ocultarAdicionar(){
	$("#novaFruta").hide();
}

function inicia(){
	chamaLista();
	$("#dados").hide();
	$("#novaFruta").hide();
	$("#editar").hide();
	$("#deletar").hide();
	$("#barraId").show();
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