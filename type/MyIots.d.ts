import { Timer } from 'easytimer.js';
import { Tm1637 } from '../coms';

declare global {
  function getTM1637(board: object, clk: number, dio: number): void;
  function getBuzzer(board: object, pin: number): void;
  function getButton(board: object, pin: number): void;
  function getRGBLedCathode(board: object, red: number, green: number, blue: number): void;
}

interface RGBLed {
  setColor(red: number, green: number, blue: number, callback: function): void
}

interface Button {
  on(eventName: string, callback: () => void): void
}

interface Buzzer {
  beep(): void
  di(): void
  lami(): void
}

export interface Smart {
  deviceId: string,
  board: object,
  rgbled: RGBLed,
  rgbledPin: number[],
  buzzer: Buzzer,
  buzzerPin: number,
  tm1637: Tm1637,
  tm1637Pin: number[],
  btn1: Button,
  btn1Pin: number,
  btn2: Button,
  btn2Pin: number,
  sn: number,
  t: Timer,
  s: number
}
