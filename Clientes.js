const API_URL = "https://localhost:7273/Cliente";

const formCliente =
    document.getElementById("form-cliente");

const listaClientes =
    document.getElementById("lista-clientes");


// =============================
// BUSCAR CLIENTES
// =============================

async function buscarClientes() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar clientes");
        }

        const clientes = await response.json();

        listaClientes.innerHTML = "";


        clientes.forEach(cliente => {

            const card =
                document.createElement("div");

            card.classList.add("fruta-card");


            card.innerHTML = `

                <h3>${cliente.nome}</h3>

                <p>
                    <strong>E-mail:</strong>
                    ${cliente.email}
                </p>

                <p>
                    <strong>Telefone:</strong>
                    ${cliente.telefone}
                </p>

                <p>
                    <strong>CEP:</strong>
                    ${cliente.cep}
                </p>

                <p>
                    <strong>Endereço:</strong>
                    ${cliente.endereco}
                </p>

                <p>
                    <strong>Cidade:</strong>
                    ${cliente.cidade}
                </p>

                <p>
                    <strong>Estado:</strong>
                    ${cliente.estado}
                </p>

                <p>
                    <strong>Data de nascimento:</strong>
                    ${cliente.datanascimento}
                </p>

                <p>
                    <strong>Gênero:</strong>
                    ${cliente.genero}
                </p>

                <button
                    onclick="deletarCliente(${cliente.id})">
                    Excluir
                </button>

            `;


            listaClientes.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        listaClientes.innerHTML = `
            <p>
                Não foi possível carregar os clientes.
            </p>
        `;

    }

}


// =============================
// CADASTRAR CLIENTE
// =============================

formCliente.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const novoCliente = {

            nome:
                document.getElementById("nome").value,

            email:
                document.getElementById("email").value,

            telefone:
                document.getElementById("telefone").value,

            cep:
                document.getElementById("cep").value,

            endereco:
                document.getElementById("endereco").value,

            cidade:
                document.getElementById("cidade").value,

            estado:
                document.getElementById("estado").value,

            datanascimento:
                document.getElementById(
                    "datanascimento"
                ).value,

            genero:
                document.getElementById("genero").value

        };


        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(novoCliente)

            });


            if (response.ok) {

                alert(
                    "Cliente cadastrado com sucesso!"
                );

                formCliente.reset();

                buscarClientes();

            } else {

                alert(
                    "Erro ao cadastrar cliente."
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
// EXCLUIR CLIENTE
// =============================

async function deletarCliente(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este cliente?"
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
                "Cliente excluído com sucesso!"
            );

            buscarClientes();

        } else {

            alert(
                "Erro ao excluir cliente."
            );

        }

    } catch (error) {

        console.error(error);

    }

}


// Iniciar
buscarClientes();