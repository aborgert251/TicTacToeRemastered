import { Component } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent {

  /**
   * Inject dependency via dependency injection
   * @param {GameService} gameService - The service to handle all game related stuff.
   */
  constructor(public gameService: GameService) { }

}
