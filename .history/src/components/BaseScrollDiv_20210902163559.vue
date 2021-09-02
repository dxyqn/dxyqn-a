<template>
  <div
    class="base-scroll-div"
    :ref="domId"
    :id="elId"
    @scroll="scrollDiv"
  >
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {

  data () {
    const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`;
    return {
      scroll: null,
      elId: elId
    };
  },
  computed: {},
  props: {
    // 传入的参数 是否需要监听这个滚动的位置
    probeType: {
      type: Number,
      default: 0
    },
    domId: {
      type: String
    }
  },
  watch: {
  },
  methods: {
    scrollDiv (e) {
      this.$emit("getParentId", this.elId)
      if (e.srcElement.scrollTop + e.srcElement.offsetHeight + 1 >= e.srcElement.scrollHeight) {
        this.$emit('lower', true)
      }
    },
    scrollPage () {
      //index与循环的index对应可自由设置动态获取
      const PageId = document.querySelector('#' + this.elId)
      this.$nextTick(_ => {
        PageId.scrollTop = 0
      })
      // PageId.scrollIntoView({ behavior:"smooth", block: "center", inline: "start"})
    }
  },
  created () { },
  mounted () {
    this.$nextTick(_ => {
      // 注意点：为了这边直接设置 probeType: 3 会一直监听影响性能 因此需要传递参数进来
      // 1：创建BScroll 对象
      // this.scroll = new BScroll(this.$refs.wrapper, {
      // 	probeType: this.probeType, //监听滚动的位置
      // 	pullUpLoad: true, // 确保上拉加载更多
      // 	click: true ,// 确保这个 BScroll组件 可以触发点击事件
      // 	pullDownRefresh:true,//开启下拉刷新
      // });
      // console.log(this.scroll)
      // // 2：监听滚动位置 需要 probeType 设置为true是才能监听
      // this.scroll.on('scroll', position => {
      // 	console.log("res", position);
      // 	this.$emit('scroll', position);
      // });
      // // 3：上拉加载更多 需要pullUpLoad 设置为true是才能触发
      // this.scroll.on('pullingup', () => {
      // 	console.log('上拉加载更多');
      // 	this.$emit('lower',true);
      // 	this.scroll.finishPullUp();	
      // });
      // this.scroll.refresh()

    })
  }
};
</script>

<style lang="scss" scoped>
.base-scroll-div {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.base-scroll-div::-webkit-scrollbar {
  display: none;
}
</style>
