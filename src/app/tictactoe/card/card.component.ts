import { Component, Input } from '@angular/core';
import { SelectedPlayer } from '../types/selected-player.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() cardId!: number;

  @Input() selected: SelectedPlayer = '';

}
