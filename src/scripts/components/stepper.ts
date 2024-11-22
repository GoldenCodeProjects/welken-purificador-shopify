import Swal from "sweetalert2";

class StepperForm extends HTMLElement {
  private currentStep: number = 0;
  private form: HTMLFormElement | null = null;
  private fieldsets: HTMLFieldSetElement[] = [];
  private nextButton: HTMLButtonElement | null = null;
  private prevButton: HTMLButtonElement | null = null;
  private submitButton: HTMLButtonElement | null = null;
  private totalSteps: number = 0;
  private dateInput: HTMLInputElement | null = null;
  private ownerInput: HTMLInputElement | null = null;

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.form = this.querySelector("form");
    this.fieldsets = Array.from(this.querySelectorAll("fieldset"));
    this.nextButton = this.querySelector("#next") as HTMLButtonElement;
    this.prevButton = this.querySelector("#prev") as HTMLButtonElement;
    this.submitButton = this.querySelector("#submit") as HTMLButtonElement;
    this.dateInput = this.querySelector("#fecha") as HTMLInputElement;
    this.ownerInput = this.querySelector("#owner") as HTMLInputElement
    this.totalSteps = this.fieldsets.length;

    this.fieldsets.forEach((fieldset, index) => {
      fieldset.hidden = index !== this.currentStep;
    });

    if (this.nextButton) {
      this.nextButton.addEventListener("click", () => this.handleNext());
    }

    if (this.prevButton) {
      this.prevButton.addEventListener("click", () => this.handlePrev());
    }

    if (this.dateInput) {
      this.dateInput.addEventListener("input", () => this.validateDate());
    }

    this.form?.addEventListener("change", () =>
      this.validateOwner(
        new FormData(this.form).get("contact[quiero]")
      )
    );

    this.updateStepCount();
  }

  private async handleNext(): Promise<void> {
    if (!this.isStepValid()) {
      await Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, llena todos los campos requeridos.",
        confirmButtonText: "Entendido",
        buttonsStyling: false,
        customClass: {
          confirmButton: "c-button -primary",
          cancelButton: "c-button -secondary",
        },
      });
      return;
    }
    if (this.currentStep < this.totalSteps - 1) {
      this.showStep(this.currentStep + 1);
    } else {
      this.submitForm();
    }
  }

  private handlePrev(): void {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  }

  private showStep(stepIndex: number): void {
    if (this.fieldsets[this.currentStep]) {
      this.fieldsets[this.currentStep].hidden = true;
    }

    this.currentStep = stepIndex;

    if (this.fieldsets[this.currentStep]) {
      this.fieldsets[this.currentStep].hidden = false;
    }

    this.updateStepCount();
  }

  private isStepValid(): boolean {
    const currentFields: (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[] = Array.from(
      this.fieldsets[this.currentStep]?.querySelectorAll("input, select, textarea") || []
    );

    return currentFields.every((field) => field.reportValidity());
  }

  private updateStepCount(): void {
    const countSpan = this.nextButton?.querySelector(".count");
    if (countSpan) {
      countSpan.textContent = `${this.currentStep + 1}/${this.totalSteps}`;
    }

    if (this.prevButton) {
      this.prevButton.style.display = this.currentStep === 0 ? "none" : "inline-block";
    }

    if (this.nextButton) {
      this.nextButton.querySelector('.text').textContent =
        this.currentStep === this.totalSteps - 1 ? "Enviar" : "Siguiente";
    }
  }

  private async validateDate(): Promise<void> {
    if (this.dateInput) {
      const selectedDate = new Date(this.dateInput.value);
      const dayOfWeek = selectedDate.getDay(); // Sunday is 0

      if (dayOfWeek === 6) {
        await Swal.fire({
          icon: "error",
          title: "Día no disponible",
          text: "Lo sentimos, no trabajamos los domingos.",
          confirmButtonText: "Entendido",
          buttonsStyling: false,
          customClass: {
            confirmButton: "c-button -primary",
            cancelButton: "c-button -secondary",
          },
        });
        this.dateInput.value = ""; // Reset the input
      }
    }
  }

  private async validateOwner(value: FormDataEntryValue | null): Promise<void> {
    if(value === 'comprar') {
      this.ownerInput?.classList.remove('u-hide');
    } else {
      this.ownerInput?.classList.add('u-hide');
    }
  }

  private submitForm(): void {
    this.submitButton?.click();
  }
}

customElements.define("stepper-form", StepperForm);
