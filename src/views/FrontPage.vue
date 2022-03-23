<template>
    <nav class="navbar navbar-expand-lg bg-primary fixed-top" :class="{'bg-secondary': scrollY > 100}">
  <div class="container-fluid">
    <router-link class="navbar-brand order-1 order-sm-0" :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" to="/">logo</router-link>
    <button class="navbar-toggler order-0 order-sm-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarFontPage" aria-controls="navbarFontPage" aria-expanded="false" aria-label="Toggle navigation">
      <i class="bi bi-list" :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" style="font-size:26px"></i>
    </button>
    <a href="#" class="order-3" @click.prevent="guestOpenCart">
    <i class="bi bi-cart3 position-relative" :class="{'text-primary': scrollY > 100 , 'text-secondary':scrollY < 100}"  style="font-size:26px">
      <span v-if="cartNum>0" class="position-absolute start-100 translate-middle badge rounded-pill bg-danger px-2"
                    style="font-size:6px; top:5px ;">
                    {{cartNum}}
                </span>
    </i></a>
    <div class="collapse navbar-collapse" id="navbarFontPage">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li class="nav-item">
          <router-link to="/products" class="nav-link " :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" aria-current="page" >產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/articles" class="nav-link " :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" aria-current="page" >文章列表</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <router-view></router-view>
    <!-- Offcanvas -->
    <CartCanvass ref="guestCart"></CartCanvass>
</template>
<script>
import CartCanvass from '@/components/CartCanvass.vue'
export default {
  data () {
    return {
      scrollY: 0,
      cartNum: 0
    }
  },
  components: {
    CartCanvass
  },
  methods: {
    getCart () {
      this.$refs.guestCart.getCart()
    },
    guestOpenCart () {
      this.$refs.guestCart.cartOpen()
    },
    scrollWatch () {
      // 取得scrollY數值
      this.scrollY = window.scrollY
    }
  },
  mounted () {
    // 監聽scroll
    window.addEventListener('scroll', this.scrollWatch)
    this.$emitter.on('push-cart-num', (num) => { this.cartNum = num })
    this.getCart()
  }
}
</script>
