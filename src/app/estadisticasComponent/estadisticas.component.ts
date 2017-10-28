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
	
	private selectedValue= 'Mensual';
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
			 label: 'Numero de accidentes de tránsito', 
			 
		},
	];
	

	private ene = true;
	private feb = true;
	private mar = true;
	private abr = true;
	private may = true;
	private jun = true;
	private jul = true;
	private ago = true;
	private sep = true;
	private oct = true;
	private nov = true;
	private dic = true;


	public barChartOptionsMensual: any = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	public barChartLabelsMensual: string[] = [];
	public barChartTypeMensual: string = 'bar';
	public barChartLegendMensual: boolean = true;
	
	public barChartDataMensual: any[] = [
			{data: [], label: 'Numero de accidentes de tránsito'},
		];
	 
	constructor(
	  private router: Router,
	  private aR: ActivatedRoute,
	  private titleService: Title,
	  private servicio: Servicios
	) { }
	 
		
	ngOnInit() {

		this.titleService.setTitle('Estadísticas - OTRIT');

		this.updateGraficoAnual();
		this.updateGraficoMensual();
		
	}


	private updateGraficoAnual() {
		this.servicio.getAccidentesEstadisticasAnio().subscribe(accidentes => {
			this.accidentes = accidentes;
			this.editarGraficoAnual(this.accidentes);
		});

		this.editarLabel();
	}

	private updateGraficoMensual(){
		this.servicio.getAccidentesEstadisticasMes().subscribe(accidentes => {
			this.accidentes = accidentes;
			this.editarGraficoMensual(this.accidentes);
		});
	}

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

	editarGraficoMensual(accidentes: Array<Observable<Object>>){
		let cantAccidentes: number[] = [];

		for(let i = 0; i< accidentes.length; i++){
			cantAccidentes.push(+ this.accidentes[i]['cantidadMes']);
		}
		this.barChartDataMensual[0]['data'] = cantAccidentes;
		this.isDataAvailableMensual = true;
	}

	

	editarGraficoAnual(accidentes: Array<Observable<Object>>){
		let cantAccidentes: number[] = [];
		let labelAccidentes: string[] = [];

		for (let i = 0; i< accidentes.length; i++){
			cantAccidentes.push(+ this.accidentes[i]['cantidadAno']);
			labelAccidentes.push(this.accidentes[i]['ano']);
		}
		this.barChartDataAnual[0]['data'] = cantAccidentes;
		this.barChartLabelsAnual = labelAccidentes;
		
		this.isDataAvailableAnual = true;
	}
}
