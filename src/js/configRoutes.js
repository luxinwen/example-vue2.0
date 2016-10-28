// 页面组件引入
import GoodsList from './../vue/GoodsList';
import GoodsEdit from './../vue/GoodsEdit';

// 路由项配置
export const routes = [
  {
    path: '/goods/list',
    name: 'GoodsList',
    component: GoodsList
  },
  {
    path: '/goods/edit',
    name: 'GoodsEdit',
    component: GoodsEdit
  },
  {
    path: '/tests',
    component: {
      template: '<p>{{ $route }}</p>'
    }
  },

  {
    path: '*',
    redirect: '/goods/list'
  }
];

// 导航列表
export const MenuList = [
  {
    head: '商品管理',
    body: [
      {
        text: '商品列表',
        link: {
          path: '/goods/list'
        }
      },
      {
        text: '新增商品',
        link: {
          path: '/goods/edit'
        }
      }
    ]
  },
  {
    head: '测试分组1',
    body: [
      {
        text: '测试分项1-1',
        link: {
          path: '/tests'
        }
      }
    ]
  }
];
