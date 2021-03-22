import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Footnote } from 'src/app/models/footnote';

@Component({
  selector: 'app-footnote',
  templateUrl: './footnote.component.html',
  styleUrls: ['./footnote.component.scss']
})

export class FootnoteComponent implements OnInit {

  @Input('element') footnoteElement?: Footnote;
  @ViewChild('footNote') footNote?: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    //this.footNote.nativeElement.innerHTML = this.footnoteElement.text;
  }

}
