<template>
  <v-flex v-if="hasPendingChanges" xs12 sm12 offset-sm0>
    <v-btn class="primary" type="submit">Update</v-btn>
    <v-btn @click="$emit('changesCanceled')" >Cancel</v-btn>
  </v-flex>
</template>
<script>
export default {
  components: {},
  props: ["hasPendingChanges"],

}
</script>
