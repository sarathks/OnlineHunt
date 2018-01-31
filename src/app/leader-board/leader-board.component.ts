import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {


  public loaderInLeaderBoard:any = false;
  public modalTitle:any;
  public rankList:any;


  constructor(private router:Router, private DataService:DataService) { }

  ngOnInit() {
  if(localStorage.access_token) {
    const pointer = this;
    pointer.loaderInLeaderBoard = true;
    pointer.DataService.fetchUserDetails("/users/leader-board").
    subscribe(
      (data) => {
        pointer.loaderInLeaderBoard = false;
        if(data.json().code ==0 )
        {
          pointer.rankList = data.json().Payload;
        }
        
        else
        {
          if(data.json().message)
          {
            pointer.modalTitle = "Error";
            localStorage.message = data.json().message;
            $("#operationSuccess").modal("show");      
          }
          else
          {
            pointer.modalTitle = "Error";
            localStorage.message = "Some error occured";
            $("#operationSuccess").modal("show");
          }
        } 
    },
    function(err){
      pointer.loaderInLeaderBoard = false;
      
      if(err.json().code == 2001){
        localStorage.invalidToken = true;
        localStorage.message = err.json().message;
        $("#operationSuccess").modal("show");      
      }

      else if(err.json().message)
      {
        
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

  else {
  this.router.navigate([''])
  }
  }
  logout() {
  this.router.navigate([''])
  localStorage.access_token = "";
}

dateToIST(currentDate){
  var timeInIST = new Date(currentDate);
  return (timeInIST.toString().split(" ").slice(0, 5).join(' '));
}


}
