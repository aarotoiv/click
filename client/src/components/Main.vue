<template>
  <div id="main">
    <div v-if="connecting" id="loading">
      <p>loading</p>
    </div>
    <div v-else id="container">
      <ClickButton @clicked="click"/>
    </div>
  </div>
</template>

<script>
import SocketHandler from '../util/SocketHandler';
import ClickButton from './ClickButton';

export default {
  name: 'Main',
  components: {
    ClickButton
  },
  data() {
    return {
      socket: null,
      connecting: false,
      pendingClick: false,
      points: 0
    }
  },
  mounted() {
    this.$set(this, 'connecting', true);
    SocketHandler.initialize(this.joined, this.receivedPoints)
    .then(socket => {
      this.$set(this, 'socket', socket);
    });
  },
  methods: {
    joined(points) {
      this.$set(this, 'points', points);
      this.$set(this, 'connecting', false);
    },
    click() {
      SocketHandler.click(this.socket);
    },
    receivedPoints(data) {
      this.$set(this, 'points', this.points + data.points);
      console.log(data);
    }
  }
}
</script>


<style scoped>
  p {
    margin: 0;
    padding:0;
  }

</style>
