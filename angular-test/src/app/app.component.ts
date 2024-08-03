import { Component } from '@angular/core';
import buildData from '../dummyData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numberOfRows: number = 0;
  data: object[];
  add: number =  0;
  create: number =  0;


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
