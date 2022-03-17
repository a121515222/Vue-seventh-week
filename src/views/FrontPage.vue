<template>
    <nav class="navbar navbar-expand-lg bg-primary fixed-top" :class="{'bg-secondary': scrollY > 100}">
  <div class="container-fluid">
    <router-link class="navbar-brand" :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" to="/">logo</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/products" class="nav-link " :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" aria-current="page" >Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sendInfo" class="nav-link " :class="{'text-primary': scrollY > 100, 'text-secondary':scrollY < 100}" aria-current="page" >SendInfo</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <router-view></router-view>
</template>
<script>
export default {
  data () {
    return {
      scrollY: 0
    }
  },
  methods: {
    scrollWatch () {
      // 取得scrollY數值
      this.scrollY = window.scrollY
    }
  },
  mounted () {
    // 監聽scroll
    window.addEventListener('scroll', this.scrollWatch)
  }
}
</script>
