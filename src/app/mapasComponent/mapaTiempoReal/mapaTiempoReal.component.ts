import { Component, OnInit, NgModule, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { Http} from '@angular/http';
import { Accidente } from '../../model/accidente';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-mapa-tiempo-real-component',
	templateUrl: './mapaTiempoReal.component.html',
  	styleUrls: ['./mapaTiempoReal.component.css']
})

export class MapaTiempoRealComponent implements OnInit{
	lat: number = -33.4669728;
	lng: number = -70.6641528;
	  public searchControl: FormControl;
		public zoom: number;
		private accidentes: Accidente[];
  
	  @ViewChild('search')
	  public searchElementRef: ElementRef;
  
	markers: Object = [
									  {'lat': -33.444398, 'lng': -70.590462, 'icon': 'assets/traficon.png'},
									  {'lat': -33.425204, 'lng': -70.534647, 'icon': 'assets/traficon.png'},
									  {'lat': -33.432323, 'lng': -70.750641, 'icon': 'assets/traficon.png'},
									  {'lat': -33.507726, 'lng': -70.674152, 'icon': 'assets/traficon.png'}
	]
	  constructor(
		  private router: Router,
		  private titleService: Title,
			private mapsAPILoader: MapsAPILoader,
			private http: Http,
		  private ngZone: NgZone
	  ){}
  
	  ngOnInit() {

			this.titleService.setTitle('Mapa histórico - OTRIT');
			


			this.getAccidentes().subscribe(accidentes => {
				
				this.accidentes = accidentes as Accidente[];
				console.log(this.accidentes);
			});
			
			console.log(this.accidentes);

		  this.zoom = 11;
  
		  this.searchControl = new FormControl();
  
		  this.mapsAPILoader.load().then(() => {
			  let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ['address'],
				componentRestrictions: {country: 'cl'}
			  });
			  autocomplete.addListener('place_changed', () => {
				this.ngZone.run(() => {
				  // get the place result
				  let place: google.maps.places.PlaceResult = autocomplete.getPlace();
		  
				  // verify result
				  if (place.geometry === undefined || place.geometry === null) {
					return;
				  }
				  
				  // set latitude, longitude and zoom
				  this.lat = place.geometry.location.lat();
				  this.lng = place.geometry.location.lng();
				  this.zoom = 15;
				});
			  });
			});
			
			
		}
		

		getAccidentes(){
			return this.http.get('/assets/data/accidents.json').map((data) => {
				return data['accidentes']}
			);
		}
}
