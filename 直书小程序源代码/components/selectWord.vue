<template>
	<view class="cu-modal bottom-modal" :class="showModal ? 'show' : ''" v-if="showModal">
		<form class="cu-dialog" @submit="handleSubmit">
			<view class="cu-bar bg-white">
				<button class="action text-blue submit-form" form-type="submit"
					hover-class="none">{{ i18n.confirm }}</button>
				<view class="action text-red" @tap="_hideModal">{{ i18n.cancel }}</view>
			</view>
			<scroll-view scroll-y="true">
				<view class="padding-xl flex justify-between flex-wrap select-word-modal">
					<button class="cu-btn radius margin-right margin-bottom lg word-btn"
						:class="wordIndex === index ? 'bg-blue' : 'bg-white'" v-for="(word, index) in text" :key="index"
						@click="selectWord" :data-index="index" :data-word="word">
						{{ word }}
					</button>
				</view>
			</scroll-view>
		</form>
	</view>
</template>

<script>
	export default {
		name: "selectWord",
		props: {
			text: {
				type: Array,
			}
		},
		data() {
			return {
				showModal: false,
				wordIndex: null,
				selectedWord: ''
			};
		},
		methods: {
			_showModal() {
				this.showModal = true;
			},
			_hideModal() {
				this.showModal = false;
			},
			selectWord(e) {
				console.log(e);
				const dataIndex = e.currentTarget.dataset.index;
				const dataWord = e.currentTarget.dataset.word;
				this.wordIndex = dataIndex;
				this.selectedWord = dataWord;
			},
			handleSubmit() {
				this._hideModal();
				this.navTo('/pages/index/writer?word=' + this.selectedWord)
			}
		}
	}
</script>

<style>
	.word-btn {
		font-family: 'FZKT';
		font-size: 1.5em !important;
	}

	.submit-form {
		background: #ffffff;
	}

	.submit-form::after {
		border: none;
	}

	.select-word-modal {
		max-height: 50vh;
	}
</style>
