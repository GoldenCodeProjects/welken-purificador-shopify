import 'paperwave-range-slider/paperwave-range-slider.js';

class CalculadoraAhorro {
  private precioPorGarrafon: number;
  private garrafonesPorSemana: number;

  // Constantes
  private readonly semanasPorAño = 52;
  private readonly mesesPorAño = 12;

  // Costos de los cartuchos
  private readonly costoCartuchoA = 1090; // Costo en pesos del cartucho que se cambia cada 6 meses
  private readonly costoCartuchoB = 1590; // Costo en pesos del cartucho que se cambia cada 19 meses

  // Frecuencias de reemplazo
  private readonly mesesEntreReemplazosA = 6;
  private readonly mesesEntreReemplazosB = 19;

  constructor(precioPorGarrafon: number, garrafonesPorSemana: number) {
    this.precioPorGarrafon = precioPorGarrafon;
    this.garrafonesPorSemana = garrafonesPorSemana;
  }

  private get reemplazosAnualesA(): number {
    return this.mesesPorAño / this.mesesEntreReemplazosA;
  }

  private get costoAnualA(): number {
    return this.costoCartuchoA * this.reemplazosAnualesA;
  }

  private get reemplazosAnualesB(): number {
    return this.mesesPorAño / this.mesesEntreReemplazosB;
  }

  private get costoAnualB(): number {
    return this.costoCartuchoB * this.reemplazosAnualesB;
  }

  private get costoAnualPurificador(): number {
    return this.costoAnualA + this.costoAnualB;
  }

  private get costoAnualGarrafones(): number {
    return this.precioPorGarrafon * this.garrafonesPorSemana * this.semanasPorAño;
  }

  public calcularAhorroAnual(): number {
    // Verificar si el usuario estaría ahorrando
    if (this.costoAnualPurificador >= this.costoAnualGarrafones) {
      throw new Error('Con los datos ingresados, no estarías ahorrando dinero.');
    }

    // Cálculo del ahorro anual
    const ahorroAnual = this.costoAnualGarrafones - this.costoAnualPurificador;

    return ahorroAnual;
  }
}

const precioPorGarrafon = 50;
const garrafonesPorSemana = 2;

const calculadora = new CalculadoraAhorro(precioPorGarrafon, garrafonesPorSemana);
const ahorroAnual = calculadora.calcularAhorroAnual();

console.log(`El ahorro anual sería de $${ahorroAnual}`);
