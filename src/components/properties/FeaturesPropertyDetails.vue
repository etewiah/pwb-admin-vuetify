<template>
  <v-layout row>
    <v-flex xs12>
      <form @submit.prevent="onUpdateProperty">
        <v-layout row>
          <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
        </v-layout>
        <v-layout wrap row>
          <template v-for="(fieldDetails) in featureFields">
            <v-flex xs12 sm3>
              <FeatureField :fieldDetails="fieldDetails" v-bind:resourceModel="currentProperty.features_list"></FeatureField>
            </v-flex>
          </template>
        </v-layout>
        <v-layout row>
          <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
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
    return {}
  },
  computed: {
    featureFields: function() {
      let featureFields = []
      if (this.$store.state.propertiesStore.fieldOptions.extras) {
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
    hasPendingChanges: function() {
      return this.$store.state.propertiesStore.hasPendingChanges
    }
  },
  mounted: function() {
    let fieldNames = "extras"
    this.$store.dispatch('loadPropertyFieldOptions', fieldNames)
  },
  methods: {
    onUpdateProperty() {
      this.$store.dispatch('updatePropertyFeatures')
    },
  }
}

</script>
