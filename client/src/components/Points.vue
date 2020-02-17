<template>
    <div id="pointContainer">
        <p id="pointText">
            {{points}}
        </p>
    </div>
</template>

<script>
export default {
  name: 'Points',
  props: {
      points: {
          type: Number
      }
  }
}
</script>


<style scoped>

</style>
