<template>
  <div>
    <div class="text-xs-left">
      {{$t(fieldDetails.labelTextTKey) }}
    </div>
    <v-flex xs12>
      <v-switch v-bind:label="fieldLabel" @change="fieldChangeHandler" v-model="fieldValue"></v-switch>
    </v-flex>
  </div>
</template>
<script>
// import _ from 'lodash'
export default {
  props: ["fieldDetails", "switchFieldValue", "cancelPendingChanges"],
  data() {
    return {
      fieldValue: false,
      originalValue: false,
      // fieldLabel: "No"
    }
  },
  watch: {
    'cancelPendingChanges' (newValue, oldValue) {
      if (oldValue === false) {
        // when cancelPendingChanges on parent changes from 
        // false to true
        // reset model to its original value
        this.fieldValue = this.originalValue
      }
    },
    switchFieldValue: {
      handler(newValue, oldVal) {
        this.fieldValue = newValue
        this.originalValue = newValue
      },
      // deep: true,
      immediate: true,
    },
    //     switchFieldValue: function(val) {
    //   this.fieldValue = val
    //   this.originalValue = val
    //   // if (val) {
    //   //   this.fieldLabel = "Yes"
    //   // }
    // },
  },
  computed: {
    fieldLabel() {
      if (this.fieldValue) {
        return "Yes"
      } else {
        return "No"
      }
    }
  },
  methods: {
    fieldChangeHandler(newValue) {
      // if (newValue) {
      //   this.fieldLabel = "Yes"
      // } else {
      //   this.fieldLabel = "No"
      // }
      // if I was to bind v-switch to currentField, the setter would trigger
      // but the UI would not trigger
      this.fieldDetails.newValue = newValue
      this.$store.dispatch('updatePendingChanges', this.fieldDetails, newValue)
    }
  }
}

</script>
