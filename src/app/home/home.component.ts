import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';


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
	public loaderInHome:any = false;
	public modalTitle:any;
	public level:any = "";
	public levelImage:any = "";
	public congratzText:any = "";
	public WrongFunnyImage:any = "";
	public totalHits:any = 10000;


	constructor(private router:Router, private DataService:DataService) { }

	ngOnInit() {




		

		if(localStorage.access_token) {
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

			this.fetchUserDetails();
			this.getHitsCount();
		}
		else {
			this.router.navigate([''])
		}
		
	}


	hitsFromServer(){
		const pointer = this;
		pointer.DataService.fetchUserDetails("/stat/submissions").
		subscribe(
			(data) => {
				this.totalHits = data.json().count;
				pointer.animateValue('counter', (this.totalHits-100), this.totalHits, 100);
			},
			function(err){

			}
		);
	}

	getHitsCount():any{
		const pointer = this;
		setInterval(function(){
			pointer.hitsFromServer();
		}, environment.hitsApiInterval);
	}


	answerSubmit(): any {
		const pointer = this;
		pointer.loaderInHome = true;
		this.answerSubmitted = (this.answerSubmitted.replace(/\s/g, '')).toLowerCase();
		var params = {
			  "answer":this.answerSubmitted
		};

		pointer.DataService.sendAnswer(params,"/answer").
		subscribe(
			(data) => {
				pointer.loaderInHome = false;
				if(data.json().code ==0 ){
					this.rightAnswer = true;
					this.wrongAnswer = false;
					this.questionPage = false;
					$(document).ready(function() {
						$(".fontMl").text(pointer.DataService.getMalayalamWords());
					});

					$('body').css("position","relative");
					setTimeout(function(){
						location.reload();
					},3000);
				}
				

				else {
					this.rightAnswer = false;
					this.wrongAnswer = true;
					this.WrongFunnyImage = '../../assets/funny/'+(Math.floor(Math.random() * 60) + 1 )+'.jpg';
					this.questionPage = false;
					$('body').css("position","relative");
					setTimeout(function(){
						location.reload();
					},3000);
				}
			},
			function(err){
				pointer.loaderInHome = false;
				if(err.json().code == 2001){
					localStorage.invalidToken = true;
					localStorage.message = err.json().message;
					$("#operationSuccess").modal("show");      
				}


				else if(err.json().message)
				{
					pointer.modalTitle = "Error";
					localStorage.message = err.json().message;
					$("#operationSuccess").modal("show");      
				}
				
				else {
					pointer.modalTitle = "Error";
					localStorage.message = "Internet failure Or Server error occured";
					$("#operationSuccess").modal("show");
				}
				
			}
			);
 //   	if(this.answerSubmitted == 'w'){
	//    	this.rightAnswer = false;
	// 	this.wrongAnswer = true;
	// 	this.questionPage = false;
	// 	$('body').css("position","relative");
	// 	setTimeout(function(){
	// 		location.reload();
	// 	},3000);
	// }

	// if(this.answerSubmitted == 'r'){
	//    	this.rightAnswer = true;
	// 	this.wrongAnswer = false;
	// 	this.questionPage = false;
	// 	$('body').css("position","relative");
	// 	setTimeout(function(){
	// 		location.reload();
	// 	},3000);
	// }

}

keyDownFunction(event) {
	if(event.keyCode == 13) {
		this.answerSubmit();
		
	}
}

fetchUserDetails() {
	const pointer = this;
	pointer.loaderInHome = true;


	pointer.DataService.fetchUserDetails("/users/profile").
	subscribe(
		(data) => {
			pointer.loaderInHome = false;
			if(data.json().code ==0 ){
				pointer.level = data.json().Payload.level;
				pointer.levelImage = data.json().Payload.level_image;
				pointer.hitsFromServer();
			}
			
			else {
				if(data.json().message)
				{
					pointer.modalTitle = "Error";
					localStorage.message = data.json().message;
					$("#operationSuccess").modal("show");      
				}
				else {
					pointer.modalTitle = "Error";
					localStorage.message = "Some error occured";
					$("#operationSuccess").modal("show");

				}
			}
		},
		function(err){
			pointer.loaderInHome = false;
			
			if(err.json().code == 2001){

				pointer.levelImage = '../../assets/images/invalid.png';
				localStorage.invalidToken = true;
				pointer.modalTitle = "Error";
				localStorage.message = err.json().message;
				$("#operationSuccess").modal("show");      
			}

			else if(err.json().code == 5000)
			{
				pointer.levelImage = '../../assets/images/noLevel.png'	
				pointer.modalTitle = "Error";
				localStorage.message = err.json().message;
				$("#operationSuccess").modal("show");
				$("#answerInput").css("display","none");
				$('body').css("position","relative");      
			}

			else if(err.json().message)
			{
				pointer.modalTitle = "Error";
				localStorage.message = err.json().message;
				$("#operationSuccess").modal("show");
			}

			else {
				pointer.modalTitle = "Error";
				localStorage.message = "Internet failure Or Server error occured";
				$("#operationSuccess").modal("show");
			}
			
		}
		);

}

logout() {
	this.router.navigate([''])
	localStorage.access_token = "";
}


animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        if(obj)
        {
        	obj.innerHTML = current;
        }
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// animateValue("value", 100, 25, 2000);







}
