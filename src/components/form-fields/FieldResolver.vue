<template>
  <div class="mr-4">
    <template v-if="fieldDetails.inputType == 'number'">
      <v-text-field name="title" :label="$t(fieldDetails.labelTextTKey) + ' ' + $t(fieldDetails.suffixTKey)" id="title" v-model="currentField"></v-text-field>
    </template>
    <template v-else-if="fieldDetails.inputType == 'select'">
      <div class="text-xs-left">
        {{$t(fieldDetails.labelTextTKey) }}:
      </div>
      <v-select :items="selectItems" v-model="currentField" label="Select" item-text="name" single-line bottom></v-select>
    </template>
    <template v-else-if="fieldDetails.inputType == 'trueFalse'">
      <SwitchField :fieldDetails="fieldDetails" :switchFieldValue="resourceModel[fieldDetails.fieldName]" v-bind:resourceModel="resourceModel"></SwitchField>
      <!--       <div class="text-xs-left">
        {{$t(fieldDetails.labelTextTKey) }}
      </div>
      <v-flex xs12>
        <v-switch v-bind:label="`${resourceModel[fieldDetails.fieldName]}`" @change="booleanFieldHandler" v-model="resourceModel[fieldDetails.fieldName]"></v-switch>
      </v-flex> -->
    </template>
    <template v-else>
      <v-text-field name="title" :label="$t(fieldDetails.labelTextTKey) + ' ' + $t(fieldDetails.suffixTKey)" id="title" v-model="currentField"></v-text-field>
    </template>
  </div>
</template>
<script>
import SwitchField from '@/components/form-fields/SwitchField'
// import { required, minLength } from 'vuelidate/lib/validators'
import _ from 'lodash'
export default {
  components: {
    SwitchField
  },
  props: ["resourceModel", "fieldDetails", "fieldOptions"],
  data() {
    return {}
  },
  computed: {
    selectItems: function() {
      let untranslated = this.fieldOptions[this.fieldDetails.optionsKey] || null
      let selectItems = [{name: "", value: ""}]
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
    currentField: {
      get() {
        // if (this.fieldDetails.inputType === "trueFalse") {
        //   if (this.resourceModel[this.fieldDetails.fieldName]) {
        //     return true
        //   } else {
        //     return false
        //   }
        // }
        return _.clone(this.resourceModel[this.fieldDetails.fieldName])
      },
      // // setter
      set(newValue) {
        this.fieldDetails.newValue = newValue
        this.$store.dispatch('updatePendingChanges', this.fieldDetails, newValue)
      }
    }
  },
  methods: {
    // booleanFieldHandler(newValue) {
    //   // if I was to bind v-switch to currentField, the setter would trigger
    //   // but the UI would not trigger
    //   // I'm forced to bind v-switch to resourceModel[fieldDetails.fieldName] which means
    //   // currentField setter does not trigger on change so had
    //   // to create this..
    //   this.fieldDetails.newValue = newValue
    //   this.$store.dispatch('updatePendingChanges', this.fieldDetails, newValue)
    // }
  }
}

</script>
