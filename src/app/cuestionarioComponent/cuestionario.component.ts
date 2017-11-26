import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Servicios } from '../services/services';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-cuestionario-component',
    templateUrl: './cuestionario.component.html',
    styleUrls: ['./cuestionario.component.css']
})


export class CuestionarioComponent implements OnInit{
    public textValue1: string;
    public textValue2: string;

    constructor(private servicio: Servicios, private dialogService: DialogService,
    private titleService: Title) {
        
    }

    ngOnInit(){
        this.titleService.setTitle('Encuesta - OTRIT');
    }

    onSubmit(f: NgForm){
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirm title',
            message: 'Confirm message'
        })
            .subscribe((isConfirmed) => {
                // We get dialog result
                if (isConfirmed) {
                    let res = this.servicio.sedData(f.value);
                    console.log(res);
                    alert('Se ha guardado correctamente la encuesta. ');
                    window.location.reload();
                } else {
                    alert('No se ha guardado la encuesta. ');
                }
        });
    }

}



export interface ConfirmModel {
    title: string;
    message: string;
}
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'Are you sure?'}}</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
    constructor(dialogService: DialogService) {
        super(dialogService);
    }
    confirm() {
        // we set dialog result as true on click on confirm button, 
        // then we can get dialog result from caller code 
        this.result = true;
        this.close();
    }
}
