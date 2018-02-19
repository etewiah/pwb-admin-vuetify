<template>
  <v-layout row>
    <v-flex xs12>
      <v-layout wrap row>
        <template v-for="(translations) in propertyFieldTranslations">
          <v-flex xs12 sm3>
            <LabelTranslations v-bind:resourceModel="translations"></LabelTranslations>
          </v-flex>
        </template>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import LabelTranslations from '@/components/property-labels/LabelTranslations'
import _ from 'lodash'
// import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    LabelTranslations
  },
  watch: {},
  data() {
    return {}
  },
  computed: {
    propertyFieldTranslations: function() {
      let unsortedTranslations = this.$store.state.propertyFieldsStore.propertyFieldTranslations
      return _.sortBy(unsortedTranslations, "title")
    },
  },
  mounted: function() {
    let fieldNames = "extras"
    this.$store.dispatch('loadFieldTranslations', fieldNames)
  },
  methods: {}
}

</script>
