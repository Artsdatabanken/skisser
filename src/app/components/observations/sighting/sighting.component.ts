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
   
    countries.push(norway);

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
      target: 'observationMap',
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
        zoom: 4
      })
    });



  }

}
