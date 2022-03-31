<template>
  <div>
    <button class="btn" @click="doInterpolation">interpolate!</button>
    <br />
    <div
      id="calculator"
      ref="calculator"
      style="width: 600px; height: 400px"
    ></div>
  </div>
</template>

<script>
import Point from "../classes/point.js";
const find_firsts = (f) => {
  const find_delta_f = (f) => {
    let delta_f = [];
    for (let i = 0; i < f.length - 1; i++) {
      delta_f.push(f[i + 1] - f[i]);
    }
    return delta_f;
  };
  let firsts = [f[0]];
  while (f.length != 1) {
    f = find_delta_f(f);
    firsts.push(f[0]);
  }
  return firsts;
};

// function to make a unique id
function randomId() {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
export default {
  name: "Desmos",
  mounted: function () {
    // add the calculator to the DOM
    this.calculator = Desmos.GraphingCalculator(this.$refs.calculator, {
      expressionsCollapsed: true,
    });
    // add the expressions to the calculator
    this.expressions.forEach((expression) => {
      this.calculator.setExpression(expression);
    });
  },
  watch: {
    expressions(newVal, oldVal) {
      // update the calculator with the new expressions
      newVal.forEach((expression) => {
        this.calculator.setExpression(expression);
      });
    },
    points(newVal, oldVal) {
      // update the calculator with the new points
      newVal.forEach((point) => {
        this.calculator.setBlank();
        this.points.forEach((point) => {
          this.calculator.setExpression({
            id: randomId(),
            latex: `(${point.x},${point.y})`,
          });
        });
      });
    },
  },
  props: ["points"],
  data() {
    return {
      expressions: [],
      calculator: null,
    };
  },
  methods: {
    doInterpolation() {
      const h = this.points[1].x - this.points[0].x;
      const x1 = this.points[0].x;
      const r = `r=\\frac{x-${x1}}{${h}}`;
      // add the r expression to the calculator
      this.calculator.setExpression({
        id: randomId(),
        latex: r,
        hidden: true,
      });
      // get all y values in f
      let f = this.points.map((point) => parseInt(point.y));
      let firsts = find_firsts(f);
      const fs = `f_{s}=[` + firsts.toString() + `]`;
      // add fs expression to the calculator
      this.calculator.setExpression({
        id: randomId(),
        latex: fs,
        hidden: true,
      });
      // finally the main interpolation graph
      const fX = `f\\left(x\\right)=${parseInt(firsts[0])}+\\sum_{n=2}^{${
        firsts.length
      }}\\left(f_{s}\\left[n\\right]\\left(\\prod_{m=0}^{n-2}\\left(r-m\\right)\\right)\\left(\\frac{1}{\\left(n-1\\right)!}\\right)\\right)`;
      // add the main interpolation graph to the calculator
      this.calculator.setExpression({
        id: randomId(),
        latex: fX,
      });
    },
  },
};
</script>

<style>
.btn {
  margin: 15px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
#calculator {
  display: block;
  margin: 0 auto;
}
</style>
