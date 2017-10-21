import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-home-component',
	templateUrl: './home.component.html',
  	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

	constructor(private titleService: Title){}

	ngOnInit(){
		this.titleService.setTitle('Home - OTRIT');
	}

}
