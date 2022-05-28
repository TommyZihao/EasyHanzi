<template>
	<view>
		<view class="bg-white padding">
			<hanzi-writer ref="hz-writer" width="300" height="300"></hanzi-writer>
			<view class="action-area flex justify-between">
				<button class="cu-btn bg-blue" @click="playAnimate">{{ i18n.animation }}</button>
				<button class="cu-btn bg-blue"
					@click="toggleSimple">{{ isSimple ? i18n.traditional : i18n.simplified }}</button>
				<button class="cu-btn bg-blue" @click="playAudio">{{ i18n.playAudio }}</button>
				<button class="cu-btn bg-blue" @click="quiz">{{ i18n.quiz }}</button>
			</view>
			<view class="action-area flex justify-around margin-top"><input class="text-center" type="text"
					@input="handleInput" :value="character" maxlength="1" /></view>
			<view class="action-area flex justify-around margin-top">
				<button class="cu-btn line-green round" @click="updateChar">{{ i18n.updateText }}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import createHanziWriterContext from '../../lib/hanzi-writer/index.js';

	export default {
		data() {
			return {
				isSimple: true,
				character: '强',
				ttsFileID: '',
				audioManager: uni.createInnerAudioContext(),
			};
		},
		onLoad(options) {
			const that = this
			this.character = options.word || this.character
			this.loadAudio()
			this.writerCtx = createHanziWriterContext({
				ref: 'hz-writer',
				character: this.character,
				page: this,
				radicalColor: '#39b54a'
			});
			this.writerCtx.showOutline();
		},
		methods: {
			loadAudio() {
				const that = this
				wx.cloud.callFunction({
					name: 'mlkit',
					data: {
						api: 'tts',
						params: that.character
					},
					success: res => {
						console.log('tts res: ', res);
						that.ttsFileID = res.result;
						that.audioManager.src = res.result
					},
					fail: error => {
						console.error(error);
					}
				})
			},
			toggleSimple() {
				this.isSimple = !this.isSimple;
				const mode = this.isSimple ? 0 : 1;
				const convertRes = this.convert(mode, this.character);
				this.character = convertRes;
				this.writerCtx.setCharacter(convertRes);
			},
			quiz() {
				this.writerCtx.quiz();
			},
			playAudio() {
				this.audioManager.play()
			},
			playAnimate() {
				this.writerCtx.animateCharacter();
			},
			handleInput(e) {
				const value = e.detail.value;
				this.character = value;
			},
			updateChar() {
				this.loadAudio()
				this.writerCtx.setCharacter(this.character);
			},
		},
		onShareAppMessage() {
			return {
				title: this.i18n.pageTitleExample,
				path: '/pages/index/index',
				imageUrl: 'https://pic.superbed.cn/item/5dea8fcaf1f6f81c501ca356.png'
			};
		}
	};
</script>

<style>
page {
	background-color: #fff;
}
</style>
