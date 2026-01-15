let carrinho = [];
let frete = 5.00;

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalSpan = document.getElementById("total");

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        lista.appendChild(li);
        total += item.preco;
    });

    total += frete;
    totalSpan.textContent = total.toFixed(2);
}

function finalizarPedido() {
    const endereco = document.getElementById("endereco").value;

    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    if (endereco.trim() === "") {
        alert("Informe o endereço de entrega.");
        return;
    }

    let mensagem = "*Pedido Nil Frutas*%0A%0A";

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2)})%0A`;
    });

    mensagem += `%0AFrete: R$ 5,00`;
    mensagem += `%0AEndereço: ${endereco}`;

    const numeroWhatsApp = "5577981242513";
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    window.open(url, "_blank");
}

console.log("Site Nil Frutas carregado com sucesso");
