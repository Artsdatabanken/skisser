import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appNavigateToPage]'
})

export class NavigateToPageDirective {

  @Input() id: number | string;

  @HostListener('click') onClick() {

    this.router.navigate(['/about/' + this.id]);

    console.log('did we reach directive?', this.id)

  }

  constructor(private router: Router) { }

}
