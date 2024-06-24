var image = null;
var gimage = null;
var rimage = null;
var rgbimage = null;
var simage = null;
var bimage = null;

function upload() {
  var imgcanvas = document.getElementById("can");
  var fileinput = document.getElementById("finput");
  image = new SimpleImage(fileinput);
  gimage = new SimpleImage(fileinput);
  rimage = new SimpleImage(fileinput);
  rgbimage = new SimpleImage(fileinput);
  simage = new SimpleImage(fileinput);
  bimage = new SimpleImage(fileinput);
  image.drawTo(imgcanvas);
}

function makeGray() {
  for(var pixel of gimage.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
    
 
  }
  var imgcanvas = document.getElementById("can");
  gimage.drawTo(imgcanvas);
}

function makeRed() {
  for(var pixel of rimage.values()) {
    if (pixel.getRed() != 0) {
        pixel.setGreen(0);
        pixel.setBlue(0);
    }
    else {
      var avg = (pixel.getGreen() + pixel.getBlue()) / 2;
      pixel.setRed(avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
  }
  var canvas = document.getElementById("can");
  rimage.drawTo(canvas);
}

function makeRGB() {
  for (var pixel of rgbimage.values()) {
    if (pixel.getX() <= (rgbimage.getWidth() / 3)) {
        pixel.setRed(255);
    }
    if (pixel.getX() > (rgbimage.getWidth() / 3) && pixel.getX() <= (2 * (rgbimage.getWidth() / 3))) {
        pixel.setGreen(255);
    }
    if (pixel.getX() > (2 * (rgbimage.getWidth() / 3))) {
        pixel.setBlue(255);
    }
  }
  var canvas = document.getElementById("can");
  rgbimage.drawTo(canvas);
}

function makeSepia() {
  for (var pixel of simage.values()) {
    var tr = 0.393 * pixel.getRed() + 0.769 * pixel.getGreen() + 0.189 * pixel.getBlue();
    var tg = 0.349 * pixel.getRed() + 0.686 * pixel.getGreen() + 0.168 * pixel.getBlue();
    var tb = 0.272 * pixel.getRed() + 0.534 * pixel.getGreen() + 0.131 * pixel.getBlue();
    
    if (Math.round(tr) > 255) {
      pixel.setRed(255);
    } 
    else {
      pixel.setRed(Math.round(tr));
    }
    
    if (Math.round(tg) > 255) {
      pixel.setGreen(255);
    } 
    else {
      pixel.setGreen(Math.round(tg));
    }
    
    if (Math.round(tb) > 255) {
      pixel.setBlue(255);
    } 
    else {
      pixel.setBlue(Math.round(tb));
    }
  }
  var canvas = document.getElementById("can");
  simage.drawTo(canvas);
}

function resetImage() {
  var canvas = document.getElementById("can");
  image.drawTo(canvas);
}

function makeBlur() {
  for (var pixel of bimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    getRandomCoordinates(x, y);
    var random = Math.round(Math.random());
    if (random == 0) {
      pixel.setRed(pixel.getRed());
      pixel.setGreen(pixel.getGreen());
      pixel.setBlue(pixel.getBlue());
    }
    else {
      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0
      }
      if (x > (bimage.getWidth() - 1)) {
        x = bimage.getWidth() - 1;
      }
      if (y > (bimage.getHeight() - 1)) {
        y = bimage.getHeight() - 1;
      }
      bimage.setPixel(x,y);
    }
  }
  var canvas = document.getElementById("can");
  bimage.drawTo(canvas);
}

function getRandomCoordinates(x, y) {
    // Generate random offsets between -10 and 10 for x and y
    var xOffset = Math.floor(Math.random() * 21) - 10; // Random number between -10 and 10
    var yOffset = Math.floor(Math.random() * 21) - 10; // Random number between -10 and 10
    
    // Calculate new coordinates
    var newX = x + xOffset;
    var newY = y + yOffset;
    
    // Ensure newX and newY are within bounds (0 to 10 pixels away)
    newX = Math.max(0, Math.min(10, newX));
    newY = Math.max(0, Math.min(10, newY));
    
    return { x: newX, y: newY };
}