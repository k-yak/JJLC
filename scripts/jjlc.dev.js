(function (root) {
    "use strict";
    var regex = /\"[a-zA-Z0-9]*\":/g,
        separator = '£',
        seed = 0xABCD,
        dicts = {};
    
    function _sortedByValue(obj) {
        var tuples = [],
            newObj = {},
            key;

        for (key in obj) { tuples.push([key, obj[key]]); }
        tuples.sort(function (a, b) { return b[1] - a[1]; });
        for (key in tuples) { newObj[tuples[key][0]] = tuples[key][1]; }
        return newObj;
    }
    
    function _incChar(s) {
        var c = s[s.length - 1],
            p = s.substring(0, s.length - 1),
            nextId;
                
        if (typeof c === 'undefined') {
            nextId = 'a';
        } else if (c === 'z') {
            nextId = 'A';
        } else if (c === 'Z') {
            nextId = 'a';
            if (p !== '') {
                p = _incChar(p);
            } else {
                p = 'a';
            }
        } else {
            nextId = String.fromCharCode(c.charCodeAt(0) + 1);
        }
        c = nextId;
        return p + c;
    }
    
    function _createDict(s) {
        var dict = {},
            curId = '',
            m = s.match(regex),
            key,
            sbv;
        
        for (key in m) {
            if (m[key].length > (curId.length + 2)) {
                if (typeof dict[m[key]] !== 'undefined') {
                    dict[m[key]] += 1;
                } else {
                    dict[m[key]] = 0;
                }
            }
        }
        sbv = _sortedByValue(dict);
        for (key in sbv) {
            curId = _incChar(curId);
            sbv[key] = separator + curId + separator;
        }
        return sbv;
    }
    
    function _compress(v, dict) {
        var id,
            re;
        for (id in dict) {
            re = new RegExp(id, 'g');
            v = v.replace(re, dict[id]);
        }
        return v;
    }

    function _decompress(v, dict) {
        var id,
            re;
        for (id in dict) {
            re = new RegExp(dict[id], 'g');
            v = v.replace(re, id);
        }
        return v;
    }
    
    function JJLC() {        
        this.setItem = function (key, str, ns) {
            var compressed,
                sObject,
                dict;
            
            if(typeof ns === 'undefined' || ns !== 'no-beautify') {
                sObject = JSON.parse(str);
                str = JSON.stringify(sObject);
            }
            
            dict = _createDict(str);
            compressed = _compress(str, dict);

            if(typeof ns !== 'undefined' && ns === 'local-dict') {
                dicts[key] = dict;
            }
            
            localStorage.setItem(key, compressed);
            
            if(typeof dicts[key] === 'undefined') {
                localStorage.setItem('d_' + key, JSON.stringify(dict));
            }
            
            return compressed;
        }
        
        this.getItem = function (key) {
            var compressed,
                dict;
            
            compressed = localStorage.getItem(key);
            
            if(typeof dicts[key] === 'undefined') {
                dict = JSON.parse(localStorage.getItem('d_' + key));
            } else {
                dict = dicts[key];
            }
            return _decompress(compressed, dict);
        }
        
        this.getDict = function (key) {
            var compressed,
                dict;
                    
            if(typeof dicts[key] === 'undefined') {
                dict = JSON.parse(localStorage.getItem('d_' + key));
            } else {
                dict = dicts[key];
            }
            
            return dict;
        }
        
        this.setDict = function (key, dic, ns) {
            var compressed,
                h,
                dict;
                        
            if(typeof ns === 'undefined') {
                localStorage.setItem('d_' + key, dic);
            } else {
                dicts[key] = dic;
            }
        }
    }
    
    if (typeof define !== 'undefined' && define.amd) {
        // AMD / RequireJS
        define([], function () {
            return new JJLC();
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        // Node.js
        module.exports = new JJLC();
    } else {
        // Browser
        root.JJLC = new JJLC();
    }

}(this));