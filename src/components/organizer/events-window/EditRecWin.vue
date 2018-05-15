<template>
<div class="edit">
	<input type="text" class="edit__title" name="edit-title">
    <textarea name="edit-desc" class="edit__desc"></textarea>
    <button class="send-edit">Edit</button>
    <button class="cancel-edit">Cancel</button>
</div>
</template>

<script>
export default {
	name: 'EditRecWin',
	data () {
		return {
			editWinVisible: false
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
