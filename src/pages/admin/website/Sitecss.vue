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
            <v-card-title primary class="title">Website CSS</v-card-title>
          </v-card>
        </v-flex>
        <v-card contain>
          <v-card-title style="padding-bottom: 0;">
            <h2>
              <i class="fab fa-css3-alt fa-lg"></i> &nbsp;Raw CSS
            </h2>
            <v-card-text>If you do not know CSS, you can ignore this section</v-card-text>
          </v-card-title>
          <v-card-text style="padding-top: 0;">
            <v-text-field textarea rows=20 v-model="WebsiteSettings.raw_css" v-on:change="dataChanged=true"></v-text-field>
          </v-card-text>
        </v-card>
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
      WebsiteSettings: { raw_css: "body  { background: empty; }" }
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
