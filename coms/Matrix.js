import "webduino-js";
import "webduino-blockly";
import { Timer } from 'easytimer.js';
import { LIMIT_TIME } from "../constant/index.js";


export class Matrix {

  /**
   * 
   * @param {import('../type/MyIots').Smart} smart
   * @param {number} din
   * @param {number} cs
   * @param {number} clk
   */
  constructor(smart, din, cs, clk) {
    const self = this;
    self.smart = smart;
    self.matrix = getMax7219(smart.board, din, cs, clk);
    self.timer = new Timer();

    // 每秒經過
    self.timer.on('secondsUpdated', function (e) {
      const currentNumber = e.detail.timer.getTimeValues().seconds;
      self.matrix.on("0000000000000000");
      self.matrix.on((max7219_number(currentNumber)));
      if (currentNumber <= 10) smart.buzzer.beep();
    });
    // 時間到
    self.timer.on('targetAchieved', function (e) {
      self.matrix.on("0000000000000000");
      self.matrix.on("8142241818244281");
    });
  }

  startCountDown() {
    const self = this;
    const leftSec = LIMIT_TIME;
    // 開始計時
    self.matrix.on("0000000000000000");
    self.matrix.on((max7219_number(leftSec)));
    self.timer.start({ countdown: true, startValues: { seconds: leftSec } });
  }

  resumeCountDown() {
    this.timer.start();
  }

  pauseCountDown() {
    this.timer.pause();
  }

  stopCountDown() {
    this.timer.stop();
  }

}
