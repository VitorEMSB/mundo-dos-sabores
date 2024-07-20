var somaTotal = 0;

function addProdutos() {
    let divCardapio = document.querySelector("#cardapio");
    let nomeProdutos = ["macarrao", "lasanha", "kare", "churrasco", 
                        "sucos", "refrigerantes", "cafe", "cha", 
                        "bolo", "sorvete", "milkshake", "torta"];
    let precoProdutos = [10, 20, 15, 50, 
                         3, 5, 10.50, 5, 
                         20, 10, 15, 30];
    let produtos = document.querySelector("#produtos");
    let divProduto = document.querySelector(".produto");
    let tam = 2000;
    let cont = 400;
    let contACada4 = 0;
    for(let i = 0; i < nomeProdutos.length; i++) {
        if(i > 35) {
            alert("Número de produtos excedido!");
            break;
        }

        produtos.innerHTML += `
        <div class="produto">
            <p>${String(nomeProdutos[i]).toUpperCase()}</p>
            <img src="./imagens/produtos/${nomeProdutos[i]}.jpg">
            <p>Quantidade: <input class="qtd" type="number" value="0" min="0"></p>
            <br>
            <p>Preço(R$): <span class="preco">${String(precoProdutos[i].toFixed(2)).replace(".", ",")}</span></p>
            <button class="btnCompra buttonClass">Comprar</button>
        </div>
        `

        if(i > 12) {
            contACada4++;
            if(contACada4 >= 3) {
                tam += cont;
                divCardapio.style.height = `${tam + 400}px`;
                produtos.style.height = `${tam}px`;
                contACada4 = 0;
            }
        }


    }

    
}

function comprar() {
    let qtdProdutos = document.querySelectorAll(".qtd");
    let precoProdutos = document.querySelectorAll(".preco");
    let btnCompra = document.querySelectorAll(".btnCompra");
    let total = document.querySelector("p#total");
    const som = new Audio("sons/clickButtonComprar.mp3");
    for(let i = 0; i < btnCompra.length; i++) {
        btnCompra[i].addEventListener("click", ()=> {
            let preco = parseFloat(precoProdutos[i].textContent.replace(",", "."));
            let qtd = parseInt(qtdProdutos[i].value);
            somaTotal += preco * qtd;
            total.innerHTML = `R$: ${String(somaTotal.toFixed(2)).replace(".", ",")}`;
            qtdProdutos[i].value = 0;
            som.play();
            som.playbackRate = 1.3;
        });
    }
}

function validarNome() {
    let nome = document.querySelector("#nome").value;
    let validoOrNot = nome.match(/[a-z]*/ig);
    if(validoOrNot != null && validoOrNot != "") {
        return true;
    } else {
        return false;
    }
}

function validarEmail() {
    let email = document.querySelector("#email").value;
    let validoOrNot = email.match(/[a-z0-9.]+@[a-z0-9]+\.com/ig);
    if(validoOrNot != null && validoOrNot != "") {
        return true;
    } else {
        return false;
    }
}

function validarDados() {
    let tudoOkNome = validarNome();
    let tudoOkEmail = validarEmail();
    let spanAlert = document.querySelector("#spanAlert");
    let nome = document.querySelector("#nome");
    let email = document.querySelector("#email");
    let mensagem = document.querySelector("#mensagem");
    if(tudoOkNome && tudoOkEmail) {       
        spanAlert.style.display = "inline";
        spanAlert.innerHTML = "Tudo certo!";
        spanAlert.style.color = "green";
        nome.style.border = "none";
        email.style.border = "none";
        nome.value = "";
        email.value = "";
        mensagem.value = "";
        setTimeout(() => {
            alert("Email enviado com sucesso!");
        }, 1000);
    } else {
        if(!tudoOkNome) {
            nome.style.border = "2px solid red";
        } else {
            nome.style.border = "none";
        }
        
        if(!tudoOkEmail) {
            email.style.border = "2px solid red";
        } else {
            email.style.border = "none";
        }

        spanAlert.style.display = "inline";
        spanAlert.innerHTML = "Dados inválidos!";
        spanAlert.style.color = "red";
    }
}

addProdutos();
comprar();