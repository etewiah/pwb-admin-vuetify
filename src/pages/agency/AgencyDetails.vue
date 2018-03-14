<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card class="mt-3">
          <v-card-text>
            <form @submit.prevent="onSaveAgencyDetails">
              <v-layout row>
                <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 class="pr-3 pt-4" offset-sm0>
                  <template v-for="(field, index) in mainInputFields">
                    <FieldResolver v-on:updatePendingChanges="updatePendingChanges(...arguments)" :fieldDetails="field" :cancelPendingChanges="cancelPendingChanges" v-bind:resourceModel="currentAgency"></FieldResolver>
                  </template>
                </v-flex>
                <v-flex xs12 sm6 class="pr-3 pt-4" offset-sm0>
                  <template v-for="(field, index) in emailInputFields">
                    <FieldResolver v-on:updatePendingChanges="updatePendingChanges(...arguments)" :fieldDetails="field" :cancelPendingChanges="cancelPendingChanges" v-bind:resourceModel="currentAgency"></FieldResolver>
                  </template>
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
  </v-container>
</template>
<script>
import FormSubmitter from '@/components/form-fields/FormSubmitter'
import FieldResolver from '@/components/form-fields/FieldResolver'
// import _ from 'lodash'
export default {
  components: {
    FormSubmitter,
    FieldResolver
  },
  // props: ["currentAgency"],
  data() {
    return {
      cancelPendingChanges: false,
      pendingChanges: {},
      hasPendingChanges: false,
      mainInputFields: [{
        labelTextTKey: "fieldLabels.companyName",
        // alertInfoTKey: "fieldLabels.company_name",
        fieldName: "company_name",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {
            length: {
              minimum: 2,
              tooShort: "needs to have %{count} characters or more"
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.primaryPhone",
        // alertInfoTKey: "fieldLabels.info.primaryPhone",
        fieldName: "phone_number_primary",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {
            length: {
              minimum: 2,
              tooShort: "needs to have %{count} characters or more"
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.otherPhone",
        fieldName: "phone_number_other",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {
            length: {
              minimum: 2,
              tooShort: "needs to have %{count} characters or more"
            }
          }
        }
      }],
      emailInputFields: [{
        labelTextTKey: "fieldLabels.primaryEmail",
        // alertInfoTKey: "fieldLabels.info.primaryEmail",
        fieldName: "email_primary",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {
            length: {
              minimum: 2,
              tooShort: "needs to have %{count} characters or more"
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.generalContactEmail",
        alertInfoTKey: "fieldLabels.info.generalContactEmail",
        fieldName: "email_for_general_contact_form",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {
            length: {
              minimum: 2,
              tooShort: "needs to have %{count} characters or more"
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.propertyContactEmail",
        alertInfoTKey: "fieldLabels.info.propertyContactEmail",
        fieldName: "email_for_property_contact_form",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {
            length: {
              minimum: 2,
              tooShort: "needs to have %{count} characters or more"
            }
          }
        }
      }],
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
    // cancelPendingChanges() {
    //   return this.$store.state.propertiesStore.cancelPendingChanges
    // },
    currentAgency() {
      return this.$store.state.agencyStore.currentAgency
    },
  },
  mounted() {
    // this.$store.dispatch('loadProperty', this.$route.params["id"])
  },
  methods: {
    changesCanceled() {
      let that = this
      this.pendingChanges = {}
      this.hasPendingChanges = false
      // Below is observed by each of the fields.
      // When it changes from false to true they get reset to their initial values
      this.cancelPendingChanges = true
    },
    updatePendingChanges(fieldDetailsWithNewValue) {
      this.cancelPendingChanges = false
      let newValue = fieldDetailsWithNewValue.newValue
      let serverSavedValue = this.currentAgency[fieldDetailsWithNewValue.fieldName] || ""
      if (serverSavedValue !== newValue) {
        this.pendingChanges[fieldDetailsWithNewValue.fieldName] = newValue
      } else {
        delete this.pendingChanges[fieldDetailsWithNewValue.fieldName]
      }
      this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
    },

    onSaveAgencyDetails() {
      var that = this
      Object.keys(this.pendingChanges).forEach(function(pendingChangeKey) {
        that.currentAgency[pendingChangeKey] = that.pendingChanges[pendingChangeKey]
      })
      this.$store.dispatch('updateAgency')
      // TODO: ensure above is successfull before calling below:
      this.pendingChanges = {}
      this.hasPendingChanges = false
    }

  }
}

</script>
