import { Component, OnInit } from '@angular/core';
import { Servicios } from '../services/services';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-estadisticas-conaset',
  templateUrl: './estadisticas-conaset.component.html',
  styleUrls: ['./estadisticas-conaset.component.css']
})
export class EstadisticasConasetComponent implements OnInit {

  constructor(private servicio: Servicios) { }

  ngOnInit() {
    this.servicio.getAccidentesRegion().subscribe(res => {
      console.log(res);
    });
  }

}
