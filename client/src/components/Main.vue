<template>
  <div id="main">
    <div v-if="connecting" id="loading">
      <p>loading</p>
    </div>
    <div v-if="waitingForRetry" id="retry">
      <p id="retryTitle">
        You're out of points. Click the button to retry.
      </p>
      <button type="button" id="retryButton" v-bind:click="retry">
        
      </button>
    </div>
    <div v-else id="container">
      <ClickButton @clicked="click"/>
      <Points ref="pointsComponent" v-bind:points="points" />
    </div>
  </div>
</template>

<script>
import SocketHandler from '../util/SocketHandler';
import ClickButton from './ClickButton';
import Points from './Points';

export default {
  name: 'Main',
  components: {
    ClickButton,
    Points
  },
  data() {
    return {
      socket: null,
      connecting: false,
      waitingForRetry: false,
      points: 0
    }
  },
  mounted() {
    this.$set(this, 'connecting', true);
    SocketHandler.initialize(this.joined, this.receivedPoints, this.outOfPoints, this.doRetry)
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
      this.$refs.pointsComponent.receivedPoints(data.hitsTillPrize);
    },
    outOfPoints() {
      this.$set(this, 'waitingForRetry', true)
    },
    retry() {
      SocketHandler.retry(this.socket);
    },
    doRetry(points) {
      this.$set(this, 'points', points);
      this.$set(this, 'waitingForRetry', false);
    }
  }
}
</script>


<style scoped>

</style>
