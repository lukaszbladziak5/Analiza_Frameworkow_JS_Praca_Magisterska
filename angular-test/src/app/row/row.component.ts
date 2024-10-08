import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})

export class RowComponent {
  @Input() id: number = 0;
  @Input() label: string = '';
}
