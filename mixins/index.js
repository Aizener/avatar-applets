import Vue from 'vue'
import { mapState } from 'vuex'

Vue.mixin({
	data() {
		return {
			
		}
	},
	mounted() {
	},
	filters: {
		formatTime(value, type = 'YYYY/MM/DD HH:mm:ss') {
			const date = new Date(Number(value))
			const y = date.getFullYear()
			const M = String(date.getMonth() + 1).padStart(2, '0')
			const d = String(date.getDate()).padStart(2, '0')
			const h = String(date.getHours()).padStart(2, '0')
			const m = String(date.getMinutes()).padStart(2, '0')
			const s = String(date.getSeconds()).padStart(2, '0')
			return type.replace('YYYY', y).replace('MM', M).replace('DD', d).replace('HH', h).replace('mm', m).replace('ss', s)
		}
	},
	computed: {
		...mapState('userStore', {
			mUser: state => state.user
		})
	}
})
