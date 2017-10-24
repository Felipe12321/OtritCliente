import { Injectable } from '@angular/core';

import { Http} from '@angular/http';
import { Accidente } from '../model/accidente';

import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';
import { Accidente2 } from '../model/accidente2';

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
        return this.http.get('/assets/data/accidents.json').map((data) => {
            console.log(data.json());
            return data.json();
        }
        );
    }

    public setFloat(accidente: Object[]){
        for (let i = 0; i < accidente.length; i++){
            accidente[i]['latitud'] = parseFloat(accidente[i]['latitud']);
            accidente[i]['longitud'] = parseFloat(accidente[i]['longitud']);
        }
    }


    public crearMarcadoresHistorico(){
		return [
			{'lat': -33.444398, 'lng': -70.590462, 'color': '#0000FF' , 'r': this.getRadio(1000)},
			{'lat': -33.425204, 'lng': -70.534647, 'color': '#0000FF', 'r': this.getRadio(2000)},
			{'lat': -33.432323, 'lng': -70.750641, 'color': '#FF0000', 'r': this.getRadio(3000)},
			{'lat': -33.507726, 'lng': -70.674152, 'color': '#FF0000', 'r': this.getRadio(4000)}
		];
    }

    public getDate(accidentes: Accidente[]){
        
        for (let accidente of accidentes){
            let full = accidente['fecha'] +' '+ accidente['hora'];
            let date = (this.datePipe.transform(full, 'MM-dd-yyyy hh:mm:ss'));
            let newDate = (new Date(date));
            this.fecha.push(new Date(newDate));
        }
        console.log(this.fecha);
        return this.fecha;
    }


    public getAccidentes2() {
        return this.http.get('/assets/data/accidents2.json').map((data) => {
            console.log(data.json());
            return data.json();
        });
    }
}
