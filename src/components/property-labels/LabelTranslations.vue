<template>
  <div class="mr-4">
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ translationTitle }}</h3>
          <div>
            <template v-for="(translation) in resourceModel">
              <div class="form-group">
                <label class="col-sm-2 control-label" style="padding: 5px;">{{translation.locale}}:</label>
                <div class="col-sm-10">
                  <div class="fg-line  ">
                    {{translation.i18n_value }}
                    <input id="ember1777" type="text" class="input-sm form-control fg-input translation-input ember-view ember-text-field">
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div>Located two hours</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>
    <div>
      <div class="text-xs-left">
        <!--         {{$t(fieldDetails.labelTextTKey) }}
 -->
      </div>
      <v-flex xs12>
      </v-flex>
    </div>
  </div>
</template>
<script>
import SwitchField from '@/components/form-fields/SwitchField'
// import { required, minLength } from 'vuelidate/lib/validators'
// import _ from 'lodash'
export default {
  components: {
    SwitchField
  },
  props: ["resourceModel"],
  data() {
    return {
      fieldValue: false,
      fieldLabel: "No"
    }
  },
  // mounted: function() {
  //   this.fieldDetails.originalValue = false
  //   if (this.resourceModel) {
  //     debugger
  //     // Features are stored on the server as a list of field keys
  //     // The resourceModel represents this list
  //     // Any feature in that list should have a value of true
  //     // (ie - the property in question has that feature)
  //     if (this.resourceModel.includes(this.fieldDetails.fieldName)) {
  //       // debugger
  //       this.fieldLabel = "Yes"
  //       this.fieldDetails.originalValue = true
  //     }
  //   }
  // },
  watch: {
    resourceModel: function(val) {
      // this.fieldDetails.originalValue = false
      // if (this.resourceModel) {
      //   // Features are stored on the server as a list of field keys
      //   // The resourceModel represents this list
      //   // Any feature in that list should have a value of true
      //   // (ie - the property in question has that feature)
      //   if (this.resourceModel.includes(this.fieldDetails.fieldName)) {
      //     // debugger
      //     this.fieldLabel = "Yes"
      //     this.fieldValue = true
      //     this.fieldDetails.originalValue = true
      //   }
      // }

    },
  },
  computed: {
    translationTitle: function() {
      return this.resourceModel[0].i18n_value
    }
  },
  methods: {
    // booleanFieldHandler(newValue) {
    //   if (newValue) {
    //     this.fieldLabel = "Yes"
    //   } else {
    //     this.fieldLabel = "No"
    //   }
    //   this.fieldDetails.newValue = newValue
    //   this.$store.dispatch('updatePendingPropertyFeatureChanges', this.fieldDetails, newValue)
    // }
  }

}

</script>
