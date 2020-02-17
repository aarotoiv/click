<template>
    <div id="pointContainer">
        <p id="pointTitle">
            Your points
        </p>
        <p id="pointText">
            {{points}}
        </p>
        <p v-for="message in messages" v-bind:key="message.key" class="pointMessage">
            {{message.message}}
        </p>
    </div>
</template>

<script>
export default {
  name: 'Points',
  data() {
      return {
          messages: {}
      }
  },
  props: {
      points: {
          type: Number
      }
  },
  methods: {
      receivedPoints(data) {
          const key = Math.random().toString(36).substring(7);
          this.$set(this.messages, key, {message: `${data} till next prize.`, key});
      }
  }
}
</script>


<style scoped>
    #pointContainer {
        width: 100%;
    }
    #pointTitle {
        text-align:center;
        padding-bottom: 20px;
        font-size: 30px;
        color: rgba(255,255,255,0.8);
    }
    #pointText {
        text-align:center;
        font-size: 30px;
    }
</style>
