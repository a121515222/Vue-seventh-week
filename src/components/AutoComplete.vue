<template>
  <ul  class="autoUl position-absolute top-100 w-100 w-sm-33 w-sm-50"
  v-if="inFoList.length > 0 && (isFocus || isMouseIn)"
  >
    <li class="auto py-0" style="height:36px"
    v-for="(item,index) in inFoList"
    :key="item+index"
    :class="{'autoBackground' : (index === listIndex)}"
    @click="sendAutoComplete(item);"
    @mouseover="mouseoverHover(index)"
    @mouseleave="mouseleaveCancelHover(index)">
      <p class="py-1 my-0">{{item}}</p>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'pinia'
import productStore from '@/stores/products'

export default {
  props: ['inputData', 'isFocus'],
  emits: ['sendAutoCompleteResult', 'sendInfoBlank'],
  data () {
    return {
      inFoList: [],
      listIndex: 0,
      isMouseIn: false
    }
  },
  computed: {
    ...mapState(productStore, ['guestProduct'])
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
      this.listIndex = null
      this.isMouseIn = true
      const chosen = document.querySelectorAll('.auto')
      chosen[index].classList.add('autoBackground')
    },
    mouseleaveCancelHover (index) {
      const chosen = document.querySelectorAll('.auto')
      this.isMouseIn = false
      chosen[index].classList.remove('autoBackground')
    },
    autoComplete (info) {
      if (info !== '') {
        const infoArr = info.split(' ')
        if (this.guestProduct !== undefined) {
          this.guestProduct.forEach((item) => {
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
        this.$emit('sendInfoBlank')
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
    window.addEventListener('keydown', (e) => {
      if (this.inputData && this.listIndex !== '') {
        switch (e.code) {
          case 'ArrowDown' :
            if (this.listIndex === this.inFoList.length - 1) {
              this.listIndex = this.inFoList.length - 1
            } else { this.listIndex += 1 }
            break
          case 'ArrowUp' :
            if (this.listIndex === 0) {
              this.listIndex = 0
            } else { this.listIndex -= 1 }
            break
          case 'Enter' || 'NumpadEnter' :
            this.sendAutoComplete(this.inFoList[this.listIndex])
            break
        }
      } else if (this.inputData === '') { this.listIndex = 0 }
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
