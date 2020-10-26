import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { ConectionService } from '../../../services/conection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  @Input() nombre: string;
  @Output() changeNombre = new EventEmitter();

}
