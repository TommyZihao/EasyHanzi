<template>
	<view>
		<view class="cu-form-group align-start">
			<view class="title">{{ i18n.translate.english }}</view>
			<textarea maxlength="-1" @input="sourceTextInput" :placeholder="i18n.translate.pleaseInputEnglish"></textarea>
		</view>
		<view class="action-area flex justify-around margin-top">
			<button class="cu-btn bg-blue lg" :disabled="sourceText === ''" @click="translate()">{{ i18n.translate.translateToChinese }}</button>
		</view>
		<!-- 选择文字 -->
		<select-word ref="wordModal" :text="translatedResult"></select-word>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sourceText: '',
				translatedResult: '',
			};
		},
		methods: {
			sourceTextInput(e) {
				this.sourceText = e.detail.value
			},
			translate() {
				const that = this;
				uni.showLoading({
					title: '翻译中'
				})
				wx.cloud.callFunction({
					name: 'mlkit',
					data: {
						api: 'translate',
						params: that.sourceText
					},
					success: res => {
						console.log('translate res: ', res);
						that.translatedResult = res.result
						uni.hideLoading();
						that.$refs.wordModal._showModal();
					},
					fail: error => {
						uni.hideLoading();
						console.error(error);
					}
				})
			},
		},
		onShareAppMessage() {
			return {
				title: this.i18n.pageTitle.translate,
				path: '/pages/index/translate',
				imageUrl: 'https://pic.superbed.cn/item/5dea8fcaf1f6f81c501ca356.png'
			};
		}
	}
</script>

<style>
</style>
