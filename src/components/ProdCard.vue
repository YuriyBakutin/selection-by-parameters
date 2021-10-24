<template>
  <article class="prod-card flex flex-column justify-start p3">
    <div class="fit flex justify-between mb3 mt1">
      <div class="dim h3 ml1">3 этаж</div>
      <h2 class="h3 my0 mr1">1 комната <span class="dim mx2">-</span> 22,94м²</h2>
    </div>
    <div class="image-block relative">
      <div class="number">№256</div>
      <div class="plan"></div>
    </div>
    <div class="price">2 729 860р.</div>
    <div class="cost-per-meter dim">119 000 р. за м²</div>
  </article>
</template>
<style>
.prod-card {
  width: 250px;
  height: 345px;
  background: #fff;
  box-shadow: 0px 5px 20px rgba(86, 86, 86, 0.05);
  border-radius: 10px;
}
.dim {
  opacity: 0.5;
}
.image-block {
  width: 250px;
  height: 250px;
  background: #FFFFFF;
  border: 1px solid #EBEBEB;
  box-sizing: border-box;
  border-radius: 5px;
}
.number {
  position: absolute;
  line-height: 30px;
  text-align: center;
  top: -1px;
  right: -1px;
  width: 62px;
  height: 30px;
  border: 1px solid #EBEBEB;
  box-sizing: border-box;
  border-radius: 0px 5px;
  font-weight: bold;
  font-size: 14px;
}
.plan {
  position: absolute;
  top: 31px;
  left: 10px;
  width: 230px;
  height: 188px;
  background: url("../img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.png");
  background-position: center center
}
.price {
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  margin-top: 10px;
  margin-right: 5px;
  text-align: right;
}
.cost-per-meter {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
  margin-right: 5px;
  text-align: right;
}
</style>