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
              <v-flex xs12 sm4>
                <h3 class="text-xs-left mb-3">{{$t("propertyGeneralSections.sale") }}</h3>
                <template v-for="(fieldDetails) in saleInputFields">
                  <FieldResolver :fieldDetails="fieldDetails" v-bind:resourceModel="currentProperty"></FieldResolver>
                </template>
              </v-flex>
              <v-flex xs12 sm4>
                <h3 class="text-xs-left mb-3">{{$t("propertyGeneralSections.longtermRental") }}</h3>
                <template v-for="(fieldDetails) in longTermRentalInputFields">
                  <FieldResolver :fieldDetails="fieldDetails" v-bind:resourceModel="currentProperty"></FieldResolver>
                </template>
              </v-flex>
              <v-flex xs12 sm4>
                <h3 class="text-xs-left mb-3">{{$t("propertyGeneralSections.seasonalRental") }}</h3>
                <template v-for="(fieldDetails) in shortTermRentalInputFields">
                  <FieldResolver :fieldDetails="fieldDetails" v-bind:resourceModel="currentProperty"></FieldResolver>
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
    hasPendingChanges: function() {
      return this.$store.state.propertiesStore.hasPendingChanges
      // return Object.keys(this.$store.state.propertiesStore.pendingChanges).length > 0;
    }
  },
  // mounted: function() {
  //   this.$store.dispatch('loadProperty', this.$route.params["id"])
  // },
  methods: {
    onUpdateProperty() {
      this.$store.dispatch('updateProperty')
    },
  }
}

</script>
