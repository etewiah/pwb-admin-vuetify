<template>
  <div>
    <v-tabs>
      <v-tabs-bar class="cyan" dark>
        <template v-for="(tab, index) in propertyTabs">
          <v-tabs-item :to="{name: 'singlePropertyTab', params: {tabName: tab.tabValue}}" ripple>
            {{ $t(tab.tabTitleKey) }}
          </v-tabs-item>
        </template>
        <v-tabs-slider color="yellow"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
      </v-tabs-items>
    </v-tabs>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <router-view/>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "dd",
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  computed: {
    propertyTabs() {
      return this.$store.state.navigationStore.propertyTabs
    },
    // property() {
    //   return this.$store.state.property
    // }
  },
  mounted: function() {
    this.$store.dispatch('loadProperty', this.$route.params["id"])
  },
  methods: {

  }
}

</script>
