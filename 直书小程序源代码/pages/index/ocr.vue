<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>
				<text>{{ i18n.ocr.upload }}</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-2 grid-square flex-sub justify-center">
				<view class="bg-img" @tap="ViewImage"  v-if="imgTempFilePath">
				 <image :src="imgTempFilePath" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="!imgTempFilePath">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view class="flex justify-around margin-top">
			<button class="cu-btn bg-blue lg" :disabled="!imgTempFilePath" @click="recognizeText()">{{ i18n.ocr.recognize }}</button>
		</view>
		<view class="cu-bar bg-white" v-if="ocrRes.length !== 0">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>
				<text>{{ i18n.ocr.result }}</text>
			</view>
		</view>
		<view class="flex flex-direction align-center margin-top" v-if="ocrRes.length !== 0">
			<view class="padding text-center text-lg light bg-grey radius" style="width:84%">
				{{ocrRes.join('')}}
			</view>
			<view class="flex justify-around margin-top">
				<button class="cu-btn lg" :class="isPlaying ? 'line-grey' : 'line-green'" @click="tts()"><text :class="isPlaying?'cuIcon-stop':'cuIcon-playfill'" :disabled="isPlaying"></text>{{ i18n.playAudio }}</button>
				<button class="cu-btn line-blue lg margin-left" @click="$refs.wordModal._showModal();"><text class="cuIcon-edit"></text>{{ i18n.quiz }}</button>
			</view>
		</view>
		<!-- 选择文字 -->
		<select-word ref="wordModal" :text="ocrRes"></select-word>
	</view>
</template>

<script>
	const audioManager = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				imgTempFilePath: false,
				ocrRes: [],
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
			ocr(cloudFileID) {
				const self = this;
				uni.showLoading({
					title: this.i18n.recognizing,
					mask: true
				});
				const that = this;
				wx.cloud.callFunction({
					name: 'mlkit',
					data: {
						api: 'ocr',
						params: cloudFileID
					},
					success: res => {
						console.log('ocr res: ', res);
						self.ocrRes = res.result;
						uni.hideLoading();
					},
					fail: error => {
						uni.hideLoading();
						console.error(error);
					}
				})
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
						params: that.ocrRes.join('')
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
			ChooseImage() {
				const self = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['camera', 'album'],
					count: 1,
					crop: {
						quality: 50
					},
					sizeType: 'compressed',
					success: (res) => {
						const imgTempFilePath = res.tempFilePaths[0];
						console.log('image size: ', res.tempFiles[0].size);
						const imageSize = res.tempFiles[0].size;
						if (imageSize / 1000000 > 4) {
							uni.showModal({
								title: self.i18n.uploadImageOverSize,
								confirmText: self.i18n.confirm,
								showCancel: false,
							})
							return;
						}
						self.imgTempFilePath = imgTempFilePath;
					}
				});
			},
			ViewImage() {
				uni.previewImage({
					urls: [this.imgTempFilePath],
					current: this.imgTempFilePath
				});
			},
			DelImg() {
				this.imgTempFilePath = false
			},
			recognizeText(){
				const self = this;
				uni.showLoading({
					title: self.i18n.uploading,
					mask: true
				});
				wx.cloud.uploadFile({
					cloudPath: `hanzi-writer/userUploadImages/${self.imgTempFilePath.split('/').pop()}`,
					filePath: self.imgTempFilePath,
					success: res => {
						// 返回文件 ID
						console.log(res.fileID)
						uni.hideLoading();
						self.ocr(res.fileID)
					},
					fail: err => {
						console.error(err)
						uni.hideLoading()
					},
				})
			}
		},
		onShareAppMessage() {
			return {
				title: this.i18n.pageTitle.ocr,
				path: '/pages/index/ocr',
				imageUrl: 'https://pic.superbed.cn/item/5dea8fcaf1f6f81c501ca356.png'
			};
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
</style>