<template>
  <v-container>
    <!-- basic -->
    <keep-alive>
      <component :is="propertyDetailsComponent" v-bind:property="currentProperty" v-bind:currentProperty="currentProperty"></component>
    </keep-alive>
  </v-container>
</template>
<script>
import GeneralPropertyDetails from '@/components/properties/GeneralPropertyDetails'
// import TextPropertyDetails from '@/components/properties/TextPropertyDetails'
// import ExtrasPropertyDetails from '@/components/properties/ExtrasPropertyDetails'
import SalePropertyDetails from '@/components/properties/SalePropertyDetails'
export default {
  data() {
    return {}
  },
  components: {
    GeneralPropertyDetails,
    // TextPropertyDetails,
    // ExtrasPropertyDetails,
    SalePropertyDetails,
  },
  computed: {
    propertyDetailsComponent() {
      let currentTabName = this.$route.params["tabName"]
      // TODO: - use lodash for below:
      let currentPropertyTab = this.findBy(this.$store.state.navigationStore.propertyTabs, currentTabName, 'tabValue')
      return currentPropertyTab[0].componentName
    },
    currentProperty() {
      return this.$store.state.propertiesStore.currentProperty
    }
  },
  mounted: function() {
    this.$store.dispatch('loadProperty', this.$route.params["id"])
  },
  methods: {
    findBy: function(list, value, column) {
      return list.filter(function(item) {
        return item[column].includes(value)
      })
    },
    orderBy: function(list, order, column) {
      return list.sort(function(a, b) {
        return order * (a[column] - b[column])
      })
    }
  },
}

</script>
