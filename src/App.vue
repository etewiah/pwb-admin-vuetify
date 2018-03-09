<template>
  <v-app>
    <v-navigation-drawer dark :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>
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
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <template v-if="$auth.ready() && loaded">
          <v-btn v-show="$auth.check()" :to="{name: 'account'}">
            <router-link :to="{name: 'account'}">account</router-link> &bull;
          </v-btn>
          <v-btn v-show="$auth.check()" v-on:click="logout()" href="javascript:void(0);">
            <a>logout</a>
          </v-btn>
        </template>
        <v-btn>
          <v-menu offset-y>
            <v-btn icon light slot="activator">
              {{$store.state.currentLocale}}
              <v-icon light>language</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="lang in locales" :key="lang" @click.native="changeLocale(lang)">
                <v-list-tile-title>
                  <a>
                  {{lang}}
                </a>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <div v-if="$auth.ready()">
        <router-view></router-view>
      </div>
      <div v-if="!$auth.ready()">
        Loading ...
      </div>
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
      locales: ['en', 'es'],
      CopyRightYear: 2017,
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Administration",
      loaded: false
    };
  },
  name: "App",
  methods: {
    logout() {
      this.$auth.logout({
        makeRequest: true,
        success() {
          console.log('success ' + this.context);
        },
        error() {
          console.log('error ' + this.context);
        }
      });
    },
    changeLocale(to) {
      // global.helper.ls.set('locale', to)
      this.$store.commit('setCurrentLocale', to)
      this.$i18n.locale = to
      // Currently localStorage state only gets updated when locale is changed
      localStorage.setItem('pwb_store', JSON.stringify(this.$store.state))
      // Consider updating regularly by using the Vuex subscribe method:
      // https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store
    },
  },
  mounted: function() {
    var d = new Date();
    this.CopyRightYear = d.getFullYear();
    this.$store.dispatch("loadSetupInfo");
    this.$i18n.locale = this.$store.state.currentLocale
    var _this = this;
    // Set up $auth.ready with other arbitrary loaders (ex: language file).
    // debugger
    setTimeout(function() {
      _this.loaded = true;
    }, 500);
  }
};

</script>
