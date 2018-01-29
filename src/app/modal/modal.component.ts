import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title: any;
  
  constructor(private router:Router) { 
  }

  ngOnInit() {

  	$('#operationSuccess').on('hidden.bs.modal', function () {
    	if(localStorage.invalidToken == "true"){
   			localStorage.access_token = "";
        location.reload();
    	}
	})

  }
 getSucessString(): any {
  	return (localStorage.message) ? localStorage.message : "";
 }
}
