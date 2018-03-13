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
            <v-text-field textarea rows=20 v-model="WebsiteSettings.raw_css" v-on:change="DataChanged();"></v-text-field>
          </v-card-text>
        </v-card>
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
      WebsiteSettings: { raw_css: "body  { background: empty; }" }
    };
  },
  components: {},
  computed: {},
  mounted: function() {
    if (localStorage.WebSiteData.length > 10) {
      this.WebsiteSettings = JSON.parse(localStorage.WebSiteData); // RETURN PREVIOUSLY LOADED SETTINSS
    } else {
      ApiAjax.get("/api/v2/agency", data => {
        localStorage.SiteData = JSON.stringify(data);
        data.website.hasChanges = false; // create this setting on data load
        localStorage.WebSiteData = JSON.stringify(data.website);
      });
    }
  },
  methods: {
    DataChanged() {
      this.WebsiteSettings.hasChanges = true;
      localStorage.WebSiteData = JSON.stringify(this.WebsiteSettings);
      return true;
    },
    watch: {
      // call again the method if the route changes
      // $route: "fetchData"
    }
  }
};
</script>
