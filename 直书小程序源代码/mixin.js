const globalMixins = {
	onLoad() {
		const pageName = getCurrentPages().pop().route.split('/').pop();
		uni.setNavigationBarTitle({
			title: this.i18n.pageTitle[pageName]
		});
	},
	computed: {
		i18n() {
			return this.$t('default');
		}
	},
	methods: {
		navTo(url){
			uni.navigateTo({
				url
			})
		}
	}
}

export {
	globalMixins
}
