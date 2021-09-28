import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Host, Inject } from '@angular/core';
import { MenuComponent } from '../layout/menu/menu.component';

@Directive({
  selector: '[menuFocus]'
})

export class MenuFocusDirective {

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.trapFocus(this.element.nativeElement);
  }

  trapFocus(element: any): void {

    const menuButton: any = document.querySelector('#hamburger');
    const allFocusableElements = element.querySelectorAll('a[href], button#hamburger');
    const focusableElements = Array.from(allFocusableElements).filter((el: any) => !el.disabled);
    const firstFocusableElement: any = focusableElements[1]; // because first is menu
    const lastFocusableElement: any = focusableElements[focusableElements.length - 1];

    console.log({ focusableElements })
    // we ue native JS because we can't use @HostListener inside a method in Angular

    element.addEventListener('keydown', function (event: KeyboardEvent) {

      console.log('TEST 1', document.activeElement === firstFocusableElement)
      console.log('TEST 2', document.activeElement === menuButton)

      // is Tab being pressed
      let isTabPressed: boolean = event.key === 'Tab' || event.code === 'Tab';

      if (!isTabPressed) return;

      if (event.shiftKey) /* shift + tab */ {

        if (document.activeElement === firstFocusableElement) {

          console.log('active first')
          //lastFocusableElement.focus();
          menuButton.focus();
          event.preventDefault();
        }

        else if (document.activeElement === menuButton) {
          console.log('active menu button')
          firstFocusableElement.focus();
          event.preventDefault();
        }

      }
      else /* tab */ {

        if (document.activeElement === lastFocusableElement) {
          //firstFocusableElement.focus();
          menuButton.focus();
          event.preventDefault();
        }

      }

    });
  }

}
