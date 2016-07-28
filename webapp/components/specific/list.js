/**
 * 列表模块
 * @author  violarong(xiaorong_hz@163.com)
 */

'use strict';

import Component from '../base/component.js';
import template from './list.html';
import InstanceService from '../../service/instance.js';

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
        InstanceService.get()
            .then(instance => {
                this.data.list = instance;
                this.$update();
            });
    }
});

export default List;
