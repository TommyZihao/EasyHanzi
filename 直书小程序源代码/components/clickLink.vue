<template>
  <view class="link-wrapper">
    <text class="cuIcon cuIcon-link text-green margin-right-xs"></text>
    <text class="link" @click="copyLink" :data-href="href">
      <slot></slot>
    </text>
  </view>
</template>

<script>
  export default {
    name: 'clickLink',
    props: {
      href: {
        type: String,
      }
    },
    methods:{
      copyLink(e) {
        console.log('click link: ', e.currentTarget.dataset.href);
        uni.setClipboardData({
          data: e.currentTarget.dataset.href,
          success: () => {
            uni.showToast({
              title: '链接已复制',
              icon: 'success'
            });
          }
        });
      }
    }
  }
</script>

<style scoped>
  .link-wrapper {
    display: inline-block;
  }
  .link {
    color: #39b54a;
    text-decoration: underline;
  }
</style>
