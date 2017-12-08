import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public fname:any = "";
  public lname:any = "";
  public email:any = "";
  public password:any = "";

  constructor(private router:Router) { }

  ngOnInit() {
  }
  login() {
  	this.router.navigate(['home'])
  }
  register() {
  	$("#myModal").modal("show");
  }
  createNewUser(){
    console.log(this.fname,this.lname,this.email,this.password);
    
  }
}
