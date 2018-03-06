<template>
  <v-container>
      <v-slide-y-transition mode="out-in">
          <v-container grid-list-md>
              <v-flex d-flex xs12>
                  <v-card color="black" dark>
                      <v-card-title primary class="title">Website Languages</v-card-title>
                  </v-card>
              </v-flex>
              <v-layout row wrap>
                  <v-flex d-flex xs6 contain>
                      <v-card contain>
                          <v-card-title><h2>Supported</h2></v-card-title>
                          <v-card-text>If you need another language, please mention it <a target="_blank" href="https://github.com/etewiah/property_web_builder/issues/4">here</a></v-card-text>
                          <v-divider></v-divider>
                      </v-card>
                  </v-flex>
                  <v-flex d-flex xs6 contain>
                      <v-card contain>
                          <v-card-title><h2>Default Website Language</h2></v-card-title>
                          <v-card-text>
                                <v-radio-group>
                                  <v-radio label="English" value="English" selected="true"></v-radio>
                                  <v-radio label="Spanish" value="Spanish"></v-radio>
                                </v-radio-group>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-title><h2>Default Currency</h2></v-card-title>
                          <v-card-text>
                              <v-select label="Default Currency" :items="SiteLayout" v-model="WebsiteSettings.default_currency"></v-select>
                              <div>Will only apply to newly added properties</div>
                          </v-card-text>
                          <v-divider></v-divider>
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
      WebsiteSettings: [],
      SiteLayout: ["USD", "Euro", "Russian Ruble"]
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
