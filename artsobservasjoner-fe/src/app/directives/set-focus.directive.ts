import { AfterContentChecked, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[setFocus]'
})

export class SetFocusDirective implements AfterContentChecked {

  constructor(private element: ElementRef<HTMLElement>) { }

  ngAfterContentChecked(): void {
    this.element.nativeElement.focus();
  }

}
