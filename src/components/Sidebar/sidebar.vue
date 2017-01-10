<template>
  <div class="sidebar">
    <md-whiteframe md-elevation="5">
      <md-list>

        <md-list-item>
          <router-link tag="span" :to="{ name: 'home' }" exact>
            <md-icon>home</md-icon> <span>Overview</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link tag="span" :to="{ name: 'graphs' }" exact>
            <md-icon>trending_up</md-icon> <span>Graphs</span>
          </router-link>
        </md-list-item>

        <md-list-item>
          <router-link tag="span" :to="{ name: 'reports' }" exact>
            <md-icon>date_range</md-icon> <span>Reports</span>
          </router-link>
        </md-list-item>

      </md-list>
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
  .sidebar {
    width: 100%
  }

</style>
