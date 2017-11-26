import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { Accidente } from '../model/accidente';

import { Servicios } from '../services/services';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-estadisticas-component',
	templateUrl: './estadisticas.component.html',
	styleUrls: ['./estadisticas.component.css']
})

export class EstadisticasComponent implements OnInit{
	
	private isDataAvailableMensual: boolean = false;
	private isDataAvailableAnual: boolean = false;
	
	private accidentes: Array<Observable<Object>>;
	
	private selectedValue= 'Anual';
	private graficos = [{ value: 'Anual', viewValue: 'Anual' },
	{ value: 'Mensual', viewValue: 'Mensual' }];
	
	public barChartOptionsAnual: any = {
		scaleShowVerticalLines: true,
		responsive: true,		
	};
	
	

	public barChartLabelsAnual: 	string[] = [];
	public barChartTypeAnual:		string = 'bar';
	public barChartLegendAnual: 	boolean = true;
	 
	public barChartDataAnual:any[] = [
		 { 
			 data: [], 
			 label: 'Número de accidentes de tránsito', 
			},
		];
	// variable que va a determinar los años
	public graficoDataAnual: Array<boolean> = [];

	public Colors: Array<any> = [
		{ // blue
			backgroundColor: 'rgba(51, 9, 179,0.6)',
			borderColor: 'rgba(51, 9, 179,1)',
			pointBackgroundColor: 'rgba(51, 9, 1790,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
	}];


	public barChartOptionsMensual: any = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	public barChartLabelsMensual: string[] = ['Enero','Febrero','Marzo','Abril','Mayo'
											 ,'Junio','Julio','Agosto','Septiembre'
											 ,'Octubre','Noviembre','Diciembre'];

	public barChartTypeMensual: string = 'bar';
	public barChartLegendMensual: boolean = true;
	public barChartDataMensual: Array<any> = [{data:[0,0,0,0,0,0,0,0,0,0,0,0], label: '' }];
	 
	constructor(
	  private router: Router,
	  private aR: ActivatedRoute,
	  private titleService: Title,
	  private servicio: Servicios
	) { }
	 
		
	ngOnInit() {

		this.titleService.setTitle('Estadísticas - OTRIT');
// datos anuales
		this.updateGraficoAnual();
// datos mensuales
		this.updateGraficoMensual();
		
	}


	private updateGraficoAnual() {
		this.servicio.getAccidentesEstadisticasAnio().subscribe(accidentes => {
			this.accidentes = accidentes;
			this.editarGraficoAnual(this.accidentes);
		});

		// this.editarLabel();
	}

	private updateGraficoMensual(){
		this.servicio.getAccidentesEstadisticasMes().subscribe(accidentes => {
			this.accidentes = accidentes;
			this.editarGraficoMensual(this.accidentes);
		});
	}

/*
	private editarLabel(){
		console.log(this.ene);

		let meses = [];
		if (this.ene){
			meses.push('Enero');	
		}
		if (this.feb) {
			meses.push('Febrero');
		}
		if (this.mar) {
			meses.push('Marzo');
		}
		if (this.abr) {
			meses.push('Abril');
		}
		if (this.may) {
			meses.push('Mayo');
		}
		if (this.jun) {
			meses.push('Junio');
		}
		if (this.jul) {
			meses.push('Julio');
		}
		if (this.ago){
			meses.push('Agosto');
		}
		if (this.sep) {
			meses.push('Septiembre');
		}
		if (this.oct) {
			meses.push('Octubre');
		}
		if (this.nov) {
			meses.push('Noviembre');
		}
		if (this.dic) {
			meses.push('Diciembre');
		}
	
		this.barChartLabelsMensual = meses;
	}
*/


	
	editarGraficoMensual(accidentes: Array<Observable<Object>>){

		console.log(accidentes);

		// se guarda el primer accidente del arreglo
		let anio = this.accidentes[0]['ano'];
		// Contador de años
		let indiceAnio = 0;
		
		this.barChartDataMensual[indiceAnio]['label'] = 'Cantidad accidentes año ' + accidentes[0]['ano'] + '\t' ;
	
		
		for(let i = 0; i< accidentes.length; i++){

			// console.log(accidentes[i]['mes'] + ' - ' + this.accidentes[i]['cantidadMes']);

			// si ya se acabron los accidentes en un año se sigue con el siguiente año
			if (anio !== accidentes[i]['ano']){
				anio = accidentes[i]['ano'];

				indiceAnio ++;
				this.barChartDataMensual[indiceAnio] = [];				
				this.barChartDataMensual[indiceAnio]['data'] = [0,0,0,0,0,0,0,0,0,0,0,0];
				this.barChartDataMensual[indiceAnio]['label'] = 'Cantidad accidentes año ' + accidentes[i]['ano'];
			}			

			this.barChartDataMensual[indiceAnio]['data'][+accidentes[i]['mes']-1] = (+ this.accidentes[i]['cantidadMes']);
			
		}

		this.isDataAvailableMensual = true;
	}

	

	editarGraficoAnual(accidentes: Array<Observable<Object>>){
		let cantAccidentes: number	[] = [];
		let labelAccidentes: string	[] = [];

		for (let i = 0; i< accidentes.length; i++){
			cantAccidentes.push(+ this.accidentes[i]['cantidadAno']);
			labelAccidentes.push(this.accidentes[i]['ano']);

			this.graficoDataAnual[i] = true;
		}
		this.barChartDataAnual[0]['data'] = cantAccidentes;
		this.barChartLabelsAnual = labelAccidentes;
		
		this.isDataAvailableAnual = true;

		console.log(cantAccidentes.length + ' Cantidad de años');
	}

	descargaDatos(){
		console.log('descargando datos');
		this.servicio.descargaExcel(this.barChartDataMensual);
	}


}
