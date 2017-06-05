# 树

## 示例
- 方法一
````html
<div class="tree-wrap">
    <div class="test_tree1">
    </div>
</div>
````

````js
var testTree1 = xTree({
    dom: $('.test_tree1'),
    only_child: false,
    is_multi: true,
    is_trigger: false,
    node_merge: false,
    has_search: false,
    sel_ids: '2,3,11,12,13',
    expand: 3,
    data: [
        {id: 1, name: '中国', nodeId: 0, is_node: true, is_check: false},
        {id: 2, name: '四川', nodeId: 1, is_node: true, is_check: false},
        {id: 3, name: '云南', nodeId: 1, is_node: true, is_check: false},
        {id: 4, name: '贵州', nodeId: 1, is_node: true, is_check: false},
        {id: 5, name: '广西', nodeId: 1, is_node: true, is_check: false},
        {id: 6, name: '成都', nodeId: 2, is_node: false, is_check: false},
        {id: 7, name: '泸州', nodeId: 2, is_node: true, is_check: false},
        {id: 8, name: '昆明', nodeId: 3, is_node: false, is_check: false},
        {id: 9, name: '大理', nodeId: 3, is_node: false, is_check: false},
        {id: 10, name: '贵阳', nodeId: 4, is_node: false, is_check: false},
        {id: 11, name: '遵义', nodeId: 4, is_node: false, is_check: false},
        {id: 12, name: '南宁', nodeId: 5, is_node: false, is_check: false},
        {id: 13, name: '桂林', nodeId: 5, is_node: false, is_check: false},

        {id: 26, name: '成都', nodeId: 7, is_node: false, is_check: false},
        {id: 27, name: '泸州', nodeId: 7, is_node: false, is_check: false},
        {id: 28, name: '昆明', nodeId: 7, is_node: false, is_check: false},
        {id: 29, name: '大理', nodeId: 7, is_node: true, is_check: false},
        {id: 30, name: '贵阳', nodeId: 29, is_node: false, is_check: false},
        {id: 31, name: '遵义', nodeId: 29, is_node: false, is_check: false},
        {id: 32, name: '南宁', nodeId: 29, is_node: false, is_check: false},
        {id: 33, name: '桂林', nodeId: 29, is_node: false, is_check: false}
    ],
    //        choose:{
    //            nodeId:[1],
    //            id:[1]
    //        },
    onInit: function () {
    },
    onOpen: function () {
    },
    onBeforeOpen: function () {
    },
    onClose: function (hasChange) {
        console.log(testTree1.getId());
    },
    onCheck: function (item, dom, childrenItem) {
//            console.log(this);
//            console.log(this.getId());
//            console.log(testTree1);
//            应该是  this.getId()比较规范  还是 testTree1.getId()比较规范   this可以做到 只暴漏该暴漏的方法
    },
    onCancel: function (item, dom, childrenItem) {
    }
});
````

- 方法二, 示例一
````html
<div class="tree-wrap">
    <div class="test_tree2">
        <input  placeholder="">
    </div>
</div>
````


````js
var testTree2 = xTree({
    dom: $('.test_tree2'),
    only_child: false,
    is_multi: true,
    is_trigger: true,
    node_merge: false,
    has_search: true,
    expand: 3,
    data: [
        {id: 1, name: '行政部', nodeId: 0, is_node: true, is_check: false},
        {id: 3, name: '财务部', nodeId: 1, is_node: true, is_check: false},
        {id: 8, name: '财务部2', nodeId: 3, is_node: true, is_check: false},
        {id: 5, name: '李职员', nodeId: 8, is_node: false, is_check: false},
        {id: 6, name: '孙职员', nodeId: 8, is_node: false, is_check: false},
        {id: 2, name: '张部长', nodeId: 1, is_node: false, is_check: false},
        {id: 4, name: '刘职员', nodeId: 3, is_node: false, is_check: false},
        {id: 1, name: '王经理', nodeId: 0, is_node: false, is_check: false}
    ],
    //        choose:{
    //            nodeId:[1],
    //            id:[1]
    //        },
    onInit: function () {
    },
    onOpen: function () {
    },
    onBeforeOpen: function () {
    },
    onClose: function (hasChange) {
        console.log(testTree2.getId());
        console.log(testTree2._makeSearch);
    },
    onCheck: function (item, dom, childrenItem) {
//            console.log(this);
//            console.log(this.getId());
//            console.log(testTree);
//            应该是  this.getId()比较规范  还是 testTree.getId()比较规范   this可以做到 只暴漏该暴漏的方法
    },
    onCancel: function (item, dom, childrenItem) {
    },
    onChange: function () {
        testTree2.dom.val(testTree2.getName());
    }
});
````

