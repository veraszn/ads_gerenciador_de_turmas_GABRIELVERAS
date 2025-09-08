//Gerenciador de Alunos
let alunos = []

/*Mastra as Telas do Site*/
function exibatelas(telas){
  const div = document.getElementById("telas")
  div.innerHTML = ''
  
  switch(telas){
    case 'adicionaraluno':
      div.innerHTML = `<h3>Inserir Aluno</h3>
      <input id="nomealuno" placeholder="Digite o nome">
      <button onclick="addaluno()">Adicionar</button>
      <div class="resultado" id="res"></div>`
    break;  
  

  case 'lista':
    listaalunos(div)
    break;

  case 'nota':
    div.innerHTML = `<h3>Inserir Nota</h3>
    <input id="nomeNaluno" placeholder="Digite o Aluno">
    <input id="notaaluno" placeholder="Insira a Nota do Aluno">
    <button onclick="registrarnota()">Registrar</button>
    <div class="resultado" id="res"></div>`
    break;

  case 'media':
    div.innerHTML = `<h3>Cálculo da Média</h3>
    <input id="nomeMaluno" placeholder="Digite o nome do Aluno">
    <button onclick="calculomedia()">Calcular Média</button>
    <div class="resultado" id="res"></div>`
    break;

  case 'aprovados':
    aprovados(div)
    break;

  case 'estatisticas':
    estatisticas(div)
    break;

  case 'ordem':
    ordenacaomedia(div)
    break;

  case 'excluir':
    div.innerHTML = `<h3>Excluir Aluno</h3>
    <input id="nomeRaluno" placeholder="Digite o nome do Aluno">
    <button onclick="excluiraluno()">Remover</button>
    <div class="resultado" id="res"></div>`
    break;
    
  }
} 

  
  //Todas as funções do sistema
  function addaluno(){
      const nome = document.getElementById('nomealuno').value.trim()
      const res = document.getElementById('res')

    if (!nome) return res.innerHTML = `O Nome Inserido Está Inválido(a).`
    if (alunos.some(a => a.nome.toLowerCase() === nome.toLowerCase())) return res.innerHTML = `Esse Aluno Já Existe.`
    

  alunos.push({ nome, notas: []})
  res.innerHTML = `Aluno <Strong>"${nome}"</Strong> adicionado!`
}

function listaalunos(div){
  

  if (alunos.length === 0) return div.innerHTML = '<h3>Nenhum Aluno foi Cadastrado.</h3>'
    

  let html = '<h3>Lista</h3><table><tr><th>Nome</th><th>Notas</th></tr></h3>'
  alunos.forEach(a => {
    if(a.notas.length === 0){
      html += `<tr><td>${a.nome}</td><td>...</td></tr>`
    }
    else{
      html += `<tr><td>${a.nome}</td><td>${a.notas.join(', ') || '-'}</td></tr>`
  }
  })
  html += '</table>'
  div.innerHTML = html
  console.log(html)
}

function registrarnota(){
    const nome = document.getElementById('nomeNaluno').value.trim()
    const notasStr = document.getElementById('notaaluno').value
    const res = document.getElementById('res')

    const aluno = alunos.find(a => a.nome.toLowerCase() === nome.toLowerCase())
    if (!aluno) return res.innerHTML = 'Aluno não existe.' 
    const notas = notasStr.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n) && n >= 0 && n<=10);

    if(notas.length === 0) return res.innerHTML = 'A nota inserida não é válida.'
    
    aluno.notas.push(...notas)
    res.innerHTML = 'Nota Registrada!'
}

function calculomedia(){
    const nome = document.getElementById('nomeMaluno').value.trim()
    const res = document.getElementById('res')
    const aluno = alunos.find(a => a.nome.toLowerCase() === nome.toLowerCase())
    const media = (aluno.notas.reduce((a,b) => a+b,0)/aluno.notas.length).toFixed(2)

  if(!aluno) return res.innerHTML = 'Aluno não existe.'
  if(aluno.notas.length === 0) return res.innerHTML = 'Aluno sem notas.'
  res.innerHTML = `A média do aluno ${aluno.nome}: ${media}`
}

function aprovados(div){
    const aprovados = alunos.map(a => ({ nome: a.nome, media: a.notas.length ? (a.notas.reduce((x,y)=>x+y,0)/a.notas.length) : null })).filter(a => a.media !== null && a.media >= 7);

    if(aprovados.length === 0) return div.innerHTML = '<h3>Nenhum aluno foi aprovado.</h3>'

      let html = '<h3>Alunos aprovados</h3><table><tr><th>Nome</th><th>Média</th></tr>'
      aprovados.forEach(a => html += `<tr><td>${a.nome}</td><td>${a.media.toFixed(2)}</td></tr>`)

      html += '</table>'
      div.innerHTML = html
}

function estatisticas(div){
  const medias = alunos.filter(a => a.notas.length).map(a => ({nome: a.nome,media: a.notas.reduce((soma, n) => soma + n, 0) / a.notas.length}))

  if (medias.length === 0) return div.innerHTML = '<h3>O sistema esta sem notas</h3>'

  
  const mediaGeral = (medias.reduce((soma, a) => soma + a.media, 0) / medias.length).toFixed(2)
  const maiorM = medias.reduce((m, a) => (a.media > m.media ? a : m))
  const menorM = medias.reduce((m, a) => (a.media < m.media ? a : m))
  div.innerHTML = `<h3>Estatisticas</h3>
                   <p>Média geral: ${mediaGeral}</p>
                   <p>Maior média: ${maiorM.nome} (${maiorM.media.toFixed(2)})</p>
                   <p>Menor media: ${menorM.nome} (${menorM.media.toFixed(2)})</p>`
}

function ordenacaomedia(div){
  const ordenarM = alunos.filter(a => a.notas.length).map(a => ({ nome: a.nome, media: a.notas.reduce((x,y)=>x+y,0)/a.notas.length })).sort((a,b) => b.media - a.media)
  
  if(ordenarM.length === 0) return div.innerHTML = '<h3>O sistema está sem notas</h3>'

      let html = '<h3>Alunos em ordem por média</h3><table><tr><th>Nome</th><th>Média</th></tr>'
      ordenarM.forEach(a => html += `<tr><td>${a.nome}</td><td>${a.media.toFixed(2)}</td></tr>`)

    html += '</table>'
    div.innerHTML = html
}

function excluiraluno(){
  const nome = document.getElementById('nomeRaluno').value.trim();
  const res = document.getElementById('res');
  const id = alunos.findIndex(a => a.nome.toLowerCase() === nome.toLowerCase());

    if (id === -1) return res.innerHTML = 'O aluno não existe'
    alunos.splice(id,1)
    res.innerHTML = `Aluno "${nome}" excluído.`
}