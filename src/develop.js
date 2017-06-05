/**
 * Created by fizz on 2017/2/6.
 * @output develop entry.
 */
// 开启热更新
if(module.hot) {
  module.hot.accept();
}

require('./common/styles/index.scss');
require('./fizz.js');
require('./jcc.js');
require('./duansijia.js');
require('./mmf.js');
require('./zq.js');



