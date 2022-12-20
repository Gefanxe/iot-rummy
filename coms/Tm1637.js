import "webduino-js";
import "webduino-blockly";
import { Timer } from 'easytimer.js';
import { showNumber } from '../funcs/tools.js';
import { LIMIT_TIME } from "../constant/index.js";

export class Tm1637 {

  /**
   * 
   * @param {import('../type/MyIots').Smart} smart 
   */
  constructor(smart) {
    const self = this;
    self.brightness = 2; // 亮度 1~8
    self.smart = smart;
    self.tm1637 = getTM1637(smart.board, 4, 0);
    self.tm1637.brightness(self.brightness);
    self.timer = new Timer();

    // 每秒經過
    self.timer.on('secondsUpdated', function (e) {
      const currentNumber = e.detail.timer.getTimeValues().seconds;
      const show = `--${currentNumber.toString().padStart(2, '0')}`;
      self.tm1637.setSegments(showNumber(show));
      if (currentNumber <= 10) smart.buzzer.beep();
    });
    // 時間到
    self.timer.on('targetAchieved', function (e) {
      self.tm1637.setSegments(showNumber('t-UP'));
    });
  }

  startCountDown() {
    const self = this;
    const leftSec = LIMIT_TIME;
    // 開始計時
    self.tm1637.setSegments(showNumber(`--${leftSec}`));
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

  changeBrightness() {
    const self = this;
    self.brightness--;
    if (self.brightness < 1) self.brightness = 8;
    self.tm1637.brightness(self.brightness);
  }
}
