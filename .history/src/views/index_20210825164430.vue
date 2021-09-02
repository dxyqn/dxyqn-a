<template>
	<div>
		<base-head class="home-header" style="margin-top: 0;" />
		<!-- <base-sliderverify :successFun="handleSuccess" :errorFun="handleError"></base-sliderverify> -->
		<!-- 内容 ↓-->
		<div class="section-container">
			<el-row>
				<el-col :span="5"></el-col>
				<el-col :span="12" :xs="{ span: 22, offset: 1 }" :offset="3">
					<div class="flex align-center fixed f-t-8" v-if="isMobileType">
						<div class="flex-1 mr-2"><el-input v-model="queryParams.title" placeholder="找一找" clearable @keyup.enter.native="handleQuery" /></div>
						<el-button type="primary" v-throttle="[handleQuery, 'click', 2000]">搜索</el-button>
					</div>
					<base-scroll-div ref="indexScroll" @scroll="scroll" :probeType="1" :class="[isMobileType ? 'section-left-app' : 'section-left']" @lower="lower">
						<div>
							<BaseMenu :listInfo="item" v-for="(item, index) in List" :key="index"></BaseMenu>
							<div class="center-one" v-show="List.length != 0"></div>
						</div>
						<el-card v-show="List.length == 0"><base-nodata style="width: 100%;height: 100px;"></base-nodata></el-card>
					</base-scroll-div>
				</el-col>
				<el-col :span="5" class="section-right hidden-xs-only">
					<el-card class="mb-2" iconClass="el-icon-s-opportunity" iconColor="red">
						<div class="flex align-center">
							<div class="flex-1 mr-2"><el-input v-model="queryParams.title" placeholder="找一找" clearable @keyup.enter.native="handleQuery" /></div>
							<el-button type="primary" v-throttle="[handleQuery, 'click', 2000]">搜索</el-button>
						</div>
					</el-card>
					<div>
						<BaseCard>
							<div slot="content" class="tag">
								<base-tag
									:effect.sync="tag.themeColor"
									v-for="(tag, index) in tags"
									:name="tag.name"
									:color="tag.color"
									@changeTag="clickTag(tag.id)"
									:key="index"
								/>
							</div>
						</BaseCard>
					</div>
					<base-card title="最新" class="latest" iconClass="el-icon-info">
						<div slot="content">
							<div v-show="List.length != 0" class="latest-content px-2" v-for="(item, index) in List2" :key="index" @click="lookDetail(item)">
								<span class="order">{{ index + 1 }}</span>
								{{ item.title }}
							</div>
							<base-nodata v-show="List.length == 0" style="width: 100%;height: 100px;"></base-nodata>
						</div>
					</base-card>
				</el-col>
			</el-row>
		</div>
		<div id="page_end_html" :class="{'cat_container':isShowCat}"></div>
		<!-- 内容 ↑-->
		<!-- <base-loader :isShowBaseLoader="isShowBaseLoader"></base-loader> -->
	</div>
</template>

<script>
import { getMenu, getTag } from '@/api/index';
import { mapState, mapMutations } from 'vuex';
import { throttle } from '@/utils/directive';
import aes from '../utils/AES.js';

