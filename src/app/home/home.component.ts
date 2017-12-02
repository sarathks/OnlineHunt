import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		if(window.innerWidth<768) {
			$('body').css("position","fixed"); // For setting the background static

			//START--following code is to set width of photostack in home page for responsiveness
			$('.stack').append('<style>.stack{width:'+(window.innerWidth-30)+'px !important;}</style>');
			$('.stack').append('<style>.stack:before{width:'+(window.innerWidth-50)+'px !important;}</style>');
			$('.stack').append('<style>.stack:after{width:'+(window.innerWidth-30)+'px !important;}</style>');
			var img = $("#photostack")[0];
			img.width = window.innerWidth-30;
			//END..........
		}
	}
}
