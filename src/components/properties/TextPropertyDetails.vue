<template>
  <v-layout wrap row>
    <template v-for="(locale) in supportedLocales">
      <v-flex xs12 sm6 class="pr-3 pt-4">
        <PropertyTextFieldsContainer v-bind:locale="locale" v-bind:currentProperty="currentProperty"></PropertyTextFieldsContainer>
      </v-flex>
    </template>
  </v-layout>
</template>
<script>
import PropertyTextFieldsContainer from '@/components/properties/property-text-details/PropertyTextFieldsContainer'
// import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    PropertyTextFieldsContainer
  },
  props: ["currentProperty"],
  watch: {},
  data() {
    return {
      // supportedLocales: ["en", "es"]
    }
  },
  computed: {
    supportedLocales: function() {
      return this.$store.state.supportedLocales
    }
  },
  mounted: function() {},
  methods: {}
}

</script>
