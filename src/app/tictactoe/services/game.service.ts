import { Injectable } from '@angular/core';
import { MouseService } from './mouse.service';
import { SelectedPlayer } from '../types/selected-player.type';
import { GameState } from '../types/game-state.type';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  /**
   * Cooldown to freeze game between turns
   */
  cooldown = false;

  /**
   * The player that is currently playing
   */
  isPlaying: 'X' | 'O' = 'X';


  /**
   * The current state of the game
   */
  state: GameState = 'running';

  /**
   * All states of the game cards as array.
   */
  gameBoard: SelectedPlayer[] = [
    '', '', '',
    '', '', '',
    '', '', ''
  ]

  /**
   * Inject dependency via dependency injection. Set element on mouseClick if a card is hovered.
   * 
   * @param {MouseService} mouseService - Service to handle all mouse related stuff
   */
  constructor(private mouseService: MouseService) { 
    this.mouseService.mouseClicked$.subscribe(() => {
      const cardId = this.mouseService.hoveringCardId.findIndex(element => element);
      const isClicking = this.mouseService.isClicking;

      if(cardId !== -1 && cardId <= 8 && isClicking && !this.cooldown && this.gameBoard[cardId] === '') {
        this.setElement(cardId);
        this.cooldown = true;
        setTimeout(() => this.mouseService.setMousePosition(10, 10), 1500);
        setTimeout(() => this.cooldown = false, 3000);
      }

    })
  }

  /**
   * Set the symbol to a card
   * @param {number} cardId - The ID of the card the symbol should be placed on 
   */
  private setElement(cardId: number) {
    this.gameBoard[cardId] = this.isPlaying;
    this.checkGameState();

    if(this.state === 'running') {
      this.togglePlayer();
    }
  }

  /**
   * Toggle the player after turn.
   */
  private togglePlayer() {
    this.isPlaying = this.isPlaying === 'X' ? 'O' : 'X';
  }

  /**
   * Check the gameState if a player has won or there is a draft.
   */
  private checkGameState() {
    if(this.checkWin(this.isPlaying)) {
      this.state = 'win';
      this.reset();
      return;
    }

    if(this.checkDraw(this.isPlaying)) {
      this.state = 'draw';
      this.reset();
      return;
    }

    this.state = 'running';
  }

  /**
   * Check if any player has won.
   * @param {SelectedPlayer} symbol - the symbol of the player that is playing. 
   * @returns {boolean} - True if the current player has 3 in a row - vertically, horizontally or diagonal.
   */
  private checkWin(symbol: SelectedPlayer): boolean {
    if (this.gameBoard[0] === symbol && this.gameBoard[1] === symbol && this.gameBoard[2] === symbol) return true;
    if (this.gameBoard[3] === symbol && this.gameBoard[4] === symbol && this.gameBoard[5] === symbol) return true;
    if (this.gameBoard[6] === symbol && this.gameBoard[7] === symbol && this.gameBoard[8] === symbol) return true;
  
    if (this.gameBoard[0] === symbol && this.gameBoard[3] === symbol && this.gameBoard[6] === symbol) return true;
    if (this.gameBoard[1] === symbol && this.gameBoard[4] === symbol && this.gameBoard[7] === symbol) return true;
    if (this.gameBoard[2] === symbol && this.gameBoard[5] === symbol && this.gameBoard[8] === symbol) return true;
  
    if (this.gameBoard[0] === symbol && this.gameBoard[4] === symbol && this.gameBoard[8] === symbol) return true;
    if (this.gameBoard[2] === symbol && this.gameBoard[4] === symbol && this.gameBoard[6] === symbol) return true;
    return false;
  };
  
  /**
   * Check if there is a draw and nobody has won.
   * @param {SelectedPlayer} symbol - The player that is currently playing 
   * @returns {boolean} - true if there is a draw
   */
  private checkDraw(symbol: SelectedPlayer): boolean {
    return !this.checkWin(symbol) && this.gameBoard.every((tile) => tile !== '');
  };

  /**
   * Reset the game.
   */
  private reset() {
    this.cooldown = true;
    setTimeout(() => {
      this.mouseService.setMousePosition(10, 10)
      this.gameBoard = this.gameBoard.map(() => '');
      this.isPlaying = 'X';
    }, 1500);
    setTimeout(() => {
      this.cooldown = false;
      this.state = 'running';
    }, 3000);
  }

}
