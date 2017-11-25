import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Accidente } from '../model/accidente';
import { saveAs } from 'file-saver/FileSaver';

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

    public getAccidentesEstadisticasMes(): Observable<any>{
        return this.http.get('https://serene-ocean-37939.herokuapp.com/getAccidentesEstadistMes.php')
            .map((res: Response) => res.json());
    }

    public getAccidentesEstadisticasAnio(): Observable<any>{
        return this.http.get('https://serene-ocean-37939.herokuapp.com/getAccidentesEstadistAnual.php')
        .map((res: Response) => res.json());
    }

    public descargaExcel(data: any){
        
        data = JSON.stringify(data);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        let params = new URLSearchParams();
        params.set('param1', data);
        this.http
        .post('http://serene-ocean-37939.herokuapp.com/Downloader/downloader.php', { headers: headers, params: params })
            .subscribe((res) => {
                this.saveToFileSystem(res);
            }
        );        
    }

    private saveToFileSystem(response){
        console.log(response.headers);
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const parts: string[] = contentDispositionHeader.split(';');
        const filename = parts[1].split('=')[1];
        const blob = new Blob([response._body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, filename);
    }


    public sedData(values: Array<any>){

        console.log(JSON.stringify(values));
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let data = 'values='+JSON.stringify(values);

        return this.http.post('http://serene-ocean-37939.herokuapp.com/saveEncuesta.php', 
        data,
        {    headers: headers    }).subscribe(res => {
            console.log(res);
        });

    }
}
