<template>
  <md-toolbar class="navigation">
    <h2 class="md-title">Tracking Dashboard</h2>
  </md-button>

</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      msg: this.$store.state.user.first_name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navigation {
    width: 100%;
    height: 40px;
  }
</style>
