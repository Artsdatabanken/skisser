import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AreaService } from 'src/app/services/area.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})

export class AreaComponent implements OnInit {

  @Input() areaId: number;
  areaLabel$: Observable<string>;
  currentLanguage$: Observable<string>;

  constructor(
    private areaService: AreaService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {

    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.areaLabel$ = this.areaService.getAreaById(this.areaId).pipe(
      map(area => {

        console.log('dfjgsdfjasdgfjasdgfjsdf', area)
        return area['name'];

      })
    );

  }

}
