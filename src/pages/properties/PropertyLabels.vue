<template>
  <div>
    <v-tabs>
      <v-tabs-bar class="cyan" dark>
        <template v-for="(tab, index) in propertyLabelTabs">
          <v-tabs-item :to="{name: 'propertyLabels', params: {labelName: tab.tabValue}}" ripple>
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
    return {}
  },
  computed: {
    propertyLabelTabs() {
      return this.$store.state.navigationStore.propertyLabelTabs
    },
  },
  mounted: function() {
    // this.$store.dispatch('loadProperty', this.$route.params["id"])
  },
  methods: {

  }
}

</script>
