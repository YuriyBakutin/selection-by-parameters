<script lang="ts" setup>
import getEndingOfTheRussianWordRoom from '../helpers/getEndingOfTheRussianWordRoom'

const props = defineProps<{
  floor: number,
  rooms: number,
  square: number,
  prodNumber: string,
  price: number,
}>()

const formatter = new Intl.NumberFormat('ru-RU')

const endingOfTheRussianWordRoom = computed(
  () => getEndingOfTheRussianWordRoom(props.rooms)
)

const costPerMeterText = computed(() => (
  formatter.format(Math.round(props.price / props.square))
))

const detail = () => {
  console.log('detail')
}
</script>
<template>
  <article
    style="overflow: hidden"
    class="prod-card p3">
    <div class="fit flex justify-between mb3 mt1">
      <div class="dim h3 ml1 bold">{{floor}} этаж</div>
      <h2 class="h3 my0 mr1 bold">
        {{rooms}} комнат{{endingOfTheRussianWordRoom}}
        <span class="dim mx2">-</span> {{square.toFixed(2)}}м²</h2>
    </div>
    <div class="image-block relative">
      <div class="number z1">№{{prodNumber}}</div>
      <div class="plan"></div>
    </div>
    <div class="price">{{formatter.format(price)}}р.</div>
    <div class="cost-per-meter dim">{{costPerMeterText}} р. за м²</div>
    <button @click="detail"
      tabindex="0"
      class="control-frame checked h1 bold pointer detail">Подробнее</button>
  </article>
</template>
<style>
.prod-card {
  width: 250px;
  height: 345px;
  background: #fff;
  box-shadow: 0px 5px 20px rgba(86, 86, 86, 0.05);
  border-radius: 10px;
  margin: 0 10px 30px 10px;
  overflow: hidden;
  transition: box-shadow .2s ease-in-out;
}
.prod-card:hover,.prod-card:focus-within {
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
.prod-card:hover,.prod-card:focus-within .image-block {
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
.prod-card:hover,.prod-card:focus-within .plan {
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
.detail {
  width: 250px;
  height: 40px;
  background: #70D24E;
  border-radius: 2px 2px 5px 5px !important;
  text-transform: uppercase;
  margin-top: 17px;
}
</style>