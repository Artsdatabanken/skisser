import { DOCUMENT } from '@angular/common';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Directive, ElementRef, Host, Inject, ViewChild } from '@angular/core';
import { MenuComponent } from '../layout/menu/menu.component';

@Directive({
  selector: '[trapFocus]'
})

export class TrapFocusDirective {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef,
    @Host() private menu: MenuComponent
  ) { }

  ngAfterViewInit() {
    this.trapFocus(this.element.nativeElement);
  }

  trapFocus(element: any): void {

    const menuButton: any = document.querySelector('#hamburger');

    const allFocusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"],' +
      'input[type="radio"], input[type="checkbox"], select'
    );

    const focusableElements = Array.from(allFocusableElements).filter((el: any) => !el.disabled);
    const firstFocusableElement: any = focusableElements[1]; // because first is menu
    const lastFocusableElement: any = focusableElements[focusableElements.length - 1];

    console.log({ focusableElements })
    // we ue native JS because we can't use @HostListener inside a method in Angular
    
    console.log('firstFocusableElementfirstFocusableElementfirstFocusableElement', firstFocusableElement)

    element.addEventListener('keydown', function (event: KeyboardEvent) {

      // is Tab being pressed
      let isTabPressed: boolean = event.key === 'Tab' || event.code === 'Tab'; 

      if (!isTabPressed) return;

      if (event.shiftKey) /* shift + tab */ {

        if (document.activeElement === firstFocusableElement) {
          //lastFocusableElement.focus();
          menuButton.focus();
          event.preventDefault();
        }

        if (document.activeElement === menuButton) {
          console.log('are we here', firstFocusableElement)
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
