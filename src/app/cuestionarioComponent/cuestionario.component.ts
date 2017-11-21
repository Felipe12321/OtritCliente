import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-cuestionario-component',
    templateUrl: './cuestionario.component.html',
    styleUrls: ['./cuestionario.component.css']
})


export class CuestionarioComponent {
    public textValue1: string;
    public textValue2: string;

    constructor() {
        
    }


    onSubmit(f: NgForm){
        console.log(f.value);
        console.log(this.textValue1);
        console.log(this.textValue2);
    }

}
