<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0"></h4>
          </div>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="onUpdateProperty">
            <v-layout row>
              <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
            </v-layout>
            <v-layout wrap row>
              <v-flex xs12 sm3>
                <template v-for="(fieldDetails) in mainInputFields1">
                  <FieldResolver :fieldDetails="fieldDetails" :fieldOptions="fieldOptions" v-bind:resourceModel="currentProperty"></FieldResolver>
                </template>
              </v-flex>
              <v-flex xs12 sm3>
                <template v-for="(fieldDetails) in mainInputFields2">
                  <FieldResolver :fieldDetails="fieldDetails" :fieldOptions="fieldOptions" v-bind:resourceModel="currentProperty"></FieldResolver>
                </template>
              </v-flex>
              <v-flex xs12 sm3>
                <template v-for="(fieldDetails) in mainInputFields3">
                  <FieldResolver :fieldDetails="fieldDetails" :fieldOptions="fieldOptions" v-bind:resourceModel="currentProperty"></FieldResolver>
                </template>
              </v-flex>
              <v-flex xs12 sm3>
                <template v-for="(fieldDetails) in mainInputFields4">
                  <FieldResolver :fieldDetails="fieldDetails" :fieldOptions="fieldOptions" v-bind:resourceModel="currentProperty"></FieldResolver>
                </template>
              </v-flex>
            </v-layout>
            <v-layout row>
              <FormSubmitter :hasPendingChanges="hasPendingChanges"></FormSubmitter>
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
import FieldResolver from '@/components/form-fields/FieldResolver'
import FormSubmitter from '@/components/form-fields/FormSubmitter'
// import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    FieldResolver,
    FormSubmitter
  },
  props: ["currentProperty"],
  watch: {},
  validations: {
    currentProperty: {
      price_rental_monthly_current_cents: {
        // required
      }
    }
  },
  data() {
    return {
      mainInputFields1: [{
        labelTextTKey: "fieldLabels.visibleOnWeb",
        tooltipTextTKey: "toolTips.visible",
        fieldName: "visible",
        // fieldType: "simpleSelect",
        inputType: "trueFalse",
        fieldDbType: "boolean",
        // }, {
        //   labelTextTKey: "fieldLabels.highlighted",
        //   tooltipTextTKey: "toolTips.highlighted",
        //   fieldName: "highlighted",
        //   fieldType: "simpleSelect",
        //   fieldDbType: "boolean",
        // }, {
        //   labelTextTKey: "fieldLabels.label",
        //   fieldName: "observacionesVenta",
        //   fieldType: "dynamicSelect",
        //   optionsKey: "property-labels",
      }, {
        labelTextTKey: "fieldLabels.currency",
        // headerTextTKey: "fieldLabels.currency",
        inputType: "select",
        fieldName: "currency",
        optionsKey: "currencies",
      }],
      mainInputFields2: [{
        labelTextTKey: "fieldLabels.ref",
        tooltipTextTKey: "toolTips.ref",
        fieldName: "reference",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {}
        }
      }, {
        labelTextTKey: "fieldLabels.tipo",
        tooltipTextTKey: "",
        fieldName: "prop_type_key",
        inputType: "select",
        optionsKey: "property-types",
      }, {
        labelTextTKey: "fieldLabels.estado",
        tooltipTextTKey: "",
        fieldName: "prop_state_key",
        inputType: "select",
        optionsKey: "property-states",
      }],
      mainInputFields3: [{
        labelTextTKey: "fieldLabels.countBedrooms",
        tooltipTextTKey: false,
        fieldName: "count_bedrooms",
        fieldType: "simpleInput",
        inputType: "number",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              greaterThan: 0,
              lessThanOrEqualTo: 999,
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.countBathrooms",
        tooltipTextTKey: false,
        fieldName: "count_bathrooms",
        fieldType: "simpleInput",
        inputType: "number",
        constraints: {
          inputValue: {
            numericality: {
              greaterThan: 0,
              lessThanOrEqualTo: 999,
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.garaje",
        // tooltipTextTKey: "toolTips.garaje",
        fieldName: "count_garages",
        // fieldType: "simpleSelect",
        // fieldDbType: "boolean",
        fieldType: "simpleInput",
        inputType: "number",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              greaterThan: 0,
              lessThanOrEqualTo: 999,
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.yearConstruction",
        tooltipTextTKey: false,
        fieldName: "year_construction",
        fieldType: "simpleInput",
        inputType: "number",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              lessThan: 2016,
              greaterThan: 1500,
              message: "Invalid date",
            },
          }
        }
      }],
      mainInputFields4: [{
        labelTextTKey: "fieldLabels.plotArea",
        tooltipTextTKey: false,
        fieldName: "plot_area",
        fieldType: "simpleInput",
        inputType: "number",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              greaterThan: 0,
              lessThanOrEqualTo: 1000000,
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.constructedArea",
        tooltipTextTKey: false,
        fieldName: "constructed_area",
        fieldType: "simpleInput",
        inputType: "number",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              greaterThan: 0,
              lessThanOrEqualTo: 1000000,
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.areaUnit",
        // headerTextTKey: "fieldLabels.currency",
        inputType: "select",
        fieldName: "area_unit",
        optionsKey: "area-units",
      }],
    }
  },
  computed: {
    fieldOptions() {
      return this.$store.state.propertiesStore.fieldOptions
    },
    hasPendingChanges() {
      return this.$store.state.propertiesStore.hasPendingChanges
    }
  },
  mounted() {
    // let fieldNames = "property-origins, property-types, property-states, property-labels, currencies, area-units"
    // this.$store.dispatch('loadPropertyFieldOptions', fieldNames)
  },
  methods: {
    onUpdateProperty() {
      this.$store.dispatch('updateProperty')
    },
  }
}

</script>
