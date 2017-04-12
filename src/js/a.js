import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../css/common.css'

import oFrame from '../components/o-frame.vue'

Vue.use(ElementUI);
new Vue({
    el: '#app',
    components: {ElementUI, oFrame}
});

