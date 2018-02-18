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
  props: ["translation"],
  data() {
    return {}
  },
  computed: {
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
