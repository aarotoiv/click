<template>
  <div id="main">
    <div v-if="connecting" id="loading">
      <p>loading</p>
    </div>
    <div v-if="waitingForRetry" id="retry">
      <p id="retryTitle">
        You're out of points. Click the button to retry.
      </p>
      <button type="button" id="retryButton" v-on:click="retry">
        RETRY
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
      console.log("ATTEMPTING RETRY");
      SocketHandler.retry(this.socket);
    },
    doRetry(points) {
      console.log("HERE");
      this.$set(this, 'points', points);
      this.$set(this, 'waitingForRetry', false);
    }
  }
}
</script>


<style scoped>
  #loading {
    text-align:center;
    font-size: 50px;
    line-height: 100%;
  }
  #retryTitle {
    text-align:center;
    font-size: 50px;
    margin-top: 20px;
  }
  #retryButton {
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
  #retryButton:active {
      border:none;
      outline:none;
  }
</style>
