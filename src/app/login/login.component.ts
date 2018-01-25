import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

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
  public username:any = "";
  public pwd:any = "";
  public modalTitle:any;
  public loginCredentialError = false;
  public emailErorr:any;
  public passwordError:any;
  public nameError:any;
  public loaderInLogin:any = false;
  public instructionSeen:any = false;
  constructor(private router:Router,private DataService:DataService) { }

  ngOnInit() {
  }
  

  login() {
    const pointer = this;
  pointer.loaderInLogin = true;
    var params = {
     "emailId":this.username,
     "password": this.pwd
   };

   this.DataService.fetchData(params,"/users/access_token").
   subscribe(
     (data) => {
        pointer.loaderInLogin = false;
       if(data.json().code ==0 ){
        this.DataService.setUserLoggedIn();
        localStorage.access_token = data.json().Payload.access_token;
        this.router.navigate(['home'])
      }
      else {
        pointer.loginCredentialError = true;
      }
    },
    function(err){
        pointer.loaderInLogin = false;
      if(err.json().message)
      {
        pointer.loginCredentialError = true;
      }
      else {
        pointer.modalTitle = "Error";
        localStorage.message = "Internet failure Or Server error occured";
        $("#operationSuccess").modal("show");
      }
      
    }
    );
 }



 register() {
  this.instructionSeen = false;
   $("#registerModal").modal("show");
 }

 createNewUser(){
  const pointer = this;
  var params = {
   "firstName":this.fname,
   "lastName":this.lname,
   "emailId":this.email,
   "password": this.password
 };

 var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 this.emailErorr = re.test(this.email);
 this.passwordError = (this.password.length<9) ? true : false;
 this.nameError = (this.fname.length>0) ? false : true;
 if((this.emailErorr==false) || (this.passwordError) || (this.nameError))
 {

 }

 else{
   $("#registerModal").modal("hide");
   
   this.DataService.fetchData(params,"/users").
   subscribe(
     (data) => {
       if(data.json().code ==0 ){
         pointer.modalTitle = "Success";
         localStorage.message = data.json().message;
         $("#operationSuccess").modal("show");
       }
       else {
        pointer.modalTitle = "Error";
        localStorage.message = data.json().message;
        $("#operationSuccess").modal("show");
      }
    },
    function(err){
      if(err.json().message)
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

}
}
