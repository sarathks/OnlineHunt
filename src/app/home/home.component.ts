import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var $:any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public dotArray:any = [];

	public rightAnswer:any = false;
	public wrongAnswer:any = false;
	public questionPage:any = true;
	public answerSubmitted:any = "";


	constructor() { }

	ngOnInit() {
		for(var i=0;i<30;i++){
			this.dotArray.push(i);
		}
		if(window.innerWidth<768 && this.questionPage) {
			setTimeout(function()
			{
				$('body').css("position","fixed"); // For setting the background static
				//START--following code is to set width of photostack in home page for responsiveness
				$('.stack').append('<style>.stack{width:'+(window.innerWidth-65)+'px !important;}</style>');
				$('.stack').append('<style>.stack:before{width:'+(window.innerWidth-65)+'px !important;}</style>');
				$('.stack').append('<style>.stack:after{width:'+(window.innerWidth-65)+'px !important;}</style>');
				var img = $("#photostack")[0];
				img.width = window.innerWidth-65;
				//END..........
			}, 100);
		}
	}


   answerSubmit(): any {
   	if(this.answerSubmitted == 'w'){
	   	this.rightAnswer = false;
		this.wrongAnswer = true;
		this.questionPage = false;
		$('body').css("position","relative");
		setTimeout(function(){
			location.reload();
		},5000);
	}

	if(this.answerSubmitted == 'r'){
	   	this.rightAnswer = true;
		this.wrongAnswer = false;
		this.questionPage = false;
		$('body').css("position","relative");
		setTimeout(function(){
			location.reload();
		},5000);
	}

   }


}
