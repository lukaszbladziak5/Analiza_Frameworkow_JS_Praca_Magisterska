import { Component } from '@angular/core';
import buildData from '../../dummyData';

@Component({
  selector: 'app-rendering',
  templateUrl: './rendering.component.html',
  styleUrls: ['./rendering.component.css']
})

export class RenderingComponent {
  numberOfRows: number = 0;
  data: object[];
  add: number =  0;
  create: number =  0;

  constructor() {}

  onCreate($event: number){
    console.log('onCreate', $event)
    this.numberOfRows = $event;
    this.data = buildData(this.numberOfRows)
  }

  onRemove(){
    this.numberOfRows = 0;
    this.data = [];
  }
}
