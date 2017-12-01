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

	
	private selectedValue= 'Anual';
	private graficos = [{ value: 'Anual', viewValue: 'Anual' },
	{ value: 'Mensual', viewValue: 'Mensual' },
	{ value: 'Comuna', viewValue: 'Comuna'}];
	
	public barChartOptionsAnual: any = {
		scaleShowVerticalLines: true,
		responsive: true,		
	};
	
	

	public barChartLabelsAnual: 	string[] = [];
	public barChartType:		string = 'bar';
	public barChartLegend: 	boolean = true;
	 
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
	public barChartDataMensual: Array<any> = [{data:[0,0,0,0,0,0,0,0,0,0,0,0], label: '' }];
	
	
	public doughnutChartType:string = 'doughnut';
	public doughnutChartLabels:string[] = [];
	public doughnutChartData:number[] = [];
	private accidentesComuna;

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
// datos por comuna
		this.updateGraficoComuna();
	}


	private updateGraficoAnual() {
		this.servicio.getAccidentesEstadisticasAnio().subscribe(accidentes => {
			accidentes = accidentes;
			this.editarGraficoAnual(accidentes);
		});

		// this.editarLabel();
	}

	private updateGraficoMensual(){
		this.servicio.getAccidentesEstadisticasMes().subscribe(accidentes => {
			accidentes = accidentes;
			this.editarGraficoMensual(accidentes);
		});
	}

	private updateGraficoComuna(){
		this.servicio.getAccidentesComuna().subscribe(accidentes => {
			accidentes = accidentes;
			
			this.editarGraficoComuna(accidentes);
		});
	}







	private editarGraficoComuna(accidentes: Array<Observable<Object>>){
		this.accidentesComuna = accidentes;
		
		for (let i=0; i < accidentes.length; i++){
			if (i < 10){
				this.doughnutChartData.push(accidentes[i]['cantidad']);
				this.doughnutChartLabels.push(accidentes[i]['comuna']);
			}
		}
	}
		
	private editarGraficoMensual(accidentes: Array<Observable<Object>>){

		

		// se guarda el primer accidente del arreglo
		let anio = accidentes[0]['ano'];
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

			this.barChartDataMensual[indiceAnio]['data'][+accidentes[i]['mes']-1] = (+ accidentes[i]['cantidadMes']);
			
		}

		this.isDataAvailableMensual = true;
	}

	

	private editarGraficoAnual(accidentes: Array<Observable<Object>>){
		let cantAccidentes: number	[] = [];
		let labelAccidentes: string	[] = [];

		for (let i = 0; i< accidentes.length; i++){
			cantAccidentes.push(+ accidentes[i]['cantidadAno']);
			labelAccidentes.push(accidentes[i]['ano']);

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
