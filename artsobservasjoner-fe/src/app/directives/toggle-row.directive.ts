import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostBinding, HostListener, Inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleRow]'
})

export class ToggleRowDirective {

  @Input() appToggleRow;
  @HostBinding('class.accordion-table__fold') isOpen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('click') onClick() {
    console.log('clicked on button', this.element);
    console.log('clicked on button 2', this.appToggleRow);

    this.isOpen = !this.isOpen; // settes til true

    if (this.isOpen) {
      this.renderer.addClass(this.appToggleRow, 'accordion-table__fold--open');
      this.renderer.addClass(this.element.nativeElement, 'accordion-table__opener--active');
      this.renderer.removeClass(this.element.nativeElement, 'accordion-table__fold');
    }
    else {
      this.renderer.removeClass(this.appToggleRow, 'accordion-table__fold--open');
      this.renderer.removeClass(this.element.nativeElement, 'accordion-table__opener--active');
      this.renderer.removeClass(this.element.nativeElement, '.accordion-table__fold');
    }
  }

}
