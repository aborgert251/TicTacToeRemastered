import { Component, Input } from '@angular/core';
import { SelectedPlayer } from '../types/selected-player.type';
import { HoverDirective } from '../directives/hover.directive';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: true,
    imports: [HoverDirective]
})
export class CardComponent {

  /**
   * The id of this card.
   */
  @Input({required: true}) cardId!: number;

  /**
   * Symbol of the card. 'X' | 'O' or nothing selected
   */
  @Input({required: true}) selected: SelectedPlayer = '';

}
