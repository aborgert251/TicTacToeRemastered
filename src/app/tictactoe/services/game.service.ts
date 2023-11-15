import { Injectable } from '@angular/core';
import { MouseService } from './mouse.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  cooldown = false;

  isPlaying: 'X' | 'O' = 'X';

  state: 'win' | 'draw' | 'running' = 'running';

  gameBoard: ('X' | 'O' | '')[] = [
    '', '', '',
    '', '', '',
    '', '', ''
  ]

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

  private setElement(cardId: number) {
    this.gameBoard[cardId] = this.isPlaying;
    this.checkGameState();

    if(this.state === 'running') {
      this.togglePlayer();
    }
  }

  private togglePlayer() {
    this.isPlaying = this.isPlaying === 'X' ? 'O' : 'X';
  }

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

  private checkWin(symbol: 'X'|'O'|''): boolean {
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
  
  private checkDraw(symbol: 'X'|'O'|''): boolean {
    return !this.checkWin(symbol) && this.gameBoard.every((tile) => tile !== '');
  };

  private reset() {
    this.cooldown = true;
    console.log('RESET!');
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
