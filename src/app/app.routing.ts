import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EstadisticasComponent } from './estadisticasComponent/estadisticas.component';
import { MapaTiempoRealComponent } from './mapasComponent/mapaTiempoReal/mapaTiempoReal.component';
import { MapaHistoricoComponent } from './mapasComponent/mapaHistorico/mapaHistorico.component';
import { MapaConasetComponent } from './mapasComponent/mapaConaset/mapaConaset.component';
import { HomeComponent } from './homeComponent/home.component';
import { CuestionarioComponent } from './cuestionarioComponent/cuestionario.component';
import { EstadisticasConasetComponent } from './estadisticas-conaset/estadisticas-conaset.component';

const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'estadisticas', component: EstadisticasComponent},
	{path: 'estadisticasConaset', component: EstadisticasConasetComponent},
	{path: 'mapaTiempoReal', component: MapaTiempoRealComponent},
	{path: 'mapaHistorico', component: MapaHistoricoComponent},
	{path: 'mapaConaset', component: MapaConasetComponent},
	{path: 'cuestionario', component: CuestionarioComponent}
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouting{};
