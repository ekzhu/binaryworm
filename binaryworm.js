if (Meteor.isClient) {
  var wormLength = 25;
  
  Meteor.startup(function() {
    var worm = getBinaryWorm(wormLength);
    Session.set("Worm", worm);
    Session.set("Length", wormLength);
  });
  
  Template.worm.worm = function () {
    return Session.get("Worm");
  };
  
  Template.win.win = function () {
    var worm = Session.get("Worm");
    if (worm == null) {
      return false;
    }
    for (var i = 0; i < worm.length; i++) {
      if (worm[i].bit == 1) {
        return false;
      }
    }
    return true;
  };
  
  Template.controls.isOneOnRight = function () {
    var worm = Session.get("Worm");
    if (worm == null) {
      return false;
    }
    if (worm.pop().bit) {
      return true;
    }
    else {
      return false;
    }
  };
  
  Template.controls.events({
    'click input.get-new-worm' : getNewWorm,
    'click input.pop-right' : popRight,
    'click input.pop-right-add-one-on-left' : popRightAddOneLeft,
    'click input.pop-right-add-zero-on-left' : popRightAddZeroLeft
  });
  
  function popRight() {
    var worm = Session.get("Worm");
    worm.pop();
    worm.splice(0,0, getWormBit());
    Session.set("Worm", worm);
  }
  
  function popRightAddOneLeft() {
    var worm = Session.get("Worm");
    worm.pop();
    worm.splice(0,0, {bit: 1})
    Session.set("Worm", worm);
  }
  
  function popRightAddZeroLeft() {
    var worm = Session.get("Worm");
    worm.pop();
    worm.splice(0,0, {bit: 0})
    Session.set("Worm", worm);
  }
  
  function getNewWorm() {
    var length = Session.get("Length");
    Session.set("Worm", getBinaryWorm(length));
  }
}

function getBinaryWorm(size) {
  var array = [0,];
  var worm = [];
  while (isWon(array)) {
    array = getRandomBitArray(size);
  }
  for (var i = 0; i < size; i++) {
    worm.push({bit: array[i]});
  }
  return worm;
}

function isWon(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == 1) {
      return false;
    }
  }
  return true;
}

function getRandomBitArray(size) {
  array = [];
  for (var i = 0; i < size; i++) {
    array.push(getRandomBit());
  }
  return array;
}

function getWormBit() {
  return {bit: getRandomBit()};
}

function getRandomBit() {
  return Math.floor(Math.random()*2);
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
