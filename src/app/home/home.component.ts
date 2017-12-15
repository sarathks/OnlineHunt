import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

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
	}
	else {
		this.router.navigate([''])
	}
	
	}


   answerSubmit(): any {
   	this.loaderInHome = true;
   		var params = {
   "parentId":(JSON.parse(localStorage.loggedInParent)).parentId,
   "sessionId":(JSON.parse(localStorage.loggedInParent)).sessionId
 };

 this.DataService.fetchData(params,"/pick_up/get_student_list").
 subscribe(
   (data) => {
   	this.loaderInHome = false;
     if(data.json().resultCode ==0 ){
       this.rightAnswer = true;
		this.wrongAnswer = false;
		this.questionPage = false;
		$('body').css("position","relative");
		setTimeout(function(){
			location.reload();
		},3000);
     }
     else {
       this.rightAnswer = false;
		this.wrongAnswer = true;
		this.questionPage = false;
		$('body').css("position","relative");
		setTimeout(function(){
			location.reload();
		},3000);
     }
   },
   function(err){
   	this.loaderInHome = false;
   	this.rightAnswer = false;
		this.wrongAnswer = true;
		this.questionPage = false;
		$('body').css("position","relative");
		setTimeout(function(){
			location.reload();
		},3000);
     
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


}
