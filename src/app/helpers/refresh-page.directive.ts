import { DOCUMENT } from '@angular/common';
import { HostListener } from '@angular/core';
import { Directive, Inject } from '@angular/core';

@Directive({
  selector: '[refreshPage]'
})

export class RefreshPageDirective {

  @HostListener('click') onClick() {
    this.document.defaultView.location.reload();
    console.log('did we reach directive?')
  }

  constructor(@Inject(DOCUMENT) private document: Document) { }

}
