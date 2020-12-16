<template>
    <div class="home-pin">
			<div class="home-pin-one">
				<ul>
					<li><h1>拼团专区</h1></li>
					<li>拼着买更实惠</li>
					<li><b class="iconfont icon-jiantou2"></b></li>
				</ul>
			</div>
			<hr />
			<div class="home-pin-two">
					<ul>
						<li v-for="(item, index) in homepintuans" :key="index">
							<img :src="item.imgsrc" />
							<div class="hpt-one">{{item.title}}</div>
							<h2>{{item.after_price}}</h2>
							<h3>{{item.before_price}}</h3>
						</li>
					</ul>
			</div>
		</div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import《组件名称》from'《组件路径》';

	export default{
		//import引入的组件需要注入到对象中才能使用
		components:{},
		data(){
		//这里存放数据
			return{
				homepintuans: [
					{
						id: 1,
						imgsrc:
							"https://img14.360buyimg.com/n1/s300x300_jfs/t1/107620/38/15906/368883/5eaf7085E3cc8d8ef/b2dac719f339e972.jpg",
						title: "摩飞（Morphyrichards）榨汁机 便携式充电迷你无线果汁机料理机随行杯MR9800 蓝色",
						before_price: "¥219.00",
						after_price: "¥159.00"
					},
					{
						id: 2,
						imgsrc:
							"https://img14.360buyimg.com/n1/s300x300_jfs/t1/136701/21/7182/185568/5f3a3999Ee1709270/ee7d949e815b844e.jpg",
						title: "小熊（Bear）烤面包机多士炉三明治机电饼铛电热锅电火锅电蒸锅多功能早餐机 DSL-A13F1",
						before_price: "¥349.00",
						after_price: "¥299.00"
					},
					{
						id: 3,
						imgsrc:
							"https://img14.360buyimg.com/n1/s300x300_jfs/t1/144172/36/2269/491991/5f02ded8E6f1c9bc1/31abed8d1fa7d815.jpg",
						title: "Dior海氏海诺 75%酒精湿巾 一次性消毒酒精棉片大号 单片独立包装 18*15cm*50片 便携小包装免",
						before_price: "¥25.80",
						after_price: "¥19.90"
					},
					{
						id: 4,
						imgsrc:
							"https://x.dscmall.cn/storage/images/201809/thumb_img/0_thumb_G_1536617317847.jpg",
						title: "WMNS Air Jordan 13 aj13 鳄鱼皮纹理 女鞋篮球鞋 - AQ1757 004",
						before_price: "¥1200.00",
						after_price: "¥1100.00"
					},
					{
						id: 5,
						imgsrc:
							"https://x.dscmall.cn/storage/data/gallery_album/113/thumb_img/113_thumb_G_1588096566135.jpg",
						title: "雅漾活泉喷雾*2",
						before_price: "¥150.00",
						after_price: "¥50.00"
					}
				]
			};
		},
		//监听属性类似于data概念
		computed:{},
		//监控data中的数据变化
		watch:{},
		//方法集合
		methods:{},
		//生命周期-创建之前
		beforeCreate(){},
		//生命周期-创建完成（可以访问当前this实例）
		created(){},
		//生命周期-挂载之前
		beforeMount(){},
		//生命周期-挂载完成（可以访问DOM元素）
		mounted(){},
		//生命周期-更新之前
		beforeUpdate(){},
		//生命周期-更新之后
		updated(){},
		//生命周期-销毁之前
		beforeDestroy(){},
		//生命周期-销毁完成
		destroyed(){},
		//如果页面有keep-alive缓存功能，这个函数会触发
		activated(){},
	}
</script>
<style lang="less">
	.home-pin {
		max-width: 100%;
		width: 95%;
		height: 25rem;
		margin-left: 2.5%;
		border-radius: 10px;
		margin-top: 2.5%;
		background-color: #fff;
		.home-pin-one {
			width: 100%;
			height: 5rem;
			ul {
				float: left;
				width: 100%;
				height: 5rem;
			}
			ul li {
				float: left;
			}
			ul :nth-child(1) {
				width: 8rem;
				height: 1rem;
				margin-left: 4%;
				margin-top: 3%;
				text-align: center;
			}
			ul :nth-child(2) {
				width: 10rem;
				height: 1rem;
				margin-left: 4%;
				margin-top: 5%;
				font-size: 1.4rem;
				color: #888;
			}
			ul :nth-child(3) {
				width: 1.5rem;
				height: 1.5rem;
				margin-left: 33%;
				margin-top: 5%;
				color: rgb(185, 27, 27);
			}
		}
		hr {
			width: 95%;
			margin: 0 auto;
		}
		.home-pin-two {
			width: 95%;
			height: 20rem;
			margin: auto;
			top: 0.5rem;
			margin-top: 0.5rem;
			ul {
				width: 100%;
				white-space: nowrap;
				overflow-x: auto;
				&::-webkit-scrollbar {//去除滚动条
					width: 0;
					height: 0;
					display: none;
					}
				li {
					width: 11.5rem;
					height: 18.8rem;
					display: inline-block;
					margin-right: 0.5rem;
					img {
						width: 11.5rem;
						height: 11.5rem;
					}
					h2 {
						color: rgb(243, 70, 70);
						text-align: center;
						margin-top: 0.5rem;
					}
					h3 {
						text-decoration: line-through;
						text-align: center;
					}
					.hpt-one {
						width: 5rem;
						height: 2rem;
						font-size: 1.4rem;
						margin: 0 auto;
						//单行文本超出显示...
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>