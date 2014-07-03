beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          return {
            pass: actual.currentlyPlayingSong === expected && actual.isPlaying
          }
        }
      };
    }
  });
});
