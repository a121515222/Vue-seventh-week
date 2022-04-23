<template>
  <ul ref="listUl" class="autoUl position-absolute top-100 w-33 w-sm-50" v-if="inFoList.length > 0 && (focus || mouseIn) ">
    <li class="auto py-0" v-for="(item,index) in inFoList" :key="item+index" style="height:36px"
    :class="{'autoBackground' : (index === listCounter)}" @click="sendAutoComplete(item);"
    @mouseover="mouseoverHover(index)" @mouseleave="mouseleaveCancelHover(index)"><p class="py-1 my-0">{{item}}</p></li>
  </ul>
</template>
<script>

export default {
  props: ['outData', 'inputData', 'focus'],
  emits: ['sendAutoCompleteResult', 'sendInfoBlank'],
  data () {
    return {
      inFoList: [],
      productList: [],
      listCounter: 0,
      mouseIn: false
    }
  },
  watch: {
    inputData: {
      handler (newValue) {
        if (newValue === '') {
          this.inFoList = []
        } else {
          this.autoComplete(newValue)
        }
      }
    }
  },
  methods: {
    mouseoverHover (index) {
      this.listCounter = null
      this.mouseIn = true
      const chosen = document.querySelectorAll('.auto')
      chosen[index].classList.add('autoBackground')
    },
    mouseleaveCancelHover (index) {
      const chosen = document.querySelectorAll('.auto')
      this.mouseIn = false
      chosen[index].classList.remove('autoBackground')
    },
    autoComplete (info) {
      if (info !== '') {
        const infoArr = info.split(' ')
        if (this.outData !== undefined) {
          this.outData.forEach((item) => {
            infoArr.forEach((i) => {
              if (item.title.indexOf(i) !== -1 || item.author.indexOf(i) !== -1 || item.description.indexOf(i) !== -1 || item.tag.indexOf(i) !== -1) {
                this.inFoList.push(item.title)
                this.inFoList = [...new Set(this.inFoList)]
              }
            })
          })
        } else if (this.productList !== undefined) {
          this.productList.forEach((item) => {
            infoArr.forEach((i) => {
              if (item.title.indexOf(i) !== -1 || item.category.indexOf(i) !== -1 || item.content.indexOf(i) !== -1 || item.description.indexOf(i) !== -1) {
                this.inFoList.push(item.title)
                this.inFoList = [...new Set(this.inFoList)]
              }
            })
          })
        }
        // 如果輸入一樣的關鍵字就不顯示
        if (this.inFoList.length > 0) {
          this.inFoList = this.inFoList.filter((item) => { return item !== info })
        }
      } else if (info === '') {
        this.$emitter.emit('sendInfoBlank')
      }
    },
    sendAutoComplete (info) {
      if (info === '' || info === undefined) {
        this.$emit('sendInfoBlank')
      } else {
        this.$emit('sendAutoCompleteResult', info)
        this.inFoList = []
      }
    }
  },
  mounted () {
    this.$emitter.on('sendProductList', (info) => { this.productList = info })
    // 監聽鍵盤
    window.addEventListener('keydown', (e) => {
      if (this.inputData && this.listCounter !== '') {
        switch (e.code) {
          case 'ArrowDown' :
            if (this.listCounter === this.inFoList.length - 1) {
              this.listCounter = this.inFoList.length - 1
            } else { this.listCounter += 1 }
            break
          case 'ArrowUp' :
            if (this.listCounter === 0) {
              this.listCounter = 0
            } else { this.listCounter -= 1 }
            break
          case 'Enter' || 'NumpadEnter' :
            this.sendAutoComplete(this.inFoList[this.listCounter])
            break
        }
      } else if (this.inputData === '') { this.listCounter = 0 }
    })
  }
}
</script>
<style lang="scss">
  .autoUl {
    background: #fff;
    z-index: 1;
    padding: 0;
    list-style: none ;
  }
  .autoBackground {
    background: rgb(155, 150, 150) !important;
  }
  .auto {
    padding-left: 12px;
    background: rgb(225, 224, 224);
    &:hover {
      cursor:pointer;
    }
  }
</style>
