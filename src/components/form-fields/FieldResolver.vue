<template>
  <div class="mr-4">
    <template v-if="fieldDetails.inputType == 'number'">
      <TextField :fieldDetails="fieldDetails" :cancelPendingChanges="cancelPendingChanges" 
      :currentFieldValue="this.resourceModel[this.fieldDetails.fieldName]"></TextField>
    </template>
    <template v-else-if="fieldDetails.inputType == 'select'">
      <div class="text-xs-left">
        {{$t(fieldDetails.labelTextTKey) }}:
      </div>
      <v-select :items="selectItems" v-model="currentFieldValue" label="Select" item-text="name" single-line bottom></v-select>
    </template>
    <template v-else-if="fieldDetails.inputType == 'trueFalse'">
      <SwitchField :fieldDetails="fieldDetails" :cancelPendingChanges="cancelPendingChanges" :switchFieldValue="currentFieldValue"></SwitchField>
    </template>
    <template v-else>
      <v-text-field name="title" :label="$t(fieldDetails.labelTextTKey) + ' ' + $t(fieldDetails.suffixTKey)" id="title" v-model="currentFieldValue"></v-text-field>
    </template>
  </div>
</template>
<script>
import SwitchField from '@/components/form-fields/with-rollback/SwitchField'
import TextField from '@/components/form-fields/with-rollback/TextField'
// import { required, minLength } from 'vuelidate/lib/validators'
import _ from 'lodash'
export default {
  components: {
    SwitchField,
    TextField
  },
  props: ["resourceModel", "fieldDetails", "fieldOptions", "cancelPendingChanges"],
  data() {
    return {}
  },
  computed: {
    selectItems() {
      let untranslated = this.fieldOptions[this.fieldDetails.optionsKey] || null
      let selectItems = [{ name: "", value: "" }]
      let i18n = this.$i18n
      let fieldName = this.fieldDetails.fieldName
      if (untranslated) {
        untranslated.forEach(function(optionKey) {
          let name = i18n.t(optionKey)
          if (fieldName === "currency") {
            optionKey = optionKey.toUpperCase()
          }
          selectItems.push({
            name: name,
            value: optionKey
          })
        })
        // debugger
      }
      return selectItems
    },
    currentFieldValue: {
      get() {
        this.fieldDetails.originalValue = _.clone(this.resourceModel[this.fieldDetails.fieldName])
        return this.fieldDetails.originalValue
      },
      // // setter
      set(newValue) {
        this.fieldDetails.newValue = newValue
        this.$store.dispatch('updatePendingChanges', this.fieldDetails, newValue)
      }
    }
  },
  methods: {}
}

</script>
