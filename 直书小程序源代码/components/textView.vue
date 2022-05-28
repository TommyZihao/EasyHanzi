<template>
	<view>
		<view class="text-content padding-left-lg padding-right-lg padding-bottom-lg bg-white margin-bottom" style="line-height: 2em;">
		  <slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
    name: 'textView',
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.text-content {
  text-align: justify;
  white-space: pre-line;
}
</style>
