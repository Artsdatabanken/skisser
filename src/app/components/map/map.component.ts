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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  map;
  map2;
  map3;

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
    this.map = new Map({
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

    // map2
    this.map2 = new Map({
      target: 'map2',
      layers: [
        // new MapboxVector({
        //   //styleUrl: 'mapbox://styles/consthauge/ckda047ee0qni1il7ij8k4kxr',
        //   styleUrl: 'mapbox://styles/consthauge/ckde9d5fu4uxl1inxe24c4z1z',
        //   accessToken: 'pk.eyJ1IjoiY29uc3RoYXVnZSIsImEiOiJjaWliZjIyNWEwMWN4eDZseml1NTNienJvIn0.xYoNXH-2ryD6j-sB0SwXqw',
        // }),
        new TileLayer({
          source: new XYZ({
            url: 'https://api.mapbox.com/styles/v1/consthauge/ckgaqup4k3ige19nwb2b71t9e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY29uc3RoYXVnZSIsImEiOiJjaWliZjIyNWEwMWN4eDZseml1NTNienJvIn0.xYoNXH-2ryD6j-sB0SwXqw'
          })
        }),
        new VectorLayer({
          source: new VectorSource({
            features: countries,
          })
        })
      ],
      view: new View({
        center: olProj.fromLonLat([13.194067, 65.837983]),
        zoom: 5
      })
    });

    // map3
    this.map3 = new Map({
      target: 'map3',
      layers: [
        // new MapboxVector({
        //   //styleUrl: 'mapbox://styles/consthauge/ckda047ee0qni1il7ij8k4kxr',
        //   styleUrl: 'mapbox://styles/consthauge/ckde9d5fu4uxl1inxe24c4z1z',
        //   accessToken: 'pk.eyJ1IjoiY29uc3RoYXVnZSIsImEiOiJjaWliZjIyNWEwMWN4eDZseml1NTNienJvIn0.xYoNXH-2ryD6j-sB0SwXqw',
        // }),
        new TileLayer({
          source: new XYZ({
            url: 'https://api.mapbox.com/styles/v1/consthauge/ckganv3730gq119pfav13yu87/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY29uc3RoYXVnZSIsImEiOiJjaWliZjIyNWEwMWN4eDZseml1NTNienJvIn0.xYoNXH-2ryD6j-sB0SwXqw'
          })
        }),
        new VectorLayer({
          source: new VectorSource({
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