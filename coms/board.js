import "webduino-js";
import "webduino-blockly";

/**
 * 
 * @param {import('../type/MyIots').Smart} smart
 * @param {function} setBoard 
 */
export const createBoard = (smart, setBoard) => {
  smart.board = new webduino.WebArduino(smart.deviceId);
  smart.board.on(webduino.BoardEvent.READY, async function (evt) {
    console.log(`board(${smart.deviceId})已連接!`);
    await setBoard(smart);
  });
  smart.board.on(webduino.BoardEvent.RECONNECT, async function () {
    console.log(`board(${smart.deviceId})重新連接!`);
    await setBoard(smart);
  });
  smart.board.on(webduino.BoardEvent.DISCONNECT, function (evt) {
    console.log(`board(${smart.deviceId})斷線!`)
    smart.board.disconnect(function () {
      console.log(`重新建立board(${smart.deviceId})!`);
      createBoard(smart);
    });
  });

};