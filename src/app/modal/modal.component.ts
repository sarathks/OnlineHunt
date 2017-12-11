import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title: any;
  
  constructor() { 
}

  ngOnInit() {
  }
 getSucessString(): any {
  	return (localStorage.message) ? localStorage.message : "";
  }
}
