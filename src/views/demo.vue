<template>
  <div>
    <h1>DEMO</h1>
    <hr />
    <h3>{{ count }}</h3>
    <h4>{{user.name }}</h4>
    <input type="text" v-model.number="num" />
    <button @click="count1">count++</button>
    <button @click="names">name</button>
    <button @click="count2">+++++++</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      num: 0
    }
  },
  computed: {
    ...mapState(['count', 'user'])
  },
  methods: {
    count1() {
      this.$store.commit('changeCount')
    },
    names() {
      this.$store.commit('changeName')
    },
    count2() {
      this.$store.commit('changeCount2', this.num)
    }
  }
}
</script>

<style></style>
