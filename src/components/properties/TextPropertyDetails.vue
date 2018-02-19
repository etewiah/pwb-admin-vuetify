<template>
  <v-layout row>
    <template v-for="(locale) in currentLocales">
      <v-flex xs12 sm6 class="mr-4">
        <PropertyTextField v-bind:locale="locale" v-bind:currentProperty="currentProperty"></PropertyTextField>
      </v-flex>
    </template>
  </v-layout>
</template>
<script>
import PropertyTextField from '@/components/form-fields/PropertyTextField'
// import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    PropertyTextField
  },
  props: ["currentProperty"],
  watch: {},
  data() {
    return {
      currentLocales: ["en", "es"]
    }
  },
  computed: {
    // featureFields: function() {
    //   let featureFields = []
    //   return featureFields
    // },
  },
  mounted: function() {
    // let fieldNames = "extras"
    // this.$store.dispatch('loadPropertyFieldOptions', fieldNames)
  },
  methods: {
    // onUpdateProperty() {
    //   this.$store.dispatch('updatePropertyFeatures')
    // },
  }
}

</script>
