(function(exports) {
    /**
     * 产生一个 唯一uuid，默认为32位的随机字符串，8-4-4-4-12 格式
     * @param {Object} options 配置参数
     * len 默认为32位，最大不能超过36，最小不能小于4
     * radix 随机的基数，如果小于等于10代表只用纯数字，最大为62，最小为2，默认为62
     * type 类别，默认为default代表 8-4-4-4-12的模式，如果为 noline代表不会有连线
     * @return {String} 返回一个随机性的唯一uuid
     */
    exports.uuid = function(options) {
        options = options || {};

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
            uuid = [],
            i;
        var radix = options.radix || chars.length;
        var len = options.len || 32;
        var type = options.type || 'default';

        len = Math.min(len, 36);
        len = Math.max(len, 4);
        radix = Math.min(radix, 62);
        radix = Math.max(radix, 2);

        if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }

            if (type === 'default') {
                len > 23 && (uuid[23] = '-');
                len > 18 && (uuid[18] = '-');
                len > 13 && (uuid[13] = '-');
                len > 8 && (uuid[8] = '-');
            }
        }

        return uuid.join('');
    };

    /**
     * 通过传入key值,得到页面key的初始化传值
     * 实际情况是获取 window.location.href 中的参数的值
     * @param {String} key 键名
     * @return {String} 键值
     */
    exports.getExtraDataByKey = function(key) {
        if (!key) {
            return null;
        }
        // 获取url中的参数值
        var getUrlParamsValue = function(url, paramName) {
            var paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
            var paraObj = {};
            var i,
                j;

            for (i = 0;
                (j = paraString[i]); i++) {
                paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length);
            }
            var returnValue = paraObj[paramName.toLowerCase()];

            // 需要解码浏览器编码
            returnValue = decodeURIComponent(returnValue);
            if (typeof(returnValue) === 'undefined') {
                return undefined;
            } else {
                return returnValue;
            }
        };
        var value = getUrlParamsValue(window.location.href, key);

        if (value === 'undefined') {
            value = null;
        }

        return value;
    };

    var TIME_STAMP = '_t=20170523';

    /**
     * 动态引入文件-如引入css或js
     * 目前是采用并联+递归的方式加载，串联看似用不上，但依然保留这个方法
     * @param {Object} pathArray 路径，一个数组-用来并联加载，或者字符串用来串联加载
     * 会将这个参数中的不同子数组之间进行串联加载，同一个子数组之间进行并联加载
     * -串联加载一般用到前后依赖性较强的对方
     * -并联加载更快
     * @param {Function} callback 成功加载后的回调
     * @example 调用方式前面的路径可以是无限多的，例如
     * path1,path2,...,pathn,callback
     */
    exports.loadJs = function() {
        // 强行变为异步
        var self = this,
            args = [].slice.call(arguments);

        setTimeout(function() {
            // 递归调用，可以依次获取
            loadJsRecurse.apply(self, args);
        });
    };

    /**
     * 递归加载脚本
     * 参数中分别是
     * path1,...,pathn,callback
     * 需要依次取出并进行加载
     */
    function loadJsRecurse() {

        // 永远不要试图修改arguments，请单独备份
        var args = [].slice.call(arguments);
        var self = this;

        if (typeof args[0] === 'function') {
            // 如果已经加载到最后一个了，并且是回调
            args[0]();
        } else if (args[0] === undefined) {
            // 如果已经加载到最后一个了，但是没有回调，什么都不做
            return;
        } else if (args[0] === null || args[0] === '') {
            // 兼容null或空字符串的情况
            loadJsRecurse.apply(self, args.slice(1));
        } else {
            if (Array.isArray(args[0]) || exports.getPathSuffix(args[0]) === 'js') {
                // js则链式回调
                // 并联加载当前元素-可能是一个，也可能是数组
                parallelLoadFiles(args[0], function() {
                    // 需要去除当前已经加载完毕的参数
                    loadJsRecurse.apply(self, args.slice(1));
                });
            } else {
                // 其它如css则直接加载，不管回调
                parallelLoadFiles(args[0]);
                loadJsRecurse.apply(self, args.slice(1));
            }

        }
    }

    /**
     * 并联加载指定的脚本,css
     * 并联加载[同步]同时加载，不管上个是否加载完成，直接加载全部
     * 全部加载完成后执行回调
     * @param array|string 指定的脚本们
     * @param function 成功后回调的函数
     * @return array 所有生成的脚本元素对象数组
     */

    function parallelLoadFiles(scripts, callback) {
        if (typeof(scripts) !== 'object') {
            scripts = [scripts];
        }
        if (scripts[0] === undefined || (scripts.length === 1 && scripts[0] === '')) {
            // 过滤空数组
            callback && callback();
        }
        var HEAD = document.getElementsByTagName('head').item(0) || document.documentElement,
            s = new Array(),
            loaded = 0,
            fragment = document.createDocumentFragment();

        for (var i = 0; i < scripts.length; i++) {
            var path = scripts[i];

            if (!path) {
                loaded++;
                continue;
            }
            path = exports.changePathByConfig(path);
            path = exports.getFullPath(path);

            var suffix = exports.getPathSuffix(path);

            path += ('?' + TIME_STAMP);
            if (suffix === 'js') {
                // js
                s[i] = document.createElement('script');
                s[i].setAttribute('type', 'text/javascript');
            } else {
                // css
                s[i] = document.createElement('link');
                s[i].setAttribute('type', 'text/css');
                s[i].setAttribute('rel', 'stylesheet');
            }
            s[i].suffix = suffix;
            // css在某些版本的浏览器中不会触发onreadystatechange,所以直接默认css已经加载好
            if (suffix.toLowerCase() === 'css') {
                // 判断时默认css加载完毕,因为css并不会影响程序操作
                loaded++;
            } else if (suffix.toLowerCase() === 'js') {
                // 只有js才监听onload和onerror
                s[i].onload = s[i].onreadystatechange = function() {
                    // Attach handlers for all browsers
                    if (!0 || this.readyState === 'loaded' || this.readyState === 'complete') {
                        loaded++;
                        this.onload = this.onreadystatechange = null;
                        if (this.suffix === 'js') {
                            // 只移除脚本,css如果移除就没效果了
                            // 暂时不移除脚本,移除了无法进行判断
                            // this.parentNode.removeChild(this);
                        }
                        if (loaded === scripts.length && typeof(callback) === 'function') {
                            callback();
                        }
                    }
                };
                s[i].onerror = function() {
                    console.error('加载js文件出错,路径:' + this.getAttribute('src'));
                    // 加载出错也要继续加载其它文件
                    loaded++;
                    if (loaded === scripts.length && typeof(callback) === 'function') {
                        callback();
                    }
                };
            }

            // 这里设置两边charset 是因为有时候charset设置前面会有bug
            // 目前设置到后面
            // s[i].charset = 'UTF-8';
            // s[i].setAttribute('async', true);
            if (suffix === 'js') {
                s[i].setAttribute('src', path);
            } else {
                s[i].setAttribute('href', path);
            }
            s[i].charset = 'UTF-8';
            fragment.appendChild(s[i]);
        }
        HEAD.appendChild(fragment);
    }

    var SrcBoot = {

        /**
         * 得到一个项目的根路径,只适用于混合开发
         * h5模式下例如:http://id:端口/项目名/
         * @param {String} reg 项目需要读取的基本目录
         * @return {String} 项目的根路径
         */
        getProjectBasePath: function(reg) {
            reg = reg || '/pages/';
            var basePath = '';
            var obj = window.location;
            var patehName = obj.pathname;
            // h5
            var contextPath = '';

            // 兼容pages
            // 普通浏览器
            contextPath = patehName.substr(0, patehName.lastIndexOf(reg) + 1);
            // 暂时放一个兼容列表，兼容一些固定的目录获取
            var pathCompatibles = ['/html/', '/showcase/', '/showcase_pending/', '/test/', '/'];

            for (var i = 0, len = pathCompatibles.length; i < len && (!contextPath || contextPath === '/'); i++) {
                var regI = pathCompatibles[i];

                // 这种获取路径的方法有一个要求,那就是所有的html必须在regI文件夹中,并且regI文件夹中不允许再出现regI目录
                contextPath = patehName.substr(0, patehName.lastIndexOf(regI) + 1);

                if (regI === '/') {
                    // 最后的根目录单独算
                    var path = patehName;

                    if (/^\//.test(path)) {
                        // 如果是/开头
                        path = path.substring(1);
                    }
                    contextPath = '/' + path.split('/')[0] + '/';
                }
            }
            // 兼容在网站根路径时的路径问题
            basePath = obj.protocol + '//' + obj.host + (contextPath ? contextPath : '/');

            return basePath;
        },

        /**
         * 得到一个全路径
         * @param {String} path 路径
         * @return {String} 返回全路径
         */
        getFullPath: function(path) {
            // 全路径
            if (/^(http|https|ftp|\/\/)/g.test(path)) {
                return path;
            }
            // 是否是相对路径
            var isRelative = /^(\.\/|\.\.\/)/.test(path);

            // 非相对路径，页面路径默认从html目录开始
            path = (isRelative ? path : ((SrcBoot.getProjectBasePath()) + path));

            return path;
        },

        /**
         * 得到文件的后缀
         * @param {String} path 路径
         * @return {String} 返回后缀
         */
        getPathSuffix: function(path) {
            var dotPos = path.lastIndexOf('.'),
                suffix = path.substring(dotPos + 1);

            return suffix;
        },

    };

    exports.getProjectBasePath = SrcBoot.getProjectBasePath;
    exports.getFullPath = SrcBoot.getFullPath;
    exports.getPathSuffix = SrcBoot.getPathSuffix;

    /**
     * 将相对路径转为绝对路径 ./ ../ 开头的  为相对路径
     * 会基于对应调用js的html路径去计算
     * @param {Object} path 路径
     * @return {String} 返回转化后的相对路径
     */
    exports.changeRelativePathToAbsolute = function(path) {
        var obj = window.location,
            patehName = window.location.pathname;

        // 匹配相对路径返回父级的个数
        var relatives = path.match(/\.\.\//g);
        var count = relatives && relatives.length;

        // 将patehName拆为数组，然后计算当前的父路径，需要去掉相应相对路径的层级
        var pathArray = patehName.split('/');
        var parentPath = pathArray.slice(0, pathArray.length - (count + 1)).join('/');
        // 找到最后的路径， 通过正则 去除 ./ 之前的所有路径
        var finalPath = parentPath + '/' + path.replace(/\.+\//g, '');

        finalPath = obj.protocol + '//' + obj.host + finalPath;

        return finalPath;
    };

    exports.changePathByConfig = function(path) {
        if (!path || /\.min\./.test(path) || /^(http|https|ftp|\/\/)/g.test(path)) {
            return path;
        }
        // 考虑相对路径的存在
        var isRelative = /^(\.\/|\.\.\/)/.test(path);

        // 转为绝对路径，方便判断
        if (isRelative) {
            path = exports.changeRelativePathToAbsolute(path);
        } else {
            path = SrcBoot.getFullPath(path);
        }

        return path;
    };
})(window.Util = {});