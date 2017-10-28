import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppRouting } from './app.routing';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';

import { Servicios } from './services/services';

import { AppComponent } from './app.component';
import { EstadisticasComponent} from './estadisticasComponent/estadisticas.component';
import { MapaTiempoRealComponent } from './mapasComponent/mapaTiempoReal/mapaTiempoReal.component';
import { MapaHistoricoComponent } from './mapasComponent/mapaHistorico/mapaHistorico.component';
import { HomeComponent } from './homeComponent/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule, MatInputModule, MatCheckboxModule} from '@angular/material';

import { NgIf } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    EstadisticasComponent,
    MapaTiempoRealComponent,
    MapaHistoricoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHImk9BEYh0Z27DT8OD-6wx6cRYNJSpcY',
      libraries: ['places']
    }),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    
  ],
  providers: [Servicios, DatePipe],
  bootstrap: [ AppComponent
  ]
})
export class AppModule { }
