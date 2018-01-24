import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  constructor(private router:Router, private DataService:DataService) { }

  ngOnInit() {
  if(localStorage.access_token) {
  }
  else {
  this.router.navigate([''])
  }
  }
  logout() {
  this.router.navigate([''])
  localStorage.access_token = "";
}

}
