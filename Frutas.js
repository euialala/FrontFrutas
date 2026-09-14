const API_URL = "https://localhost:7273/Fruta";

const formFruta = document.getElementById("form-fruta");
const lista = document.getElementById("lista");


// =============================
// BUSCAR FRUTAS
// =============================

async function buscarFrutas() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar frutas");
        }

        const frutas = await response.json();

        lista.innerHTML = "";

        frutas.forEach(fruta => {

            const card = document.createElement("div");

            card.classList.add("fruta-card");

            card.innerHTML = `
                <h3>${fruta.nome}</h3>

                <p><strong>Cor:</strong> ${fruta.cor}</p>

                <p>
                    <strong>Preço:</strong>
                    R$ ${Number(fruta.preco).toFixed(2)}
                </p>

                <p>
                    <strong>Distribuidora:</strong>
                    ${fruta.distribuidora}
                </p>

                <p>
                    <strong>Peso:</strong>
                    ${fruta.peso}
                </p>

                <p>
                    <strong>Origem:</strong>
                    ${fruta.origem}
                </p>

                <p>
                    <strong>Qualidade:</strong>
                    ${fruta.qualidade}
                </p>

                <p>
                    <strong>Safra:</strong>
                    ${fruta.safra}
                </p>

                <p>
                    <strong>Espécie:</strong>
                    ${fruta.especie}
                </p>

                <button onclick="deletarFruta(${fruta.id})">
                    Excluir
                </button>
            `;

            lista.appendChild(card);

        });

    } catch (error) {

        console.error("Erro:", error);

        lista.innerHTML = `
            <p>
                Não foi possível carregar as frutas.
                Verifique se a API C# está funcionando.
            </p>
        `;
    }
}


// =============================
// CADASTRAR FRUTA
// =============================

formFruta.addEventListener("submit", async (event) => {

    event.preventDefault();

    const novaFruta = {

        nome: document.getElementById("nome").value,

        cor: document.getElementById("cor").value,

        preco: parseFloat(
            document.getElementById("preco").value
        ),

        distribuidora:
            document.getElementById("distribuidora").value,

        peso: parseFloat(
            document.getElementById("peso").value
        ),

        origem:
            document.getElementById("origem").value,

        qualidade:
            document.getElementById("qualidade").value,

        safra: parseInt(
            document.getElementById("safra").value
        ),

        especie:
            document.getElementById("especie").value
    };


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(novaFruta)

        });


        if (response.ok) {

            alert("Fruta cadastrada com sucesso!");

            formFruta.reset();

            buscarFrutas();

        } else {

            alert("Erro ao cadastrar fruta.");

        }

    } catch (error) {

        console.error("Erro:", error);

        alert("Não foi possível conectar com a API.");

    }

});


// =============================
// EXCLUIR FRUTA
// =============================

async function deletarFruta(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta fruta?"
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

            alert("Fruta excluída com sucesso!");

            buscarFrutas();

        } else {

            alert("Erro ao excluir fruta.");

        }

    } catch (error) {

        console.error("Erro:", error);

    }

}


// Iniciar
buscarFrutas();