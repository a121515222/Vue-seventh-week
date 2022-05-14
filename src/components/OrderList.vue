<template>
  <div class="d-flex flex-column">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">商品名稱</th>
          <th scope="col">總價格</th>
          <th scope="col">數量</th>
          <th scope="col">單價</th>
        </tr>
      </thead>
    <tbody>
      <tr
      v-for="(item,) in productList"
      :key="item.id"
      >
        <td>
          <img
          :src="item.product.imageUrl"
          :alt="item.title"
          style="width: 50px; height: 30px"
          />
        </td>
        <td>{{ item.product.title }}</td>
        <td>{{ item.final_total }}</td>
        <td>
          {{ item.qty }}
        </td>
        <td>
          {{item.product.origin_price > item.product.price? item.product.origin_price : item.product.price}}
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productList: []
    }
  },
  props: ['data'],
  watch: {
    data (newValue) {
      this.productList = JSON.parse(JSON.stringify(newValue.products))
    }
  },
  mounted () {
    this.productList = JSON.parse(JSON.stringify(this.data.products))
  }
}
</script>
