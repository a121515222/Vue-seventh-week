<template>
  <div class="container">
    <div class="row">
      <div class="mx-auto col-4">
        <div class="card my-3">
          <div class="card-body">
            <div class="form-group py-2">
              <label for="account">帳號</label>
              <input type="mail" id="account" class="form-control" placeholder="請輸入帳號"
              v-model="user.username">
            </div>
            <div class="form-group py-2">
              <label for="password">密碼</label>
              <input type="password" id="password" class="form-control" placeholder="請輸入密碼"
              v-model="user.password">
            </div>
          </div>
          <button type="button" class="btn btn-primary align-self-end me-3 mb-3" @click="login">登入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.user.username !== '' && this.user.password !== '') {
        this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, this.user).then((res) => {
          // 把token存到cookie
          document.cookie = `myHextoken= ${res.data.token}; expires= ${new Date(res.data.expired)}`
          // 轉跳頁面到產品資料頁
          this.$router.push('/admin/adminProducts')
        }).catch((err) => {
          alert(err.response.data.message)
        })
      } else {
        alert('請輸入帳號與密碼')
        this.user.value.username = ''
        this.user.value.password = ''
      }
    }
  }
}
</script>
