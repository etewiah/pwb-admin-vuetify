<template>
  <v-layout wrap row>
    <template v-for="(locale) in supportedLocales">
      <v-flex xs12 sm6 class="pr-3 pt-4">
        <PropertyTextField v-bind:locale="locale" v-bind:currentProperty="currentProperty"></PropertyTextField>
      </v-flex>
    </template>
  </v-layout>
</template>
<script>
import PropertyTextField from '@/components/form-fields/PropertyTextField'
// import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    PropertyTextField
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
