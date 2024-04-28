
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "@/router";
import store from "./store";
import print from 'vue3-print-nb'
import "szd-client-web/client/common/utils/permission.js"
import installDependency from 'szd-client-web/index.js'
//乾坤
import actions from 'szd-client-web/client/common/utils/qiankunActions.js'
import './public-path'
let app=null;

// 挂载应用
function render(props = {}) {
    const {
        container
    } = props;
    app = createApp(App);
    installDependency(app)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }
    app.use(print);
    app.use(store);
    app.use(router);
    app.use(ElementPlus, {
        locale: zhCn,
        size: "small",
    });
    app.mount(container ? container.querySelector('#app') : '#app');
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}
// qiankun的生命周期
export async function bootstrap() {}
export async function mount(props) {
    actions.setActions(props)
    render(props)
}
export async function unmount() {
    app.unmount();
    app=null;
}



