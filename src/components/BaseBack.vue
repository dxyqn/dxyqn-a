<template>
	<div class="baseBack">
		<div class="backBtn el-icon-back hidden-xs-only" @click="goBack"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			
		},
		watch:{},
		methods:{
			goBack() {
				// this.$router.back(-1);
				this.$router.back()
			}
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
