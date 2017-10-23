console.log("Funcione meu filho");


function criarArrayDeDicionario() {
	var file = document.getElementById('dicionario').files[0];
	var reader = new FileReader();
  
    if (file) {
      new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (evt) {
          resolve(evt.target.result);
        };
        reader.readAsText(file);
        reader.onerror = reject;
      })
      .then(executar)
      .catch(function(err) {
        console.log(err)
      });
	}
}

function executar(dicionario) {
	// - Ler o dicionário e salvar numa variável 
	// - Ler a mensagem e salvar numa variável 
	var mensagem = document.getElementById("mensagem").value;
	// - Ler a senha e salvar numa variável [ SOMENTE NUMÉRICA ]
	var senha = document.getElementById("senha").value;
	var acao_cifrar = document.getElementById("cifrar").checked;
	var acao_decifrar = document.getElementById("decifrar").checked;
	// - Executar ~~~~~~~~~~o~~~~~~~~~~~ 
	// -- cria variável FRASE
	var frase = "";
/* 	if (senha.matches("[0-9]+")) {

	}  */
	// -- ENQUANTO percorre a mensagem, para cada char da mensagem
	for (var i = 0; i < mensagem.length; i++) {
		// --- pega o grau de cifra da senha
		var grau = parseInt(senha[i %  senha.length]);
		// --- pega a letra da mensagem, salva em uma variável auxiliar e busca no dicionário
		var letra_aux = mensagem[i];

		if (acao_cifrar) {
			// --- salva a nova letra na variável FRASE
			frase += cifrar(grau, letra_aux, dicionario);
		}
		else {
			// --- salva a nova letra na variável FRASE
			frase += decifrar(grau, letra_aux, dicionario);
		}
		
	}
	// --- acabou a mensagem
	console.log(frase);
	// -- retorna a variável FRASE	
	document.getElementById("output").innerHTML = frase;
}

// 1º SE FOR cifrar
// --- consulta no dicionário a letra que é modificada pelo grau de cifra
function cifrar(grau, letra, dicionario) {
	var indice = dicionario.indexOf(letra);
	// --- se a letra não existe no dicionário
	if (indice == -1) {
		return letra;
	}
	// ---- soma a letra atual com o grau
	console.log("Índice do dicionário: " + indice);
	indice += grau;
	console.log("Índice do dicionário com grau: " + indice);	
	return dicionario[indice % dicionario.length];
}

// 2º SE FOR decifrar
function decifrar(grau, letra, dicionario) {
	// ---- subtrai a letra atual com o grau
	var indice = dicionario.indexOf(letra);
	// ----- se a letra não existe no dicionário
	if (indice == -1) {
		return letra;
	}
	var tamanhoDicionario = dicionario.length;
	indice -= grau;
	
	// ----- quando o índice é menor que zero, ele volta para o final do dicionário
	if (indice < 0) {
		// ----- faz um cálculo dos limites do array 
		indice = (indice % tamanhoDicionario);
		// ----- adiciona o número negativo ao tamanho do dicionário 
		// => significa ler o dicionário ao contrário
		indice += tamanhoDicionario;
		// retorna a letra
		return dicionario[indice];
	}

	// ---- o caso quando o índice não ficou abaixo de 0
	return dicionario[indice % dicionario.length];
}

function enviar() {
	// var $_mensagem = document.getElementById("mensagem").value;
	// var $_senha = document.getElementById("senha").value;
	// var $_cifrar = document.getElementById("cifrar").checked;
	// var $_decifrar = document.getElementById("decifrar").checked;
	criarArrayDeDicionario();
}

