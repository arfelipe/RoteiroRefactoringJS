// servico.js
module.exports = class ServicoCalculoFatura {

    constructor(repo) {
      this.repo = repo;
    }
  
    calcularCredito(apre) {
      let creditos = 0;
      creditos += Math.max(apre.audiencia - 30, 0);
      if (this.repo.getPeca(apre).tipo === "comedia") 
         creditos += Math.floor(apre.audiencia / 5);
      return creditos;   
    }
  
    calcularTotalCreditos(apresentacoes) {
      let total = 0;
      for (let apre of apresentacoes) {
        total += this.calcularCredito(apre);
      }
      return total;
    }
  
    calcularTotalApresentacao(apre) {
      let total = 0;
      // Define o valor por tipo de peça
      const valorPorAssento = this.repo.getPeca(apre).tipo === "comedia" ? 20 : 10;
  
      // Calcula o valor com base na audiência e o valor por assento
      total = apre.audiencia * valorPorAssento;
      
      return total;
    }
  
    calcularTotalFatura(apresentacoes) {
      let total = 0;
      for (let apre of apresentacoes) {
        total += this.calcularTotalApresentacao(apre);
      }
      return total;
    }
  };
  