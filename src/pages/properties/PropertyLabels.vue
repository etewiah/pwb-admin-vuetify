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
            <component :is="propertyLabelsComponent"></component>
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
      let currentLabelsTab = _.find(this.propertyLabelTabs, { tabValue: currentTabName })
      return currentLabelsTab.componentName
    },
  },
  mounted: function() {
    // this.$store.dispatch('loadProperty', this.$route.params["id"])
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     console.log(to)
  //     if (to.params.labelName === "features") {
  //       let fieldNames = "extras"
  //       vm.$store.dispatch('loadFieldTranslations', fieldNames)
  //     }
  //   })
  //   // called before the route that renders this component is confirmed.
  //   // does NOT have access to `this` component instance,
  //   // because it has not been created yet when this guard is called!
  // },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function() {
      let fieldNames = "extras"
      if (this.$route.params.labelName === "property-types") {
        fieldNames = "property-types"
      }
      if (this.$route.params.labelName === "property-states") {
        fieldNames = "property-states"
      }
      this.$store.dispatch('loadFieldTranslations', fieldNames)
    },
  },
  created: function() {
    this.fetchData()
  },
  // beforeRouteUpdate(to, from, next) {

  //   // called when the route that renders this component has changed,
  //   // but this component is reused in the new route.
  //   // For example, for a route with dynamic params `/foo/:id`, when we
  //   // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
  //   // will be reused, and this hook will be called when that happens.
  //   // has access to `this` component instance.
  // },
  // beforeRouteLeave(to, from, next) {
  //   // called when the route that renders this component is about to
  //   // be navigated away from.
  //   // has access to `this` component instance.
  // }
}

</script>
