import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameboardComponent } from './gameboard/gameboard.component';
import { CardComponent } from './card/card.component';
import { WebcamComponent } from './webcam/webcam.component';
import { MouseComponent } from './mouse/mouse.component';
import { HoverDirective } from './directives/hover.directive';



@NgModule({
  declarations: [
    GameboardComponent,
    CardComponent,
    WebcamComponent,
    MouseComponent,
    HoverDirective
  ],
  imports: [
    CommonModule
  ]
})
export class TictactoeModule { }
