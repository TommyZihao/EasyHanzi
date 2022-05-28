<template>
  <view>
    <view class="padding bg-white flex justify-center margin-bottom" style="text-align: justify;">
      <view class="title padding bg-white shadow-warp flex text-bold" style="text-align: justify;">直书: 基于华为ML Kit人工智能API的趣学汉字小程序</view>
    </view>

    <text-title>直书—即查即用的AI学汉字小程序</text-title>
    <text-view>
      基于华为ML Kit人工智能API的趣学汉字小程序“直书”。
      搭载拍照识别、语音识别、AI翻译、语音生成等人工智能黑科技，外国人也可轻松上手，即查即用，一站式掌握汉字音、形、写、义。
      “直书”提供各国语言的微信小程序、华为快应用、网页、手机APP、平板APP。
      讲好中国故事，提升文化自信，助力全球二十亿汉语学习者。
      项目主页：<click-link href="https://github.com/TommyZihao/EasyHanzi">https://github.com/TommyZihao/EasyHanzi</click-link>
    </text-view>

    <text-title>支持平台</text-title>
    <text-view>
      <center-img src="https://pic.imgdb.cn/item/628216ee0947543129bb31a1.png"></center-img>
      不需安装，扫码即开，打开即用，用完即走，跨平台兼容，充分体现互联网产品轻量化、智能化、云计算的用户交互特点。
      支持常见九千个简体、繁体字。
    </text-view>

    <text-title>用户群体：十五亿汉语文化圈</text-title>
    <text-view>
      - 中国大陆中小学校
      - 图书馆、博物馆等科普机构
      - 书法与国学爱好者
      - 港澳台地区学习繁体字、推广简体字
      - 在华留学生
	  - “一带一路”沿线汉语学习者
      - 全球孔子学院
	  - 全球汉语文化圈
    </text-view>

    <text-title>功能说明</text-title>
    <text-view>
      - 笔顺动画演示
      - 交互式摹写与临写。
      - 简繁体转换
      - AI智能拍照识字：方便不会使用汉语拼音和输入法的朋友。基于华为ML Kit OCR文字识别API。
      - 机器翻译：输入英文，生成对应汉语。基于华为ML Kit 机器翻译API。
      - 文本转语音：输入汉字文本，生成朗读语音。基于华为ML Kit语音合成接口。
      - 语音识别：开启麦克风输入语音，识别对应的汉语。基于华为ML Kit语音识别接口。
    </text-view>

    <text-title>愿景：讲好中国故事，树立文化自信</text-title>
    <text-view>
      随着中国改革开放的迅速崛起，来华留学生数量逐年增加，各类汉语诗词国学综艺节目广受好评，海外孔子学院全球推广，全球汉语教育呈现火热趋势。
      世界上使用汉语的人数至少15亿 ，超过世界人口的五分之一。汉语是中国官方语言，也是新加坡、联合国工作语言之一。
      2016年时，英当局耗资近8700万人民币投入到了在公立学校推进汉语教学的计划中。
      早在十年前，日本就有630家大学开设了中文课程，而汉语学习的人数则超200万人，学习汉语已经成为日本学生必备的一项课程。汉语也是日本除了英语外的第二大外语。
      汉语也是全世界公认最难学的语言之一。
      俗话说：“人生聪明写字始”。掌握好笔顺是写字的基本功，也是学习汉语的第一关。
      然而，汉字数量繁杂、笔画各异，不易记忆，难倒了众多汉语初学者。很多学习汉语多年的在华留学生，虽然说着流利的汉语，却提笔难言。
      甚至有些土生土长的中国人，写字的笔顺也是错误的。
      例如：
      “匕”应该先写撇，后写竖弯钩。
      “火”应该先写上面两笔，即点和撇，再写人字。
      港澳台同胞不写简体字，然而我们同样也不会写繁体字，十九大报告指出，实现祖国完全统一。简繁体汉字在无形中形成一道文化的隔膜，阻碍了文化认同和文化自信。 所以，我们为小程序增加了简繁体两个界面。
      既方便港澳台同胞学习简体字，也方便内地的书法爱好者，国学爱好者学习繁体字，繁体字其实有更复杂的笔画，查字典是效率最低的方式，我们的小程序就是不二之选。
      <center-img src="https://pic3.superbed.cn/item/5df49947a4fbc8614a4a571f.jpg"></center-img>
    </text-view>
    
    <text-title>开发团队：在华留学生+全栈工程师</text-title>
    <text-view>
      产品经理：同济子豪兄
      前端开发、UI设计、全栈开发：Maxoyed
      用户交互优化、法语界面：Itoua Prince Igor（刚果布留学生）
      PPT设计：向凤麟、郑雨涵
    </text-view>
    
    <text-title>参考资料</text-title>
    <text-view>
	  华为 ML Kit开发者文档:<br/><click-link href="https://developer.huawei.com/consumer/cn/hms/huawei-locationkit">https://developer.huawei.com/consumer/cn/hms/huawei-locationkit</click-link>
      Javascript 免费开源库  Hanzi Writer  
      文档：<br/>
      <click-link href="https://chanind.github.io/hanzi-writer/cn/docs.html">https://chanind.github.io/hanzi-writer/cn/docs.html</click-link>
      Github开源地址：<br/>
      <click-link href="https://github.com/chanind/hanzi-writer">https://github.com/chanind/hanzi-writer</click-link>
      <br/>
      作者：
       <click-link href="https://github.com/chanind">https://github.com/chanind</click-link><br/>
      汉字数据来自 <click-link href="https://github.com/skishore/makemeahanzi">Me a Hanzi 项目</click-link>, 提供 9000 +常用简体字和繁体字。
      Hanzi Writer 库仅仅 30 kb （压缩后仅 9kb!）, 所以添加它不会使网页体积增大。 
      Hanzi Writer 使用 javascript, HTML5 and SVG, 所以它能嵌入到任何平台，包括 iOS 、安卓、桌面端应用和网页、微信小程序。
    </text-view>
  </view>
</template>

<script>
export default {
  onShareAppMessage() {
  	return {
  		title: `${this.i18n.pageTitle.about} | ${this.i18n.pageTitle.index}`,
  		path: '/pages/about/about',
  		imageUrl: 'https://pic.superbed.cn/item/5dea8fcaf1f6f81c501ca356.png'
  	};
  }
};
</script>

<style></style>
