import 'toolcool-range-slider/dist/plugins/tcrs-binding-labels.min.js';
import 'toolcool-range-slider';

class CalculadoraAhorro {
  private precioPorGarrafon: number = 30;
  private garrafonesPorSemana: number = 10;

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

class ComponentCalculator extends HTMLElement {
  private precioPorGarrafon: number = 30;
  private garrafonesPorSemana: number = 10;

  private inputCostEl = document.getElementById('cost') as HTMLInputElement;
  private quantityEl = document.querySelector('tc-range-slider#quantity') as HTMLInputElement;

  private resultValueEl = document.querySelector('.result__value') as HTMLSpanElement;

  constructor() {
    super();
  }

  connectedCallback() {
    this.inputCostEl.addEventListener('input', this.handleInputCost);
    this.quantityEl.addEventListener('change', this.handleInputQuantity);
    this.calcularAhorro();
  }

  private handleInputCost = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.precioPorGarrafon = Number(target.value);

    this.calcularAhorro();
  };

  private handleInputQuantity = (event: Event) => {
    const value = event['detail'].value;
    this.garrafonesPorSemana = Number(value);

    this.calcularAhorro();
  };

  private numberToCurrency(value: number): string {
    const roundedValue = Math.round(value);
    return roundedValue.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    });
  }

  private calcularAhorro() {
    try {
      if (!this.precioPorGarrafon || !this.garrafonesPorSemana) {
        return this.resultValueEl.textContent = this.numberToCurrency(0);
      }

      const calculadora = new CalculadoraAhorro(this.precioPorGarrafon, this.garrafonesPorSemana);
      const ahorroAnual = calculadora.calcularAhorroAnual();

      this.resultValueEl.textContent = this.numberToCurrency(ahorroAnual);
    } catch (error) {
      this.resultValueEl.textContent = this.numberToCurrency(0);
    }
  }
}

customElements.define('component-calculator', ComponentCalculator);
