<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h4 class="headline mb-0">{{ $t(locale) }}</h4>
      </div>
    </v-card-title>
    <v-card-text>
      <form @submit.prevent="onUpdatePropertyTexts">
        <v-layout row>
          <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
        </v-layout>
        <v-layout row>
          <v-text-field name="locale" :label="$t('title')" v-model="localeTitleField"></v-text-field>
        </v-layout>
        <v-layout row>
          <v-text-field multi-line name="locale" :label="$t('description')" v-model="localeDescriptionField"></v-text-field>
        </v-layout>
        <v-layout row>
          <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
        </v-layout>
      </form>
    </v-card-text>
    <v-card-actions>
      <!-- <v-btn flat color="orange">Share</v-btn> -->
    </v-card-actions>
  </v-card>
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
        return _.clone(this.currentProperty[this.localeDescriptionFieldName])
      },
      set(newValue) {
        if (this.currentProperty[this.localeDescriptionFieldName] !== newValue) {
          this.pendingChanges[this.localeDescriptionFieldName] = newValue
        } else {
          delete this.pendingChanges[this.localeDescriptionFieldName]
        }
        this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
      }
    }
  },
  methods: {
    onUpdatePropertyTexts() {
      this.$store.dispatch('updatePropertyTexts', this.pendingChanges)
      // TODO: Only update below after update has returned success
      this.pendingChanges = {}
      this.hasPendingChanges = false
    }
  }
}

</script>
