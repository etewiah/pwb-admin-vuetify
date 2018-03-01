<template>
  <v-layout wrap row>
        To be implemented
  </v-layout>
</template>
<script>
// import PropertyTextFieldsContainer from '@/components/properties/property-text-details/PropertyTextFieldsContainer'
export default {
  components: {
    // PropertyTextFieldsContainer
  },
  props: ["currentProperty"],
  watch: {},
  data() {
    return {}
  },
  computed: {
    supportedLocales() {
      return this.$store.state.supportedLocales
    }
  },
  methods: {}
}

</script>
