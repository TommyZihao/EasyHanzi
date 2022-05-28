<template>
  <view class="wrap flex justify-center margin-xl">
    <view class="container radius" :style="'width: ' + width + 'px; height: ' + height + 'px;background-image: url('+backgroundImage+');'">
      <canvas id="writer-canvas" canvas-id="writer-canvas" :style="'width: ' + width + 'px; height: ' + height + 'px;'" />
      <view v-if="isQuizzing" class="blocker" @touchstart="_touchStart" @touchend="_touchEnd" @touchcancel="_touchEnd" @touchmove="_touchMove" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'hanzi-writer',
  props: {
    height: {
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 300
    },
    withBg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isQuizzing: false,
    };
  },
  computed:{
    backgroundImage() {
      if (this.withBg) {
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBpZD0iZ3JpZC1iYWNrZ3JvdW5kLXRhcmdldCI+CiAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwIiBzdHJva2U9IiNGOUY5RjkiLz4KICA8bGluZSB4MT0iMTAwIiB5MT0iMCIgeDI9IjAiIHkyPSIxMDAiIHN0cm9rZT0iI0Y5RjlGOSIvPgogIDxsaW5lIHgxPSI1MCIgeTE9IjAiIHgyPSI1MCIgeTI9IjEwMCIgc3Ryb2tlPSIjRjlGOUY5Ii8+CiAgPGxpbmUgeDE9IjAiIHkxPSI1MCIgeDI9IjEwMCIgeTI9IjUwIiBzdHJva2U9IiNGOUY5RjkiLz4KPC9zdmc+'
      } else {
        return ''
      }
    }
  },
  methods: {
    connectContext(ctx) {
      this.ctx = ctx;
    },
    disconnectContext() {
      if (this.ctx) {
        this.ctx = undefined;
      }
    },
    _touchStart(evt) {
      if (this.ctx) this.ctx.trigger('pointerStart', evt);
    },
    _touchMove(evt) {
      if (this.ctx) this.ctx.trigger('pointerMove', evt);
    },
    _touchEnd(evt) {
      if (this.ctx) this.ctx.trigger('pointerEnd', evt);
    },
    setIsQuizzing(isQuizzing) {
      this.isQuizzing = isQuizzing;
    }
  },
  destroyed() {
    if (this.ctx) {
      this.ctx.destroy();
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  background-size:cover;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
}

.blocker {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
