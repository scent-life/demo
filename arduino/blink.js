module.exports = {
    start: function(board) {
      var val = 0;

      // Set pin 13 to OUTPUT mode
      board.pinMode(13, 1);

      // Create a loop to "flash/blink/strobe" an led
      board.loop(100, function() {
          board.digitalWrite(13, (val = val ? 0 : 1));
      });
    },
    stop: function(board) {

    }
}
