// import prompts from 'prompts';
// import { startPrompt } from './funcs/tools.js';
import "webduino-js";
import "webduino-blockly";
import { Buzzer, createBoard, Tm1637 } from './coms/index.js';
import delay from "delay";

const nowPlayers = [];

let gameStatus = 0; // 0 = wait for player, 1 = start game, 2 = end of game


const myIots = [
  {
    deviceId: '10VvDYmd',
    board: null,
    buzzer: null,
    tm1637: null,
    ultrasonic: null
  }
];

for (let i = 0; i < myIots.length; i++) {
  createBoard(myIots[i], setBoard);
}

/**
 * @param {import('./type/MyIots').Smart} smart
 */
async function setBoard(smart) {
  smart.board.systemReset();
  smart.board.samplingInterval = 50;

  // 初始各項功能

  smart.buzzer = new Buzzer(smart);
  smart.tm1637 = new Tm1637(smart);
  smart.ultrasonic = getUltrasonic(smart.board, 16, 14);
  while (!false) {
    await delay(500);
    await smart.ultrasonic.ping();
    if (smart.ultrasonic.distance < 40) {
      smart.buzzer.di();
      smart.tm1637.stopCountDown();
      smart.tm1637.startCountDown();
    }
  }
}
