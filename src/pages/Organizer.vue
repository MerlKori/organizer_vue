<template>
<div class="organizer">
	<!-- OrganizerSidebar -->
	<organizer-sidebar />
	<!-- OrganizerTasksDay -->
	<organizer-tasks-day />
</div>
</template>

<script>
import OrganizerSidebar from '@/components/organizer/OrganizerSidebar'
import OrganizerTasksDay from '@/components/organizer/OrganizerTasksDay'
export default {
	name: 'Organizer',
	components: {OrganizerSidebar, OrganizerTasksDay},
	data () {
		return {}
	}
}
</script>

<style lang="scss" scoped>
.organizer {
	position: relative;
	display: flex;
	width: 100%;
	min-height: 100vh;
	z-index: 10;
}
</style>
