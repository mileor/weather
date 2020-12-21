import { Component, Input } from '@angular/core';
import { ListItem } from 'src/app/interfaces/common';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() listItem: ListItem;

  constructor() {}

}
