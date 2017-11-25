import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EstadisticasComponent } from './estadisticasComponent/estadisticas.component';
import { MapaTiempoRealComponent } from './mapasComponent/mapaTiempoReal/mapaTiempoReal.component';
import { MapaHistoricoComponent } from './mapasComponent/mapaHistorico/mapaHistorico.component'
import { HomeComponent } from './homeComponent/home.component';
import { CuestionarioComponent } from './cuestionarioComponent/cuestionario.component';

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'estadisticas', component: EstadisticasComponent},
	{path: 'mapaTiempoReal', component: MapaTiempoRealComponent},
	{path: 'mapaHistorico', component: MapaHistoricoComponent},
	{path: 'cuestionario', component: CuestionarioComponent}
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouting{};
