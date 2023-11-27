import { Component, Input } from '@angular/core';
import { SelectedPlayer } from '../types/selected-player.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  /**
   * The id of this card.
   */
  @Input() cardId!: number;

  /**
   * Symbol of the card. 'X' | 'O' or nothing selected
   */
  @Input() selected: SelectedPlayer = '';

}