- 方法二, 示例二
````html
<div class="tree-wrap">
    <div class="test_tree3">
        <input  placeholder="">
    </div>
</div>
````

````js
var testTree3 = xTree({
    dom: $('.test_tree3'),
    only_child: false,
    is_multi: true,
    is_trigger: true,
    node_merge: false,
    has_search: true,
    sel_ids: '2,3,11,12,13',
    expand: 3,
    data: [
        {id: 1, name: '中国', nodeId: 0, is_node: true, is_check: false},
        {id: 2, name: '四川', nodeId: 1, is_node: true, is_check: false},
        {id: 3, name: '云南', nodeId: 1, is_node: true, is_check: false},
        {id: 4, name: '贵州', nodeId: 1, is_node: true, is_check: false},
        {id: 5, name: '广西', nodeId: 1, is_node: true, is_check: false},
        {id: 6, name: '成都', nodeId: 2, is_node: false, is_check: false},
        {id: 7, name: '泸州', nodeId: 2, is_node: true, is_check: false},
        {id: 8, name: '昆明', nodeId: 3, is_node: false, is_check: false},
        {id: 9, name: '大理', nodeId: 3, is_node: false, is_check: false},
        {id: 10, name: '贵阳', nodeId: 4, is_node: false, is_check: false},
        {id: 11, name: '遵义', nodeId: 4, is_node: false, is_check: false},
        {id: 12, name: '南宁', nodeId: 5, is_node: false, is_check: false},
        {id: 13, name: '桂林', nodeId: 5, is_node: false, is_check: false},

        {id: 26, name: '成都', nodeId: 7, is_node: false, is_check: false},
        {id: 27, name: '泸州', nodeId: 7, is_node: false, is_check: false},
        {id: 28, name: '昆明', nodeId: 7, is_node: false, is_check: false},
        {id: 29, name: '大理', nodeId: 7, is_node: true, is_check: false},
        {id: 30, name: '贵阳', nodeId: 29, is_node: false, is_check: false},
        {id: 31, name: '遵义', nodeId: 29, is_node: false, is_check: false},
        {id: 32, name: '南宁', nodeId: 29, is_node: false, is_check: false},
        {id: 33, name: '桂林', nodeId: 29, is_node: false, is_check: false}
    ],
    //        choose:{
    //            nodeId:[1],
    //            id:[1]
    //        },
    onInit: function () {
    },
    onOpen: function () {
    },
    onBeforeOpen: function () {
    },
    onClose: function (hasChange) {
        console.log(testTree3.getId());
        console.log(testTree3._makeSearch);
    },
    onCheck: function (item, dom, childrenItem) {
//            console.log(this);
//            console.log(this.getId());
//            console.log(testTree);
//            应该是  this.getId()比较规范  还是 testTree.getId()比较规范   this可以做到 只暴漏该暴漏的方法
    },
    onCancel: function (item, dom, childrenItem) {
    },
    onChange: function () {
        testTree3.dom.val(testTree3.getName());
    }
});
````

