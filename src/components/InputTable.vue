<template>
  <div>
    <!-- form to submit two number values x and y -->
    <form ref="point" action="">
      <input type="number" name="x" placeholder="x" />
      <input type="number" name="y" placeholder="y" />
      <br />
      <button type="submit" @click.prevent="plotPoints">Submit</button>
    </form>
    <!-- the calculator -->
    <!-- print stored points -->
    <br />
    <ol>
      <li v-for="point in this.points">({{ point.x }}, {{ point.y }})</li>
    </ol>
    <Desmos :points="points" />
  </div>
</template>

<script>
import Desmos from "./Desmos.vue";
import Point from "../classes/point.js";
export default {
  data() {
    return {
      points: [],
    };
  },
  mounted: function () {
    this.$refs.point.x.focus();
  },
  methods: {
    plotPoints() {
      const x = this.$refs.point.x.value;
      const y = this.$refs.point.y.value;
      const p = new Point(x, y);
      this.$refs.point.x.value = "";
      this.$refs.point.y.value = "";
      this.$refs.point.x.focus();
      this.points = [...this.points, p];
    },
  },
  components: {
    Desmos,
  },
};
</script>

<style>
/* remove numbers from list */
ol {
  list-style: none;
}
input,
button {
  margin: 4px;
}
</style>
