// import prompts from 'prompts';
// import { startPrompt } from './funcs/tools.js';
import "webduino-js";
import "webduino-blockly";
import { Timer } from 'easytimer.js';
import { Buzzer, createBoard, rgbled, Tm1637 } from './coms/index.js';
import { LIMIT_TIME } from './constant/index.js';

const nowPlayers = [];

let gameStatus = 0; // 0 = wait for player, 1 = start game, 2 = end of game

// deviceId: 10VarPEQ, 10VvDYmd
const myIots = [
  {
    deviceId: '10VvDYmd',
    board: null,
    rgbled: null,
    rgbColor: 'ff0000',
    buzzer: null,
    tm1637: null,
    btn1: null,
    btn2: null,
    sn: null
  }
];

for (let i = 0; i < myIots.length; i++) {
  createBoard(myIots[i], setBoard);
}

/**
 * @param {import('./type/MyIots').Smart} smart
 */
function setBoard(smart) {
  smart.board.systemReset();
  smart.board.samplingInterval = 50;

  // 初始各項功能
  smart.rgbled = getRGBLedCathode(smart.board, 15, 12, 13);
  // smart.btn1 = getButton(smart.board, 16);
  smart.btn2 = getButton(smart.board, 4);
  
  smart.buzzer = new Buzzer(smart);
  // smart.tm1637 = new Tm1637(smart);
  
  smart.rgbled.setColor(255, 0, 0);

  // smart.btn1.on('pressed', function() {
    // 階段 0 = 參加
    // if (gameStatus === 0) {
    //   // 如果之前有加過，取回之前的序號
    //   if (nowPlayers.includes(smart.deviceId)) {
    //     smart.sn = nowPlayers.indexOf(smart.deviceId) + 1;
    //   } else {
    //     smart.sn = nowPlayers.push(smart.deviceId);
    //   }
    //   smart.rgbled.setColor(0, 0, 0);
    // }
    // const cases = {
    //   [0]: () => {
    //     // join game
    //   },
    //   [1]: () => {
    //     // next player
    //   },
    //   [2]: () => {
        
    //   },
    //   [3]: () => {
        
    //   }
    // };
    // cases.hasOwnProperty(gameStatus) && cases[gameStatus]();
  // });
  // smart.btn1.on('released', function() {});
  // smart.btn1.on('longPress', function() {});

  smart.btn2.on('pressed', function() {
    const cases = {
      [0]: () => {
        // change Brightness
        smart.buzzer.beep();
        // smart.buzzer.lami();
      },
      [1]: () => {
        // previous player
      },
      [2]: () => {
        
      },
      [3]: () => {
        
      }
    };
    cases.hasOwnProperty(gameStatus) && cases[gameStatus]();
    // smart.tm1637.startCountDown();
    // test
    // console.log('test: ', nowPlayers);
  });
  smart.btn2.on('released', function() {});
  smart.btn2.on('longPress', function() {});

  // TODO: 改寫成類別再來用...
  // tm1637(smart);
  

  // Prompt
  // if (smart.deviceId === '10VvDYmd') {
  //   startPrompt(smart.board, (prompt, answer) => {
  //     console.log('你的答案:', answer);
  //   });
  // }
}


/*
  boardReady({board: 'Smart', device: smart.deviceId, transport: 'mqtt'}, function (board) {
    board.systemReset();
    board.samplingInterval = 50;
    smart.rgbled = getRGBLedCathode(board, 15, 12, 13);
    smart.rgbled.setColor(smart.rgbColor);

    // 1637
    // smart.tm1637 = getTM1637(board, 5, 2);
    // const varData=[0, 0, 0, 0];
    // smart.tm1637.setSegments(varData);

    // button
    smart.btn1 = getButton(board, 16);
    smart.btn2 = getButton(board, 14);
    smart.btn1.on('pressed', function() { console.log('16 按下'); });
    smart.btn1.on('released', function() { console.log('16 放開'); });
    smart.btn1.on('longPress', function() { console.log('16 長按'); });
    smart.btn2.on('pressed', function() { console.log('14 按下'); });
    smart.btn2.on('released', function() { console.log('14 放開'); });
    smart.btn2.on('longPress', function() { console.log('14 長按'); });

  });
*/