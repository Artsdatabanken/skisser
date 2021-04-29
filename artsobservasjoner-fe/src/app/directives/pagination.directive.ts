import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appPagination]',
  exportAs: 'appPagination'
})

export class PaginationDirective {

  @Input() pageNumber: number = 1;
  @Input() totalPages: number = 1;
  //@Input() totalPages: BehaviorSubject<number> = new BehaviorSubject(1);
  @Input() pageSize: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // in case no value is passed
    this.setValue(this.pageNumber);
  }

  ngOnChanges({ pageNumber, totalPages }: SimpleChanges) {

    console.log('on changes totalPages', this.totalPages);

    // needs to be checked before pageNumber
    if (totalPages) {
      this.onTotalPagesInput();
    }

    if (pageNumber) {
      this.onpageNumberInput();
    }

  }

  @HostListener('input', ['$event.target.value']) onInput(val) {
    this.setValue(this.getParsedValue(val));
  }

  @HostListener('change', ['$event.target.value']) onChange(val) {
    if (val === '') {
      this.setValue(1);
    }

    if (this.isOutOfRange(val)) {
      this.setValue(this.totalPages);
    }

    this.pageNumber = Number(this.el.nativeElement.value);
    this.pageChange.emit(this.pageNumber);
  }

  get isFirst(): boolean {
    return this.pageNumber === 1;
  }

  get isLast(): boolean {
    return this.pageNumber === this.totalPages;
  }

  first() {
    this.setPage(1);
  }

  prev() {
    this.setPage(Math.max(1, this.pageNumber - 1));
  }

  next() {
    this.setPage(Math.min(this.totalPages, this.pageNumber + 1));
  }

  last() {
    this.setPage(this.totalPages);
  }

  private setValue(val: string | number) {
    this.renderer.setProperty(this.el.nativeElement, 'value', String(val));
  }

  private setPage(val: number) {
    this.pageNumber = val;
    this.setValue(this.pageNumber);
    this.pageChange.emit(this.pageNumber);
  }

  private getParsedValue(val: string): string {
    return val.replace(/(^0)|([^0-9]+$)/, '');
  }

  private isOutOfRange(val: string): boolean {
    return Number(val) > this.totalPages;
  }

  private onTotalPagesInput() {
    if (typeof this.totalPages !== 'number') {
      this.totalPages = 1;
    }
  }

  private onpageNumberInput() {
    if (
      typeof this.pageNumber !== 'number' ||
      this.pageNumber < 1 ||
      this.pageNumber > this.totalPages
    ) {
      this.pageNumber = 1;
    }

    this.setValue(this.pageNumber);
  }

}
