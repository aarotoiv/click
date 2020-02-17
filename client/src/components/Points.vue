<template>
    <div id="pointContainer">
        <p id="pointText">
        </p>
    </div>
</template>

<script>
export default {
  name: 'ClickButton',
  methods: {
      buttonClick() {
          this.$emit('clicked');
      }
  }
}
</script>


<style scoped>

</style>
