<template>
  <div class="mr-4 mb-1">
    <template v-if="fieldDetails.inputType == 'number'">
      <TextField :fieldDetails="fieldDetails" :cancelPendingChanges="cancelPendingChanges" :currentFieldValue="this.resourceModel[this.fieldDetails.fieldName]" v-on:updatePendingChanges="updatePendingChanges(...arguments)"></TextField>
    </template>
    <template v-else-if="fieldDetails.inputType == 'select'">
      <SelectField :fieldDetails="fieldDetails" :currentFieldValue="this.resourceModel[this.fieldDetails.fieldName]" :fieldOptions="fieldOptions" :cancelPendingChanges="cancelPendingChanges"></SelectField>
      <!--       <div class="text-xs-left">
        {{$t(fieldDetails.labelTextTKey) }}:
      </div>
      <v-select :items="selectItems" v-model="currentFieldValue" label="Select" item-text="name" single-line bottom></v-select>
 -->
    </template>
    <template v-else-if="fieldDetails.inputType == 'trueFalse'">
      <SwitchField :fieldDetails="fieldDetails" :cancelPendingChanges="cancelPendingChanges" :switchFieldValue="this.resourceModel[this.fieldDetails.fieldName]"></SwitchField>
    </template>
    <template v-else>
      <TextField :fieldDetails="fieldDetails" :cancelPendingChanges="cancelPendingChanges" :currentFieldValue="this.resourceModel[this.fieldDetails.fieldName]" v-on:updatePendingChanges="updatePendingChanges(...arguments)"></TextField>
    </template>
  </div>
</template>
<script>
import SwitchField from '@/components/form-fields/with-rollback/SwitchField'
import TextField from '@/components/form-fields/with-rollback/TextField'
import SelectField from '@/components/form-fields/with-rollback/SelectField'
// import { required, minLength } from 'vuelidate/lib/validators'
import _ from 'lodash'
export default {
  components: {
    SwitchField,
    TextField,
    SelectField
  },
  props: ["resourceModel", "fieldDetails", "fieldOptions", "cancelPendingChanges"],
  data() {
    return {}
  },
  computed: {
    // currentFieldValue: {
    //   get() {
    //     this.fieldDetails.originalValue = _.clone(this.resourceModel[this.fieldDetails.fieldName])
    //     return this.fieldDetails.originalValue
    //   },
    //   // // setter
    //   set(newValue) {
    //     this.fieldDetails.newValue = newValue
    //     this.$store.dispatch('updatePendingChanges', this.fieldDetails, newValue)
    //   }
    // }
  },
  methods: {
    updatePendingChanges(fieldDetailsWithNewValue) {
      this.$emit('updatePendingChanges', fieldDetailsWithNewValue)

      // if (this.currentProperty[fieldName] !== newValue) {
      //   this.pendingChanges[fieldName] = newValue
      // } else {
      //   delete this.pendingChanges[fieldName]
      // }
      // this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
    },
  }
}

</script>
