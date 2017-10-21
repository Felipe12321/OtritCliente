import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-estadisticas-component',
	templateUrl: './estadisticas.component.html',
	  styleUrls: ['./estadisticas.component.css']
})

export class EstadisticasComponent implements OnInit{
	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true
	  };
	  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	  public barChartType:string = 'bar';
	  public barChartLegend:boolean = true;
	 
	  public barChartData:any[] = [
		{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
		{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
	  ];
	 
	  // events
	  public chartClicked(e:any):void {
		console.log(e);
	  }
	 
	  public chartHovered(e:any):void {
		console.log(e);
		}
		
		ngOnInit() {
			this.titleService.setTitle('Estadísticas - OTRIT');
		}

		constructor(
			private router: Router,
			private aR: ActivatedRoute,
			private titleService: Title
		){}

	  public randomize():void {
		// Only Change 3 values
		let data = [
		  Math.round(Math.random() * 100),
		  59,
		  80,
		  (Math.random() * 100),
		  56,
		  (Math.random() * 100),
		  40];
		let clone = JSON.parse(JSON.stringify(this.barChartData));
		clone[0].data = data;
		this.barChartData = clone;

	}
	
}
