function siteCarregado() {
    console.log("Site Nil Frutas carregado com sucesso!");
}
window.onload = siteCarregado;

// ================= CARRINHO =================
let carrinho = [];
const frete = 5.00;

function adicionarCarrinho(nome, preco, idQtd) {
    const qtd = parseInt(document.getElementById(idQtd).value);

    const existente = carrinho.find(item => item.nome === nome);

    if (existente) {
        existente.qtd += qtd;
    } else {
        carrinho.push({ nome, preco, qtd });
    }

    atualizarCarrinho();
}

function removerItem(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalSpan = document.getElementById("total");

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.qtd;
        total += subtotal;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nome} - ${item.qtd}x (R$ ${subtotal.toFixed(2)})
            <button onclick="removerItem('${item.nome}')">Remover</button>
        `;
        lista.appendChild(li);
    });

    total += frete;
    totalSpan.textContent = total.toFixed(2);
}

function finalizarPedido() {
    const nome = document.getElementById("nome").value;
    const bairro = document.getElementById("bairro").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const referencia = document.getElementById("referencia").value;

    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    if (!nome || !bairro || !rua || !numero) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    let mensagem = `*Pedido Nil Frutas*%0A%0A`;
    mensagem += `Cliente: ${nome}%0A%0A`;

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (${item.qtd}x) - R$ ${(item.preco * item.qtd).toFixed(2)}%0A`;
    });

    mensagem += `%0A Frete: R$ 5,00`;
    mensagem += `%0A Endereço:%0A${rua}, Nº ${numero}%0A${bairro}%0ARef: ${referencia}`;

    const numeroWhatsApp = "5577981242513";
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, "_blank");
}
