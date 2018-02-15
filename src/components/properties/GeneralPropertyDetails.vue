<template>
  <v-layout row>
    <v-flex xs12>
      <form @submit.prevent="onUpdateProperty">
        <v-layout v-if="hasPendingChanges" row>
          <v-flex xs12 sm12 offset-sm0>
            <v-btn class="primary" type="submit">Update</v-btn>
          </v-flex>
        </v-layout>
        <v-layout wrap row>
          <v-flex xs12 sm3>
            <template v-for="(fieldDetails) in mainInputFields">
              <FieldResolver :fieldDetails="fieldDetails" :fieldOptions="fieldOptions" v-bind:resourceModel="currentProperty"></FieldResolver>
            </template>
          </v-flex>
          <v-flex xs12 sm3>
            <template v-for="(fieldDetails) in mainInputFields2">
              <FieldResolver :fieldDetails="fieldDetails" :fieldOptions="fieldOptions" v-bind:resourceModel="currentProperty"></FieldResolver>
            </template>
          </v-flex>
          <v-flex xs12 sm3>
            <template v-for="(fieldDetails) in longTermRentalInputFields">
              <FieldResolver :fieldDetails="fieldDetails" :fieldOptions="fieldOptions" v-bind:resourceModel="currentProperty"></FieldResolver>
            </template>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 offset-sm0>
            <v-btn class="primary" type="submit">Update</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>
</template>
<script>
import FieldResolver from '@/components/form-fields/FieldResolver'
// import { required } from 'vuelidate/lib/validators'
export default {
  components: {
    FieldResolver
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
      mainInputFields: [{
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
      mainInputFields2: [{
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

      longTermRentalInputFields: [{
        labelTextTKey: "fieldLabels.longTermRental",
        tooltipTextTKey: "toolTips.longTermRental",
        fieldName: "for_rent_long_term",
        inputType: "trueFalse",
        fieldDbType: "boolean",
      }, {
        labelTextTKey: "fieldLabels.priceRentalMonthlyCurrent",
        tooltipTextTKey: "toolTips.priceRentalMonthlyCurrent",
        fieldName: "price_rental_monthly_current_cents",
        fieldType: "simpleInput",
        inputType: "number",
        fieldDbType: "int",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              lessThanOrEqualTo: 999999999,
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.priceRentalMonthlyOriginal",
        tooltipTextTKey: "toolTips.priceRentalMonthlyOriginal",
        fieldName: "price_rental_monthly_original_cents",
        fieldType: "simpleInput",
        inputType: "number",
        fieldDbType: "int",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              lessThanOrEqualTo: 999999999,
            }
          }
        }
      }, ],
      shortTermRentalInputFields: [{
        labelTextTKey: "fieldLabels.seasonalRental",
        tooltipTextTKey: "toolTips.seasonalRental",
        fieldName: "for_rent_short_term",
        inputType: "trueFalse",
        fieldDbType: "boolean",
      }, {
        labelTextTKey: "fieldLabels.priceRentalMonthlyLowSeason",
        tooltipTextTKey: false,
        fieldName: "price_rental_monthly_low_season_cents",
        fieldType: "simpleInput",
        inputType: "number",
        fieldDbType: "int",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              lessThanOrEqualTo: 999999999,
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.priceRentalMonthlyStandardSeason",
        tooltipTextTKey: false,
        fieldName: "price_rental_monthly_standard_season_cents",
        fieldType: "simpleInput",
        inputType: "number",
        fieldDbType: "int",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              lessThanOrEqualTo: 999999999,
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.priceRentalMonthlyHighSeason",
        tooltipTextTKey: false,
        fieldName: "priceRentalMonthlyHighSeasonCents",
        fieldType: "simpleInput",
        inputType: "number",
        fieldDbType: "int",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              lessThanOrEqualTo: 999999999,
            }
          }
        }
      }],
      saleInputFields: [{
        labelTextTKey: "fieldLabels.forSale",
        tooltipTextTKey: "toolTips.forSale",
        fieldName: "for_sale",
        inputType: "trueFalse",
        fieldDbType: "boolean",
      }, {
        labelTextTKey: "fieldLabels.priceSaleCurrent",
        tooltipTextTKey: "toolTips.priceSaleCurrent",
        fieldName: "price_sale_current_cents",
        fieldType: "simpleInput",
        inputType: "number",
        fieldDbType: "int",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              lessThanOrEqualTo: 999999999999,
            }
          }
        }
      }, {
        labelTextTKey: "fieldLabels.priceSaleOriginal",
        tooltipTextTKey: "toolTips.priceSaleOriginal",
        fieldName: "price_sale_original_cents",
        fieldType: "simpleInput",
        inputType: "number",
        fieldDbType: "int",
        constraints: {
          inputValue: {
            numericality: {
              onlyInteger: true,
              lessThanOrEqualTo: 999999999999,
            }
          }
        }
      }, ],
    }
  },
  computed: {
    fieldOptions: function() {
      return this.$store.state.propertiesStore.fieldOptions
    },
    hasPendingChanges: function() {
      return this.$store.state.propertiesStore.hasPendingChanges
    }
  },
  mounted: function() {
    let fieldNames = "property-origins, property-types, property-states, property-labels"
    this.$store.dispatch('loadPropertyFieldOptions', fieldNames)
  },
  methods: {
    onUpdateProperty() {
      this.$store.dispatch('updateProperty')
    },
  }
}

</script>
