<template>
  <div class="sidebar">
    <md-whiteframe md-elevation="5">
      <md-toolbar class="md-account-header">
        <h1>Dashboard</h1>
        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon> <span>Inbox</span>
          </md-list-item>
        </md-list>
      </md-toolbar>
    </md-whiteframe>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
