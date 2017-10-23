import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Accidente } from '../model/accidente';

import { Servicios } from '../services/services';

@Component({
	selector: 'app-estadisticas-component',
	templateUrl: './estadisticas.component.html',
	styleUrls: ['./estadisticas.component.css']
})

export class EstadisticasComponent implements OnInit{
	
	private accidentes: Accidente[];
	private fechaAccidentes: Date[] = [];

		public barChartOptions:any = {
			scaleShowVerticalLines: true,
			responsive: true
		};


	  public barChartLabels: string[] = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];;
	  public barChartType:		string = 'bar';
	  public barChartLegend: 	boolean = true;
	 
	  public barChartData:any[] = [
			{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Numero de accidentes de tránsito' },
	  ];
		public barChartOptions2: any = {
			scaleShowVerticalLines: false,
			responsive: true
		};
		public barChartLabels2: string[] = ['Enero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
																	'Octubre', 'Noviembre', 'Diciembre'];
		public barChartType2: string = 'bar';
		public barChartLegend2: boolean = true;

		public barChartData2: any[] = [
			{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Numero de accidentes de tránsito' },
		];
	 
	  constructor(
		  private router: Router,
		  private aR: ActivatedRoute,
		  private titleService: Title,
		  private servicio: Servicios
	  ) { }
	 

		
		ngOnInit() {
			this.titleService.setTitle('Estadísticas - OTRIT');

			this.servicio.getAccidentes().subscribe(accidentes => {
				this.accidentes = accidentes as Accidente[];
				console.log(this.accidentes);
				this.fechaAccidentes = this.servicio.getDate(this.accidentes);
				
			});


			console.log(this.fechaAccidentes);
			
		}


	
}
