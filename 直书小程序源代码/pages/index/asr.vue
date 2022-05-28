<template>
	<view>
		<view class="action-area flex justify-around margin-top">
			<button class="cu-btn bg-green" :disabled="!isPermissionAuthorize || isRecording"
				@click="startRecord()">{{ i18n.asr.startRecord }}</button>
			<button class="cu-btn bg-red" :disabled="!isPermissionAuthorize || !isRecording"
				@click="endRecord()">{{ i18n.asr.endRecord }}</button>
			<button class="cu-btn bg-blue" :disabled="!isPermissionAuthorize || voicePath === ''"
				@click="playAudio()">{{ i18n.asr.playAudio }}</button>
			<button class="cu-btn bg-blue" :disabled="!isPermissionAuthorize || voicePath === ''"
				@click="recognizeText()">{{ i18n.asr.recognizeText }}</button>
		</view>
		<!-- 选择文字 -->
		<select-word ref="wordModal" :text="asrRes"></select-word>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				isPermissionAuthorize: false,
				voicePath: '',
				isRecording: false,
				asrRes: '',
			}
		},
		async onLoad() {
			const self = this;
			const [err, appSetting] = await uni.getSetting();
			if (!('scope.record' in appSetting.authSetting)) {
				uni.authorize({
					scope: 'scope.record',
					success() {
						self.isPermissionAuthorize = true
					}
				})
			} else {
				self.isPermissionAuthorize = true
			}
			recorderManager.onStop(function(res) {
				console.log('recorder stop' + JSON.stringify(res));
				self.voicePath = res.tempFilePath;
			});
		},
		methods: {
			startRecord() {
				console.log('开始录音');
				this.voicePath = '';
				this.isRecording = true
				recorderManager.start({
					duration: 60000,
					sampleRate: 16000,
					numberOfChannels: 1,
					format: 'aac'
				});
			},
			endRecord() {
				console.log('录音结束');
				this.isRecording = false
				recorderManager.stop();
			},
			playAudio() {
				console.log('播放录音');

				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					console.log(this.voicePath)
					innerAudioContext.play();
				}
			},
			asr(fileID){
				const self = this
				uni.showLoading({
					title: this.i18n.recognizing,
					mask: true
				});
				wx.cloud.callFunction({
					name: 'mlkit',
					data: {
						api: 'asr',
						params: fileID
					},
					success: res => {
						console.log('asr res: ', res);
						self.asrRes = res.result;
						uni.hideLoading();
						self.$refs.wordModal._showModal();
					},
					fail: error => {
						uni.hideLoading();
						console.error(error);
					}
				})
			},
			recognizeText() {
				const self = this
				uni.showLoading({
					title: self.i18n.uploading,
					mask: true
				});
				wx.cloud.uploadFile({
					cloudPath: `hanzi-writer/asr/${self.voicePath.split('/').pop()}`,
					filePath: self.voicePath,
					success: res => {
						// 返回文件 ID
						console.log(res.fileID)
						uni.hideLoading();
						self.asr(res.fileID);
					},
					fail: err => {
						console.error(err)
						uni.hideLoading()
					},
				})
			},
		},
		onShareAppMessage() {
			return {
				title: this.i18n.pageTitle.asr,
				path: '/pages/index/asr',
				imageUrl: 'https://pic.superbed.cn/item/5dea8fcaf1f6f81c501ca356.png'
			};
		}
	}
</script>

<style>

</style>
