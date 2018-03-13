<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md>
        <v-flex d-flex xs12>
          <v-card color="black" dark>
            <div style="display: inline=block; float: right;" v-show="WebsiteSettings.hasChanges">
              You have unsaved changes
              <v-btn color="success">Save Changes</v-btn>
            </div>
            <v-card-title primary class="title">Website Settings</v-card-title>
          </v-card>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card contain>
              <v-card-title>
                <h2>General</h2>
              </v-card-title>
              <v-card-text>
                <v-text-field xs3 name="GoogleAnalyticsID" label="Google Analytics ID" value="" v-model="WebsiteSettings.analytics_id" v-on:change="DataChanged();"></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-title xs12>
                <h2>Appearance</h2>
              </v-card-title>
              <v-card-text>
                <v-select label="Site Layout" :items="SiteLayout" v-model="WebsiteSettings.style_variables.body_style" v-on:change="DataChanged();"></v-select>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-title xs12>
                <h2>TODO: Logo</h2>
              </v-card-title>
              <v-card-text align-center>
                <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
                <!-- <v-card-media src="@/assets/logo.png" height="120px"></v-card-media> -->
                <v-card-actions>
                  <v-btn color="primary">Upload</v-btn>
                  <v-card-text>Recommended size for the logo image is
                    <code>120px x 80px</code>
                  </v-card-text>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card contain>
              <v-card-title xs12>
                <h2>Colors</h2>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerPrimary" type="color" v-model="WebsiteSettings.style_variables.primary_color" v-on:change="DataChanged();"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Primary Color" value="" v-model="WebsiteSettings.style_variables.primary_color" v-on:change="DataChanged();"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerSecondary" type="color" v-model="WebsiteSettings.style_variables.secondary_color" v-on:change="DataChanged();"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Secondary Color" value="" v-model="WebsiteSettings.style_variables.secondary_color" v-on:change="DataChanged();"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerActions" type="color" v-model="WebsiteSettings.style_variables.action_color" v-on:change="DataChanged();"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Actions Color" value="" v-model="WebsiteSettings.style_variables.action_color" v-on:change="DataChanged();"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerFooterBackground" type="color" v-model="WebsiteSettings.style_variables.footer_bg_color" v-on:change="DataChanged();"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Footer Background Color" value="" v-model="WebsiteSettings.style_variables.footer_bg_color" v-on:change="DataChanged();"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerFooterPrimaryText" type="color" v-model="WebsiteSettings.style_variables.footer_main_text_color" v-on:change="DataChanged();"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Footer Primary Text Color" value="" v-model="WebsiteSettings.style_variables.footer_main_text_color" v-on:change="DataChanged();"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerFooterSecondaryText" type="color" v-model="WebsiteSettings.style_variables.footer_sec_text_color" v-on:change="DataChanged();"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Footer Secondary Text Color" value="" v-model="WebsiteSettings.style_variables.footer_sec_text_color" v-on:change="DataChanged();"></v-text-field>
                  </v-flex>
                </v-layout>
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
import ApiAjax from "@/store/modules/apiAjax";

export default {
  data() {
    return {
      WebsiteSettings: {
        analytics_id: "",
        style_variables: {
          body_style: "boxed",
          primary_color: "#563d7c",
          secondary_color: "#8ec449",
          labels_text_color: "#ffffff",
          footer_bg_color: "#333333",
          footer_main_text_color: "#ffffff",
          footer_sec_text_color: "#cccccc",
          action_color: "#aca000"
        }
      },
      SiteLayout: ["boxed", "wide"]
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    if (localStorage.WebSiteData.length > 10) {
      this.WebsiteSettings = this.FixSiteLayoutJSON(
        JSON.parse(localStorage.WebSiteData)
      ); // RETURN PREVIOUSLY LOADED SETTINSS
    } else {
      ApiAjax.get("/api/v2/agency", data => {
        localStorage.SiteData = JSON.stringify(data);
        data.website.hasChanges = false; // create this setting on data load
        this.FixSiteLayoutJSON(data.website);
      });
    }
    // End Mounted()
  },
  methods: {
    DataChanged() {
      this.WebsiteSettings.hasChanges = true;
      localStorage.WebSiteData = JSON.stringify(this.WebsiteSettings);
      return true;
    },
    FixSiteLayoutJSON(jsonData) {
      if (jsonData) {
        if (jsonData.style_variables.body_style) {
          var siteStyle = jsonData.style_variables.body_style;
          if (siteStyle.indexOf(".") > 0) {
            siteStyle = siteStyle.substring(
              siteStyle.indexOf(".") + 1,
              siteStyle.length
            );
            jsonData.style_variables.body_style = siteStyle;
          }
        }
        if (jsonData.style_variables.primary_color.length < 6) {
          jsonData.style_variables.primary_color = "#454545";
        }
        if (jsonData.style_variables.secondary_color.length < 6) {
          jsonData.style_variables.secondary_color = "#1d1d1d";
        }
        if (jsonData.style_variables.action_color.length < 6) {
          jsonData.style_variables.action_color = "#8f8f8f";
        }
        if (jsonData.style_variables.footer_bg_color.length < 6) {
          jsonData.style_variables.footer_bg_color = "#454545";
        }
        if (jsonData.style_variables.footer_main_text_color.length < 6) {
          jsonData.style_variables.footer_main_text_color = "#cfcfcf";
        }
        if (jsonData.style_variables.footer_sec_text_color.length < 6) {
          jsonData.style_variables.footer_sec_text_color = "#8f8f8f";
        }
        localStorage.jsonData = JSON.stringify(jsonData);
        this.WebsiteSettings = jsonData;
      }
      return jsonData;
    }
  }
};
</script>

<style>
input[type="color"] {
  text-decoration: none;
  cursor: pointer;
  width: 96% !important;
  height: 50px !important;
  cursor: default;
  border-width: 1px;
  border-style: solid;
  border-color: lightgray;
  border-image: initial;
  padding: 1px 2px;
}
</style>

