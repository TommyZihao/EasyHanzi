<template>
	<view class="cu-list menu">
		<!-- 应用菜单 -->
		<view class="cu-list grid col-3 no-border margin-bottom">
			<view class="cu-item"  v-for="(item,index) in appList" :key="index" @click="navTo(item.page)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<!-- 切换语言 -->
		<view class="cu-item arrow text-blue">
			<view class="content">Language</view>
			<picker class="action" mode="selector" range-key="name" @change="changeLang" :value="locale"
				:range="localeList">
				<view class="picker">{{ locale > -1 ? localeList[locale].name : '' }}</view>
			</picker>
		</view>
		<!-- 关于我们 -->
		<view class="cu-item arrow text-blue" @click="navTo('../about/about')">
			<view class="content">
				<text>{{ i18n.pageTitle.about }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				locale: 0,
				localeList: [{
						name: '中文（简体）',
						code: 'zh-CN'
					},
					{
						name: '中文（繁體）',
						code: 'zh-TW'
					},
					{
						name: 'English',
						code: 'en-US'
					}
				],
			}
		},
		computed: {
			appList(){
				return [{
					cuIcon: 'list',
					color: 'red',
					badge: 120,
					name: this.i18n.pageTitle.example,
					page: 'example',
				}, {
					cuIcon: 'camerafill',
					color: 'orange',
					badge: 1,
					name: this.i18n.pageTitle.ocr,
					page: 'ocr',
				}, {
					cuIcon: 'global',
					color: 'yellow',
					badge: 0,
					name: this.i18n.pageTitle.translate,
					page: 'translate',
				}, {
					cuIcon: 'text',
					color: 'olive',
					badge: 22,
					name: this.i18n.pageTitle.tts,
					page: 'tts',
				}, {
					cuIcon: 'voicefill',
					color: 'cyan',
					badge: 0,
					name: this.i18n.pageTitle.asr,
					page: 'asr',
				}]
			}
		},
		onLoad() {
			const locale = uni.getStorageSync('locale') || 0;
			this.locale = locale
			this._i18n.locale = this.localeList[locale].code;
			uni.setNavigationBarTitle({
				title: this.i18n.pageTitle.index
			});
		},
		methods: {
			devTips(){
				uni.showToast({
					title: '功能开发中',
					icon: 'none'
				})
			},
			changeLang(e) {
				this.locale = e.detail.value;
				uni.setStorageSync('locale', e.detail.value);
				this._i18n.locale = this.localeList[this.locale].code;
				uni.setNavigationBarTitle({
					title: this.i18n.pageTitle.index
				});
			},
		},
		onShareAppMessage() {
			return {
				title: this.i18n.pageTitle.index,
				path: '/pages/index/index',
				imageUrl: 'https://pic.superbed.cn/item/5dea8fcaf1f6f81c501ca356.png'
			};
		}
	}
</script>

<style>

</style>
