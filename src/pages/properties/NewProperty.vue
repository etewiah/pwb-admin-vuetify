<template>
  <v-container>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <form @submit.prevent="onCreateProperty">
          <v-layout row>
            <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
          </v-layout>
          <v-layout wrap row>
            <v-flex xs12 sm3>
              <template v-for="(fieldDetails) in mainInputFields1">
                <FieldResolver :fieldDetails="fieldDetails" :fieldOptions="fieldOptions" v-bind:resourceModel="newProperty"></FieldResolver>
              </template>
            </v-flex>
          </v-layout>
          <v-layout row>
            <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import FieldResolver from '@/components/form-fields/FieldResolver'
import FormSubmitter from '@/components/form-fields/FormSubmitter'
// import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    FieldResolver,
    FormSubmitter
  },
  data() {
    return {
      mainInputFields1: [{
        labelTextTKey: "fieldLabels.ref",
        tooltipTextTKey: "toolTips.ref",
        fieldName: "reference",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {}
        }
      }, {
        labelTextTKey: "fieldLabels.tipo",
        tooltipTextTKey: "",
        fieldName: "prop_type_key",
        inputType: "select",
        optionsKey: "property-types",
      }, {
        labelTextTKey: "fieldLabels.estado",
        tooltipTextTKey: "",
        fieldName: "prop_state_key",
        inputType: "select",
        optionsKey: "property-states",
      }],
    }
  },
  computed: {
    hasPendingChanges: function() {
      return true
      // return this.$store.state.propertiesStore.hasPendingChanges
    },
    newProperty: function() {
      return this.$store.state.propertiesStore.newProperty
    },
    fieldOptions: function() {
      return this.$store.state.propertiesStore.fieldOptions
    },
  },
  mounted: function() {
    let fieldNames = "property-origins, property-types, property-states, property-labels, currencies, area-units"
    this.$store.dispatch('loadPropertyFieldOptions', fieldNames)
    // this.$store.commit('setNewProperty')
  },
  methods: {
    onCreateProperty() {
      this.$store.dispatch('createProperty')
    },
  },
}

</script>
