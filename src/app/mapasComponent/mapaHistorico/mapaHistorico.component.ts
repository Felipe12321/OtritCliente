import { Component, OnInit, NgModule, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { Accidente2 } from '../../model/accidente2';
import { Servicios } from '../../services/services';

@Component({
	selector: 'app-mapa-historico-component',
	templateUrl: './mapaHistorico.component.html',
	styleUrls: ['./mapaHistorico.component.css'],

})

export class MapaHistoricoComponent implements OnInit{
	private lat: number = -33.4669728;
  private lng: number = -70.6641528;
	public searchControl: FormControl;
	public zoom: number;
	private circles: Object;
	private accidentes2: Accidente2[];
	

	years = [
		{value: '0', viewValue: '2017'},
		{value: '1', viewValue: '2018'},
		{value: '2', viewValue: '2019'}
	];

	@ViewChild('search')
	public searchElementRef: ElementRef;
	
	constructor(
		private router: Router,
		private titleService: Title,
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone,
		private servicio: Servicios
		
	){}

	ngOnInit() {
		this.titleService.setTitle('Mapa histórico - OTRIT');		
		this.circles = this.servicio.crearMarcadoresHistorico();
		
		
		this.servicio.getAccidentes2().subscribe(accidentes2 => {
			this.accidentes2 = accidentes2 as Accidente2[];
			console.log(this.accidentes2);
		});

		console.log(this.accidentes2);


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

	

}

