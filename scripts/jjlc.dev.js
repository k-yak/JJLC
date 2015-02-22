(function (root) {
    "use strict";
    var regex = /\"[a-zA-Z0-9]*\"/g,
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
        this.compress = function (s, beautify) {
            var dict,
                res,
                h,
                sObject;
            
            if (typeof beautify === 'undefined') {
                sObject = JSON.parse(s);
                s = JSON.stringify(sObject);
            }
            dict = _createDict(s);
            res = _compress(s, dict);
            h = XXH(res, seed).toString(16);

            dicts[h] = dict;
            return res;
        };
        
        this.decompress = function (s) {
            var h = XXH(s, seed).toString(16);
            return _decompress(s, dicts[h]);
        };
        
        this.localStorageCompress = function (key, str) {
            var compressed,
                h;
            
            compressed = this.compress(str);
            h = XXH(compressed, seed).toString(16);
            
            localStorage.setItem(key, compressed);
            
            if(typeof dicts[key] === 'undefined')
                localStorage.setItem('d_' + h, JSON.stringify(dicts[h]));
            
            return compressed;
        }
        
        this.localStorageDecompress = function (key) {
            var compressed,
                h,
                dict;
            
            compressed = localStorage.getItem(key);
            h = XXH(compressed, seed).toString(16);
            
            if(typeof dicts[key] === 'undefined')
                dict = JSON.parse(localStorage.getItem('d_' + h));
            else
                dict = dicts[key];
            
            return _decompress(compressed, dict);
        }
        
        this.getDict = function (key, ns) {
            var compressed,
                h,
                dict;
            
            compressed = localStorage.getItem(key);
            h = XXH(compressed, seed).toString(16);
            
            if(ns === 'undefined')
                dict = JSON.parse(localStorage.getItem('d_' + h));
            else
                dict = dicts[h];
            
            return dict;
        }
        
        this.setDict = function (dic, key, ns) {
            var compressed,
                h,
                dict;
                        
            if(ns === 'undefined')
                localStorage.setItem('d_' + key, dic);
            else
                dicts[key] = dic;
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