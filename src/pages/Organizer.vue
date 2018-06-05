<template>
<div class="organizer">
	<!-- OrganizerSidebar -->
	<organizer-sidebar />
	<!-- OrganizerTasksDay -->
	<organizer-tasks-day />
	<!-- Preloader -->
	<!-- <preloader /> -->
</div>
</template>

<script>
import OrganizerSidebar from '@/components/organizer/OrganizerSidebar'
import OrganizerTasksDay from '@/components/organizer/OrganizerTasksDay'
import Preloader from '@/components/organizer/Preloader'
export default {
	name: 'Organizer',
	components: {OrganizerSidebar, OrganizerTasksDay, Preloader},
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
