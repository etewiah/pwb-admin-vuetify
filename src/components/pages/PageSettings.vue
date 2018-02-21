<template>
  <v-layout row>
    <v-flex xs6>
      <v-card class="mt-3">
        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">{{ $t('en') }}</h4>
          </div>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="onUpdatePageSettings">
            <v-layout row>
              <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
            </v-layout>
            <v-layout v-for="(field, index) in pageTitleFields" row>
              <v-flex xs12 sm12 offset-sm0>
                <v-text-field name="title" v-on:keyup="onTitleChange(field.fieldName, field.fieldValue)" :label="'Title ' + $t(field.labelTextTKey)" v-model="field.fieldValue"></v-text-field>
              </v-flex>
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
    </v-flex>
  </v-layout>
</template>
<script>
import FormSubmitter from '@/components/form-fields/FormSubmitter'
import _ from 'lodash'
export default {
  components: {
    FormSubmitter
  },
  props: ["currentPage"],
  data() {
    return {
      pendingChanges: {},
      // originalValues: {},
      hasPendingChanges: false,
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
    // hasPendingChanges() {
    //  This does not update when pendingChanges get updated
    //   let pendingChanges = this.pendingChanges
    //   let pcl = Object.keys(pendingChanges).length
    //   return pcl > 0
    // },
    supportedLocales() {
      return this.$store.state.supportedLocales
    },
    pageTitleFields() {
      let pageTitleFields = []
      let that = this
      this.supportedLocales.forEach(function(locale) {
        let field = {}
        field.labelTextTKey = "webContentLabels.suffix" + locale.substring(0, 1).toUpperCase() + locale.substring(1, 2)
        field.fieldName = "page_title_" + locale.substring(0, 2)
        field.fieldValue = _.cloneDeep(that.currentPage[field.fieldName])
        pageTitleFields.push(field)
        // if (that.currentPage[field.fieldName]) {
        //   that.originalValues[field.fieldName] = _.cloneDeep(that.currentPage[field.fieldName]) 
        //   // JSON.parse(JSON.stringify(that.currentPage[field.fieldName]))
        // }
      })
      return pageTitleFields
    },
    // formIsValid() {
    //   return this.title !== '' &&
    //     this.location !== '' &&
    //     this.imageUrl !== '' &&
    //     this.description !== ''
    // },
  },
  mounted() {
    // this.$store.dispatch('loadProperty', this.$route.params["id"])
  },
  methods: {
    changesCanceled() {
      let that = this
      Object.keys(this.pendingChanges).forEach(function(pendingChangeKey) {
        // let changedTitleField = _.find(that.pageTitleFields, "fieldName", pendingChangeKey)
        // above method of finding with lowdash
        let changedTitleField = _.find(that.pageTitleFields, {fieldName: pendingChangeKey})
        changedTitleField.fieldValue = _.cloneDeep(that.currentPage[pendingChangeKey])
        // that.currentPage[pendingChangeKey] = that.pendingChanges[pendingChangeKey]
      })
      this.pendingChanges = {}
      this.hasPendingChanges = false
    },
    onTitleChange(fieldName, newValue) {
      if (this.currentPage[fieldName] !== newValue) {
        this.pendingChanges[fieldName] = newValue
      } else {
        delete this.pendingChanges[fieldName]
      }
      this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
    },
    onUpdatePageSettings() {
      var that = this
      Object.keys(this.pendingChanges).forEach(function(pendingChangeKey) {
        that.currentPage[pendingChangeKey] = that.pendingChanges[pendingChangeKey]
      })
      this.$store.dispatch('updatePage')
      // TODO: ensure above is successfull before calling below:
      this.pendingChanges = {}
      this.hasPendingChanges = false
    }

  }
}

</script>
