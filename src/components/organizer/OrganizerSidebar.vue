<template>
<div class="sidebar">
	<!-- Calendar -->
	<calendar />
	<!-- Clock -->
	<clock />
</div>
</template>

<script>
import Calendar from '@/components/organizer/sidebar/Calendar'
import Clock from '@/components/organizer/sidebar/Clock'
export default {
	name: 'OrganizerSidebar',
	components: {Calendar, Clock},
	data () {
		return {}
	}
}
</script>

<style lang="scss" scoped>
.sidebar {
	display: flex;
	flex-direction: column;
	width: 30%;
	max-width: 350px;
	background-color: var(--bg-dark);
}
</style>
