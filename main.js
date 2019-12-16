import Vue from 'vue'
import App from './App'

// 导入 hanzi-writer
import hanziWriter from './lib/hanzi-writer/hanzi-writer.vue'
Vue.component('hanzi-writer', hanziWriter)

// 导入简繁转化库
import {
  convert
} from './lib/convertSimpleTraditionCN/index.js'
Vue.prototype.convert = convert;

// 导入 vue-i18n多语言库
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': {
      index: {
        appTitle: '学写汉字',
        changeLang: '切换语言',
        aboutUs: '关于我们',
        updateText: '更新文字',
        animation: '动画',
        traditional: '繁体',
        simplified: '简体',
        quiz: '我来写',
        changeSample: '点击下列图片切换示例文字'
      }
    },
    'zh-TW': {
      index: {
        appTitle: '學寫漢字',
        changeLang: '切換語言',
        aboutUs: '關於我們',
        updateText: '更新文字',
        animation: '動畫',
        traditional: '繁體',
        simplified: '簡體',
        quiz: '我來寫',
        changeSample: '點擊下列圖片切換示例文字'
      }
    },
    'en-US': {
      index: {
        appTitle: 'Easy Hanzi',
        changeLang: 'Change Language',
        aboutUs: 'About Us',
        updateText: 'Update Text',
        animation: 'Animation',
        traditional: 'Traditional',
        simplified: 'Simplified',
        quiz: 'Write Myself',
        changeSample: 'Switch the sample text'
      }
    },
  }
})

Vue.prototype._i18n = i18n

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  i18n,
  ...App
})
app.$mount()