export default {
	data() {
		return {
			List: [],
			tags: [],
			List2: [],
			total: null, //总页数
			currentSize: 5, //
			title: '',
			isShowCat:false,
			category: '',
			themeColor: 'light',
			isShowBaseLoader: false,
			queryParams: {
				pageNum: 1,
				pageSize: 5,
				title: '',
				categoryId: '',
				id: '',
				status: '1'
			}
		};
	},
	directives: {
		throttle
	},
	computed: {},
	components: {},
	watch: {},
	methods: {
		...mapMutations(['changeCategoryList']),
		//
		handleSuccess() {
			alert('success');
		},
		handleError() {
			alert('error');
		},
		getMenuData() {
			this.$YsLoad3.startLoad();
			// this.isShowBaseLoader = true
			getMenu(this.queryParams).then(res => {
				console.log(res);
				this.$YsLoad3.endLoad();
				// this.isShowBaseLoader = false
				if (res.code == '000') {
					if (this.queryParams.pageNum == 1) {
						this.List2 = res.data.list;
					}
					if (this.queryParams.pageNum > 1) {
						this.List = [...this.List, ...res.data.list];
					} else {
						this.List = [...res.data.list];
						this.$refs.indexScroll.scrollPage();
					}
					this.total = res.data.total;
				} else {
					this.$message.error(res.data.msg);
				}
			});
		},
		clickTag(id) {
			this.queryParams.categoryId = id;
			this.queryParams.pageNum = 1;
			this.tags.map(item => {
				if (item.id == this.category) {
					item.themeColor = 'dark';
				} else {
					item.themeColor = 'light';
				}
			});
			this.getMenuData();
		},
		getTagData() {
			this.$YsLoad3.startLoad();
			// this.isShowBaseLoader = true
			getTag().then(res => {
				// this.isShowBaseLoader = false
				this.$YsLoad3.endLoad();
				console.log(res, '1222');
				if (res.code == '000') {
					let resData = res.data;
					this.changeCategoryList(res.data);
					resData.forEach(item => {
						let obj = {};
						obj.name = item.name;
						obj.id = item.id;
						obj.color = this.getRandomColor();
						obj.themeColor = 'light';
						this.tags.push(obj);
					});
					let tagItem = {
						name: '全部',
						id: '',
						color: this.getRandomColor(),
						themeColor: 'dark'
					};
					this.tags.unshift(tagItem);
				} else {
					this.$message.error(res.data.msg);
				}
			});
		},
		getRandomColor() {
			return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.currentSize = val;
			this.getMenuData();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.queryParams.pageNum = val;
			this.getMenuData();
		},
		lookDetail(item) {
			this.$router.push({ path: '/markdown/detail', query: { id: item.id } });
		},
		scroll(e) {
			console.log(e);
		},
		lower() {
			console.log(this.List.length % this.queryParams.pageSize);
			if (this.List.length % this.queryParams.pageSize == 0) {
				this.queryParams.pageNum++;
				this.getMenuData();
			} else {
			}
		},
		handleQuery() {
			this.queryParams.pageNum = 1;
			this.getMenuData();
		}
	},
	created() {
		this.getMenuData();
		this.getTagData();
		L2Dwidget.init({
			model: {
				jsonPath: 'https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
				scale: 1
			},
			display: {
				position: 'right',
				height: 200,
				hOffset: 0,
				vOffset: 0
			},
			mobile: {
				show: true,
				scale: 0.5
			},
			react: {
				opacityDefault: 0.7,
				opacityOnHover: 0.2
			}
		});
	},
	mounted() {
		this.isShowCat = true
	}
};
</script>

<style lang="scss" scoped>
.section-left {
	margin-top: 80px;
	height: calc(100vh - 90px);
}
.section-left-app {
	margin-top: 140px;
	height: calc(100vh - 150px);
}
.section-right {
	margin-left: 20px;
	text-align: left;
	margin-top: 80px;
	.tag {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.BaseTag {
			display: block;
			margin: 0 10px 10px 0;
		}
	}
	.latest {
		margin-top: 20px;
		font-size: 14px;
		font-weight: 500;
		color: #606266;
		/deep/.el-card__body {
			padding: 10px 0;
		}
	}
	.latest-content {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 40px;
		line-height: 40px;
		&:hover {
			background: #34d8de;
			color: #fff;
		}
	}
	.order {
		font-size: 14px;
		// color:  #34d8de;
		font-weight: 700;
		padding: 0 5px 0 0;
	}
}
.cat_container {
	position: fixed;
	opacity: 0.7;
	left: 70px;
	bottom: 0px;
	z-index: 1;
	pointer-events: none;
}
</style>
