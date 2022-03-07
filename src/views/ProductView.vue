<template>
<h2>單項產品頁</h2>
<div class="container">
{{product}}
<div class="img-fluid">
  <img :src="product.imageUrl" :alt="`${ product.title } 照片`">
</div>
</div>
</template>
<script>
export default {
  data () {
    return {
      product: []
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`).then((res) => {
        this.product = res.data.product
      })
        .catch((error) => { console.dir(error) })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
