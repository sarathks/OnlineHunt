import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {

    if(localStorage.access_token == undefined) {
      $(".top-bar-items").css("display","none");
    }
  	
  }

  logout() {
  this.router.navigate([''])
  localStorage.access_token = "";
}

}
