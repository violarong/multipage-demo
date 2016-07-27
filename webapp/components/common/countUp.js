/**
 * 列表模块
 * @author  violarong(xiaorong_hz@163.com)
 */

'use strict';

import Component from '../base/component.js';
import template from './countUp.html';

const CountUp = Component.extend({
    name: 'CountUp',
    template: template,
    config() {
        this.data = Object.assign({
            start: 0, //开始数字
            lastTime: 0,
            duration: 1000, //动画持续时间
            num: 0, //显示的数字
            timestamp: new Date().getTime(),
            decimal: 0 //小数点位数
        }, this.data);
        this.supr();
        this.data.countDown = this.data.start>this.data.end;
        this.data.decimalpow =  Math.pow(10, this.data.decimal);
    },
    init() {

    },
    /*
     * 获取动画函数
     */
    getRequestAnimation() {
        var _vendors = ['webkit', 'moz', 'ms', 'o'];
        for (var x = 0; x < _vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[_vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[_vendors[x] + 'CancelAnimationFrame'] || window[_vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(_id) {
                clearTimeout(_id);
            };
        }
    },
    /*
     * 数处理
     */
    onCount() {
        var _data = this.data;
        //当前时间
        var _timestamp = new Date().getTime();
        //已处理时间
        var _process = _timestamp - this.startTime;
        //计算每次增加（减少）的数
        if (_data.countDown) {
            var _frameNum = _data.start - ((_data.start - _data.end) * (_process / _data.duration));
        } else {
            var _frameNum = _data.start + (_data.end - _data.start) * (_process / _data.duration);
        }

        //边界处理
        if (_data.countDown) {
            _frameNum = _frameNum < _data.end ? _data.end : _frameNum;
        } else {
            _frameNum = _frameNum > _data.end ? _data.end : _frameNum;
        }
        //小数点处理
        _frameNum = Math.floor(_frameNum * _data.decimalpow) / _data.decimalpow;

        //格式化输出
        this.data.num = this.formatNum(_frameNum);
        this.$update();

        //动画进行与否判断
        if (_process > _data.duration) {
            cancelAnimationFrame(this.rAF);
            this.$emit('countend');
        } else {
            this.rAF = requestAnimationFrame(this.onCount.bind(this));
        }
    },
    /*
     * 开始执行
     */
    onStart() {
        this.startTime = new Date().getTime();
        this.rAF = requestAnimationFrame(this.onCount.bind(this));
        return false;
    },
    /*
     * 格式化
     */
    formatNum(_num) {
        var _separator = ',';
        _num = _num.toFixed(this.data.decimal);
        _num += '';
        var _x, _n1, _n2, _regx;
        _x = _num.split('.');
        _n1 = _x[0];
        _n2 = _x.length > 1 ? '.' + _x[1] : '';
        _regx = /(\d+)(\d{3})/;
        while (_regx.test(_n1)) {
            _n1 = _n1.replace(_regx, '$1' + _separator + '$2');
        }
        var _value = _n1 + _n2;
        return _value;
    }
});

export default CountUp;
