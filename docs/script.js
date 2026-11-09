const nome_cliente = document.getElementById("cliente")
const cpf_cliente = document.getElementById("cpf")
const telefone_cliente = document.getElementById("telefone")
const dados = document.getElementById("lista-cliente")
const cadastroo = document.getElementById("cadastro")
const clientes = JSON.parse(localStorage.getItem("clientes")) || []

 async function cadastro() {
    if (nome_cliente.value.trim() && cpf_cliente.value.trim() && telefone_cliente.value.trim()) {

        if (/^[A-Za-zÀ-ÿ\s]+$/.test(nome_cliente.value.trim())) {

            if (/^\d{11}$/.test(cpf_cliente.value.trim())) {

                if (/^\d{11}$/.test(telefone_cliente.value.trim())) {

                    let achou = false

                    for (let c of clientes) {
                        if (c.cpf_cliente === cpf_cliente.value.trim()) {
                            achou = true
                        }
                    }

                    if (!achou) {
                        const clientee = {
                            nome: nome_cliente.value.trim(),
                            cpf: cpf_cliente.value.trim(),
                            telefone: telefone_cliente.value.trim()
                        }

                        clientes.push(clientee)
                         await fetch('http://localhost:3000/clientes',{
                            method: 'POST',
                            headers:{'Content-type':'application/json'},
                            body:JSON.stringify(clientee)
                        })

                        localStorage.setItem(
                            "clientes",
                            JSON.stringify(clientes)
                        )

                        alert(clientee.nome_cliente + " está cadastrado(a)!")

                        listar()
                    } else {
                        alert("cpf já cadastrado!")
                    }

                } else {
                    alert("O telefone precisa conter apenas 11 números!")
                }

            } else {
                alert("O CPF precisa conter apenas 11 números!")
            }

        } else {
            alert("O nome só pode ter letras, espaços e acentos!")
        }

    } else {
        alert("Todos os campos devem ser preenchidos!")
        
    }
}

function listar() {
    console.log(clientes)
    dados.innerHTML = "Clientes cadastrados"

    for (let clientee of clientes) {
        dados.innerHTML += `<p>Nome: ${clientee.nome_cliente} | CPF: ${clientee.cpf_cliente} | TELEFONE: ${clientee.telefone_cliente}</p>`
    }
}

const busca_cliente = document.getElementById("cpff");
const controlar_cliente = document.getElementById("buscar");
const dados2 = document.getElementById("listagem-cliente");

function buscar2_cliente() {
    let cl = false;
    const cpf = busca_cliente.value.trim();
    for (let cliente of clientes) {
        if (cliente.cpf_cliente === cpf) {
            cl = true;
            alert("Cliente encontrado!");

        }
    }

    if (!cl) {
        alert("Cliente não encontrado!");
    }
    listar2()
}
function listar2() {
    console.log(clientes);

    dados2.innerHTML = "<h3>Clientes cadastrados</h3>";

    for (let buscar of clientes) {
        dados2.innerHTML += `
            <p>
                Nome: ${buscar.nome_cliente} |
                CPF: ${buscar.cpf_cliente} |
                Telefone: ${buscar.telefone_cliente}
            </p>
        `;
    }
}

 async function desativar_cliente() {
    const c = clientes.find(item => item.cpf === busca_cliente.value);

    if (c) {

            const resposta = await fetch(
                `http://localhost:3000/clientes/${c.id}`,
                {
                    method: "DELETE"
                }
            );

            if (resposta) {


                alert("Cliente desativado com sucesso!");
                
            } else {
                alert("Erro ao desativar cliente!");
            }
        
    } else {
        alert("Cliente não encontrado!");
    }
}
const nome_produto = document.getElementById("produto")
const preco_produto = document.getElementById("preco")
const tamanho = document.getElementById("tamanho")
const quantidade = document.getElementById("quantidade")
const produtos = JSON.parse(localStorage.getItem("produtos")) || []

 async function cadastro2() {
    if (
        nome_produto.value.trim() &&
        preco_produto.value.trim() &&
        tamanho.value.trim() &&
        quantidade.value.trim()
    ) {
        if (/^\d+$/.test(preco_produto.value.trim())) {

            let achou = false;

            for (let c of produtos) {
                if (c.nome_produto === nome_produto.value.trim()) {
                    achou = true;
                    break;
                }
            }

            if (!achou) {
                const produtoo = {
                    nome: nome_produto.value.trim(),
                    preco: preco_produto.value.trim(),
                    tamanho: tamanho.value.trim(),
                    quantidade: quantidade.value.trim()
                };

                produtos.push(produtoo);
                   await fetch('http://localhost:3000/produtos',{
                            method: 'POST',
                            headers:{'Content-type':'application/json'},
                            body:JSON.stringify(produtoo)
                        })
                localStorage.setItem(
                    "produtos",
                    JSON.stringify(produtos)
                );

                alert(produtoo.nome_produto + " está cadastrado(a)!");

                listar_produto();

            } else {
                alert("Produto já cadastrado!");
            }

        } else {
            alert("O preço deve conter apenas números!");
        }

    } else {
        alert("Todos os campos devem ser preenchidos!");
    }
}

