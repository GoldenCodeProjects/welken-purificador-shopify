class Accordion {
  private el: HTMLDetailsElement;
  private summary: HTMLElement;
  private content: HTMLElement;
  private animation: Animation | null = null;
  private isClosing = false;
  private isExpanding = false;

  constructor(el: HTMLDetailsElement) {
    this.el = el;
    this.summary = el.querySelector("summary")!;
    this.content = el.querySelector(".c-body")!;
    this.summary.addEventListener("click", (e) => this.onClick(e));
  }

  private onClick(e: MouseEvent): void {
    e.preventDefault();
    this.el.style.overflow = "hidden";

    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  private shrink(): void {
    this.isClosing = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    if (this.animation) this.animation.cancel();

    this.animation = this.el.animate(
      { height: [startHeight, endHeight] },
      { duration: 400, easing: "ease-out" }
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => (this.isClosing = false);
  }

  private open(): void {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;

    requestAnimationFrame(() => this.expand());
  }

  private expand(): void {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

    if (this.animation) this.animation.cancel();

    this.animation = this.el.animate(
      { height: [startHeight, endHeight] },
      { duration: 400, easing: "ease-out" }
    );

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  private onAnimationFinish(open: boolean): void {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = "";
  }
}

class AccordionManager {
  private container: HTMLElement;

  constructor(containerSelector: string) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      throw new Error(`Container with selector "${containerSelector}" not found.`);
    }
    this.container = container as HTMLElement;
    this.initializeAccordions();
    this.addGlobalClickHandler();
  }

  private initializeAccordions(): void {
    this.container.querySelectorAll<HTMLDetailsElement>("details").forEach((details) => {
      new Accordion(details);
    });
  }

  private addGlobalClickHandler(): void {
    this.container.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName.toLowerCase() !== "summary") return;

      const currentDetails = target.parentElement as HTMLDetailsElement;
      const openDetails = this.container.querySelectorAll<HTMLDetailsElement>("details[open]");

      openDetails.forEach((details) => {
        if (details === currentDetails) return;
        details.querySelector("summary")?.click();
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AccordionManager(".questions");
});
