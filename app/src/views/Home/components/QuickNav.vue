<template>
  <div class="quick-nav">
    <mt-swipe :auto="0">
      <mt-swipe-item v-for="(item, index) in quickNavDatas" :key="index">
        <ul>
          <li v-for="(value, index) in item" :key="index">
            <img :src="value.imgsrc" alt />
            <span>{{value.title}}</span>
          </li>
        </ul>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    name: "QuickNav",
    components: {},
    data() {
      // 这里存放数据
      return {
        quickNavDatas: [
          [
            {
              id: 1,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/9JVcPMp5TemauXCVQxnIY50u80vcxnFGfnn33CKh.png",
              title: "潮流服饰",
            },
            {
              id: 2,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/EaINOz1VE3yvzyO6l2LoHNRQHt0iGXrk1uhfvwEf.png",
              title: "箱包配饰",
            },
            {
              id: 3,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/ZHsZuTkcuZGa7Mu4n5W1E6qsRQQBtkl9fzByJsUk.png",
              title: "美容护肤",
            },
            {
              id: 4,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/8vjN7XPR9BD1BGqGYDGmJiQvk1UPH4duF4csjuaV.png",
              title: "母婴儿童",
            },
            {
              id: 5,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/xypYud8p2sTivnyrf3cSmVwLt5ZalTtHraQqGYCl.png",
              title: "手机数码",
            },
            {
              id: 6,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/xnzngK6mJ1VamCDXKd5GH51C3asWfCnd8btRiZn2.png",
              title: "微社区",
            },
            {
              id: 7,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/3QggHJzSCrK1osf8DUYQxCUC3RhxaUySDkc5EMoC.gif",
              title: "拼团",
            },
            {
              id: 8,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/JMambFMHt5z76qndHS0I0mjDCEr2u20JM7zDtMlr.gif",
              title: "预售",
            },
            {
              id: 9,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/jUsageRXcEmvz0G8QutdBJ9IJgUxFsxgWAgdpHeA.png",
              title: "拍卖",
            },
            {
              id: 10,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/KhlceHTjkqz49Bzijf4HWtumIuIf1E45a7l1aOAJ.gif",
              title: "超值礼包",
            }
          ],
          [
            {
              id: 11,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/q9h1Y4UvaW7y5VnH79Cqr2BdtRZt3gEttYdgR1MR.png",
              title: "家具装修",
            },
            {
              id: 12,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/oMGz9EagOpfLL3XlSBn6vHPgBZgU0QwKKaLPXDUt.png",
              title: "休闲零食",
            },
            {
              id: 13,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/pCf41B18W9euGsTSrIkJs5eK3HhEALVLPdWoAOXk.png",
              title: "水果生鲜",
            },
            {
              id: 14,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/4z9ufpdgpicgA74Imt0RSSImqbgEj6YFu00MNxaX.png",
              title: "萌宠",
            },
            {
              id: 15,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/UymsBalqZUL3wq4oFBJDFWaXLhgryFGobEu1RhDI.png",
              title: "大家电",
            },
            {
              id: 16,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/UQTRBJwNLVDG039wMG5CXynqkcx3oF3HGzoGV5ny.png",
              title: "店铺街",
            },
            {
              id: 17,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/UpTTTRthFaAEpTJ1GiZewv4xVFXrd5gB2XeLBaP0.png",
              title: "品牌特卖",
            },
            {
              id: 18,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/WqxgnvKS6BfKXB0lx70X6tGqNaDWTqHi9KH406vV.png",
              title: "天天特价",
            },
            {
              id: 19,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/sNAwNBmaAczicgHB4N0xwM7kHKs2ZnKHiv4mjZ1l.png",
              title: "限时团购",
            },
            {
              id: 20,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/1rJ3qEFi4OPajG698A9QdskNFKYClR4Qa7S4Mw39.png",
              title: "积分商城",
            }
          ],
          [
            {
              id: 21,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/wyMGxcr9uxhB5YtWewXYMDw0UGczfGyBBxc9Hphv.png?imageView2/2/format/webp",
              title: "限时秒杀",
            },
            {
              id: 22,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/3nyGrpess8rbD5HtFQzOywBt0B3c6J8mGyMfFg0j.png?imageView2/2/format/webp",
              title: "到家O2O",
            },
            {
              id: 23,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/1wRGZtwI3cq21DLyWHFePxt5H6qdNDH9aBcl8k5E.png?imageView2/2/format/webp",
              title: "拍卖",
            },
            {
              id: 24,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/HAJDYBclMe42pCC4ItJsY620zTBatK3hEyRB5Fg5.png?imageView2/2/format/webp",
              title: "促销活动",
            },
            {
              id: 25,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/HKzNalAyacXbxTLKPibR0jC7qnP6JHsEGl9JCviv.png?imageView2/2/format/webp",
              title: "酒水饮料",
            },
            {
              id: 26,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/TBCUi3fLUPlppDqGrWCH28qVzy1mYg0lEXI9WVYo.png?imageView2/2/format/webp",
              title: "母婴专区",
            },
            {
              id: 27,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/j3gv9BDI6fKwNOjaw1n2DkZDDUshdjNzjF7Uexr3.png?imageView2/2/format/webp",
              title: "图书文娱",
            },
            {
              id: 28,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/6t4ROmMBBhI8hThOZAQvf2Pf942aGbBylTC5A7MZ.png?imageView2/2/format/webp",
              title: "中西乐器",
            },
            {
              id: 29,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/Z5XnIysiZKv1uqwEl7ZMc0DvBPMTme7BbMrcjpPu.png?imageView2/2/format/webp",
              title: "花卉绿植",
            },
            {
              id: 30,
              imgsrc:
                "https://x.dscmall.cn/storage/data/gallery_album/original_img/0aCkDXSBMmYC0eMFvfJK3xgO1KOiKqoGqyMwYWqR.png?imageView2/2/format/webp",
              title: "香水香氛",
            }
          ]
        ]
      }
    }
  }
</script>

<style lang="less">
.quick-nav {
  margin: auto;
  max-width: 100%;
  width: 95%;
  height: 20rem;
  position: relative;
  background-color: #fff;
  border-radius: 1rem;
  ul {
    height: 18rem;
    display: flex;
    flex-wrap: wrap;
    li {
      height: 9rem;
      width: 20%;
      text-align: center;
      img {
        width: 7rem;
        height: 7rem;
      }
    }
  }
  .mint-swipe {
    position: relative;
    width: 100%;
    background-color: #fff;
    top: -4rem;
    border-radius: 1rem;
  }
  .mint-swipe-indicators {
    bottom: 0;
  }
  .mint-swipe-indicator {
    opacity: 1;
    width: 16px;
    float: left;
    border-radius: 0px;
    margin: 0;
    background: rgba(255, 0, 0, 0.5);
  }
  .mint-swipe-indicator.is-active {
    background: red;
  }
}
</style>