<template>

  <div class="d-flex flex-column" style="min-height:100vh">
    <template v-if="!($route.path === '/' && scrollY < 300)">
      <div class="cart bg-secondary d-flex justify-content-center align-items-center">
        <a href="#" class="cartIcon" @click.prevent="guestOpenCart()">
          <i class="bi bi-cart3 position-relative text-white hover-cart"></i>
        </a>
        <span class="position-absolute start-100 translate-middle badge rounded-pill bg-danger px-2"
        style="font-size:6px; top:0 ;"
        v-if="cartLength > 0"
        >
          {{cartLength}}
        </span>
      </div>
      </template>
    <div class="from-group">
      <nav class="navbar navbar-expand-lg bg-primary fixed-top" :class="{'bg-secondary': scrollY > 100}">
        <div class="container-fluid">
          <RouterLink class="logo navbar-brand fs-2 hover-color"
          to='/'
          :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}"
          >
            自種自售
          </RouterLink>
          <button class="navbar-toggler hover-color" type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarFontPage"
          aria-controls="navbarFontPage"
          aria-expanded="false"
          aria-label="Toggle navigation"
          >
            <i class="bi bi-list"  style="font-size:26px"
            :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}">
            </i>
          </button>
          <div class="collapse navbar-collapse" id="navbarFontPage">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li class="nav-item">
                <RouterLink to="/products" class="nav-link hover-color"
                :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" aria-current="page"
                @click="removeShow()"
                >
                  產品列表
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/articles" class="nav-link hover-color"
                :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" aria-current="page"
                @click="removeShow()"
                >
                  文章列表
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/guestOrderLists" class="nav-link hover-color"
                :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" aria-current="page"
                @click="removeShow()"
                >
                  訂單查詢
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <RouterView/>
    </div>
    <div class="from-group footerSticky">
      <div class="container-fluid bg-third d-flex justify-content-center align-items-center gap-3 bottomIconHover">
        <a class="text-white fs-3 bottomIconHover" href="tel:+886-8-123123" style="text-decoration: none;">
          聯絡我們:(08)123123
        </a>
        <a class="text-white fs-3 bottomIconHover" href="#"><i class="bi bi-facebook"></i></a>
        <a class="text-white fs-3 bottomIconHover" href="#"><i class="bi bi-twitter"></i></a>
        <a class="text-white fs-3 bottomIconHover" href="#"><i class="bi bi-instagram"></i></a>
        <a class="text-white fs-3 bottomIconHover" href="#"><i class="bi bi-line"></i></a>
      </div>
    </div>
  </div>
  <CartCanvass ref="guestCart"/>
</template>

<script>
import CartCanvass from '@/components/CartCanvass.vue'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart'

export default {
  data () {
    return {
      scrollY: 0
    }
  },
  components: {
    CartCanvass
  },
  computed: {
    ...mapState(cartStore, ['cartLength'])
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    inspectionRouteAndEditColor () {
      const logo = document.querySelector('.logo')
      if (this.$route.path !== '/') {
        logo.classList.remove('active')
      } else if (this.$route.path === '/') {
        logo.classList.add('active')
      }
    },
    removeShow () {
      const navCollapse = document.getElementById('navbarFontPage')
      navCollapse.classList.remove('show')
    },
    guestOpenCart () {
      this.$refs.guestCart.cartOpen()
    },
    scrollWatch () {
      this.scrollY = window.scrollY
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollWatch)
    this.inspectionRouteAndEditColor()
    this.getCart()
  },
  updated () {
    this.inspectionRouteAndEditColor()
  }
}
</script>

<style lang="scss">
  @font-face {
      font-family: logo;
      src: url('../../assets/font/kurobara-cinderella.ttf');
    }
  .logo {
      font-family: logo;
  }
  .hover-color,.active {
    &:hover {
      color: #fff !important;
    }
  }
  .footerSticky {
    margin-top: auto;
  }
  .cart {
  z-index: 9;
  width:30px;
  height:30px;
  border-radius:7px;
  position: fixed;
  bottom: 10%;
  right: 2%;
  }
  .cartIcon {
    font-size: 25px;
  }
  .hover-cart {
    &:hover {
      color: rgb(216, 12, 12) !important;
    }
  }
  .bottomIconHover {
    &:hover {
      color: rgb(216, 12, 12) !important;
    }
  }
    @media (min-width:768px) {
    .cart {
      width: 60px;
      height: 60px;
      border-radius:15px;
    }
    .cartIcon {
    font-size: 50px;
  }
  }
</style>
