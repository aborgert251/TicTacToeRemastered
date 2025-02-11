import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { WebcamComponent } from '../webcam/webcam.component';
import { MouseComponent } from '../mouse/mouse.component';

@Component({
    selector: 'app-gameboard',
    templateUrl: './gameboard.component.html',
    styleUrls: ['./gameboard.component.scss'],
    standalone: true,
    imports: [NgIf, CardComponent, WebcamComponent, MouseComponent]
})
export class GameboardComponent {

  /**
   * Inject dependency via dependency injection
   * @param {GameService} gameService - The service to handle all game related stuff.
   */
  constructor(public gameService: GameService) { }

}
