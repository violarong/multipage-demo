/**
 * 基础组件体系基类Component过滤器定义
 * @author      sensen
 *              capasky
 */

'use strict';

import moment from 'moment';

export default {
    /**
     * format   格式化日期数据
     * @param   {Date|String}      value   输入日期，日期对象或日期字符串
     * @param   {String}    format  日期格式
     * @example
     * 以下代码：
     * <code>
     *  <span>{date|format:"yyyy-MM-dd"}</span>
     * </code>
     * 可能的输出为
     * <code>
     *  <span>2015-06-06</span>
     * </code>
     */
    format(value, format){
        return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss');
    }
};
