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
            return data['accidentes']}
        );
    }

    public loadMap(){

    }
}