const dados_do_produto = document.getElementById("lista-produto");

function listar_produto() {
    dados_do_produto.innerHTML = "Produtos cadastrados";

    for (let produtoo of produtos) {
        dados_do_produto.innerHTML += `
            <p>
                Produto: ${produtoo.nome_produto} |
                Preço: ${produtoo.preco_produto} |
                Quantidade: ${produtoo.quantidade} |
                Tamanho: ${produtoo.tamanho}
            </p>
        `;
    }}

const clientes_v = document.getElementById("clientela");
const dados_doestoque_atual = document.getElementById("lista-estoque-atual")
const produtos_v = document.getElementById("produtos");
const quantidades_v = document.getElementById("quantidades");
const dados4 = document.getElementById("lista-venda");

const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
 async function vender() {
    let achouP = false, achouQtde=false, achouC=false
    for (let p of produtos) {
        if (p.nome == produtos_v.value) {
            achouP = true
            if (p.quantidade >= quantidades_v.value) {
                achouQtde = true
                for (let p of clientes) {
                    if (p.cpf == clientes_v.value) {
                        achouC = true
                        const venda = {
                            cpf: clientes_v.value,
                            nome_produto: produtos_v.value,
                            quantidade: quantidades_v.value

                        }
                        vendas.push(venda)
                        await fetch('http://localhost:3000/vendas',{
                            method: 'POST',
                            headers:{'Content-type':'application/json'},
                            body:JSON.stringify(venda)
                        })
                        localStorage.setItem("vendas", JSON.stringify(vendas))
                        alert("Venda do produto: " + venda.produtos_v + " para o cliente: " + venda.clientes_v + " efetuada com sucesso")
                        diminuir_estoque()
                        listar_venda()
                        listar_qnt_atual()

                    }
                }
            }
        }
    }
    if (!achouP) {
        alert("produto nao encontrado")
    }else
    if (!achouQtde) {
        alert("estoque insuficiente")
    }else
    if (!achouC) {
        alert("cliente nao encontrado")
    }
}

function diminuir_estoque() {
    let numero = Number(quantidades_v.value);
    for (let p of produtos) {
        if (p.nome_produto === produtos_v.value) {
            let numero2 = Number(p.quantidade);
            p.quantidade = numero2 - numero
            break;
        }
    }
    localStorage.setItem("produtos", JSON.stringify(produtos));
    
}

function listar_qnt_atual() {
    dados_doestoque_atual.innerHTML = "Estoque atual do produto "

    for (let produtoo of produtos) {
        dados_doestoque_atual.innerHTML += `<p>produto: ${produtoo.nome_produto} | quantidade: ${produtoo.quantidade} </p>`
    }
}


function listar_venda() {
    dados4.innerHTML = "Vendas efetuadas"

    for (let venda of vendas) {
        dados4.innerHTML += `<p>produto: ${venda.produtos_v} | cliente: ${venda.clientes_v} | quantidade vendida: ${venda.quantidades_v}  </p>`
    }
}
const edit_nome = document.getElementById("edit_nome");
const edit_telefone = document.getElementById("edit_telefone");
const cpf_clientee = document.getElementById("cpf_edit");
const lista_cliente = document.getElementById("listagem_cliente");


async function buscar_cliente() {
    const busca = await fetch("http://localhost:3000/clientes")
    const dados = await busca.json()

    clientes.length = 0
    clientes.push(...dados)

    let achou = false

    for (let buscar of clientes) {
        if (buscar.cpf === busca_cliente.value) {
            cpf_edit.value = buscar.cpf
            edit_nome.value = buscar.nome
            edit_telefone.value = buscar.telefone

            achou = true
            break
        }
    }

    if (!achou) {
        alert("Cliente não encontrado")
    }


}

