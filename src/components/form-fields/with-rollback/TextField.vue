<template>
  <div>
    <v-text-field name="text-input" :label="$t(fieldDetails.labelTextTKey) + ' ' + $t(fieldDetails.suffixTKey)" v-on:keyup="fieldChangeHandler" v-model="localFieldValue"></v-text-field>
  </div>
</template>
<script>
// import _ from 'lodash'
export default {
  props: ["fieldDetails", "currentFieldValue", "cancelPendingChanges"],
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

  },
  methods: {
    fieldChangeHandler(event) {
      let newValue = event.currentTarget.value
      this.fieldDetails.newValue = newValue
      this.$emit('updatePendingChanges', this.fieldDetails)
      this.$store.dispatch('updatePendingChanges', this.fieldDetails)
    }
  }
}

</script>
