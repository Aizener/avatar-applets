import Vue from 'vue'
import { mapState } from 'vuex'

Vue.mixin({
	data() {
		return {
			
		}
	},
	mounted() {
	},
	computed: {
		...mapState('userStore', {
			mUser: state => state.user
		})
	}
})
