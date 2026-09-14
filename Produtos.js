const API_URL = "https://localhost:7273/Produto";

const formProduto =
    document.getElementById("form-produto");

const listaProdutos =
    document.getElementById("lista-produtos");


// =============================
// BUSCAR PRODUTOS
// =============================

async function buscarProdutos() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        const produtos = await response.json();

        listaProdutos.innerHTML = "";


        produtos.forEach(produto => {

            const card =
                document.createElement("div");

            card.classList.add("fruta-card");


            card.innerHTML = `

                <h3>${produto.nome}</h3>

                <p>
                    <strong>Preço:</strong>
                    R$ ${Number(produto.preco).toFixed(2)}
                </p>

                <p>
                    <strong>Estoque:</strong>
                    ${produto.estoque}
                </p>

                <p>
                    <strong>Validade:</strong>
                    ${produto.validade}
                </p>

                <p>
                    <strong>Fabricação:</strong>
                    ${produto.fabricacao}
                </p>

                <p>
                    <strong>Categoria:</strong>
                    ${produto.categoria}
                </p>

                <p>
                    <strong>Marca:</strong>
                    ${produto.marca}
                </p>

                <p>
                    <strong>Unidade:</strong>
                    ${produto.unidade}
                </p>

                <p>
                    <strong>Descrição:</strong>
                    ${produto.descricao}
                </p>

                <button
                    onclick="deletarProduto(${produto.id})">
                    Excluir
                </button>

            `;


            listaProdutos.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        listaProdutos.innerHTML = `
            <p>
                Não foi possível carregar os produtos.
            </p>
        `;

    }

}


// =============================
// CADASTRAR PRODUTO
// =============================

formProduto.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const novoProduto = {

            nome:
                document.getElementById("nome").value,

            preco:
                parseFloat(
                    document.getElementById("preco").value
                ),

            estoque:
                parseInt(
                    document.getElementById("estoque").value
                ),

            validade:
                document.getElementById("validade").value,

            fabricacao:
                document.getElementById("fabricacao").value,

            categoria:
                document.getElementById("categoria").value,

            marca:
                document.getElementById("marca").value,

            unidade:
                document.getElementById("unidade").value,

            descricao:
                document.getElementById("descricao").value

        };


        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(novoProduto)

            });


            if (response.ok) {

                alert(
                    "Produto cadastrado com sucesso!"
                );

                formProduto.reset();

                buscarProdutos();

            } else {

                alert(
                    "Erro ao cadastrar produto."
                );

            }


        } catch (error) {

            console.error(error);

            alert(
                "Não foi possível conectar com a API."
            );

        }

    }
);


// =============================
// EXCLUIR PRODUTO
// =============================

async function deletarProduto(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este produto?"
    );


    if (!confirmar) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (response.ok) {

            alert(
                "Produto excluído com sucesso!"
            );

            buscarProdutos();

        } else {

            alert(
                "Erro ao excluir produto."
            );

        }

    } catch (error) {

        console.error(error);

    }

}


// Iniciar
buscarProdutos();