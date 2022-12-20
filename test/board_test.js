import "webduino-js";
import "webduino-blockly";
var board, led;
var boardStatus = false;
board = new webduino.WebArduino('10VvDYmd');
// board = new webduino.WebArduino({
//   'transport': 'serial',
//   'baudRate': 57600,
//   'path': '/dev/cu.usbmodem1411'
// });
// board = new webduino.Arduino({
//   'transport': 'serial',
//   'path': '/dev/cu.usbmodem1421'
// });
// board = new webduino.Arduino({
//   'transport': 'bluetooth',
//   'address': '30:14:09:30:15:67'
// });
// board = new webduino.Arduino({
//   'transport': 'mqtt',
//   'device': '',
//   'server': 'wss://ws.webduino.io:443/',
//   'login': 'admin',
//   'password': 'password'
// });
// board = new webduino.Arduino({
//   'transport': 'websocket',
//   'url': '192.168.50.105'
// });
board.on(webduino.BoardEvent.READY, function (obj) {
  // boardStatus = true;
  // console.log(board);
  console.log('board ready', obj);
  // led = new webduino.module.Led(board, board.getDigitalPin(15));
  // led.blink(500);
  // setTimeout(function() {
  //   console.log('start close');
  //   board.close();
  //   console.log('end close');
  // }, 5000);
});
board.on(webduino.BoardEvent.RECONNECT, function () {
  console.log('board reconnect!!!');
});
// board.on(webduino.BoardEvent.ERROR, function (err) {
//   console.log('board error', err.message);
// });
// board.on(webduino.BoardEvent.BEFOREDISCONNECT, function () {
//   console.log('board beforedisconnect');
// });
// board.on(webduino.BoardEvent.DISCONNECT, function () {
//   console.log('board disconnect');
//   // test: should not emit 'disconnect' again
//   board.disconnect();
//   board.close();
// });