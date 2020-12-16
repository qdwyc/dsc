import { MessageBox } from 'mint-ui';
const mutations = {
  changeNum(state) {
    state.num++;
  },
  changeNumX(state, data) {
    state.num = state.num + data;
  },
  changeCategoryLeft(state, data) {
    state.categoryLeftDatas = data;
  },
  changeCategoryRight(state, data) {
    state.categoryRightDatas = data;
  },
  changeAd(state, data) {
    state.ad = data;
  },
  changeShowLoading(state, data) {
    state.showLoading = data;
  },
  changeId(state, data) {
    state.cat_id = data;
  },
  changeCategoryList(state, data) {
    if (data.length > 0) {
      state.nomore = false;
      state.categoryListDatas = state.categoryListDatas.concat(data);
    } else {
      state.nomore = true;
    }
  },
  changeToggleStyle(state, data) {
    state.toggleStyle = data;
  },
  changeDetail(state, data) {
    state.detailDatas = data;
  },
  changeDetailInfo(state, data) {
    state.detailDatasInfo = data;
  },
  changePosterData(state, data) {
    state.posterDatas = data;
  },
  setCartDatas(state, data) {
    if (data) {
      state.cartDatas.unshift(data);
    }
    localStorage.setItem('carts', JSON.stringify(state.cartDatas));
  },
  changeSelectStatus(state, data) {
    let selectStatus = state.cartDatas.every(item => {
      return item.isSelect == true;
    });

    state.selectAll = selectStatus;
    state.cartDatas[data.index] = data.cart;
    localStorage.setItem('carts', JSON.stringify(state.cartDatas));
    localStorage.setItem('selectAll', state.selectAll);
  },
  // 点击全选按钮
  changeSelectAllStatus(state) {
    state.selectAll = !state.selectAll;
    state.cartDatas.forEach(item => {
      item.isSelect = state.selectAll;
    });
    localStorage.setItem('carts', JSON.stringify(state.cartDatas));
    localStorage.setItem('selectAll', state.selectAll);
  },
  // 购物车数量++
  addCart(state, index) {
    state.cartDatas[index].value++;
    localStorage.setItem('carts', JSON.stringify(state.cartDatas));
  },
  // 购物车数量--
  jianCart(state, index) {
    if (state.cartDatas[index].value == 1) {
      state.cartDatas[index].value = 1;
    } else {
      state.cartDatas[index].value--;
      localStorage.setItem('carts', JSON.stringify(state.cartDatas));
    }
  },
  // 删除
  deleCart(state, index) {
    MessageBox.confirm('亲，您确定要放弃该宝贝吗？').then(
      () => {
        console.log('点击了确定按钮');
        state.cartDatas.splice(index, 1);
        localStorage.setItem('carts', JSON.stringify(state.cartDatas));
      },
      () => {
        console.log('点击了取消按钮');
      }
    );
  },
  // 搜索关键字
  searchKeywords(state, data) {
    if (data) {
      for (var key in state.searchKeywords) {
        if (data == state.searchKeywords[key]) {
          state.searchKeywords.splice(key, 1);
        }
      }
      state.searchKeywords.unshift(data);
    }
    console.log(state.searchKeywords);

    localStorage.setItem('keywords', JSON.stringify(state.searchKeywords));
  },
  deleKeywords(state) {
    state.searchKeywords = [];
    localStorage.setItem('keywords', JSON.stringify(state.searchKeywords));
  },
  setUserInfo(state, data) {
    state.userInfo = data;
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
  },
};

export default mutations;
