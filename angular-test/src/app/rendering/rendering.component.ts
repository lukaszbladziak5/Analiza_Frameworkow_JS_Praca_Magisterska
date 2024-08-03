import { Component, Output, EventEmitter} from '@angular/core';
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
  @Output() addEvent = new EventEmitter<number>();
  @Output() createEvent = new EventEmitter<number>();
  @Output() removeEvent = new EventEmitter<number>();

  constructor() {
    console.log('RenderingComponent');
  }

  addRows(val :number){
    console.log('addRows', val)
    this.addEvent.emit(val)
  }

  createRows(val :number){
    this.createEvent.emit(val)
  }

  removeRows(){
    this.removeEvent.emit(0)
  }

  onAdd($event: number){
    this.numberOfRows = this.numberOfRows + $event;
    if (this.data === undefined) {
      this.data = buildData($event)
    } else {
      let data = this.data;
      this.data = data.concat(buildData($event))
    }
  }

  onCreate($event: number){
    this.numberOfRows = $event;
    this.data = buildData(this.numberOfRows)
  }

  onRemove(){
    this.numberOfRows = 0;
    this.data = [];
  }
}
