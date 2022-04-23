<template>
  <div class= "container">
    <VueLoading :active="isLoading" :z-index="1060"></VueLoading>
    <div class= "row py-5">
      <h2>產品列表</h2>
      <div class="d-flex justify-content-end">
        <!-- Button trigger modal -->
        <button type="button" class ="btn btn-primary" @click="isNew = true;openModal();">
          增加商品
        </button>
      </div>
      <div class="col-12 py-3">
        <div class="border rounded">
          <table class="table table-hover ">
            <tr>
              <th>產品名稱</th>
              <th>原價</th>
              <th>售價</th>
              <th>單位</th>
              <th>是否啟用</th>
              <th>查看細節</th>
              <th></th>
              <th></th>
            </tr>
            <tr v-for="(item,index) in products" :key="item.id+index">
              <td>{{item.title}}</td>
              <td>{{item.origin_price}}</td>
              <td>{{item.price}}</td>
              <td>{{item.unit}}</td>
              <td>{{productStatus(item.is_enabled)}}
              </td>
              <td>
                <button class="btn btn-outline-primary" :data-index ="index" type="button"
                @click="showProduct(item)">查看細節</button></td>
              <td>
                <button class="btn btn-outline-success" :data-index="index" type="button"
                @click="postId = item.id;isNew= false;openModal(item);" :disabled="isLoading === true"
                :class="{'buttonDisabledCursor' : isLoading === true}">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  編輯
                </button>
              </td>
              <td>
                <button class="btn btn-outline-danger" type="button" :disabled="isLoading === true"
                  :class="{'buttonDisabledCursor' : isLoading === true}"
                  @click="postId = item.id; deleteProduct();">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  刪除
                </button>
              </td>
            </tr>
          </table>
          <p class = "px-1">一共有{{products.length}}項產品</p>
        </div>
        <PaginationComponent :pagination = "page" @send-page = "getProduct">
        </PaginationComponent>
      </div>
      <h2>單一產品細節</h2>
      <div class = "col-8 mx-auto py-3">
        <template v-if="productTemp.id">
          <div class="card">
            <div class = "card-body">
              <div class="img"><img class="img-fluid" :src="productTemp.imageUrl" :alt="productTemp.title"></div>
              <div class v-on="d-flex">
                <p>{{productTemp.title}}<span class="badge bg-primary">{{productTemp.category}}</span>
                </p>
              </div>
              <p>商品描述:{{productTemp.description}}</p>
              <p>商品內容:{{productTemp.content}}</p>
              <div class="d-flex">
                <span>{{productTemp.price}}</span>
                <span class="line-through px-2 fw-light text-black-50">{{productTemp.origin_price}}</span>
                <span>元/{{productTemp.unit}}</span>
              </div>
            </div>
          </div>
          <div class = "d-flex gap-3 py-3">
            <div class="w-25" v-for ="(img,index) in productTemp.imagesUrl" :key ="img+index"><img :src="img"
              :alt="productTemp.title">
            </div>
          </div>
        </template>
        <p v-else>請選擇一個商品查看</p>
      </div>
    </div>
    <!-- Modal -->
    <AdminProductModal :input-product = "inputProductOut" :is-new = "isNew" @send-input-data = "editProductList"
    @send-close-resetInput= "resetModal" ref = "myModal"></AdminProductModal>
  </div>
</template>
<script>
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminProductModal from '@/components/AdminProductModal.vue'
export default {
  data () {
    return {
      isLoading: false,
      page: {},
      isNew: true,
      postId: '',
      products: [],
      productTemp: {},
      inputProductOut: {
        title: '',
        category: '',
        origin_price: null,
        price: null,
        unit: '',
        description: '',
        content: '',
        is_enabled: '',
        imageUrl: '',
        imagesUrl: []
      }
    }
  },
  components: {
    AdminProductModal,
    PaginationComponent
  },
  methods: {
    openModal (data) {
      this.$refs.myModal.open()
      // 把id寫入postId
      // 把products的資料取出傳到inputProduct
      if (this.isNew === false) {
        Object.keys(data).forEach((item) => {
          Object.keys(this.inputProductOut).forEach((i) => {
            if (item === i) {
              this.inputProductOut[i] = data[item]
            };
          })
        })
        this.postId = data.id
      } else {
        return
      };
    },
    closeModal () {
      this.$refs.myModal.close()
    },
    showProduct (data) {
      this.productTemp = data
    },
    resetModal () {
      this.inputProductOut = {
        title: '',
        category: '',
        origin_price: null,
        price: null,
        unit: '',
        description: '',
        content: '',
        is_enabled: '',
        imageUrl: '',
        imagesUrl: []
      }
    },
    editProductList (productData) {
      this.isLoading = true
      // 新增商品
      const sendData = { data: {} }
      sendData.data = productData
      if (this.isNew === true) {
        // this.sendToken()
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`, sendData).then((res) => {
          this.getProduct()
          this.resetModal()
          this.isLoading = false
          this.$emitter.emit('push-info', {
            title: '新增產品結果',
            style: 'success',
            content: res.data.message
          })
        }).catch((err) => {
          this.$emitter.emit('push-info', {
            title: '新增產品結果',
            style: 'danger',
            content: err.response.data.message
          })
        })
      } else if (this.isNew === false) { // 編輯商品
        // this.sendToken()
        this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.postId}`, sendData).then((res) => {
          this.getProduct()
          this.closeModal()
          this.isLoading = false
          this.$emitter.emit('push-info', {
            title: '編輯產品結果',
            style: 'success',
            content: res.data.message
          })
          // 清空postId
          this.postId = ''
        }).catch((err) => {
          console.dir(err.response)
          this.isLoading = false
          this.$emitter.emit('push-info', {
            title: '新增產品結果',
            style: 'danger',
            content: err.response.data.message
          })
        })
      }
    },
    deleteProduct () {
      this.isLoading = true
      const confirm = prompt('請輸入delete')
      if (confirm === 'delete') {
        this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.postId}`).then((res) => {
          this.getProduct()
          this.isLoading = false
          this.$emitter.emit('push-info', {
            title: '刪除產品結果',
            style: 'success',
            content: res.data.message
          })
        }).catch((err) => {
          this.isLoading = false
          this.$emitter.emit('push-info', {
            title: '刪除產品結果',
            style: 'danger',
            content: err.response.data.message
          })
        })
      } else {
        alert('輸入錯誤，不進行刪除')
        this.isLoading = false
      }
    },
    productStatus (data) {
      let result = null
      switch (data) {
        case 0: result = '未上架'
          break
        case 1: result = '已上架'
          break
        case 2: result = '缺貨中'
          break
        case 3: result = '補貨中'
          break
        case 4: result = '促銷中'
          break
        case 5: result = '待下架'
          break
      };
      return result
    },
    // sendToken () {
    //   const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)myHextoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    //   this.$http.defaults.headers.common.Authorization = myToken
    // },
    getProduct (page = 1) {
      this.isLoading = true
      // 判斷目前頁面
      if (this.$route.fullPath === '/admin/adminProducts') {
        // 取得所存在cookie的token
        // this.sendToken()
        this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`).then((res) => {
          this.products = res.data.products
          this.page = res.data.pagination
          this.isLoading = false
        }).catch((err) => {
          this.isLoading = false
          alert(`${err.response.data.message},自動轉跳至登入頁`)
          if (err.response.data.message === '驗證錯誤, 請重新登入') {
            this.$router.push('/logIn')
          }
        })
      }
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
