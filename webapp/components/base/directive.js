/**
 * 基础组件体系基类Component辅助指令定义
 * @author      capasky(hzyangzhouzhi@corp.netease.com)
 */

 'use strict';

import { dom } from 'regularjs';

export default {
    /**
     * z-crt    根据表达式的求值给目标DOM节点添加或移除css类 `z-crt`
     * @example
     * <li z-crt={this.$state.current.name==='app.test.exam.choice'}>
     */
    "z-crt"(elem, value) {
        this.$watch(value, function(val) {
            dom[val ? 'addClass' : 'delClass'](elem, 'z-crt');
        });
    },
    /**
     * r-attr   属性Directive
     * @example
     * <img r-attr={{"title": title, "alt": title}}>
     */
    "r-attr"(elem, value) {
        this.$watch(value, function(nvalue) {
            for (var i in nvalue)
                if (nvalue.hasOwnProperty(i)) {
                    dom.attr(elem, i, nvalue[i]);
                }
        }, true);
    },
    /**
     * r-scroll 滚动到元素
     * @example
     * <code>
     *  <tr r-scroll={item.selected}><td>XXX</td></tr>
     * </code>
     */
    "r-scroll"(elem, value) {
        this.$watch(value, function(newValue) {
            if(newValue && elem) {
                elem.scrollIntoViewIfNeeded
                    ? elem.scrollIntoViewIfNeeded(true)
                    : elem.scrollIntoView({block: "end", behavior: "smooth"});
            }
        });
    },
    /**
     * r-attr-b 针对布尔型属性提供的Directive，如 checked、disabled
     * @example
     * <code>
     * <input type="checkbox" r-attr-b={{"checked": this._checked}} />
     * </code>
     */
    "r-attr-b"(elem, value) {
        this.$watch(value, function(nvalue) {
            for (var i in nvalue)
                if (nvalue.hasOwnProperty(i)) {
                    var ha = elem.hasAttribute(i);
                    if (ha && nvalue[i] === false) {
                        elem.removeAttribute(i);
                    }
                    if (!ha && nvalue[i] === true) {
                        dom.attr(elem, i, nvalue[i]);
                    }
                }
        }, true);
    },
    "z-disabled"(elem, value) {
        this.$watch(value, nv => {
            !!nv ? dom.attr(elem, 'disabled', "disabled") : elem.removeAttribute('disabled');
        });
    }
};
