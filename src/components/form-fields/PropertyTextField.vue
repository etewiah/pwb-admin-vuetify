<template>
  <v-text-field name="locale" :label="$t('title')" v-model="model" v-on:keyup="updatePendingChanges"></v-text-field>
</template>
<script>
import _ from 'lodash'
export default {
  components: {},
  props: ["resourceModel", "fieldName", "hasPendingChanges"],
  data() {
    return {
      model: ""
    }
  },
  watch: {
    'hasPendingChanges' (newValue, oldValue) {
      if (oldValue === true) {
        this.model = this.resourceModel[this.fieldName]
      }
      // this.model = newValue
      // _.cloneDeep(newValue[this.localeTitleFieldName])
    },
    // 'model': 'updateFields'
    resourceModel: {
      handler(newValue, oldVal) {
        this.model = _.cloneDeep(newValue[this.fieldName])
        console.log('resourceModel Changed')
        // console.log(val)
      },
      deep: true
    },
    fieldName: {
      handler(newValue, oldVal) {
        this.model = _.cloneDeep(this.resourceModel[newValue])
        console.log('fieldName Changed')
        // console.log(val)
      },
      deep: true
    },
  },
  computed: {
    // model: {
    //   get() {
    //     let model = this.resourceModel[this.fieldName]
    //     // _.cloneDeep(this.resourceModel[this.fieldName])
    //     return model
    //     // this.textFieldValue
    //   },
    //   set(newValue) {
    //     this.$emit('updatePendingChanges', newValue)
    //   }
    // }
  },
  methods: {
    updatePendingChanges(event) {
      // with :value="model"
      // need to retrieve updated value myself
      let newValue = event.currentTarget.value
      this.$emit('updatePendingChanges', newValue)

      // if (this.currentProperty[this.localeTitleFieldName] !== newValue) {
      //   this.pendingChanges[this.localeTitleFieldName] = newValue
      // } else {
      //   delete this.pendingChanges[this.localeTitleFieldName]
      // }
      // this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
    },
  }
}

</script>
