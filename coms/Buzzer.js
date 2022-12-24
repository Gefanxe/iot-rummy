import "webduino-js";
import "webduino-blockly";

export class Buzzer {

  /**
   * 
   * @param {import('../type/MyIots').Smart} smart 
   * @param {number} pin 
   */
  constructor(smart, pin) {
    const self = this;

    self.smart = smart;
    self.buzzer = getBuzzer(smart.board, pin);
  }

  beep() {
    const self = this;
    self.buzzer.stop();
    self.buzzer.play(
      self._buzzer_music([{ notes: "C5", tempos: "3" }]).notes,
      self._buzzer_music([{ notes: "C5", tempos: "3" }]).tempos
    );
  }

  di() {
    const self = this;
    self.buzzer.stop();
    self.buzzer.play(
      self._buzzer_music([{ notes: "C7", tempos: "9" }]).notes,
      self._buzzer_music([{ notes: "C7", tempos: "9" }]).tempos
    );
  }

  lami() {
    const self = this;
    self.buzzer.play(
      self._buzzer_music([{ notes: ["A5", "E5"], tempos: ["3", "3"] }]).notes,
      self._buzzer_music([{ notes: ["A5", "E5"], tempos: ["3", "3"] }]).tempos
    );
  }

  _buzzer_music(m) {
    var musicNotes = {};
    musicNotes.notes = [];
    musicNotes.tempos = [];
    if (m[0].notes.length > 1) {
      for (var i = 0; i < m.length; i++) {
        if (Array.isArray(m[i].notes)) {
          var cn = musicNotes.notes.concat(m[i].notes);
          musicNotes.notes = cn;
        } else {
          musicNotes.notes.push(m[i].notes);
        }
        if (Array.isArray(m[i].tempos)) {
          var ct = musicNotes.tempos.concat(m[i].tempos);
          musicNotes.tempos = ct;
        } else {
          musicNotes.tempos.push(m[i].tempos);
        }
      }
    } else {
      musicNotes.notes = [m[0].notes];
      musicNotes.tempos = [m[0].tempos];
    }
    return musicNotes;
  }
}