import { Component, OnInit, NgModule, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';

@Component({
	selector: 'app-mapa-historico-component',
	templateUrl: './mapaHistorico.component.html',
	styleUrls: ['./mapaHistorico.component.css'],

})

export class MapaHistoricoComponent implements OnInit{
	lat: number = -33.4669728;
  lng: number = -70.6641528;
	public searchControl: FormControl;
	public zoom: number;

	//Aqui iria la funcion para determinar el radio
	public getRadio(ra: number): number{
		return ra;
	}

	foods = [
    {value: '0', viewValue: '2017'},
    {value: '1', viewValue: '2018'},
    {value: '2', viewValue: '2019'}
	];

	@ViewChild('search')
	public searchElementRef: ElementRef;
	
	circles: Object = [
		{'lat': -33.444398, 'lng': -70.590462, 'color': '#0000FF' , 'r': this.getRadio(1000)},
		{'lat': -33.425204, 'lng': -70.534647, 'color': '#0000FF', 'r': this.getRadio(2000)},
		{'lat': -33.432323, 'lng': -70.750641, 'color': '#FF0000', 'r': this.getRadio(3000)},
		{'lat': -33.507726, 'lng': -70.674152, 'color': '#FF0000', 'r': this.getRadio(4000)}
	]

	constructor(
		private router: Router,
		private titleService: Title,
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone,
		
	){}

	ngOnInit() {
		
		this.zoom = 11;

		this.titleService.setTitle('Mapa histórico - OTRIT');
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

}

