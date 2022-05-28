<template>
	<view>
		<!-- 示例文字 -->
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>
				<text>{{ i18n.changeSample }}</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-2 grid-square flex-sub">
				<view class="bg-img shadow-warp" v-for="(item, index) in demoList" :key="index" @click="changeCharacter"
					:data-character="demoList[index].character">
					<image :src="demoList[index].image" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				demoList: [{
						character: '学',
						image: 'https://pic.superbed.cn/item/5dea7587f1f6f81c5018458a.jpg'
					},
					{
						character: '习',
						image: 'https://pic.superbed.cn/item/5dea7587f1f6f81c50184588.jpg'
					},
					{
						character: '强',
						image: 'https://pic.superbed.cn/item/5df2dbcb1f8f59f4d67614cc.jpg'
					},
					{
						character: '国',
						image: 'https://pic.superbed.cn/item/5df2dbcb1f8f59f4d67614ca.jpg'
					}
				],
			};
		},
		methods: {
			changeCharacter(e) {
				const character = e.currentTarget.dataset.character;
				this.navTo('/pages/index/writer?word=' + character)
			},
		},
		onShareAppMessage() {
			return {
				title: this.i18n.pageTitle.example,
				path: '/pages/index/example',
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
