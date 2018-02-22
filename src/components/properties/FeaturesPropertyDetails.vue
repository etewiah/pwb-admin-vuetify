<template>
  <v-layout row>
    <v-flex xs12>
      <form @submit.prevent="onUpdateProperty">
        <v-layout row>
          <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
        </v-layout>
        <v-layout wrap row>
          <template v-for="(fieldDetails) in featureFields">
            <v-flex xs12 sm3>
              <FeatureField :cancelPendingChanges="cancelPendingChanges" :fieldDetails="fieldDetails" v-bind:resourceModel="featuresList"></FeatureField>
            </v-flex>
          </template>
        </v-layout>
        <v-layout row>
          <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>
</template>
<script>
import FeatureField from '@/components/form-fields/FeatureField'
import FormSubmitter from '@/components/form-fields/FormSubmitter'
// import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    FeatureField,
    FormSubmitter
  },
  props: ["currentProperty"],
  watch: {},
  data() {
    return {
      // cancelPendingChanges: false
    }
  },
  computed: {
    featuresList() {
      return this.$store.state.propertyFeaturesStore.propertyFeaturesList
    },
    featureFields() {
      let featureFields = []

      if (this.$store.state.propertiesStore.fieldOptions.extras) {
        // For each possible feature a prop could have I create a field
        this.$store.state.propertiesStore.fieldOptions.extras.forEach(function(feature) {
          let featureField = {
            labelTextTKey: feature,
            // tooltipTextTKey: "toolTips.visible",
            fieldName: feature,
            inputType: "trueFalse",
            fieldDbType: "boolean",
          }
          featureFields.push(featureField)
        })
      }
      return featureFields
    },
    cancelPendingChanges() {
      return this.$store.state.propertyFeaturesStore.cancelPendingChanges
    },
    hasPendingChanges() {
      return this.$store.state.propertyFeaturesStore.hasPendingChanges
    }
  },
  mounted() {
    // let fieldNames = "extras"
    // this.$store.dispatch('loadPropertyFieldOptions', fieldNames)
  },
  methods: {
    changesCanceled() {

      this.pendingChanges = {}
      // below will trigger to child input components to reset
      // this.cancelPendingChanges = true
      this.$store.commit('setPropFeaturesCancelPendingChanges', true)
      this.$store.commit('setPropFeaturesHasPendingChanges', false)
      // this.hasPendingChanges = false
    },
    onUpdateProperty() {
      this.$store.dispatch('updatePropertyFeatures')
    },
  }
}

</script>
