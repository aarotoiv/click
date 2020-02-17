<template>
    <button type="button" id ="clickme" @click="buttonClick">
        Click me!
    </button>
</template>

<script>
export default {
  name: 'ClickButton',
  mounted() {
    
  },
  methods: {
      buttonClick() {
          this.$emit('clicked');
      }
  }
}
</script>


<style scoped>

</style>
