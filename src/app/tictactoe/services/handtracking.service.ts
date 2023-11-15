import { Injectable } from '@angular/core';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { MouseService } from './mouse.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class HandTrackingService {

  mouseElement?: HTMLElement;

  screenWidth = window.innerWidth;

  screenHeight = window.innerHeight;

  canvasElement!: HTMLCanvasElement;

  canvas2dContext!: CanvasRenderingContext2D;

  videoElement!: HTMLVideoElement;

  hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }});

  constructor(private mouseService: MouseService, private gameService: GameService) { 
    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.hands.onResults((results) => this.onResults(results));
  }

  initialize(videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement) {
    const ctx = canvasElement.getContext('2d');
    if(!ctx) {
      return;
    }

    this.videoElement = videoElement;
    this.canvasElement = canvasElement;
    this.canvas2dContext = ctx;

    this.startCamera();
  }

  private startCamera() {
    const camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.hands.send({image: this.videoElement});
      },
      width: 1280,
      height: 720
    });
    
    camera.start();
  }

  private onResults(results: any) {
    if(!this.canvas2dContext) {
      return;
    }

    this.canvas2dContext.save();
    this.canvas2dContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.canvas2dContext.translate(this.canvasElement.width, 0);
    this.canvas2dContext.scale(-1, 1);

    this.canvas2dContext.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {

        drawLandmarks(this.canvas2dContext, [landmarks[4], landmarks[12]], {color: '#FF0000', lineWidth: 0.2});

        const centerLandmark = this.getCenter([...landmarks]);
        const isClicking = this.checkClick([...landmarks]);

        drawLandmarks(this.canvas2dContext, [centerLandmark], {color: '#FFFF00', lineWidth: 5});

        this.mouseService.setIsClicking(isClicking);

        if(!this.gameService.cooldown) {
          this.mouseService.setMousePosition(
            this.screenWidth - Math.round(this.screenWidth * centerLandmark.x), 
            Math.round(this.screenHeight * centerLandmark.y)
          );
        }

        //drawConnectors(this.canvas2dContext, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 0.5});
        //drawLandmarks(this.canvas2dContext, landmarks, {color: '#FF0000', lineWidth: 0.5});
      }
    }
    this.canvas2dContext.restore();
  }

  getCenter(landmarks: {x: number, y: number, z: number}[]): {x: number, y: number, z: number} {
    landmarks.splice(4, 1);
    landmarks.splice(12, 1);

    const xList = landmarks.map(landmark => landmark.x)
    xList.sort((a, b) => a - b);
    const yList = landmarks.map(landmark => landmark.y)
    yList.sort((a, b) => a - b);
    const zList = landmarks.map(landmark => landmark.z)
    zList.sort((a, b) => a - b);

    return {
      x: xList[12],
      y: yList[12],
      z: zList[12]
    }
  }

  checkClick(landmarks: {x: number, y: number, z: number}[]): boolean {
    if(landmarks.length === 0) {
      return false;
    }

    const middleFingerTip = landmarks[12];
    const thumbTip = landmarks[4];

    const distance = Math.sqrt(Math.pow(middleFingerTip.x-thumbTip.x, 2) + Math.pow(middleFingerTip.y-thumbTip.y, 2))

    return distance < 0.1;
  }
}
