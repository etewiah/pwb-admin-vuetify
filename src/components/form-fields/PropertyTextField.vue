<template>
  <v-text-field name="locale" :multi-line="multiLine" :label="$t('title')" v-model="model" v-on:keyup="updatePendingChanges"></v-text-field>
</template>
<script>
import _ from 'lodash'
export default {
  components: {},
  props: ["resourceModel", "fieldName", "hasPendingChanges", "multiLine"],
  data() {
    return {
      model: ""
    }
  },
  watch: {
    'hasPendingChanges' (newValue, oldValue) {
      if (oldValue === true) {
        // when hasPendingChanges on parent changes from 
        // true to false
        // reset model to its original value
        this.model = this.resourceModel[this.fieldName]
      }
      // this.model = newValue
      // _.cloneDeep(newValue[this.localeTitleFieldName])
    },
    // 'model': 'updateFields'
    resourceModel: {
      handler(newValue, oldVal) {
        this.model = newValue[this.fieldName]
        // this.model = _.cloneDeep(newValue[this.fieldName])
        // console.log('resourceModel Changed')
      },
      deep: true,
      immediate: true,
    },
    // fieldName: {
    //   handler(newValue, oldVal) {
    //     this.model = _.cloneDeep(this.resourceModel[newValue])
    //   },
    //   deep: true
    // },
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
      let newValue = event.currentTarget.value
      this.$emit('updatePendingChanges', newValue, this.fieldName)
    },
  }
}

</script>
