<template>
    <button type="button" id="clickme" @click="buttonClick">
        Click me!
    </button>
</template>

<script>
//click button. emit is catched in main.vue
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
    #clickme {
        width: 80%;
        max-width: 500px;
        height: 150px;
        background: #fff;
        font-size: 40px;
        border:none;
        margin:50px auto;
        display:block;
        position:relative;
        cursor:pointer;
    }
    #clickme:active {
        border:none;
        outline:none;
    }
</style>
