<template>
  <li v-on="clickListeners">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "ILi",
  computed: {
    clickListeners: function() {
      let vm = this;
      return Object.assign({}, vm.$listeners, {
        click: function(event) {
          vm.$emit("click", event);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../element-variables.scss";

li {
  list-style: none;
  border-top: 1px solid $--border-color-base;
  border-left: 1px solid $--border-color-base;
  border-right: 1px solid $--border-color-base;
  border-bottom: none;
  padding: 5px 10px;
}

li:last-child {
  border-bottom: 1px solid $--border-color-base;
}

li:hover {
  background-color: teal;
}
</style>