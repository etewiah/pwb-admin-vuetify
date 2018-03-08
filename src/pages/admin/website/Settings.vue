<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md>
        <v-flex d-flex xs12>
          <v-card color="gray" dark>
            <div style="display: inline=block; float: right;" v-show="dataChanged">
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
                <v-text-field xs3 name="GoogleAnalyticsID" label="Google Analytics ID" value="" v-model="WebsiteSettings.analytics_id" v-on:change="dataChanged=true"></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-title xs12>
                <h2>Appearance</h2>
              </v-card-title>
              <v-card-text>
                <v-select label="Site Layout" :items="SiteLayout" v-model="WebsiteSettings.style_variables.body_style" v-on:change="dataChanged=true"></v-select>
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
                  <v-flex xs6><input id="colorPickerPrimary" type="color" v-model="WebsiteSettings.style_variables.primary_color" v-on:change="dataChanged=true"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Primary Color" value="" v-model="WebsiteSettings.style_variables.primary_color" v-on:change="dataChanged=true"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerSecondary" type="color" v-model="WebsiteSettings.style_variables.secondary_color" v-on:change="dataChanged=true"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Secondary Color" value="" v-model="WebsiteSettings.style_variables.secondary_color" v-on:change="dataChanged=true"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerActions" type="color" v-model="WebsiteSettings.style_variables.action_color" v-on:change="dataChanged=true"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Actions Color" value="" v-model="WebsiteSettings.style_variables.action_color" v-on:change="dataChanged=true"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerFooterBackground" type="color" v-model="WebsiteSettings.style_variables.footer_bg_color" v-on:change="dataChanged=true"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Footer Background Color" value="" v-model="WebsiteSettings.style_variables.footer_bg_color" v-on:change="dataChanged=true"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerFooterPrimaryText" type="color" v-model="WebsiteSettings.style_variables.footer_main_text_color" v-on:change="dataChanged=true"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Footer Primary Text Color" value="" v-model="WebsiteSettings.style_variables.footer_main_text_color" v-on:change="dataChanged=true"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-layout row>
                  <v-flex xs6><input id="colorPickerFooterSecondaryText" type="color" v-model="WebsiteSettings.style_variables.footer_sec_text_color" v-on:change="dataChanged=true"></v-flex>
                  <v-flex xs6>
                    <v-text-field label="Footer Secondary Text Color" value="" v-model="WebsiteSettings.style_variables.footer_sec_text_color" v-on:change="dataChanged=true"></v-text-field>
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
// let AxiosApi = require("@/store/modules/api");
import AxiosApi from "@/store/modules/api";
// import("../../../../3rdparty/color-picker-master/color-picker");

export default {
  data() {
    return {
      dataChanged: false,
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
    AxiosApi.GetWebsiteSettings(websiteData => {
      websiteData = this.FixSiteLayoutJSON(websiteData);
    });
    this.dataChanged = false;
    // End Mounted()
  },
  methods: {
    FixSiteLayoutJSON(websiteData) {
      if (websiteData) {
        if (websiteData.style_variables.body_style) {
          var siteStyle = websiteData.style_variables.body_style;
          if (siteStyle.indexOf(".") > 0) {
            siteStyle = siteStyle.substring(
              siteStyle.indexOf(".") + 1,
              siteStyle.length
            );
            websiteData.style_variables.body_style = siteStyle;
          }
        }
        if (websiteData.style_variables.primary_color.length < 6) {
          websiteData.style_variables.primary_color = "#454545";
        }
        if (websiteData.style_variables.secondary_color.length < 6) {
          websiteData.style_variables.secondary_color = "#1d1d1d";
        }
        if (websiteData.style_variables.action_color.length < 6) {
          websiteData.style_variables.action_color = "#8f8f8f";
        }
        if (websiteData.style_variables.footer_bg_color.length < 6) {
          websiteData.style_variables.footer_bg_color = "#454545";
        }
        if (websiteData.style_variables.footer_main_text_color.length < 6) {
          websiteData.style_variables.footer_main_text_color = "#cfcfcf";
        }
        if (websiteData.style_variables.footer_sec_text_color.length < 6) {
          websiteData.style_variables.footer_sec_text_color = "#8f8f8f";
        }
        localStorage.WebSiteData = JSON.stringify(websiteData);
        this.WebsiteSettings = websiteData;
      }
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
/* .color-code {
  display: block;
  clear: both;
  width: 170px;
  height: 2em;
  margin: 0;
  padding: 0 0.5em;
  background: #ffa;
  border: 0;
  border-top: 1px solid;
  border-top-color: inherit;
  font: normal normal 13px/2em Helmet, FreeSans, Sans-Serif;
  color: #000;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.color-code:invalid {
  color: #f00;
} */
</style>

<style>
@import "../../../../3rdparty/color-picker-master/color-picker.min.css";
</style>

