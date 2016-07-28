/**
 * Component    基础组件体系基类
 * @author      sensen
 *              capasky
 */


'use strict';

import Regular from "regularjs";
import filter from "./filter.js";
import directive from './directive.js';

/**
 * 基础组件体系基类
 * @remark
 * 对于非模板中初始化的引入组件，需在使用new初始化引入组件后，使用
 * <code>
 *  this._coms.push(com);
 * </code>
 * 将引入组件加入引入组件列表，以便在销毁时一并销毁
 */
let Component = Regular.extend({
    /**
     * @override
     */
    init: function() {
        /**
         * @private
         * @property    _coms   内部使用组件数组，用于集中销毁
         */
        this._coms = [];
        this.$on('$destroy', function destroyComs() {
            if (this._coms && this._coms.length) {
                this._coms.forEach(function(com) {
                    com.destroy && com.destroy.call(com);
                });
            }
            this._coms = [];
        }.bind(this));
        this.supr();
    }
})
.filter(filter)
.directive(directive);

export default Component;
