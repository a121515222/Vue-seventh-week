<template>
  <div class="container pt-2">
    <ul class="pictureWall px-0">
      <template v-for="(item, index) in pictures" :key="item">
        <li class="pictureBox" style="overflow: hidden;"
        v-if="index<16"
        :class="`gridBox${index}`">
          <img style="object-fit: cover; object-position:center center ; height:100%; width:100%"
          :src="item"
          :alt="item">
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pictures: []
    }
  },
  methods: {
    getProduct () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`).then((res) => {
        res.data.products.forEach((item) => {
          this.pictures.push(item.imageUrl)
        })
      })
        .catch((error) => {
          console.dir(error)
        })
    },
    getArticle () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`)
        .then((res) => {
          res.data.articles.forEach((item) => {
            this.pictures.push(item.image)
          })
        })
        .catch((err) => { console.dir(err.response.data.message) })
    }
  },
  mounted () {
    this.getProduct()
    this.getArticle()
  }
}
</script>

<style lang="scss">
  ul{
    list-style-type: none;
  }
  .pictureWall{
    display: grid;
    grid-template-columns: repeat(6, 1fr) ;
    grid-auto-rows:minmax(50px,50px) ;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    @media (min-width:576px){
      grid-auto-rows:minmax(75px,75px) ;
      grid-column-gap: 12px;
      grid-row-gap: 12px;
    }
    @media (min-width:762px){
      grid-auto-rows:minmax(100px,100px) ;
      grid-column-gap: 14px;
      grid-row-gap: 14px;
    }
    @media (min-width:992px){
      grid-auto-rows:minmax(125px,125px) ;
      grid-column-gap: 16px;
      grid-row-gap: 16px;
    }
    @media (min-width:1200px){
      grid-auto-rows:minmax(150px,150px) ;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
    }
  }
  .pictureBox{
    border: 1px solid black;
    border-radius:5px;
    height: 100%;
    transition: all 0.5s;
    box-shadow:2px 2px 2px 2px rgb(202, 201, 201);
    &:hover{
    position: relative;
    z-index: 1;
    transform: scale(1.2) translate(0,-20px);
    transition: all 0.5s;
    box-shadow:2px 2px 5px 2px rgb(202, 201, 201);
    }
  }
  .gridBox0 {
    grid-column: 1 / 3 ;
    grid-row: 1 / 3
  }
  .gridBox2 {
    grid-column: 4 /6 ;
  }
  .gridBox4 {
    grid-column: 3 / 7 ;
  }
  .gridBox6 {
    grid-column: 2 / 5 ;
  }
  .gridBox8 {
    grid-column: 1 / 3 ;
    grid-row: 4 / 6 ;
  }
  .gridBox9 {
    grid-column: 5 / 6 ;
    grid-row: 3 / 6
  }
  .gridBox10,.gridBox12 {
    grid-column: 3 / 5 ;
  }
  .gridBox14 {
    grid-column: 1 / 5 ;
  }
  .gridBox15 {
    grid-column: 5 / 7 ;
  }
</style>
