import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})

export class DesignComponent implements OnInit {

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {

    this.translationService.getLanguageItem().subscribe(r => {
      //console.log('r', r)
    });

    // this.translationService.getLanguageKeys().subscribe(r => {
    //   console.log('r', r)
    // });

  }

}
