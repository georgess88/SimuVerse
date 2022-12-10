mergeInto(LibraryManager.library, {

  GetExternalJS: function() {
    var script = document.createElement("script");
    script.src = "ml5.min.js";
    document.head.appendChild(script);

    var script = document.createElement("script");
    script.src = "p5.min.js";
    document.head.appendChild(script);

    var script = document.createElement("script");
    script.src = "sketch.js";
    document.head.appendChild(script);
  },


  getPoses: function(){
    var returnStr = document.cookie;
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },
});