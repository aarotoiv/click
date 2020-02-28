<template>
  <div id="main">
    <div v-if="connecting" id="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="waitingForRetry" id="retry">
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
  //onmount initialize sockets and connect to the server. save socket to state
  mounted() {
    this.$set(this, 'connecting', true);
    SocketHandler.initialize(this.joined, this.receivedPoints, this.outOfPoints, this.doRetry)
    .then(socket => {
      this.$set(this, 'socket', socket);
    });
  },
  //methods
  methods: {
    //you joined, set points and connecting to false
    joined(points) {
      this.$set(this, 'points', points);
      this.$set(this, 'connecting', false);
    },
    //click happened, goes to emitter
    click() {
      SocketHandler.click(this.socket);
    },
    //your click was registered and received a response from the websocket
    receivedPoints(data) {
      this.$set(this, 'points', this.points + data.points);
      //call child components function to inform it about a new hitstillprize message
      this.$refs.pointsComponent.receivedPoints(data.hitsTillPrize);
    },
    //out of points
    outOfPoints() {
      this.$set(this, 'waitingForRetry', true)
    },
    //retry happened, goes to emitter
    retry() {
      SocketHandler.retry(this.socket);
    },
    //retry confirmed by websocket, set points
    doRetry(points) {
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
    line-height: 100vh;
  }
  #retryTitle {
    text-align:center;
    font-size: 50px;
    margin-top: 10%;
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
