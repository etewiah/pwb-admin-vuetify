<template>
  <form @submit.prevent="onUpdateProperty">
    <v-layout row>
      <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
    </v-layout>
    <v-layout row>
      <v-text-field name="locale" @change="onPendingChange" :label="$t('title')" v-model="localeTitleField"></v-text-field>
    </v-layout>
    <v-layout row>
      <v-text-field name="locale" @change="onPendingChange" :label="$t('description')" v-model="localeDescriptionField"></v-text-field>
    </v-layout>
    <v-layout row>
      <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
    </v-layout>
  </form>
</template>
<script>
import FormSubmitter from '@/components/form-fields/FormSubmitter'
// import { required, minLength } from 'vuelidate/lib/validators'
import _ from 'lodash'
export default {
  components: {
    FormSubmitter
  },
  props: ["locale", "currentProperty"],
  data() {
    return {
      pendingChanges: {},
      hasPendingChanges: false,
    }
  },
  computed: {
    // hasPendingChanges: function() {
    //   return this.$store.state.propertiesStore.hasPendingChanges
    // },
    localeTitleFieldName: function() {
      return "title_" + this.locale
    },
    localeDescriptionFieldName: function() {
      return "description_" + this.locale
    },
    localeTitleField: {
      get() {
        return _.clone(this.currentProperty[this.localeTitleFieldName])
      },
      // // setter
      set(newValue) {
        if (this.currentProperty[this.localeTitleFieldName] !== newValue) {
          this.pendingChanges[this.localeTitleFieldName] = newValue
        } else {
          delete this.pendingChanges[this.localeTitleFieldName]
        }
        this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
      }
    },
    localeDescriptionField: {
      get() {
        let localeDescriptionFieldName = "description_" + this.locale
        return _.clone(this.currentProperty[this.localeDescriptionFieldName])
      },
      set(newValue) {
        if (this.currentProperty[this.localeDescriptionField] !== newValue) {
          this.pendingChanges[this.localeDescriptionField] = newValue
        } else {
          delete this.pendingChanges[this.localeDescriptionField]
        }
        this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
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
