import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[clickElsewhere]' })
export class ClickElsewhereDirective {

    @Output() clickElsewhere = new EventEmitter<MouseEvent>();

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {

        const targetElement = event.target as HTMLElement;

        console.log('targetElement', targetElement)
        console.log('test', !this.elementRef.nativeElement.contains(targetElement))
        console.log('test 2', targetElement && !this.elementRef.nativeElement.contains(targetElement))

        // Check if the click was outside the element
        if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
            this.clickElsewhere.emit(event);
        }
    }
}