async function atualizar_cliente() {
    let achou = false;

    const c = clientes.find(item => item.cpf === busca_cliente.value);

    if (c) {

        if (c.cpf === busca_cliente.value) {

            c.nome = edit_nome.value || c.nome;
            c.telefone = edit_telefone.value || c.telefone;
            let resposta = await fetch(
                `http://localhost:3000/clientes/${c.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(c)
                }
            );

            if (resposta) {

                alert("Cliente atualizado com sucesso!");

                listar_clientesatu();

                achou = true;

            } else {
                alert("Erro ao atualizar cliente!");
            }
        }
    }
    if (!achou) {
        alert("Cliente não encontrado!");
    }
}
function listar_clientesatu() {
    lista_cliente.innerHTML = "Clientes Atualizados:";

    for (let cliente of clientes) {
        lista_cliente.innerHTML += `
            <p>
                Nome: ${cliente.nome_cliente} |
                CPF: ${cliente.cpf_cliente} |
                Telefone: ${cliente.telefone_cliente}
            </p>
        `;
    }
}
const produto_nome=document.getElementById("buscar_produto")
const produto_buscar=document.getElementById("Buscar")
const add_quantidade=document.getElementById("quantidadee")
const add=document.getElementById("adicionar")
const dados5=document.getElementById("lista-produto")


//  async function adicionar() {
//     const p = produtos.find(item =>
//         item.nome === produto_nome.value
//     );

//     if (p) {

//         let numero = Number(add_quantidade.value);

//         if (numero <= 0 || isNaN(numero)) {
//             alert("Digite uma quantidade válida!");
//             return;
//         }

//         let numero2 = Number(p.quantidade);

//         p.quantidade = numero2 + numero;

//         // const resposta = await fetch(`http://localhost:3000/produtos/${p.nome_produto}`, {
//         //     method: "PUT",
//         //     headers: {
//         //         "Content-Type": "application/json"
//         //     },
//         //     body: JSON.stringify(p)
//         // });  
//         const resposta = await fetch(`http://localhost:3000/produtos/${p.id}`, {
//     method: "PUT",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(p)
// });

// console.log("Status:", resposta.status);

// const dados = await resposta.json();

// console.log("Resposta da API:", dados);

//         localStorage.setItem("produtos", JSON.stringify(produtos));

//         alert("Alteração feita com sucesso! Estoque atual: " + p.quantidade);

//         if (!resposta) {
//             alert("Erro ao atualizar o estoque!");
//             return;
//         }


//     } else {
//         alert("Produto não encontrado!");
//     }
// }

async function adicionar() {

    

    const p = produtos.find(item =>
        item.nome === produto_nome.value
    );


    if (!p) {
        alert("Produto não encontrado!");
        return;
    }

    let numero = Number(add_quantidade.value);


    p.quantidade = Number(p.quantidade) + numero;


    try {

        const resposta = await fetch(`http://localhost:3000/produtos/${p.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(p)
        });

        const dados = await resposta.json()

        localStorage.setItem("produtos", JSON.stringify(produtos));

    } catch (erro) {
        console.log("ERRO:", erro);
    }alert("Quantidade alterada com sucesso!")
}



function listar_produto3() {
    for (let p of produtos) {
        if (p.nome == produto_nome.value) {

            dados5.innerHTML = "PRODUTO ENCONTRADO:";
            dados5.innerHTML += `<p>Produto: ${p.nome} | Preço: ${p.preco} | Quantidade: ${p.quantidade} | Tamanho: ${p.tamanho}</p>`;
            return
        }
    }
    alert("Produto não encontrado!")
}

async function buscar_produto() {
    const buscaa = await fetch("http://localhost:3000/produtos")
    const dadoss = await buscaa.json()
    produtos.length = 0
    produtos.push(...dadoss)
    listar_produtoo()
}
buscar_produto()
//------------------------------COMPRA------------------------//
async function buscar_compra() {
    const buscarr = await fetch("http://localhost:3000/vendas")
    const dadosrr = await buscarr.json()
    compras.length = 0
    compras.push(...dadosrr)
    listar_compra()
}
buscar_compra()
//------------------------------VENDAS------------------------//
async function buscar_venda() {
    const buscara = await fetch("http://localhost:3000/vendas")
    const dadosr = await buscara.json()
    vendas.length = 0
    vendas.push(...dadosr)
    listar_venda()
}
buscar_venda()




