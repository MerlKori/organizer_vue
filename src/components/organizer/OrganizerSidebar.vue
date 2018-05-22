<template>
<div class="sidebar">
	<!-- Calendar -->
	<calendar />
</div>
</template>

<script>
// import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
import Calendar from '@/components/organizer/sidebar/Calendar'
export default {
	name: 'OrganizerSidebar',
	components: {Calendar},
	data () {
		return {}
	}
}
</script>

<style lang="scss" scoped>
.sidebar {
	width: 30%;
	max-width: 350px;
	background-color: var(--bg-dark);
}
</style>
