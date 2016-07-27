/**
 * 列表模块
 * @author  violarong(xiaorong_hz@163.com)
 */

'use strict';

import Component from '../base/component.js';
import template from './list.html';

const List = Component.extend({
    name: 'List',
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
        this.data.list = [{name:'test1'},{name:'test2'}];
    }
});

export default List;
