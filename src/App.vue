<template>
  <v-app>
    <v-navigation-drawer dark :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
        <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title >
            <strong>Property</strong><span style="color: #cccccc;">Web</span><strong class="navy--text text--darken-1">Builder</strong>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
      <MainNav></MainNav>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <strong>Property</strong><span style="color: gray;">Web</span><strong class="navy--text text--darken-1">Builder</strong> &copy; {{CopyRightYear}}
    </v-footer>
  </v-app>
</template>

<script>
import MainNav from "@/components/MainNav";

export default {
  components: {
    MainNav
  },
  data() {
    return {
      CopyRightYear: 2017,
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Administration"
    };
  },
  name: "App",
  methods: {},
  mounted: function() {
    var d = new Date();
    this.CopyRightYear = d.getFullYear();

    this.$store.dispatch("loadSetupInfo");
  }
};
</script>

