import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OlFeature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

import { DragPan, MouseWheelZoom, defaults } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';

@Component({
  selector: 'app-sighting',
  templateUrl: './sighting.component.html',
  styleUrls: ['./sighting.component.scss']
})

export class SightingComponent implements OnInit {

  observationMap;

  constructor() { }

  ngOnInit(): void {
    this.createMap();
  }

  getCoordinates(lat: number, long: number): OlFeature {

    let coordinates;

    // remember that OpenLayers needs the longitude to come first
    coordinates = new OlFeature({
      geometry: new Point(fromLonLat([long, lat])),
    });

    return coordinates;
  }

  getMapIconStyle(country: OlFeature): Style {

    country.setStyle(
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

    return country;
  }

  createMap() {

    let countries: any[] = [];

    // gjør om til JSON
    const norway = this.getCoordinates(59.9166, 10.7500);
    const southKorea = this.getCoordinates(37.55, 126.9833);
    const italy = this.getCoordinates(41.19, 12.4833);
    const uk = this.getCoordinates(51.509865, -0.118092);
    const argentina = this.getCoordinates(-34.5833, -58.666667);
    const croatia = this.getCoordinates(45.8, 16.000000);
    const portugal = this.getCoordinates(38.7166, -9.1333);
    const france = this.getCoordinates(48.86666666666667, 2.333333);
    const poland = this.getCoordinates(52.25, 21.00);
    const hungary = this.getCoordinates(47.5, 19.0833);
    const germany = this.getCoordinates(52.5166, 13.4000);
    const switzerland = this.getCoordinates(46.9166, 7.466667);
    const paraguay = this.getCoordinates(-25.2666, -57.666667);
    const brazil = this.getCoordinates(-15.783333333333333, -47.916667);
    const greece = this.getCoordinates(37.9833, 23.7333);
    const spain = this.getCoordinates(40.2085, -3.713);
    const sweden = this.getCoordinates(62.1983366, 17.5671981);

    countries.push(norway, southKorea, greece, argentina, croatia, italy, uk, brazil, france, spain, paraguay, switzerland, germany, hungary, poland, portugal, sweden);

    countries.forEach(c => {
      this.getMapIconStyle(c);
    });

    // map 1
    this.observationMap = new Map({
      interactions: defaults({ dragPan: false, mouseWheelZoom: false }).extend([
        new DragPan({
          condition: function (event) {
            return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
          },
        }),
        new MouseWheelZoom({
          condition: platformModifierKeyOnly,
        })]),
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            //features: [italy, uk, norway],
            features: countries,
          })
        })
      ],
      view: new View({
        center: olProj.fromLonLat([13.194067, 65.837983]),
        zoom: 5
      })
    });



  }

}
