import Vue from 'vue'
import App from './App'

wx.cloud.init({
    traceUser: true,
    env: 'tommytju-ges0k'
});

// 导入 hanzi-writer
import hanziWriter from './lib/hanzi-writer/hanzi-writer.vue'
Vue.component('hanzi-writer', hanziWriter)
import clickLink from './components/clickLink.vue';
Vue.component('click-link', clickLink)
import centerImg from './components/centerImg.vue';
Vue.component('center-img', centerImg)
import textView from './components/textView.vue';
Vue.component('text-view', textView)
import textTitle from './components/textTitle.vue';
Vue.component('text-title', textTitle)
import selectWord from './components/selectWord.vue';
Vue.component('select-word', selectWord)

// 导入简繁转化库
import {
  convert
} from './lib/convertSimpleTraditionCN/index.js'
Vue.prototype.convert = convert;

// 导入 vue-i18n多语言库
import VueI18n from 'vue-i18n'
import locale from 'locale.json'
Vue.use(VueI18n)
const i18n = new VueI18n(locale)
Vue.prototype._i18n = i18n

Vue.config.productionTip = false
App.mpType = 'app'

// 导入全局mixin方法
import { globalMixins } from './mixin.js'
Vue.mixin(globalMixins)

const app = new Vue({
  i18n,
  ...App
})
app.$mount()
