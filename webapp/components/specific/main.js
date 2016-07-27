/**
 * 列表模块-main
 * @author  violarong(xiaorong_hz@163.com)
 */

'use strict';

import Component from '../base/component.js';
import template from './main.html';

const MainList = Component.extend({
    name: 'MainList',
    template: template,
    config(){
        this.data = Object.assign({
            list:[]
        }, this.data);
        this.supr();
        this._getList();
    },
    init(){

    },
    _getList(){
        this.data.list = [{name:'main1'},{name:'main2'}];
    }
});

export default MainList;
