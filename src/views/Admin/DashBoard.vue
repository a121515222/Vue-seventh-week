<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarText"
    aria-controls="navbarText"
    aria-expanded="false"
    aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link" aria-current="page" to="/admin/adminProducts">管理產品列表</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" aria-current="page" to="/admin/adminCoupons">管理優惠券</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" aria-current="page" to="/admin/adminOrders">管理訂單</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" aria-current="page" to="/admin/adminArticles">管理文章</RouterLink>
        </li>
      </ul>
      <button class="btn btn-primary" type="button" @click="logOut">登出</button>
      <span class="navbar-text">
       後台
      </span>
    </div>
  </div>
  </nav>
  <RouterView v-if="logInResult"/>
</template>

<script>
export default {
  data () {
    return {
      logInResult: false
    }
  },
  methods: {
    logInspection () {
      const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)myHextoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = myToken
      this.$http.post(`${process.env.VUE_APP_API}/api/user/check`, { api_token: myToken }).then((res) => {
        this.logInResult = true
      }).catch((err) => {
        console.dir(err.response)
        alert('請重新登入')
        this.$router.push('/logIn')
      })
    },
    logOut () {
      this.$http.post(`${process.env.VUE_APP_API}/api/user/check`).then((res) => {
        document.cookie = `myHextoken= ''; expires= ${new Date()}`
        alert('已成功登出')
        this.$router.push('/logIn')
      }).catch((err) => {
        console.dir(err.response.data.message)
      })
    }
  },
  mounted () {
    this.logInspection()
  }
}
</script>
