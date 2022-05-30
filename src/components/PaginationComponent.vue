<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled: !pagination.has_pre}">
        <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="$emit('sendPage',pagination.current_page - 1)" >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
      v-for="p in pagination.total_pages"
      :key="p + 'page'"
      :class="{active: p === pagination.current_page}">
        <a class="page-link"  href="#"
        @click.prevent="$emit('sendPage',p)"
        >
          {{p}}
        </a>
      </li>
      <li class="page-item" :class="{disabled: !pagination.has_next}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="$emit('sendPage',pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pagination'],
  emit: ['sendPage']
}
</script>
