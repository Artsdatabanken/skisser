import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[clickElsewhere]' })
export class ClickElsewhereDirective {

    @Output() clickElsewhere = new EventEmitter<MouseEvent>();

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {

        const targetElement: HTMLElement = event.target as HTMLElement;

        // console.log('targetElement', targetElement)
        // console.log('elementRef', this.elementRef)
        // console.log('test', !this.elementRef.nativeElement.contains(targetElement))

        // check if the click was outside the element
        if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
            this.clickElsewhere.emit(event);
        }

    }
}
