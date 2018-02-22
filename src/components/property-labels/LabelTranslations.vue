<template>
  <div class="mt-4 mr-4">
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ resourceModel.title }}</h3>
          <div>
            <form @submit.prevent="onUpdateTranslation">
              <v-layout row>
                <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
              </v-layout>
              <v-layout wrap row>
                <template v-for="(translation) in orderedTranslationsCopy">
                  <v-flex xs12 sm12 offset-sm0>
                    <v-text-field v-on:keyup="updatePendingChanges(translation, translation.i18n_value)" name="translation" :label="$t(translation.locale)" v-model="translation.i18n_value"></v-text-field>
                  </v-flex>
                </template>
              </v-layout>
              <v-layout row>
                <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
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
// import TranslationField from '@/components/form-fields/TranslationField'
import FormSubmitter from '@/components/form-fields/FormSubmitter'
import _ from 'lodash'

// import { required, minLength } from 'vuelidate/lib/validators'
export default {
  components: {
    // TranslationField,
    FormSubmitter
  },
  props: ["resourceModel"],
  data() {
    return {
      pendingChanges: {},
      hasPendingChanges: false,
    }
  },
  computed: {
    orderedTranslationsCopy: function() {
      let translations = []
      _.sortBy(this.resourceModel.translations, "locale").forEach(function(translation) {
        let clonedTr = _.cloneDeep(translation)
        translations.push(clonedTr)
      })
      return translations
    },
  },
  methods: {
    onUpdateTranslation(newValue) {
      let pendingTranslationChanges = {
        i18nKey: this.resourceModel.key,
        changes: this.pendingChanges
      }
      this.$store.dispatch('updateFieldTranslations', pendingTranslationChanges)
      // TODO: Wait for reply from store before reseting pendingChanges
      this.pendingChanges = {}
      this.hasPendingChanges = false
    },
    updatePendingChanges(translation, newValue) {
      let originalTr = _.find(this.resourceModel.translations, { locale: translation.locale })
      if (originalTr.i18n_value !== newValue) {
        this.pendingChanges[translation.locale] = newValue
      } else {
        delete this.pendingChanges[translation.locale]
      }
      this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
    },
    changesCanceled() {
      let that = this
      Object.keys(this.pendingChanges).forEach(function(pendingChangeKey) {
        let originalTr = _.find(that.resourceModel.translations, { locale: pendingChangeKey })
        let newTr = _.find(that.orderedTranslationsCopy, { locale: pendingChangeKey })
        newTr.i18n_value = originalTr.i18n_value
      })
      this.pendingChanges = {}
      this.hasPendingChanges = false
    },
  }

}

</script>
