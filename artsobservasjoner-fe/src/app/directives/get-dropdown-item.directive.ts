import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[getDropdownItem]'
})

export class GetDropdownItemDirective implements OnInit {

    elem: any;
    private unlistener: () => void;

    constructor(
        private elemRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {

        this.unlistener = this.renderer.listen(this.elemRef.nativeElement, 'click', (event: any) => {
            this.elem = event.target.innerText || event.currentTarget.innerText;
            //this.layoutService.propagateDropdownLinkText(this.elem);
        });

    }

    ngOnDestroy() {
        this.unlistener();
    }

}