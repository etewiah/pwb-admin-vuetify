<template>
  <div>
    <div class="text-xs-left">
      {{$t(fieldDetails.labelTextTKey) }}
    </div>
    <v-flex xs12>
      <v-switch v-bind:label="fieldLabel" @change="booleanFieldHandler" v-model="fieldValue"></v-switch>
    </v-flex>
  </div>
</template>
<script>
// import _ from 'lodash'
export default {
  props: ["resourceModel", "fieldDetails", "switchFieldValue"],
  data() {
    return {
      fieldValue: false,
      fieldLabel: "No"
    }
  },
  watch: {
    switchFieldValue: function (val) {
      this.fieldValue = val
      if (val) {
        this.fieldLabel = "Yes"
      }
    },
  },

  methods: {
    booleanFieldHandler(newValue) {
      if (newValue) {
        this.fieldLabel = "Yes"
      } else {
        this.fieldLabel = "No"
      }
      // if I was to bind v-switch to currentField, the setter would trigger
      // but the UI would not trigger
      this.fieldDetails.newValue = newValue
      this.$store.dispatch('updatePendingChanges', this.fieldDetails, newValue)
    }
  }
}

</script>
