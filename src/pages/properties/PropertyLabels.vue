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
        <v-container>
          <!-- basic -->
          <keep-alive>
            <component :is="propertyLabelsComponent" ></component>
          </keep-alive>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import PropertyStates from '@/components/property-labels/PropertyStates'
import PropertyTypes from '@/components/property-labels/PropertyTypes'
import PropertyFeatures from '@/components/property-labels/PropertyFeatures'
import _ from 'lodash'
export default {
  data() {
    return {}
  },
  components: {
    PropertyFeatures,
    PropertyTypes,
    PropertyStates
  },
  computed: {
    propertyLabelTabs() {
      return this.$store.state.navigationStore.propertyLabelTabs
    },
    propertyLabelsComponent() {
      // The component to be used is retrieved from the navication store
      let currentTabName = this.$route.params["labelName"]
      let currentLabelsTab = _.find(this.propertyLabelTabs, {tabValue: currentTabName})
      return currentLabelsTab.componentName
    },
  },
  mounted: function() {
    // this.$store.dispatch('loadProperty', this.$route.params["id"])
  },
  methods: {

  }
}

</script>
