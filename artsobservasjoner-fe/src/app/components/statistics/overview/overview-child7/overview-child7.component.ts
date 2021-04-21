import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/shared';
import { LayoutService } from 'src/app/services/layout.service';
import { TranslationService } from 'src/app/services/translation.service';

import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OlFeature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

import { SpeciesService } from 'src/app/services/species.service';
import { OverviewStatisticsService } from 'src/app/services/overview-statistics.service';

@Component({
  selector: 'app-overview-child7',
  templateUrl: './overview-child7.component.html',
  styleUrls: ['./overview-child7.component.scss']
})

export class OverviewChild7Component implements OnInit {

  pageTitle$: Observable<string>;
  currentLanguage$: Observable<string>;
  data$: Observable<object>;
  speciesGroups$: Observable<Category[]>;
  areas$: Observable<any>;
  map;

  constructor(
    private layoutService: LayoutService,
    private translationService: TranslationService,
    private speciesService: SpeciesService,
    private overviewStatisticsService: OverviewStatisticsService,
  ) { }

  ngOnInit(): void {

    this.pageTitle$ = this.layoutService.setPageTitle('statistics.overviewStats_heading_7');
    this.currentLanguage$ = this.translationService.currentLanguage$;

    this.speciesGroups$ = this.speciesService.speciesGroups;
    this.data$ = this.overviewStatisticsService.getSightingsGeographicalDistribution();
    //this.areas$ = this.statisticsService.getAreas();

  }

  getCoordinates(lat: number, long: number): OlFeature {

    // remember that OpenLayers needs the longitude to come first
    const coordinates = new OlFeature({
      geometry: new Point(fromLonLat([long, lat])),
    });

    return coordinates;
  }

  getMapIconStyle(sighting: OlFeature): Style {

    sighting.setStyle(
      new Style({
        image: new Icon({
          color: '#BADA55',
          crossOrigin: 'anonymous',
          // For Internet Explorer 11
          //imgSize: [5, 5],
          src: 'assets/images/iconMap.png',
          scale: 0.5,
        }),
      })
    );

    return sighting;
  }

  // createMap() {

  //   // custom control

  //   this.map = new Map({
  //     interactions: defaults({ dragPan: false, mouseWheelZoom: false }).extend([
  //       new DragPan({
  //         condition: function (event) {
  //           return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
  //         },
  //       }),
  //       new MouseWheelZoom({
  //         condition: platformModifierKeyOnly,
  //       })]),
  //     target: 'map',
  //     layers: [
  //       new TileLayer({
  //         source: new OSM()
  //       }),
  //       new VectorLayer({
  //         source: new VectorSource({
  //           //features: [italy, uk, norway],
  //           features: this.mammalsCoordinates,
  //         })
  //       })
  //     ],
  //     view: new View({
  //       center: olProj.fromLonLat([13.194067, 65.837983]),
  //       zoom: 5
  //     })
  //   });

  // }


}
