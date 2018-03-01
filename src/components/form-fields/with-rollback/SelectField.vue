<template>
  <div>
    <div class="text-xs-left">
      {{$t(fieldDetails.labelTextTKey) }}:
    </div>
    <v-select :items="selectItems" v-model="localFieldValue" label="Select" @change="fieldChangeHandler" item-text="name" single-line bottom></v-select>
  </div>
</template>
<script>
// import _ from 'lodash'
export default {
  props: ["fieldDetails", "currentFieldValue", "cancelPendingChanges", "fieldOptions"],
  data() {
    return {
      localFieldValue: "",
      originalValue: "",
    }
  },
  watch: {
    'cancelPendingChanges' (newValue, oldValue) {
      if (oldValue === false) {
        // when cancelPendingChanges on parent changes from 
        // false to true
        // reset model to its original value
        this.localFieldValue = this.originalValue
      }
    },
    currentFieldValue: {
      handler(newValue, oldVal) {
        this.localFieldValue = newValue
        this.originalValue = newValue
      },
      // deep: true,
      immediate: true,
    },
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
  },
  methods: {
    fieldChangeHandler(newValue) {
      // let newValue = event.currentTarget.value
      this.fieldDetails.newValue = newValue
      this.$store.dispatch('updatePendingChanges', this.fieldDetails)
    }
  }
}

</script>
