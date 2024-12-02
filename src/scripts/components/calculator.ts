import 'toolcool-range-slider/dist/plugins/tcrs-binding-labels.min.js';
import 'toolcool-range-slider';

class CalculadoraAhorro {
  private precioPorGarrafon: number = 45;
  private garrafonesPorDia: number = 1;

  // Costos de los cartuchos
  private costoCartuchoCBPA: number = 1690;
  private costoCartuchoRO: number = 2552;

  // Frecuencia de reemplazo por litros filtrados
  private litrosEntreReemplazosCBPA: number = 3659;
  private litrosEntreReemplazosRO: number = 8200;

  // Constantes
  private readonly diasPorAño = 365;
  private readonly litrosPorGarrafon: number = 19;

  constructor() {
  }

  public setParametrosLitros(litrosEntreReemplazosCBPA: number, litrosEntreReemplazosRO: number) {
    this.litrosEntreReemplazosCBPA = litrosEntreReemplazosCBPA;
    this.litrosEntreReemplazosRO = litrosEntreReemplazosRO;
  }

  public setCostosCartuchos(costoCartuchoCBPA: number, costoCartuchoRO: number) {
    this.costoCartuchoCBPA = costoCartuchoCBPA;
    this.costoCartuchoRO = costoCartuchoRO;
  }

  public setParametrosGarrafon(precioPorGarrafon: number, garrafonesPorDia: number) {
    this.precioPorGarrafon = precioPorGarrafon;
    this.garrafonesPorDia = garrafonesPorDia;
  }

  private get litrosAnuales(): number {
    return this.garrafonesPorDia * this.litrosPorGarrafon * this.diasPorAño;
  }

  private get reemplazosAnualesCBPA(): number {
    return this.litrosAnuales / this.litrosEntreReemplazosCBPA;
  }

  private get reemplazosAnualesRO(): number {
    return this.litrosAnuales / this.litrosEntreReemplazosRO;
  }

  private get costoAnualCBPA(): number {
    return this.costoCartuchoCBPA * this.reemplazosAnualesCBPA;
  }

  private get costoAnualRO(): number {
    return this.costoCartuchoRO * this.reemplazosAnualesRO;
  }

  private get costoAnualPurificador(): number {
    return this.costoAnualCBPA + this.costoAnualRO;
  }

  private get costoAnualGarrafones(): number {
    return this.precioPorGarrafon * this.garrafonesPorDia * this.diasPorAño;
  }

  public calcularAhorroAnual(): number {
    if (this.costoAnualPurificador >= this.costoAnualGarrafones) {
      throw new Error('Con los datos ingresados, no estarías ahorrando dinero.');
    }
    const ahorroAnual = this.costoAnualGarrafones - this.costoAnualPurificador;
    return ahorroAnual;
  }
}

class ComponentCalculator extends HTMLElement {
  private inputCostEl = document.getElementById('cost') as HTMLInputElement;
  private quantityEl = document.querySelector('tc-range-slider#quantity') as HTMLInputElement;

  private resultValueEl = document.querySelector('.result__value') as HTMLSpanElement;

  private precioPorGarrafon: number = this.inputCostEl.value ? Number(this.inputCostEl.value) : 45;
  private garrafonesPorSemana: number = 10;

  private params = {
    cbpaPrice: Number(this.getAttribute('cbpa-price') || 1690),
    cbpaLiters: Number(this.getAttribute('cbpa-liters') || 3659),
    roPrice: Number(this.getAttribute('ro-price') || 2552),
    roLiters: Number(this.getAttribute('ro-liters') || 8200),
  };

  private calculadora = new CalculadoraAhorro();

  constructor() {
    super();
    this.calculadora.setCostosCartuchos(this.params.cbpaPrice, this.params.roPrice);
    this.calculadora.setParametrosLitros(this.params.cbpaLiters, this.params.roLiters);
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

      this.calculadora.setParametrosGarrafon(
        this.precioPorGarrafon,
        this.garrafonesPorSemana / 7
      );
      const ahorroAnual = this.calculadora.calcularAhorroAnual();

      if (ahorroAnual <= 0) return;

      this.resultValueEl.textContent = this.numberToCurrency(ahorroAnual);
    } catch (error) {
      this.resultValueEl.textContent = this.numberToCurrency(0);
    }
  }
}

customElements.define('component-calculator', ComponentCalculator);
