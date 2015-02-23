(function (jjlc) {
    "use strict";   
    var bCompress = document.getElementById('compress');
    var bDecompress = document.getElementById('decompress');
    var bFull = document.getElementById('full');
    var json = document.getElementById('json');
    var smallJson = document.getElementById('small-json');
    var bigJson = document.getElementById('big-json');
    var inter = document.getElementById('inter');
    var results = document.getElementById('results');
    var big = document.getElementById('big');
    var small = document.getElementById('small');
    
    
    function compress() {
        var l = json.value.length;
        results.value = 'COMPRESS ONLY\n';
        
        var start = new Date().getTime();
        var compressed = JJLC.setItem('testStr', json.value);
        var end = new Date().getTime();
        var time = end - start;
        
        inter.value = compressed;
        
        var size = compressed.length + JSON.stringify(JJLC.getDict('testStr')).length;
        results.value += 'initial size : ' + (l / 1024).toPrecision(3) + ' kB\n';
        results.value += 'compressed size : ' + (size / 1024).toPrecision(3) + ' kB\n';
        results.value += 'win : ' + ((l - size) / 1024).toPrecision(3) + ' kB\n';
        results.value += 'win : ' + ((l - size) / l * 100).toPrecision(3) + '%\n';
        results.value += 'execution : ' + time + ' milliseconds\n';
    }
    
    function decompress() {
        var l = json.value.length;
        results.value = '';
        results.value = 'DECOMPRESS ONLY\n';
        
        var start = new Date().getTime();
        var decompressed = JJLC.getItem('testStr');
        var end = new Date().getTime();
        var time = end - start;
        
        inter.value = decompressed;
        
        results.value += 'execution : ' + time + ' milliseconds\n';
    }
    
    function full() {
        var l = json.value.length;
        results.value = 'COMPRESS AND DECOMPRESS\n';
        
        var start = new Date().getTime();
        var compressed = JJLC.setItem('testStr', json.value);
        var decompressed = JJLC.getItem('testStr');
        var end = new Date().getTime();
        var time = end - start;
        
        inter.value = decompressed;
        
        var size = compressed.length + JSON.stringify(JJLC.getDict('testStr')).length;
        results.value += 'initial size : ' + (l / 1024).toPrecision(3) + ' kB\n';
        results.value += 'compressed size : ' + (size / 1024).toPrecision(3) + ' kB\n';
        results.value += 'win : ' + ((l - size) / 1024).toPrecision(3) + ' kB\n';
        results.value += 'win : ' + ((l - size) / l * 100).toPrecision(3) + '%\n';
        results.value += 'execution : ' + time + ' milliseconds\n';
    }
    
    bCompress.onclick = compress;
    
    bDecompress.onclick = decompress;
     
    bFull.onclick = full;
    
    small.onclick = function () {
        json.value = smallJson.value;  
    };
    
    big.onclick = function () {
        json.value = bigJson.value;  
    };
    
    json.value = smallJson.value; 
}());