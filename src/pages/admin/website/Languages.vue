<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md>
        <v-flex d-flex xs12>
          <v-card color="black" dark>
            <div style="display: inline=block; float: right;" v-show="SiteSettings.website.hasChanges">
              You have unsaved changes
              <v-btn color="success">Save Changes</v-btn>
            </div>
            <v-card-title primary class="title">Website Languages</v-card-title>
          </v-card>
        </v-flex>
        <v-layout row wrap>
          <v-flex d-flex xs6 contain>
            <v-card contain>
              <v-card-text>
                <h2>Supported</h2>
                <br />If you need another language, please mention it
                <a target="_blank" href="https://github.com/etewiah/property_web_builder/issues/4">here</a>
                <p style="color: red;"><br />NEED CHECKBOXES - NOT RADIO - ALSO NEED TO FIND REAL COUNTRY NAMES NOT JUST ABBR - NEED TO FIND DATA SETTING</p>

                <!-- <v-container fluid v-for="n in SiteSettings.setup.availableLocaleFields" v-bind="SiteSettings.setup.availableLocaleFields">
                    <v-checkbox :label="`${n.labelTextTKey}`" v-model="n.labelTextTKey"></v-checkbox>
                </v-container> -->
                <v-radio-group v-model="SiteSettings.setup.availableLocaleFields" v-on:change="DataChanged();">
                  <v-radio v-for="n in SiteSettings.setup.availableLocaleFields" :key="n.labelTextTKey" :label="`${n.labelTextTKey}`" :value="n.labelTextTKey"></v-radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs6 contain>
            <v-card contain>
              <v-card-title>
                <h2>Default Website Language</h2>
              </v-card-title>
              <v-card-text>
                <v-radio-group v-model="defaultLanguage" v-on:change="DataChanged();">
                  <v-radio label="English" value="English"></v-radio>
                  <v-radio label="Spanish" value="Spanish"></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-title>
                <h2>Default Currency</h2>
              </v-card-title>
              <v-card-text>
                <v-select label="Default Currency" :items="DefaultCurrencies" v-model="SiteSettings.default_currency" v-on:change="DataChanged();"></v-select>
                <div>Will only apply to newly added properties</div>
              </v-card-text>
              <v-divider></v-divider>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-slide-y-transition>
    <pre>{{ SiteSettings }}</pre>
  </v-container>
</template>

<script>
import ApiAjax from "@/store/modules/apiAjax";

export default {
  data() {
    return {
      defaultLanguage: "English",
      DefaultCurrencies: ["USD", "Euro", "Russian Ruble"],
      website: { hasChanges: false },
      SiteSettings: {
        default_currency: "Euro",
        setup: {
          availableLocaleFields: {
            0: {
              labelTextTKey: "no",
              fieldName: "no",
              localeVariants: ["bg-BG"]
            },
            1: {
              labelTextTKey: "data",
              fieldName: "data",
              localeVariants: ["nl-Nl"]
            },
            2: {
              labelTextTKey: "check",
              fieldName: "check",
              localeVariants: ["en-UK", "en-US"]
            },
            3: {
              labelTextTKey: "api",
              fieldName: "api",
              localeVariants: ["fr-FR"]
            }
          }
        }
      }
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    if (localStorage.SiteData.length > 10) {
      this.SiteSettings = JSON.parse(localStorage.SiteData); // RETURN PREVIOUSLY LOADED SETTINSS
    } else {
      ApiAjax.get("/api/v2/agency", data => {
        this.SiteSettings = data;
        data.website.hasChanges = false; // create this setting on data load
        localStorage.WebSiteData = JSON.stringify(data.website);
        localStorage.SiteData = JSON.stringify(data);
      });
    }
  },
  methods: {
    DataChanged() {
      this.SiteSettings.website.hasChanges = true;
      localStorage.WebSiteData = JSON.stringify(this.SiteSettings.website);
      localStorage.SiteData = JSON.stringify(this.SiteSettings);
      return true;
    },
    watch: {
      // call again the method if the route changes
      // $route: "fetchData"
    }
  }
};
</script>
