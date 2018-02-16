<template>
  <div class="mr-4">
    <div>
      <div class="text-xs-left">
        {{$t(fieldDetails.labelTextTKey) }}
      </div>
      <v-flex xs12>
        <v-switch v-bind:label="fieldLabel" v-model="currentField"></v-switch>
      </v-flex>
    </div>
    <SwitchField :fieldDetails="fieldDetails" :switchFieldValue="currentField" v-bind:resourceModel="resourceModel"></SwitchField>
    <v-text-field name="title" :label="$t(fieldDetails.labelTextTKey) + ' ' + $t(fieldDetails.suffixTKey)" id="title" v-model="currentField"></v-text-field>
  </div>
</template>
<script>
import SwitchField from '@/components/form-fields/SwitchField'
// import { required, minLength } from 'vuelidate/lib/validators'
// import _ from 'lodash'
export default {
  components: {
    SwitchField
  },
  props: ["resourceModel", "fieldDetails", "fieldOptions"],
  data() {
    return {
      fieldLabel: "No"
    }
  },
  computed: {
    currentField: {
      get() {
        this.fieldDetails.originalValue = false
        if (this.resourceModel) {
          // Features are stored on the server as a list of field keys
          // The resourceModel represents this list
          // Any feature in that list should have a value of true
          // (ie - the property in question has that feature)
          if (this.resourceModel.includes(this.fieldDetails.fieldName)) {
            // debugger
            this.fieldDetails.originalValue = true
          }
        }
        return this.fieldDetails.originalValue
      },
      // // setter
      set(newValue) {
        this.fieldDetails.newValue = newValue
        this.$store.dispatch('updatePendingPropertyFeatureChanges', this.fieldDetails, newValue)
      }
    }
  },
  methods: {}
}

</script>
