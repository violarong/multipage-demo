/**
 * 列表模块
 * @author  violarong(xiaorong_hz@163.com)
 */

'use strict';

import List from '../components/specific/list.js';
import CountUp from '../components/common/countUp.js';

let list = new List();
let node = document.getElementById('modelTest');
if(!!node){
    list.$inject(document.getElementById('modelTest'));
}

//技术区域，数字跳动控件
var _eCountUps = document.getElementsByClassName('j-countup');
var _countUpArr = [new CountUp({
  data:{
    start:0,
    end:15
  }
}).$inject(_eCountUps[0]),
new CountUp({
  data:{
    start:0,
    end:100
  }
}).$inject(_eCountUps[1]),
new CountUp({
  data:{
    start:0,
    end:95
  }
}).$inject(_eCountUps[2])];

_countUpArr[0].onStart();
_countUpArr[1].onStart();
_countUpArr[2].onStart();

var test;
