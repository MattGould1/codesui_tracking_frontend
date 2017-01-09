<template>
  <div class="navigation">
    <h1>navigation</h1>
    <h2>{{ msg }}<h2>
  </div>
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

</style>
