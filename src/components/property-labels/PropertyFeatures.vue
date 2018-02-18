<template>
  <v-layout row>
    <v-flex xs12>
      <v-layout wrap row>
        <template v-for="(translations) in propertyFieldTranslations">
          <v-flex xs12 sm3>
            <LabelTranslations v-bind:resourceModel="translations"></LabelTranslations>
          </v-flex>
        </template>
      </v-layout>
      <form @submit.prevent="onUpdateProperty">
        <v-layout row>
          <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
        </v-layout>
        <v-layout wrap row>
          <template v-for="(translations) in propertyFieldTranslations">
            <v-flex xs12 sm3>
              <!-- <FeatureField :translations="translations" v-bind:resourceModel="currentProperty.features_list"></FeatureField> -->
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
import LabelTranslations from '@/components/property-labels/LabelTranslations'
import FormSubmitter from '@/components/form-fields/FormSubmitter'
// import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    LabelTranslations,
    FormSubmitter
  },
  props: ["currentProperty"],
  watch: {},
  data() {
    return {}
  },
  computed: {
    // featureFields: function() {
    //   let featureFields = []
    //   if (this.$store.state.propertyFieldsStore.fieldOptions.extras) {
    //     this.$store.state.propertyFieldsStore.fieldOptions.extras.forEach(function(feature) {
    //       let featureField = {
    //         labelTextTKey: feature,
    //         // tooltipTextTKey: "toolTips.visible",
    //         fieldName: feature,
    //         inputType: "trueFalse",
    //         fieldDbType: "boolean",
    //       }
    //       featureFields.push(featureField)
    //     })
    //   }
    //   return featureFields
    // },
    propertyFieldTranslations: function() {
      // debugger
      return this.$store.state.propertyFieldsStore.propertyFieldTranslations
    },
    hasPendingChanges: function() {
      return this.$store.state.propertyFieldsStore.hasPendingChanges
    }
  },
  mounted: function() {
    let fieldNames = "extras"
    this.$store.dispatch('loadFieldTranslations', fieldNames)
  },
  methods: {
    onUpdateProperty() {
      this.$store.dispatch('updatePropertyFeatures')
    },
  }
}

</script>
