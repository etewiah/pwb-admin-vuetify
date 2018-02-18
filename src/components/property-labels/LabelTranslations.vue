<template>
  <div class="mt-4 mr-4">
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ translationTitle }}</h3>
          <div>
            <form @submit.prevent="onUpdateTranslation">
              <v-layout row>
                <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
              </v-layout>
              <v-layout wrap row>
                <template v-for="(translation) in resourceModel">
                  <TranslationField v-bind:translation="translation" v-on:translationChanged="updatePendingChanges"></TranslationField>
                  <div class="form-group">
                    <!--                     <v-text-field name="translation" @change="onPendingChange" :label="$t(translation.locale)" v-model="translation.i18n_value"></v-text-field>
 -->
                  </div>
                </template>
              </v-layout>
            </form>
          </div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import TranslationField from '@/components/form-fields/TranslationField'
import FormSubmitter from '@/components/form-fields/FormSubmitter'
// import { required, minLength } from 'vuelidate/lib/validators'
// import _ from 'lodash'
export default {
  components: {
    TranslationField,
    FormSubmitter
  },
  props: ["resourceModel"],
  data() {
    return {
      fieldValue: false,
      fieldLabel: "No",
      // duplicatedValues: [],
      pendingChanges: {},
      hasPendingChanges: false,
    }
  },
  computed: {
    // dupValues: {
    //   get() {
    //     let dupValues = []
    //     this.resourceModel.forEach(function(localeTranslation) {
    //       let i18nValue = _.cloneDeep(localeTranslation.i18n_value)
    //       dupValues.push({
    //         locale: localeTranslation.locale,
    //         i18n_value: i18nValue
    //       })
    //     })
    //     return dupValues
    //   },
    //   // // setter
    //   set(newValue) {
    //     this.fieldDetails.newValue = newValue
    //     this.$store.dispatch('updatePendingChanges', this.fieldDetails, newValue)
    //   }
    // },
    translationTitle: function() {
      return this.resourceModel[0].i18n_value
    },
  },
  // mounted: function() {
  //   let duplicatedValues = []
  //   this.resourceModel.forEach(function(localeTranslation) {
  //     let i18nValue = _.cloneDeep(localeTranslation.i18n_value)
  //     duplicatedValues.push({
  //       locale: localeTranslation.locale,
  //       i18n_value: i18nValue
  //     })
  //   })
  //   this.duplicatedValues = duplicatedValues
  // },
  methods: {
    onUpdateTranslation(newValue) {
      // debugger
      // if (newValue) {
      //   this.fieldLabel = "Yes"
      // } else {
      //   this.fieldLabel = "No"
      // }
      // this.fieldDetails.newValue = newValue
      // this.$store.dispatch('updatePendingPropertyFeatureChanges', this.fieldDetails, newValue)
    },
    updatePendingChanges(translation, newValue) {
      if (translation.i18n_value !== newValue) {
        this.pendingChanges[translation.locale] = newValue
      } else {
        delete this.pendingChanges[translation.locale]
      }
      this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
    }
  }

}

</script>
