import { Injectable } from '@angular/core';

import { Http} from '@angular/http';
import { Accidente } from '../model/accidente';

import 'rxjs/add/operator/map';

@Injectable()
export class Servicios {
    
    constructor(private http: Http){}
    

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



    public crearMarcadoresHistorico(){
		return [
			{'lat': -33.444398, 'lng': -70.590462, 'color': '#0000FF' , 'r': this.getRadio(1000)},
			{'lat': -33.425204, 'lng': -70.534647, 'color': '#0000FF', 'r': this.getRadio(2000)},
			{'lat': -33.432323, 'lng': -70.750641, 'color': '#FF0000', 'r': this.getRadio(3000)},
			{'lat': -33.507726, 'lng': -70.674152, 'color': '#FF0000', 'r': this.getRadio(4000)}
		];
    }
    
    public crearMarcadorTiempoReal(){
        return [
            {'lat': -33.444398, 'lng': -70.590462, 'icon': 'assets/traficon.png'},
            {'lat': -33.425204, 'lng': -70.534647, 'icon': 'assets/traficon.png'},
            {'lat': -33.432323, 'lng': -70.750641, 'icon': 'assets/traficon.png'},
            {'lat': -33.507726, 'lng': -70.674152, 'icon': 'assets/traficon.png'}
        ]
    }
}
