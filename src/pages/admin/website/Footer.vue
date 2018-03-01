<template>
  <v-container>
      <v-slide-y-transition mode="out-in">
          <v-container grid-list-md>
              <v-flex d-flex xs12>
                  <v-card color="black" dark>
                      <v-card-title primary class="title">Website Footer</v-card-title>
                  </v-card>
              </v-flex>
              <v-layout row wrap>
                  <v-flex d-flex xs12 contain>
                      <v-card contain>
                          <v-card-title><h2>Social Links</h2></v-card-title>
                          <v-card-text>
                              <v-text-field label="Facebook" prepend-icon="bug_report" v-model="WebsiteSettings.social_media.facebook"></v-text-field>
                          </v-card-text>
                          <v-card-text>
                              <v-text-field label="Linked In" prepend-icon="bug_report" v-model="WebsiteSettings.social_media.linkedin"></v-text-field>
                          </v-card-text>
                          <v-card-text>
                              <v-text-field label="Twitter" prepend-icon="bug_report" v-model="WebsiteSettings.social_media.twitter"></v-text-field>
                          </v-card-text>
                      </v-card>
                  </v-flex>                 
              </v-layout>
          </v-container>
      </v-slide-y-transition>
      <pre>{{ WebsiteSettings }}</pre>
  </v-container>
</template>

<script>
let AxiosApi = require("@/store/modules/api");

export default {
  data() {
    return {
      WebsiteSettings: {
        social_media: {
          facebook: "https://www.facebook.com/propertywebbuilder",
          linkedin: "https://www.linkedin.com/company/propertywebbuilder",
          twitter: "https://twitter.com/prptywebbuilder"
        }
      }
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    // CHECK IF LOCALSTORAGE IS ALREADY LOADED
    if (localStorage.WebSiteData.length > 10) {
      this.WebsiteSettings = JSON.parse(localStorage.WebSiteData);
    } else {
      // DATA NOT LOADED IN LOCAL STORAGE: GET() DATA
      localStorage.SiteData = "[]";
      localStorage.WebSiteData = "[]";

      AxiosApi.Get("/api/v2/agency", data => {
        // fix some data
        if (data) {
          if (data.website.style_variables.body_style) {
            var siteStyle = data.website.style_variables.body_style;
            if (siteStyle.indexOf(".") > 0) {
              siteStyle = siteStyle.substring(
                siteStyle.indexOf(".") + 1,
                siteStyle.length
              );
            }
            data.website.style_variables.body_style = siteStyle;
          }

          localStorage.SiteData = JSON.stringify(data);
          localStorage.WebSiteData = JSON.stringify(data.website); // !!remember to use JSON.parse() to read the values back
          this.WebsiteSettings = data.website;
          console.log("SETTINGS LOAD SUCCESS: " + data.website);
        }
      });
    }
  },
  methods: {
    watch: {
      // call again the method if the route changes
      // $route: "fetchData"
    }
  }
};
</script>
