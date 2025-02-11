import { Injectable, inject } from '@angular/core';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Hands, HAND_CONNECTIONS, Landmark, LandmarkList, Results } from '@mediapipe/hands';
import { MouseService } from './mouse.service';
import { GameService } from './game.service';

/**
 * Example that was the reference for implementation of the hand tracking:
 * https://github.com/google/mediapipe/blob/master/docs/solutions/hands.md#javascript-solution-api
 */
@Injectable({
  providedIn: 'root'
})
export class HandTrackingService {
  private mouseService = inject(MouseService);
  private gameService = inject(GameService);


  /**
   * The HTML element of the mouse
   */
  mouseElement?: HTMLElement;

  /**
   * The width of the screen
   */
  screenWidth = window.innerWidth;

  /**
   * The height of the screen
   */
  screenHeight = window.innerHeight;

  /**
   * The HTML element of the canvas
   */
  canvasElement!: HTMLCanvasElement;

  /**
   * The 2D DrawingContext of the canvas element
   */
  canvas2dContext!: CanvasRenderingContext2D;

  /**
   * The video HTML element
   */
  videoElement!: HTMLVideoElement;

  /**
   * Instanciation of Hands - Downloads the needed model from google/mediapipe
   */
  hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }});

  /**
   * Inject some dependencies via dependency injection, set hands options and bind the result callback.
   * 
   * @param {MouseService} mouseService - Service that handles all mouse related stuff
   * @param {GameService} gameService - Service that handles all game related stuff 
   */
  constructor() { 
    this.hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.hands.onResults((results) => this.onResults(results));
  }

  /**
   * Initialize the handtracking service by setting video element, canvas element and 2D Drawing context.
   * Starts webcam if all elements are given.
   * 
   * @param {HTMLVideoElement} videoElement - The video element
   * @param {HTMLCanvasElement} canvasElement - The element of the canvas where the video is drawn 
   */
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

  /**
   * Creating a new Camera and start it. Frames are send to Hands for handtracking. 
   */
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

  /**
   * Result callback for the handtracking. Draws landmarks and sets mouse position.
   * 
   * @param {Results} results - Results of the handtracking
   * @returns 
   */
  private onResults(results: Results) {
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

        // Draw all HandConnectors - Helpful for debugging purposes.
        // drawConnectors(this.canvas2dContext, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 0.5});
        // drawLandmarks(this.canvas2dContext, landmarks, {color: '#FF0000', lineWidth: 0.5});
      }
    }
    this.canvas2dContext.restore();
  }

  /**
   * Get the center landmark that the mouse position is synced to later on.
   * 
   * @param {LandmarkList} landmarks - The found landmarks of the hand 
   * @returns {Landmark} - the center landmark
   */
  getCenter(landmarks: LandmarkList): Landmark {
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

  /**
   * Check if the mouse is clicked by calculating the distance between tip of the thumb and tip of the middle finger.
   * @param landmarks 
   * @returns {boolean} - true if the distance is smaller than 0.1
   */
  checkClick(landmarks: LandmarkList): boolean {
    if(landmarks.length === 0) {
      return false;
    }

    const middleFingerTip = landmarks[12];
    const thumbTip = landmarks[4];

    const distance = Math.sqrt(Math.pow(middleFingerTip.x-thumbTip.x, 2) + Math.pow(middleFingerTip.y-thumbTip.y, 2))

    return distance < 0.1;
  }
}
