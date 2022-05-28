<template>
	<view class="cu-bar bg-white">
		<view class="action sub-title">
			<text class="text-xl text-bold text-blue">
        <slot></slot>
      </text>
			<text class="bg-blue" style="width:2rem"></text>
		</view>
	</view>
</template>

<script>
	export default {
    name: 'textTitle',
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
