import produto from '../models/produto.js'

export async function listarProduto(){
 return  await produto.findAll({order: [['id','ASC']]})
}
 export async function buscarProdutoPorId(id){
  const produto1 = await produto.findByPk(id)
  console.log(id)
 return produto1
}
 
export async function cadastrarProduto(dados){
const {nome,preco,tamanho,quantidade} =dados
return produto.create({nome,preco,tamanho,quantidade})
}
 export async function removerProduto(id) {
  const produto2= await buscarProdutoPorId(id)
  if(produto2){
  produto2.destroy()
  }
  return produto2
}

export async function atualizarProduto(id,dados) {
 const {nome,preco,tamanho,quantidade}=dados
 const produto3 = await buscarProdutoPorId(id)
 if(produto3){
  produto3.update({nome,preco,tamanho,quantidade})
 }
 return produto3
 }  

  




 