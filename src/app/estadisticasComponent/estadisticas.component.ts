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


	  public barChartLabels: 	string[];
	  public barChartType:		string = 'bar';
	  public barChartLegend: 	boolean = true;
	 
	  public barChartData:any[] = [
		{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
		{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
	  ];
	  
	 
	  constructor(
		  private router: Router,
		  private aR: ActivatedRoute,
		  private titleService: Title,
		  private servicio: Servicios
	  ) { }
	 
	  // events
	  public chartClicked(e:any):void {
		console.log(e);
	  }
	 
	  public chartHovered(e:any):void {
		console.log(e);
		}
		
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
