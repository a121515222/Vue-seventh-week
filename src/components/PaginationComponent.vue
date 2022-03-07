<template>
<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled: !pagination.has_pre}">
        <a class="page-link" @click.prevent="$emit('sendPage',pagination.current_page-1)" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="p in pagination.total_pages" :key="p+'page'"
      :class="{active: p===pagination.current_page}"><a class="page-link"
      @click.prevent="$emit('sendPage',p)" href="#">{{p}}</a></li>
      <li class="page-item" :class="{disabled: !pagination.has_next}">
        <a class="page-link" @click.prevent="$emit('sendPage',pagination.current_page+1)" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['pagination']
}
</script>
