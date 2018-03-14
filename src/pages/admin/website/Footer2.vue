<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md>
        <v-flex d-flex xs12>
          <v-card color="black" dark>
            <v-card-title primary class="title">Website Footer</v-card-title>
          </v-card>
        </v-flex>
        <v-card contain>
          <v-flex xs12>
            <v-card-title>
              <h2>Social Links</h2>
            </v-card-title>
          </v-flex>
          <form @submit.prevent="onSaveWebSocialMedia">
            <v-layout row>
              <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
            </v-layout>
            <v-layout row wrap>
              <template v-for="(field, index) in socialNetworkFields">
                <v-flex xs1 style="text-align: center;">
                  <i :class="field.class"></i>
                </v-flex>
                <v-flex xs10>
                  <FieldResolver v-on:updatePendingChanges="updatePendingChanges(...arguments)" :fieldDetails="field" :cancelPendingChanges="cancelPendingChanges" v-bind:resourceModel="currentWebsiteSocialMedia"></FieldResolver>
                </v-flex>
                <v-flex xs1></v-flex>
              </template>
            </v-layout>
            <v-layout row>
              <FormSubmitter :hasPendingChanges="hasPendingChanges" v-on:changesCanceled="changesCanceled"></FormSubmitter>
            </v-layout>
          </form>
        </v-card>
      </v-container>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import FormSubmitter from '@/components/form-fields/FormSubmitter'
import FieldResolver from '@/components/form-fields/FieldResolver'
export default {
  components: {
    FormSubmitter,
    FieldResolver
  },
  data() {
    return {
      cancelPendingChanges: false,
      pendingChanges: {},
      hasPendingChanges: false,
      socialNetworkFields: [{
        fieldName: "facebook",
        labelTextTKey: "Facebook",
        class: "fab fa-facebook fa-3x"
        // tooltipTextTKey: false,
        // constraints: {
        //   inputValue: {
        //     url: {
        //       message: "errors.notAUrlVjs"
        //     }
        //   }
        // }
      }, {
        fieldName: "twitter",
        labelTextTKey: "Twitter",
        class: "fab fa-twitter fa-3x"
      }, {
        fieldName: "youtube",
        labelTextTKey: "Youtube",
        class: "fab fa-youtube fa-3x"
      }, {
        fieldName: "linkedin",
        labelTextTKey: "LinkedIn",
        class: "fab fa-linkedin fa-3x"
      }, {
        fieldName: "gplus",
        labelTextTKey: "Google Plus",
        class: "fab fa-google-plus fa-3x"
      }, {
        fieldName: "pinterest",
        labelTextTKey: "Pinterest",
        class: "fab fa-pinterest fa-3x"
      }, {
        fieldName: "instagram",
        labelTextTKey: "Instagram",
        class: "fab fa-instagram fa-3x"
      }],
      WebsiteSettings: {
        social_media: {
          facebook: "https://www.facebook.com/empty",
          linkedin: "https://www.linkedin.com/empty",
          twitter: "https://twitter.com/empty",
          youtube: "https://www.youtube.com/empty",
          gplus: "https://plus.google.com/empty",
          instagram: "https://www.instagram.com/empty",
          pinterest: "https://www.pinterest.com/empty"
        }
      }
    };
  },
  computed: {
    currentWebsiteSocialMedia() {
      if (this.$store.state.websiteStore.currentWebsite.social_media) {
        return this.$store.state.websiteStore.currentWebsite.social_media
      } else {
        return {}
      }
    },
  },
  mounted: function() {
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
      let serverSavedValue = this.currentWebsiteSocialMedia[fieldDetailsWithNewValue.fieldName] || ""
      if (serverSavedValue !== newValue) {
        this.pendingChanges[fieldDetailsWithNewValue.fieldName] = newValue
      } else {
        delete this.pendingChanges[fieldDetailsWithNewValue.fieldName]
      }
      this.hasPendingChanges = Object.keys(this.pendingChanges).length > 0
    },

    onSaveWebSocialMedia() {
      var that = this
      Object.keys(this.pendingChanges).forEach(function(pendingChangeKey) {
        that.currentWebsiteSocialMedia[pendingChangeKey] = that.pendingChanges[pendingChangeKey]
      })
      this.$store.dispatch('updateWebsite')
      // TODO: ensure above is successfull before calling below:
      this.pendingChanges = {}
      this.hasPendingChanges = false
    },
  }
};

</script>
