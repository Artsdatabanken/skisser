import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[menuLink]' })

export class MenuLinkDirective {

  @HostListener('click', ['$event.target'])
  onClick(element) {
    console.log('element', element);
  }
  
}