import "webduino-js";
import "webduino-blockly";
import { Buzzer, createBoard, Matrix } from './coms/index.js';
import _ from 'lodash';

const myIots = [
  {
    deviceId: '10Q4P5nQ',
    board: null,
    rgbled: null,
    buzzer: null,
    matrix: null,
    photocell: null
  }
];

// for (let i = 0; i < myIots.length; i++) {
//   createBoard(myIots[i], setBoard);
// }
createBoard(myIots[0], setBoard);

/**
 * @param {import('./type/MyIots').Smart} smart
 */
async function setBoard(smart) {
  smart.board.systemReset();
  smart.board.samplingInterval = 50;

  // 初始各項功能

  smart.rgbled = getRGBLedCathode(smart.board, 15, 12, 13);

  smart.buzzer = new Buzzer(smart, 13);
  smart.matrix = new Matrix(smart, 16, 14, 5);

  smart.photocell = getPhotocell(smart.board, 0);

  const runCD = _.debounce(function() {
    smart.buzzer.di();
    smart.matrix.stopCountDown();
    smart.matrix.startCountDown();
  }, 500);

  smart.photocell.on(function(val){
    const v = (Math.round((((val - (0)) * (1/((1)-(0)))) * ((100)-(0)) + (0))*100))/100;
    console.log('val:',v);

    if (v > 15) smart.rgbled.setColor(0, 0, 0);
    if (v > 10 && v < 15) smart.rgbled.setColor(0, 255, 0);
    if (v < 10) {
      smart.rgbled.setColor(255, 0, 0);
      runCD();
    }
  });

}