## API
````html
<table class="x-table x-table-interval">
    <thead>
    <tr>
        <th>属性</th>
        <th>类型</th>
        <th>说明</th>
        <th>默认值</th>
        <th>示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>is_trigger</td>
        <td>Boolean</td>
        <td>是否需要触发？否则直接显示</td>
        <td>false</td>
        <td></td>
    </tr>
    <tr>
        <td>has_search</td>
        <td>Boolean</td>
        <td>是否需要搜索功能</td>
        <td>false</td>
        <td></td>
    </tr>
    <tr>
        <td>only_child</td>
        <td>Boolean</td>
        <td>搜索结果是否只要叶子</td>
        <td>true</td>
        <td></td>
    </tr>
    <tr>
        <td>node_merge</td>
        <td>Boolean</td>
        <td>是否需要合并结果</td>
        <td>true</td>
        <td></td>
    </tr>
    <tr>
        <td>zIndex</td>
        <td>Number</td>
        <td>tree在视图中的层级</td>
        <td>1</td>
        <td></td>
    </tr>
    <tr>
        <td>choose</td>
        <td>Boolean或Object</td>
        <td>哪些是选中的？优先级高于data</td>
        <td>false</td>
        <td>{nodeId:[1,2,3],id:[1,2,3]}</td>
    </tr>
    <tr>
        <td>is_node_first</td>
        <td>Boolean</td>
        <td>是否需要Node排在前面 否则按照data的顺序</td>
        <td>false</td>
        <td></td>
    </tr>
    <tr>
        <td>is_multi</td>
        <td>Boolean</td>
        <td>是否多选</td>
        <td>true</td>
        <td></td>
    </tr>
    <tr>
        <td>expand</td>
        <td>Boolean或者Number</td>
        <td>是否展开，展开几层？</td>
        <td>false</td>
        <td></td>
    </tr>
    <tr>
        <td>width</td>
        <td>null或者Number</td>
        <td>tree的宽度</td>
        <td>null</td>
        <td></td>
    </tr>
    <tr>
        <td>maxHeight</td>
        <td>null或者Number</td>
        <td>tree的最大高度</td>
        <td>null</td>
        <td></td>
    </tr>
    <tr>
        <td>data</td>
        <td>Array</td>
        <td>数据，用来构建tree.</td>
        <td>[]</td>
        <td>[{id: 1, name: '王经理', nodeId: 0, is_node: false, is_check: false}]</td>
    </tr>
    <tr>
        <td>data[0].id</td>
        <td>Number</td>
        <td>item的ID</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>data[0].name</td>
        <td>String</td>
        <td>item的名字</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>data[0].nodeId</td>
        <td>Number</td>
        <td>item的父节点ID</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>data[0].is_node</td>
        <td>Boolean</td>
        <td>表示是否是节点</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>data[0].is_check</td>
        <td>Boolean</td>
        <td>表示item是否被选中</td>
        <td>无</td>
        <td></td>
    </tr>
    </tbody>
</table>
<table class="x-table x-table-interval">
    <thead>
    <tr>
        <th>事件</th>
        <th>触发</th>
        <th>默认函数</th>
        <th>示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>onInit</td>
        <td>数据初始化时触发</td>
        <td>function () {}</td>
        <td></td>
    </tr>
    <tr>
        <td>onBeforeOpen</td>
        <td>tree打开之前触发</td>
        <td>function () {}</td>
        <td></td>
    </tr>
    <tr>
        <td>onOpen</td>
        <td>tree打开之后触发</td>
        <td>function () {}</td>
        <td></td>
    </tr>
    <tr>
        <td>onClose</td>
        <td>tree关闭时触发</td>
        <td>function () {}</td>
        <td></td>
    </tr>
    <tr>
        <td>onCheck</td>
        <td>选中item时触发</td>
        <td>function () {}</td>
        <td></td>
    </tr>
    <tr>
        <td>onCancel</td>
        <td>取消选中item时触发</td>
        <td>function () {}</td>
        <td></td>
    </tr>
    </tbody>
</table>
<table class="x-table x-table-interval">
    <thead>
    <tr>
        <th>方法</th>
        <th>功能</th>
        <th>参数类型</th>
        <th>返回值</th>
        <th>示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>start()</td>
        <td>开始构建tree</td>
        <td>无</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>end()</td>
        <td>移除tree</td>
        <td>无</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>getItem()</td>
        <td>获取被选中的(checked)的item</td>
        <td>无</td>
        <td>返回Array,数组元素为Object</td>
        <td></td>
    </tr>
    <tr>
        <td>getId()</td>
        <td>获取被选中的(checked)item的ID</td>
        <td>无</td>
        <td>返回Object,Obj.id为叶子的id数组,Obj.nodeId为节点id数组</td>
        <td></td>
    </tr>
    <tr>
        <td>getName()</td>
        <td>获取被选中的(checked)item的Name</td>
        <td>无</td>
        <td>返回Array,数组元素为String</td>
        <td></td>
    </tr>
    <tr>
        <td>cancelAll()</td>
        <td>取消所有item</td>
        <td>无</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>cancelItem(id, type)</td>
        <td>取消item,id是item的id,type是item的类型(true是节点,false是叶子)</td>
        <td>Number, Boolean</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>checkAll()</td>
        <td>选中所有item</td>
        <td>无</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>checkItem(id, type)</td>
        <td>选中item,id是item的id,type是item的类型(true是节点,false是叶子)</td>
        <td>Number, Boolean</td>
        <td>无</td>
        <td></td>
    </tr>
    <tr>
        <td>search(value)</td>
        <td>在tree中搜索包含value的item</td>
        <td>String</td>
        <td>无</td>
        <td></td>
    </tr>
    </tbody>
</table>
````