
/*
Inspired by:
* https://gist.github.com/larrybotha/5baf6a9aea8da574cbbe
* http://www.ericson.net/content/2011/06/export-illustrator-layers-andor-artboards-as-pngs-and-pdfs/

* ExtendScript-Documentation: https://ai-scripting.docsforadobe.dev/objectmodel/objectModel.html
*/


/*
======================= Array functions =======================
*/

toArray = function(iteratable) {
    var _arr = []
    for(var i=0; i<iteratable.length; i++) {
        _arr.push(iteratable[i])
    }
    return _arr
}


Array.prototype.map = function (callback) {
    var that = Object(this)
    var _arr = []
    for(var i=0; i<that.length;i++) {
        _arr.push(callback(this[i]))
    }
    return _arr
}

Array.prototype.filter = function (callback) {
    var _arr = []
    for(var i=0; i<this.length;i++) {
        if(callback(this[i])) {
            _arr.push(this[i])
        }
    }
    return _arr 
}




/**
 *
 * @param {Function} callback function to apply on each element
 * @param {Object} thisArg object to use as this when callback parameter is executed
 * @todo add forEach function for array and collection
 */
 Array.prototype.forEach = function forEach (callback, thisArg) {
    'use strict';
    var T, k;
  
    if (this == null) {
        throw new TypeError("this is null or not defined");
    }
  
    var kValue,
    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        O = Object(this),
  
    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
        len = O.length >>> 0; // Hack to convert O.length to a UInt32
  
    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ({}.toString.call(callback) !== "[object Function]") {
        throw new TypeError(callback + " is not a function");
    }
  
    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length >= 2) {
        T = thisArg;
    }
  
    // 6. Let k be 0
    k = 0;
  
    // 7. Repeat, while k < len
    while (k < len) {
  
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
  
            // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
            kValue = O[k];
  
            // ii. Call the Call internal method of callback with T as the this value and
            // argument list containing kValue, k, and O.
            callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
    }
    // 8. return undefined
  };


/*
==================== Main config ================
*/

var prefix = '@'
var artboard_labels = ['mw', 'cw', 'fw']
var scaling = 300
var docRef = app.activeDocument;
var allLayers = toArray(docRef.layers) // Mach aus dem komischen Iterable einen Array
var names = []
var map = {}
var artboards = []


// Welche Namen gibt es?
allLayers.forEach(function(layer) {
    var _names = getNames(getParts(layer)) // Split bei den Leerstellen und gib mir alles mit dem richtigen Präfix
    _names.forEach(function(n) {
        n = removeAt(n) // Entfernt das Präfix

        if(!inArray(names, n)) {
            names.push(n)
        }
    })
})

// Welcher Layer enthält welchen Namen
names.forEach(function(n) {
    map[n] = allLayers.filter(function(l) {
        return l.name.indexOf(prefix+n) !== -1
    })
})

// Artboards die wir exportieren wollen
artboards = toArray(docRef.artboards).filter(function(a) {
    var _state = false
    artboard_labels.forEach(function(al) {
        if(a.name.indexOf(al) !== -1) {_state = true}
    })
    return _state
})

// Index eines Artboards finden – um es dann zu aktivieren
getArtboardIndex = function(artboard) {
    var _idx = null
    for(var i=0;i<docRef.artboards.length;i++) {
        if(artboard == docRef.artboards[i]) {
            _idx = i
        }
    }
    return _idx
}

/*
================ Main loop ===================
*/
names.forEach(function(name) {
    hideAllLayers()

    map[name].forEach(function(lay) {
        lay.visible = true
    })

    artboards.forEach(function(ab) {
        var idx = getArtboardIndex(ab)
        docRef.artboards.setActiveArtboardIndex(idx)
        exportFileToPNG8(getFolder()+'/png/' +name+'-'+ab.name+'.png')
    })
})


// Ordner des aktiven Dokuments
function getFolder() {
    return docRef.path.toString()
}

// Alle Top-Layer ausblenden
function hideAllLayers() {
    toArray(docRef.layers).forEach(function(lay) {
        lay.visible = false
    })
}

// Get the parts of a layer name
function getParts(layer) {
    return layer.name.split(' ')
}

// Only return parts that contain an '@' (or another prefix)
function getNames(parts) {
    return parts.filter(function(p) {return p.indexOf(prefix) !== -1})
}

// Remove the @
function removeAt(part) {
    return part.replace(prefix, '')
}

// Prüft ob ein Element in einem Array vorkommt
function inArray(arr, el) {
    for(var i=0;i<arr.length; i++) {
        if(arr[i] == el) {return true}
    }
    return false
}

// Wandelt seltsame, iterierbare Objekte in ein Array um
function toArr(iteratable) {
    var _arr = []
    for(var i=0; i<iteratable.length; i++) {
        _arr.push(iteratable[0])
    }
    return _arr
}


// Export-Funktion
function exportFileToPNG8(dest) {
    if (app.documents.length > 0) {
      var exportOptions = new ExportOptionsPNG24();
      exportOptions.transparency = false;
      exportOptions.artBoardClipping = true
      exportOptions.verticalScale = scaling
      exportOptions.horizontalScale = scaling

      var type = ExportType.PNG24;
      var fileSpec = new File(dest);
  
      app.activeDocument.exportFile(fileSpec, type, exportOptions);
    }
  }


  
 