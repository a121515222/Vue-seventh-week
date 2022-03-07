<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/admin">後台</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/logIn" class="nav-link" aria-current="page" >LogIn</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/adminProducts" class="nav-link" aria-current="page" >Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupons" class="nav-link" aria-current="page" >Coupons</router-link>
        </li>
      </ul>
      <button type="button" class="btn btn-primary" @click="logOut">登出</button>
      <span class="navbar-text">
       後台
      </span>
    </div>
  </div>
</nav>
  <router-view v-if="logInResult"></router-view>
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
        console.dir(err.response)
      })
    }
  },
  mounted () {
    this.logInspection()
  }
}
</script>
