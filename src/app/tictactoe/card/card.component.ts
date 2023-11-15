import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private _selected: 'X' | 'O' | '' = '';

  @Input() cardId!: number;

  @Input() set selected(selected: 'X' | 'O' | '') {
    this._selected = selected;
  }

  get selected() {
    return this._selected;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
