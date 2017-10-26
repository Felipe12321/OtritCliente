import { Injectable } from '@angular/core';

import { Http} from '@angular/http';
import { Accidente } from '../model/accidente';

import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';
import { AccidenteHistorico } from '../model/accidenteHistorico';

@Injectable()
export class Servicios {
    fecha: Date[] = [];


    constructor(private http: Http,
        private datePipe: DatePipe){}
    

    // Aqui iria la funcion para determinar el radio
    public getRadio(ra: number): number{
		return ra;
    }
    

    public getAccidentes(){
        return this.http.get('https://serene-ocean-37939.herokuapp.com/getAccidentes.php')
        .map(res => res.json());
    }

    public setFloat(accidente: Object[]){
        for (let i = 0; i < accidente.length; i++){
            accidente[i]['latitud'] = parseFloat(accidente[i]['latitud']);
            accidente[i]['longitud'] = parseFloat(accidente[i]['longitud']);
        }
    }


    public getAccidentesHistoricos() {
        return this.http.get('https://serene-ocean-37939.herokuapp.com/getAccidentesCantidad.php')
            .map(res => res.json());
    }

    public getAccidentesEstadisticasMes(){
        return this.http.get('https://serene-ocean-37939.herokuapp.com/getAccidentesEstadistMes.php')
            .map(res => res.json());
    }
}
