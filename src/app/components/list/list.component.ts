import { Component, Input } from '@angular/core';
import { ListItem, SortButton } from 'src/app/interfaces/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() listData: ListItem[];
  @Input() sortButtons: SortButton[];

  constructor() { }

}
