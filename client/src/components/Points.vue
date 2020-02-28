<template>
    <div id="pointContainer">
        <p id="pointTitle">
            Your points ({{points}})
        </p>
        <div id="pointsGraphic">
            <div class="pointBubble" v-for="index in points" v-bind:key="index">
            </div>
        </div>
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
      //received new hitstillprize message, create it and set timeout to delete the whole deal
      receivedPoints(data) {
          const key = Math.random().toString(36).substring(7);
          this.$set(this.messages, key, {message: `${data} clicks till next prize.`, key});
          setTimeout(() => {
              this.$delete(this.messages, key);
          }, 2000);
      }
  }
}
</script>


<style scoped>
    #pointContainer {
        width: 100%;
        overflow:hidden;
        margin-top: 20px;
    }
    #pointTitle {
        padding-left: 5px;
        padding-bottom: 5px;
        font-size: 25px;
        color: #fff;
        width: 90%;
        max-width: 500px;
        margin: 0 auto;
    }
    .pointMessage {
        position:absolute;
        width: 100%;
        text-align:center;
        animation: messageAnim 2s ease-out;
        white-space: nowrap;
    }
    @keyframes messageAnim {
        from {opacity: 1; font-size: 10px; bottom: -5%;}
        to {opacity: 0; font-size: 50px; bottom: 50%;}
    }
    #pointsGraphic {
        width: 90%;
        max-width: 500px;
        max-height: 30%;
        display:flex;
        flex-direction:row;
        position:relative;
        margin: 0 auto;
        flex-wrap:wrap;
    }
    .pointBubble {
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 10px;
        margin: 5px;
        animation: pointBubbleEntry 0.2s ease-in-out;
    }
    @keyframes pointBubbleEntry {
        from {transform:scale(0);}
        to {transform:scale(1)}
    }
</style>
