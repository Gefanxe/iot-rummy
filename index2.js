// import prompts from 'prompts';
// import { startPrompt } from './funcs/tools.js';
import "webduino-js";
import "webduino-blockly";
import { Buzzer, createBoard, Matrix } from './coms/index.js';
import delay from "delay";
import _ from 'lodash';

const nowPlayers = [];

let gameStatus = 0; // 0 = wait for player, 1 = start game, 2 = end of game


const myIots = [
  {
    deviceId: '10Q4P5nQ',
    board: null,
    rgbled: null,
    buzzer: null,
    matrix: null,
    ultrasonic: null
  },
  {
    deviceId: '10VvDYmd',
    board: null,
    rgbled: null,
    buzzer: null,
    matrix: null,
    ultrasonic: null
  }
];


createBoard(myIots, setBoard);

/**
 * @param {import('./type/MyIots').Smart} smart
 */
async function setBoard(index) {
  myIots[index].board.systemReset();
  myIots[index].board.samplingInterval = 50;

  const debounceToRun = _.debounce(function () {
    myIots[1].buzzer.di();
    myIots[1].matrix.stopCountDown();
    myIots[1].matrix.startCountDown();
  }, 500);

  // 初始各項功能
  if (index === 0) {
    myIots[index].rgbled = getRGBLedCathode(myIots[index].board, 15, 12, 13);
    myIots[index].rgbled.setColor(0, 0, 0);
    myIots[index].ultrasonic = getUltrasonic(myIots[index].board, 16, 14);

    while (!false) {
      await myIots[index].ultrasonic.ping();
  
      if (myIots[index].ultrasonic.distance < 40) {
        myIots[index].rgbled.setColor(0, 255, 0);
        if (myIots[index].ultrasonic.distance < 20) {
          myIots[index].rgbled.setColor(255, 0, 0);
          debounceToRun();
        }
      } else {
        myIots[index].rgbled.setColor(0, 0, 0);
      }
    }
  }

  if (index === 1) {
    myIots[index].buzzer = new Buzzer(myIots[index], 4);
    myIots[index].matrix = new Matrix(myIots[index], 7, 8, 9);
  }

}
