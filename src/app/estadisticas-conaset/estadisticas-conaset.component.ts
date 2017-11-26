import { Component, OnInit } from '@angular/core';
import { Servicios } from '../services/services';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-estadisticas-conaset',
  templateUrl: './estadisticas-conaset.component.html',
  styleUrls: ['./estadisticas-conaset.component.css']
})
export class EstadisticasConasetComponent implements OnInit {

  private selectedValue = 'Regional';

  private isDataAvailableReg: boolean = false;
  private graficos = [{ viewValue: 'Regional' },
  { viewValue: 'Mensual' }];
  private barChartDataReg: any[] = [{
    data: [],
    label: ''
  }];

  public barChartLabelsReg: Array<string> = [
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama',
    'Coquimbo', 'Valparaíso', 'Metropolitana', 'L.B.O´Higgins', 
    'Maule', 'BioBio', 'Araucanía', 'Los Ríos', 'Los Lagos',
    'Aysén', 'Magallanes'
  ];
  public barChartLegendReg: boolean = true;
  public barChartTypeReg:   string = 'bar';

  barChartOptionsReg: any = {
    scaleShowVerticalLines: true,
    responsive: true,
  };


  constructor(private servicio: Servicios) { }

  ngOnInit() {
    this.servicio.getAccidentesRegion().subscribe(res => {
      this.setData(res);
      this.isDataAvailableReg = true;

      // console.log(this.barChartDataReg);
      // console.log(this.barChartLabelsReg);
    });
  }

  setData(accidentes: Array<Observable<Object>>){
    let regiones = [];    
    let accidentesReg = [];
    let year = accidentes[0]['anio'];
    let indiceAnio = 0;
    this.barChartDataReg[indiceAnio]['label'] = 'Cantidad accidentes por región año ' + accidentes[0]['anio'];
    let j=0;

    for(let i = 0; i < accidentes.length; i++){
      
      if (year !== accidentes[i]['anio']) {
        console.log(indiceAnio);
        year = accidentes[i]['anio'];
        ++indiceAnio;
        j=0;

        this.barChartDataReg[indiceAnio]          = [];
        this.barChartDataReg[indiceAnio]['data']  = [];	
        this.barChartDataReg[indiceAnio]['label'] = 'Cantidad accidentes por región año ' + accidentes[i]['anio'];
        console.log(indiceAnio);

      }
      this.barChartDataReg[indiceAnio]['data'][j] = (+accidentes[i]['siniestros']);
      // console.log(accidentes[i]['siniestros']);
      ++j;
    }

    
    console.log(this.barChartDataReg);

    // console.log(regiones);
  }

}
