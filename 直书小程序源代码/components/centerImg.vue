<template>
  <view class="flex justify-around">
    <image @click="previewImage" :src="src" mode="widthFix" />
  </view>
</template>

<script>
  export default {
    name: 'centerImg',
    props: {
      src: {
        type: String,
        default: ''
      },
    },
    methods: {
      previewImage() {
        uni.previewImage({
          urls: [this.src, ]
        })
      }
    }
  }
</script>
<style scoped>
  image {
    width: 100%;
  }
</style>
