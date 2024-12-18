// apresentacao.js
module.exports = function gerarFaturaStr(faturas, calc) {
  let faturaStr = `Fatura ${faturas.cliente}\n`;
  
  for (let apre of faturas.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: R$ ${calc.calcularTotalApresentacao(apre).toFixed(2)} (${apre.audiencia} assentos)\n`;
  }
  
  faturaStr += `Valor total: R$ ${calc.calcularTotalFatura(faturas.apresentacoes).toFixed(2)}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(faturas.apresentacoes)}\n`;

  return faturaStr;
};
