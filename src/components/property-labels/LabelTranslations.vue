<template>
  <div class="mt-4 mr-4">
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ resourceModel.title }}</h3>
          <div>
            <form @submit.prevent="onUpdateTranslation">
              <v-layout row>
                <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
              </v-layout>
              <v-layout wrap row>
                <template v-for="(translation) in orderedTranslations">
                  <TranslationField v-bind:translation="translation" v-on:translationChanged="updatePendingChanges"></TranslationField>
                </template>
              </v-layout>
            </form>
          </div>
        </div>
      </v-card-title>
      <v-card-actions>
        <!-- <v-btn flat color="orange">Share</v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import TranslationField from '@/components/form-fields/TranslationField'
import FormSubmitter from '@/components/form-fields/FormSubmitter'
import _ from 'lodash'

// import { required, minLength } from 'vuelidate/lib/validators'
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
      pendingChanges: {},
      hasPendingChanges: false,
    }
  },
  computed: {
    orderedTranslations: function() {
      return _.sortBy(this.resourceModel.translations, "locale")
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
      let pendingTranslationChanges = {
        i18nKey: this.resourceModel.key,
        changes: this.pendingChanges
      }
      this.$store.dispatch('updateFieldTranslations', pendingTranslationChanges)
      // TODO: Wait for reply from store before reseting pendingChanges
      this.pendingChanges = {}
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
