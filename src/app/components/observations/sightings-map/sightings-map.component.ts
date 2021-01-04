import { Component, Input, OnInit } from '@angular/core';
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

import { DragPan, MouseWheelZoom, defaults } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-sightings-map',
  templateUrl: './sightings-map.component.html',
  styleUrls: ['./sightings-map.component.scss']
})

export class SightingsMapComponent implements OnInit {

  @Input() take: number | null = 0;
  map;
  marineMammals: any[];
  mammalsCoordinates: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getSightings();
    this.createMap();
  }

  getSightings(): void {

    this.dataService.getMammalSightings().subscribe(mm => {
      this.marineMammals = mm;

      this.marineMammals.forEach(mm => {
        this.getMammalCoords(mm);
      });

    });

    // this.dataService.getMammalSightings().pipe(
    //   map(m => {
    //     this.marineMammals = m;
    //     console.log('m', m)
    //   })
    // ).subscribe();

  }

  getCoordinates(lat: number, long: number): OlFeature {

    // remember that OpenLayers needs the longitude to come first
    const coordinates = new OlFeature({
      geometry: new Point(fromLonLat([long, lat])),
    });

    return coordinates;
  }

  getMammalCoords(mammal: any): any[] {

    let sightingCoords = this.getCoordinates(mammal.longitude, mammal.latitude);
    this.mammalsCoordinates.push(sightingCoords);
    
    this.mammalsCoordinates.forEach(ms => {
      console.log('ms', ms)
      this.getMapIconStyle(ms);
    })

    return this.mammalsCoordinates;

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

  createMap() {

 

    // custom control

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
            features: this.mammalsCoordinates,
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
