<template>
  <article class="prod-card p3">
    <div class="fit flex justify-between mb3 mt1">
      <div class="dim h3 ml1 bold">3 этаж</div>
      <h2 class="h3 my0 mr1 bold">1 комната <span class="dim mx2">-</span> 22,94м²</h2>
    </div>
    <div class="image-block relative">
      <div class="number z1">№256</div>
      <div class="plan"></div>
    </div>
    <div class="price">2 729 860р.</div>
    <div class="cost-per-meter dim">119 000 р. за м²</div>
    <button
      class="checked h1 bold pointer detailize">Подробнее</button>
  </article>
</template>
<style>
.prod-card {
  width: 250px;
  height: 345px;
  background: #fff;
  box-shadow: 0px 5px 20px rgba(86, 86, 86, 0.05);
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow .2s ease-in-out;
}
.prod-card:hover {
  box-shadow: 0px 5px 20px rgba(86, 86, 86, 0.25);
}
.dim {
  opacity: 0.5;
}
.image-block {
  width: 250px;
  height: 250px;
  border: 1px solid #EBEBEB;
  box-sizing: border-box;
  border-radius: 5px;
  transition: height .2s ease-in-out;
}
.prod-card:hover .image-block {
  height: 200px;
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
  background-position: center center;
  transition: transform .2s ease-in-out;
}
.prod-card:hover .plan {
  transform: translate3d(0px, -22px, 0px) scale(0.8);
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
.detailize {
width: 250px;
height: 40px;
background: #70D24E;
border-radius: 2px 2px 5px 5px !important;
text-transform: uppercase;
margin-top: 17px;
}
</style>