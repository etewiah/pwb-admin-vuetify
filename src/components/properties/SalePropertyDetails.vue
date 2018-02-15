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
  watch: {
    // currentProperty: {
    //   handler: function(after, before) {
    //     // Return the object that changed
    //     var vm = this;
    //     // let changed = after.filter(function(p, idx) {
    //     //   return Object.keys(p).some(function(prop) {
    //     //     return p[prop] !== vm.$data.oldPeople[idx][prop];
    //     //   })
    //     // })
    //     // // Log it
    //     // vm.setValue();
    //     // console.log(changed)
    //     // debugger;
    //   },
    // }
  },
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
      debugger
      // this.$store.dispatch('updateProperty')
    },
    // changeHandler(param1, param2, param3){
    //   debugger
    // }
  }
}

</script>
