const { readFileSync } = require('fs');

// Função para formatar moeda
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  }).format(valor / 100);
}

// Função para obter a peça correspondente
function getPeca(pecas, apre) {
  return pecas[apre.id];
}

// Classe de cálculos de fatura
class ServicoCalculoFatura {

   calcularCredito(pecas, apre) {
     let creditos = 0;
     creditos += Math.max(apre.audiencia - 30, 0);
     if (getPeca(pecas, apre).tipo === "comedia") 
       creditos += Math.floor(apre.audiencia / 5);
     return creditos;
   }
   
   calcularTotalCreditos(pecas, apresentacoes) {
     let totalCreditos = 0;
     for (let apre of apresentacoes) {
       totalCreditos += this.calcularCredito(pecas, apre);
     }
     return totalCreditos;
   }
   
   calcularTotalApresentacao(pecas, apre) {
     let total = 0;
     switch (getPeca(pecas, apre).tipo) {
       case "tragedia":
         total = 40000;
         if (apre.audiencia > 30) {
           total += 1000 * (apre.audiencia - 30);
         }
         break;
       case "comedia":
         total = 30000;
         if (apre.audiencia > 20) {
            total += 10000 + 500 * (apre.audiencia - 20);
         }
         total += 300 * apre.audiencia;
         break;
       default:
         throw new Error(`Peça desconhecida: ${getPeca(pecas, apre).tipo}`);
     }
     return total;
   }

   calcularTotalFatura(pecas, apresentacoes) {
     let totalFatura = 0;
     for (let apre of apresentacoes) {
       totalFatura += this.calcularTotalApresentacao(pecas, apre);
     }
     return totalFatura;
   }
}

// Função para gerar a fatura em texto
function gerarFaturaStr(fatura, pecas, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${getPeca(pecas, apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos)\n`;
  }

  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} \n`;

  return faturaStr;
}

// Leitura dos arquivos JSON
const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));

// Criação da instância da classe de cálculos
const calc = new ServicoCalculoFatura();

// Gerar e exibir a fatura
const faturaStr = gerarFaturaStr(faturas, pecas, calc);
console.log(faturaStr);

// Comente as linhas abaixo se não for usar o HTML
// function gerarFaturaHTML(fatura, pecas, calc) {
//   let faturaHTML = `<html><p> Fatura ${fatura.cliente} </p><ul>`;
//   for (let apre of fatura.apresentacoes) {
//     faturaHTML += `<li> ${getPeca(pecas, apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos) </li>`;
//   }
//   faturaHTML += `</ul><p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))} </p>`;
//   faturaHTML += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} </p></html>`;
//   return faturaHTML;
// }
// const faturaHTML = gerarFaturaHTML(faturas, pecas, calc);
// console.log(faturaHTML);
