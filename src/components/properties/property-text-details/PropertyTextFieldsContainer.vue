<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h4 class="headline mb-0">{{ $t(shortLocale) }}</h4>
      </div>
    </v-card-title>
    <v-card-text>
      <form @submit.prevent="onUpdatePropertyTexts">
        <v-layout row>
          <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
        </v-layout>
        <v-layout row>
          <PropertyTextField :hasPendingChanges="hasPendingChanges" :resourceModel="currentProperty" :fieldName="localeTitleFieldName" v-on:updatePendingChanges="updatePendingTitleChanges(...arguments)"></PropertyTextField>
          <v-text-field name="locale" :label="$t('title')" :value="localeTitleField" v-on:keyup="updatePendingTitleChanges"></v-text-field>
        </v-layout>
        <v-layout row>
          <v-text-field multi-line name="locale" :label="$t('description')" v-model="localeDescriptionField"></v-text-field>
        </v-layout>
        <v-layout row>
          <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
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
import PropertyTextField from '@/components/form-fields/PropertyTextField'
import _ from 'lodash'
export default {
  components: {
    PropertyTextField,
    FormSubmitter
  },
  props: ["locale", "currentProperty"],
  data() {
    return {
      pendingChanges: {},
      hasPendingChanges: false,
      localeTitleField: ""
    }
  },
  // mounted() {
  //   this.localeTitleField = this.currentProperty[this.localeTitleFieldName]
  // },
  watch: {
    currentProperty: {
      handler(newValue, oldVal) {
        this.localeTitleField = _.cloneDeep(newValue[this.localeTitleFieldName])
        console.log('Item Changed')
        // console.log(val)
      },
      deep: true
    },
    // 'currentProperty' (newValue, oldValue) {
    //   this.localeTitleField = _.cloneDeep(newValue[this.localeTitleFieldName])
    // },
    // 'model': 'updateFields'
  },
  computed: {
    shortLocale: function() {
      return this.locale.substring(0, 2)
    },
    localeTitleFieldName: function() {
      return "title_" + this.shortLocale
    },
    localeDescriptionFieldName: function() {
      return "description_" + this.shortLocale
    },
    // localeTitleField() {
    //   return _.clone(this.currentProperty[this.localeTitleFieldName])
    // },
    // localeTitleField: {
    //   get() {
    //     return _.clone(this.currentProperty[this.localeTitleFieldName])
    //   },
    //   // setter
    //   set(newValue) {
    //     // if (this.currentProperty[this.localeTitleFieldName] !== newValue) {
    //     //   this.pendingChanges[this.localeTitleFieldName] = newValue
    //     // } else {
    //     //   delete this.pendingChanges[this.localeTitleFieldName]
    //     // }
    //     // this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
    //   }
    // },
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
    updatePendingTitleChanges(newValue) {
      // let newValue = event.currentTarget.value
      if (this.currentProperty[this.localeTitleFieldName] !== newValue) {
        this.pendingChanges[this.localeTitleFieldName] = newValue
      } else {
        delete this.pendingChanges[this.localeTitleFieldName]
      }
      this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
    },
    changesCanceled() {
      let that = this
      Object.keys(this.pendingChanges).forEach(function(pendingChangeKey) {
        let originalTr = that.currentProperty[pendingChangeKey]
        if (that.localeTitleFieldName === pendingChangeKey) {
          that.localeTitleField = that.currentProperty[pendingChangeKey]
        }
        if (that.localeDescriptionFieldName === pendingChangeKey) {
          that.localeDescriptionField = that.currentProperty[pendingChangeKey]
        }

        // let newTr = _.find(that.orderedTranslationsCopy, { locale: pendingChangeKey })
        // newTr.i18n_value = originalTr.i18n_value
      })
      this.pendingChanges = {}
      this.hasPendingChanges = false
    },
    onUpdatePropertyTexts() {
      this.$store.dispatch('updatePropertyTexts', this.pendingChanges)
      // TODO: Only update below after update has returned success
      this.pendingChanges = {}
      this.hasPendingChanges = false
    }
  }
}

</script>
