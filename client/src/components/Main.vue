<template>
  <div id="main">
    <div v-if="connecting" id="loading">
      <p>loading</p>
    </div>
    <div v-else id="container">
      <p>asdfasdfs</p>
    </div>
  </div>
</template>

<script>
import SocketHandler from '../util/SocketHandler';
export default {
  name: 'Main',
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
    SocketHandler.initialize(this.joined)
    .then(socket => {
      this.$set(this, 'socket', socket);
    });
  },
  methods: {
    joined(points) {
      this.$set(this, 'points', points);
      this.$set(this, 'connecting', false);
      console.log(points);
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
