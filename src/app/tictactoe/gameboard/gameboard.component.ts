import { Component, inject } from '@angular/core';
import { GameService } from '../services/game.service';

import { CardComponent } from '../card/card.component';
import { WebcamComponent } from '../webcam/webcam.component';
import { MouseComponent } from '../mouse/mouse.component';

@Component({
    selector: 'app-gameboard',
    templateUrl: './gameboard.component.html',
    styleUrls: ['./gameboard.component.scss'],
    imports: [CardComponent, WebcamComponent, MouseComponent]
})
export class GameboardComponent {
  gameService = inject(GameService);

}
