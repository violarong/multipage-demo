/**
 * 实例列表
 * @author  violarong(xiaorong_hz@163.com)
 */

'use strict';

import { post } from '../components/base/jsonFetch.js';

const InstanceService = {
    /**
     * 获取实例列表
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    get(id) {
        return post('/call/instance/getList').then(instance => {
            return instance;
        });
    }
}

export default InstanceService;
