import Utils from './utils/utils'
const ChartsModel = {};
ChartsModel.install = function(Vue, options) {

    console.log("", options)
    if (options && options.theme) {

    }
    //基础组件
    var getBaseComponents = require.context("./charts", true, /\.vue$/);
    getBaseComponents.keys().forEach((path) => {
            let component = getBaseComponents(path).default;
            Vue.component(component.name, component);
        })
        //框架组件
    var getGridComponents = require.context("./grid", true, /\.vue$/);
    getGridComponents.keys().forEach((path) => {
            let component = getGridComponents(path).default;
            Vue.component(component.name, component);
        })
        //通用组件
    var getCommonComponents = require.context("./common", true, /\.vue$/);
    getCommonComponents.keys().forEach((path) => {
        let component = getCommonComponents(path).default;
        Vue.component(component.name, component);
    })
    Vue.mixin({
        created: function() {
            // 逻辑...
        }
    })

    Vue.component('charts-model-list', {
        functional: true,
        props: {
            componentArr: {
                type: Function
            },
            components: {
                type: Array
            }
        },
        render: function(createElement, context) {
            // console.log("context=", context);
            //这里让传入的componentArr是函数，执行结果返回数组，避开不能直接传Observer观察对象问题
            var componentArr = "";
            if (context.props.componentArr) {
                componentArr = context.props.componentArr();
            }

            var components = context.props.components;
            if (components) {
                componentArr = Utils.deepClone(components);
            }

            /**
             * 如果存在data.__ob__，说明data是被Observer观察的数据
             * 不能用作虚拟节点的data
             * 需要抛出警告，并返回一个空节点
             *
             * 被监控的data不能被用作vnode渲染的数据的原因是：
             * data在vnode渲染过程中可能会被改变，这样会触发监控，导致不符合预期的操作
             * Avoid using observed data object as vnode data:
             * Always create fresh vnode data objects in each render!
             */
            // console.info("getElements=", getElements(createElement, componentArr))
            return createElement('div', {
                    style: {
                        // height: "100vh",
                        // overflowY: "auto",
                        // width: "100vw",
                        // overflowX: "hidden"
                    }
                },
                getElements(createElement, componentArr)
            )
        }
    })

    function getElements(createElement, el) {
        if (el && el.constructor === Object) {
            return createElement(el.name, el, el.children ? getElements(createElement, el.children) : el.slot)
        } else if (el && Array.isArray(el) && el.length > 0) {
            return el.map((item) => {
                return getElements(createElement, item)
            })
        } else {
            return el;
        }
    }

    Vue.directive('move', {
        //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        bind: function(el, binding, vnode, oldVnode) {

        },
        //所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
        //binding：一个对象，包含以下 property：
        // name：指令名，不包括 v- 前缀。
        // value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
        // oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
        // expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
        // arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
        // modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
        update: function(el, binding, vnode, oldVnode) {
            if (binding.value.show === true) {
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        },
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function(el, binding, vnode, oldVnode) {

        }
    })
}
export default ChartsModel;