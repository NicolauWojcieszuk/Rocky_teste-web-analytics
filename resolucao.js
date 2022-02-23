//Importando módulo para ler e alterar arquivos
//https://www.w3schools.com/nodejs/nodejs_filesystem.asp
var fs = require('fs');

//Abrindo arquivo corrompido e atribuindo na variável brokenFile
var brokenFile = loadBrokenFile(); 

//Estrutura de repetição para percorrer os produtos e corrigi-los
for(var i in brokenFile){
  brokenFile[i].name = fixingName(brokenFile[i].name);
  brokenFile[i].price = fixingPrice(brokenFile[i].price);
  brokenFile[i].quantity = fixingQuantity(brokenFile[i].quantity);
}
//console.log(brokenFile);//Mostrar banco de dados corrigido

//Salvando o banco de dados corrigido
saveFixedFile(brokenFile);

//Abrindo arquivo corrigido e atribuindo na variável fixedFile
var fixedFile = loadFixedFile();
//console.log(fixedFile);//Mostrar banco de dados novamente

//Ordenando produtos por categoria e id
fixedFile.sort(sortingCategories);
console.log(fixedFile);//Mostrar banco de dados ordenado

//Calculando estoque por categoria
stockValue();



//FUNÇÕES

//Função para ler o arquivo corrompido
//https://nodejs.dev/learn/reading-files-with-nodejs
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
function loadBrokenFile (){
  try{
    var database = fs.readFileSync("./broken-database.json", "utf8");
    return JSON.parse(database);  
  }catch{
    console.log("Error");
  }
}

//Função para corrigir os nomes dos produtos
//https://www.devmedia.com.br/javascript-replace-substituindo-valores-em-uma-string/39176
function fixingName (name){
  return name.replace(/æ/g, "a").replace(/ß/g, "b").replace(/¢/g, "c").replace(/ø/g, "o");
}

//Função para corrigir os preços dos produtos
//https://www.alura.com.br/artigos/convertendo-string-para-numero-em-javascript?gclid=CjwKCAiAx8KQBhAGEiwAD3EiP0STHdHnHYpdaXHFq5I4drkmiGE0NV8WIR39d8vOkMplYdeaD85xDhoCf0YQAvD_BwE
function fixingPrice (price){
  return parseFloat(price);
}

//Função para corrigir a quantidade dos produtos
function fixingQuantity (quantity){
  if(quantity > 0){
    return quantity;
  }
  else{
    return 0;
  }
}

//Função para salvar o arquivo corrigido
//https://nodejs.dev/learn/writing-files-with-nodejs
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
function saveFixedFile (file){
  try{
    var databaseFixed = JSON.stringify(file);
    fs.writeFileSync("./saida.json", databaseFixed);
  }catch{
    console.log("Error");
  }
}

//Função para carregar o arquivo corrigido
function loadFixedFile (){
  try{
    var database = fs.readFileSync("./saida.json", "utf8");
    return JSON.parse(database);  
  }catch{
    console.log("Error");
  }
}

//Função para ordenar por categoria e id
//https://www.alura.com.br/artigos/ordenacao-de-numeros-no-javascript-nao-funciona?gclid=CjwKCAiA6seQBhAfEiwAvPqu1wb_wnZ3ymSiSWHyYyWxjxoQAtrDKdgqd3dQquJ3qzQTCBM1Z47fNxoC2NAQAvD_BwE
function sortingCategories (item1, item2){ 
  if(item1.category == item2.category){
    if(item1.id < item2.id){
      return -1;
    }else{
      return 1;
    }
  }else if(item1.category < item2.category){
    return -1;
  }else{
    return 1;
  }
}

//Função para calcular estoque por categoria
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/push
function stockValue(){
  var soma = 0 , allCategories = [], uniqueCategories = [], valueCategory = [];
  //For para criar um array com todas as categorias
  for(var i in fixedFile){
    allCategories.push(fixedFile[i].category);
  }
  
  //For para filtrar um array apenas com as categorias únicas
  for(var i = 0, j = 0; i < allCategories.length; i++){
    if(allCategories[i] != allCategories[i+1]){
      uniqueCategories.push(allCategories[i]);
    } 
  }
  
  //For para percorrer as categorias únicas e calcular valor
  for(var i in uniqueCategories){
    for(var j in fixedFile){
        if(fixedFile[j].category == uniqueCategories[i]){
          soma += fixedFile[j].price * fixedFile[j].quantity;
        }
    }
    valueCategory[i] = soma;
    soma=0;
  }
  //For para imprimir categoria, valor de estoque
  for(var i = 0; i< uniqueCategories.length; i++){
    console.log(uniqueCategories[i],valueCategory[i]);
  }
}  