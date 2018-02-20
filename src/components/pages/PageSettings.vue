<template>
  <v-layout row>
    <v-flex xs6>
      <form @submit.prevent="onUpdatePageSettings">
        <v-layout v-for="(field, index) in titleFields" row>
          <v-flex xs12 sm12 offset-sm0>
            <v-text-field name="title" :label="'Title ' + $t(field.labelTextTKey)" id="title" v-model="currentPage[field.fieldName]"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 offset-sm0>
            <v-text-field name="title" label="Title" id="title" v-model="currentPage['page_title_es']" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm0>
            <v-btn class="primary" :disabled="!formIsValid" type="submit">Update</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: ["currentPage"],
  data() {
    return {
      titleFields: [{
        labelTextTKey: "webContentLabels.suffixEn",
        fieldType: "simpleInput",
        fieldName: "page_title_en",
        inputType: "text",
        constraints: {
          inputValue: {}
        }
      }, {
        labelTextTKey: "webContentLabels.suffixDe",
        fieldType: "simpleInput",
        fieldName: "page_title_de",
        inputType: "text",
        constraints: {
          inputValue: {}
        }
      }],

    }
  },
  computed: {
    // currentPage() {
    //   return this.$store.state.currentProperty
    // },
    formIsValid() {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
    },
  },
  mounted: function() {
    // this.$store.dispatch('loadProperty', this.$route.params["id"])
  },
  methods: {
    onUpdatePageSettings() {
      // if (!this.formIsValid) {
      //   return
      // }
      // const meetupData = {
      //   title: this.title,
      //   location: this.location,
      //   imageUrl: this.imageUrl,
      //   description: this.description,
      //   date: this.submittableDateTime
      // }
      // debugger
      this.$store.dispatch('updatePage')
    }

  }
}

</script>
