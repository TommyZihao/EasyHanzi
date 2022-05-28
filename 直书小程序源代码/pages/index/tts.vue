<template>
	<view>
		<view class="cu-form-group align-start">
			<view class="title">{{ i18n.tts.chinese }}</view>
			<textarea maxlength="-1" @input="sourceTextInput" :placeholder="i18n.tts.pleaseInputChinese"></textarea>
		</view>
		<view class="action-area flex justify-around margin-top">
			<button class="cu-btn lg" :class="isPlaying ? 'line-grey' : 'line-green'" :disabled="sourceText === ''" @click="tts()"><text :class="isPlaying?'cuIcon-stop':'cuIcon-playfill'" :disabled="isPlaying"></text>{{ i18n.playAudio}}</button>
		</view>
	</view>
</template>

<script>
	const audioManager = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				sourceText: '',
				ttsFileID: '',
				isPlaying: false
			};
		},
		onLoad() {
			const that = this;
			audioManager.onPlay(() => {
				that.isPlaying = true
			})
			audioManager.onEnded(() => {
				that.isPlaying = false
			})
			audioManager.onCanplay(() => {
				audioManager.play()
			})
		},
		methods: {
			sourceTextInput(e) {
				this.sourceText = e.detail.value
			},
			tts() {
				const that = this
				uni.showLoading({
					title: '合成中'
				})
				wx.cloud.callFunction({
					name: 'mlkit',
					data: {
						api: 'tts',
						params: that.sourceText
					},
					success: res => {
						console.log('tts res: ', res);
						that.ttsFileID = res.result;
						audioManager.src = res.result;
						uni.hideLoading();
						audioManager.seek(0)
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
				title: this.i18n.pageTitle.tts,
				path: '/pages/index/tts',
				imageUrl: 'https://pic.superbed.cn/item/5dea8fcaf1f6f81c501ca356.png'
			};
		}
	}
</script>

<style>
	
</style>