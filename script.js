const produtos = [
    {
        id: 1,
        nome: "Chocolate Trufado",
        descricao: "Picolé gourmet de chocolate.",
        preco: 10,
        imagem: "https://placehold.co/400x400?text=Chocolate"
    },
    {
        id: 2,
        nome: "Leite Ninho",
        descricao: "Picolé gourmet de Leite Ninho.",
        preco: 10,
        imagem: "https://placehold.co/400x400?text=Leite+Ninho"
    },
    {
        id: 3,
        nome: "Morango Cremoso",
        descricao: "Picolé gourmet de morango.",
        preco: 10,
        imagem: "https://placehold.co/400x400?text=Morango"
    },
    {
        id: 4,
        nome: "Ovomaltine",
        descricao: "Picolé gourmet de Ovomaltine.",
        preco: 10,
        imagem: "https://placehold.co/400x400?text=Ovomaltine"
    },
    {
        id: 5,
        nome: "Prestígio",
        descricao: "Picolé gourmet de coco com chocolate.",
        preco: 10,
        imagem: "https://placehold.co/400x400?text=Prestigio"
    }
];

const listaProdutos = document.getElementById("lista-produtos");
const itensCarrinho = document.getElementById("itens-carrinho");
const totalCarrinho = document.querySelector(".total span");

let carrinho = [];

function carregarProdutos() {

    listaProdutos.innerHTML = "";

    produtos.forEach(produto => {

        listaProdutos.innerHTML += `
            <div class="card">

                <img src="${produto.imagem}">

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <h4>R$ ${produto.preco.toFixed(2).replace(".", ",")}</h4>

                <button onclick="adicionarCarrinho(${produto.id})">
                    Adicionar ao Carrinho
                </button>

            </div>
        `;

    });

}
function adicionarCarrinho(id){

    const produto = produtos.find(p => p.id === id);

    const itemExistente = carrinho.find(item => item.id === id);

    if(itemExistente){

        itemExistente.quantidade++;

    }else{

        carrinho.push({
            ...produto,
            quantidade:1
        });

    }

    atualizarCarrinho();

}
function atualizarCarrinho(){

    itensCarrinho.innerHTML="";

    let total=0;

    if(carrinho.length===0){

        itensCarrinho.innerHTML=
        "<p class='carrinho-vazio'>Seu carrinho está vazio.</p>";

        totalCarrinho.innerHTML="R$ 0,00";

        return;

    }

    carrinho.forEach(item=>{

        const subtotal = item.preco * item.quantidade;

        total += subtotal;

        itensCarrinho.innerHTML += `

            <div class="item-carrinho">

                <strong>${item.nome}</strong>

                <div class="controle-quantidade">

    <button onclick="diminuirQuantidade(${item.id})">➖</button>

    <span>${item.quantidade}</span>

    <button onclick="aumentarQuantidade(${item.id})">➕</button>

</div>
            

                    Subtotal:
                    <strong>

                    R$ ${subtotal.toFixed(2).replace(".",",")}

                    </strong>

                </p>
<button class="btn-remover" onclick="removerItem(${item.id})">
    🗑️ Remover
</button>
            </div>

            <hr>

        `;

    });

    totalCarrinho.innerHTML="R$ "+total.toFixed(2).replace(".",",");
    } 
function aumentarQuantidade(id){

    const item = carrinho.find(produto => produto.id === id);

    item.quantidade++;

    atualizarCarrinho();

}

function diminuirQuantidade(id){

    const item = carrinho.find(produto => produto.id === id);

    item.quantidade--;

    if(item.quantidade <= 0){

        carrinho = carrinho.filter(produto => produto.id !== id);

    }

    atualizarCarrinho();

}function removerItem(id){

    carrinho = carrinho.filter(item => item.id !== id);

    atualizarCarrinho();

}
carregarProdutos();
document.getElementById("finalizar").addEventListener("click", () => {

    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto ao carrinho.");
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const observacao = document.getElementById("observacao").value.trim();

    if (nome === "") {
        alert("Informe seu nome.");
        return;
    }

    if (telefone === "") {
        alert("Informe seu telefone.");
        return;
    }

    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;

    let mensagem = "🍦 *Novo Pedido - Assunção Doces Gourmet*%0A%0A";

    mensagem += "👤 *Nome:* " + nome + "%0A";
    mensagem += "📱 *Telefone:* " + telefone + "%0A%0A";

    mensagem += "🛒 *Pedido:*%0A";

    let total = 0;

    carrinho.forEach(item => {
        mensagem += "• " + item.nome + " - R$ " + item.preco.toFixed(2).replace(".", ",") + "%0A";
        total += item.preco;
    });

    mensagem += "%0A💰 *Total:* R$ " + total.toFixed(2).replace(".", ",") + "%0A";
    mensagem += "📍 *Forma de recebimento:* Retirada no local.%0A";
    mensagem += "💳 *Pagamento:* " + pagamento + "%0A";

    if (observacao !== "") {
        mensagem += "📝 *Observações:* " + observacao + "%0A";
    }

    const numero = "5516981147914";

    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
    });