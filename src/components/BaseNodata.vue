<template>
	<div class="baseNodata">
		 <div class="container">
			 <base-svg class-name="noData-icon" icon-class="noData" class="noDataIcon"  />
			 <div class="noDataContent">暂无数据</div>
		 </div>
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
		methods:{},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
.baseNodata{
	width: inherit;
	height: inherit;
	padding-bottom: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	.container{
		width: 300px;
		height: 100px;
		position: relative;
		svg{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
		}
	}
	.noDataContent{
		text-align: center;
		color: #34d8de;
		position: absolute;
		left: 50%;
		bottom: 0;
		// top: 50%;
		transform: translate(-50%);
	}
}
</style>
