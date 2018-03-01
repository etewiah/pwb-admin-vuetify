<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-container grid-list-md>
                <v-flex d-flex xs12>
                    <v-card color="black" dark>
                        <v-card-title primary class="title"><strong>Property</strong><span style="color: #cccccc;">Web</span><strong class="navy--text text--darken-1">Builder</strong></v-card-title>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 contain>
                    <v-card contain>
                        <v-layout column align-center>
                            <v-card-title>
                                <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
                                <blockquote>
                                    First, solve the problem. Then, write the code
                                    <footer></footer>
                                </blockquote>
                            </v-card-title>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-container>
        </v-slide-y-transition>
    </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
