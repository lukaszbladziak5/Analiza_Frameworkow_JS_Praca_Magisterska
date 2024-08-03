import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  @Output() addEvent = new EventEmitter<number>();
  @Output() createEvent = new EventEmitter<number>();
  @Output() removeEvent = new EventEmitter<number>();

  addRows(val :number){
    this.addEvent.emit(val)
  }

  createRows(val :number){
    this.createEvent.emit(val)
  }

  removeRows(){
    this.removeEvent.emit(0)
  }
}
