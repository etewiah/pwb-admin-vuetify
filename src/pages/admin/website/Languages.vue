<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-container grid-list-md>
        <v-flex d-flex xs12>
          <v-card color="black" dark>
            <div style="display: inline=block; float: right;" v-show="dataChanged">
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

                <!-- <v-container fluid v-for="n in WebsiteSettings.setup.availableLocaleFields" v-bind="WebsiteSettings.setup.availableLocaleFields">
                    <v-checkbox :label="`${n.labelTextTKey}`" v-model="n.labelTextTKey"></v-checkbox>
                </v-container> -->
                <v-radio-group v-model="WebsiteSettings.setup.availableLocaleFields" v-on:change="dataChanged=true">
                  <v-radio v-for="n in WebsiteSettings.setup.availableLocaleFields" :key="n.labelTextTKey" :label="`${n.labelTextTKey}`" :value="n.labelTextTKey"></v-radio>
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
                <v-radio-group v-model="defaultLanguage" v-on:change="dataChanged=true">
                  <v-radio label="English" value="English"></v-radio>
                  <v-radio label="Spanish" value="Spanish"></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-title>
                <h2>Default Currency</h2>
              </v-card-title>
              <v-card-text>
                <v-select label="Default Currency" :items="DefaultCurrencies" v-model="WebsiteSettings.default_currency" v-on:change="dataChanged=true"></v-select>
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
      dataChanged: false,
      defaultLanguage: "English",
      DefaultCurrencies: ["USD", "Euro", "Russian Ruble"],
      WebsiteSettings: {
        default_currency: "Euro",
        setup: {
          availableLocaleFields: {
            0: {
              labelTextTKey: "bg",
              fieldName: "bg",
              localeVariants: ["bg-BG"]
            },
            1: {
              labelTextTKey: "nl",
              fieldName: "nl",
              localeVariants: ["nl-Nl"]
            },
            2: {
              labelTextTKey: "en",
              fieldName: "en",
              localeVariants: ["en-UK", "en-US"]
            },
            3: {
              labelTextTKey: "fr",
              fieldName: "fr",
              localeVariants: ["fr-FR"]
            },
            4: {
              labelTextTKey: "de",
              fieldName: "de",
              localeVariants: ["de-DE"]
            },
            5: {
              labelTextTKey: "it",
              fieldName: "it",
              localeVariants: ["it-IT"]
            },
            6: {
              labelTextTKey: "ko",
              fieldName: "ko",
              localeVariants: ["ko-KR"]
            },
            7: {
              labelTextTKey: "pl",
              fieldName: "pl",
              localeVariants: ["pl-PL"]
            },
            8: {
              labelTextTKey: "pt",
              fieldName: "pt",
              localeVariants: ["pt-PT", "pt-BR"],
              isNotComplete: true
            },
            9: {
              labelTextTKey: "ro",
              fieldName: "ro",
              localeVariants: ["ro-RO"]
            },
            10: {
              labelTextTKey: "ru",
              fieldName: "ru",
              localeVariants: ["ru-RU"]
            },
            11: {
              labelTextTKey: "es",
              fieldName: "es",
              localeVariants: ["es-ES", "es-MX", "es-CL"]
            },
            12: {
              labelTextTKey: "tr",
              fieldName: "tr",
              localeVariants: ["tr-TR"],
              isNotComplete: true
            },
            13: {
              labelTextTKey: "vi",
              fieldName: "vi",
              localeVariants: ["vi-VI"],
              isNotComplete: true
            }
          }
        }
      }
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    AxiosApi.GetWebsiteSettings(websiteData => {
      this.WebsiteSettings = websiteData;
    });
  },
  methods: {
    watch: {
      // call again the method if the route changes
      // $route: "fetchData"
    }
  }
};
</script>
