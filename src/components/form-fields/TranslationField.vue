<template>
  <div class="mr-4">
    <v-text-field name="translation" @change="onPendingChange" :label="$t(translation.locale)" v-model="currentField"></v-text-field>
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
  props: ["translation", "fieldDetails", "fieldOptions"],
  data() {
    return {}
  },
  computed: {
    selectItems: function() {
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
    currentField: {
      get() {
        return _.clone(this.translation.i18n_value)
      },
      // // setter
      set(newValue) {
        this.$emit('translationChanged', this.translation, newValue)
      }
    }
  },
  methods: {
    // this only triggers when focus is moved from input
    onPendingChange(newValue) {
      // debugger
    }
  }
}

</script>
