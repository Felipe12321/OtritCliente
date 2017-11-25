import { Component, OnInit, NgModule, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { AccidenteHistorico } from '../../model/accidenteHistorico';
import { Servicios } from '../../services/services';

@Component({
	selector: 'app-mapa-historico-component',
	templateUrl: './mapaHistorico.component.html',
	styleUrls: ['./mapaHistorico.component.css'],
})

export class MapaHistoricoComponent implements OnInit{

	private isDataAviable: boolean = false;
	private isEnabled: Array<boolean> = [true];
	private lat: number = -33.4669728;
	private lng: number = -70.6641528;
	
	public searchControl: FormControl;
	public zoom: number;
	private circles: Object;
	private accidentes: AccidenteHistorico[];
	private accidentesGuardados: AccidenteHistorico[];
	private years = [];

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

		this.servicio.getAccidentesHistoricos().subscribe(accidentes => {
			this.accidentes = accidentes as AccidenteHistorico[];
			this.accidentesGuardados = accidentes as AccidenteHistorico[];
			
			this.servicio.setFloat(this.accidentes);
			// console.log(this.accidentes);
			
			this.setYears();
			
			this.isDataAviable = true;

		});
	
		this.setMap();
		
	}

	setMap(){

		console.log('Abriendo mapa');
		

		this.zoom = 11;
		this.searchControl = new FormControl();

		this.mapsAPILoader.load().then(() => {
			
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ['address'],
				componentRestrictions: { country: 'cl' }
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


	setYears(){
		// Busca guarda en datos encontrados


		let encontrados: Array<any> = [];
		let j = 0;

		encontrados[0] = this.accidentes[0]['ano'];

		for (let i = 1; i < this.accidentes.length; i++){
			if (encontrados[j] !== this.accidentes[i]['ano']){
				encontrados.push(this.accidentes[i]['ano']);
				this.isEnabled.push(true);
				j++;
			}
		}
		
		
		this.years = encontrados;
		// console.log(this.years);
	}

	change(year, index){
		
		// console.log(year);
		// console.log(this.isEnabled[index]);

		let accidentes = [];

		if (!this.isEnabled[index]){
			for(let i = 0; i < this.accidentesGuardados.length; i++){
				if (this.accidentesGuardados[i]['ano'] !== year){
					accidentes.push(this.accidentes[i]);
				}
			}
		}else{
			this.accidentes = this.accidentesGuardados;
		}


		this.setMap();
	}
}

