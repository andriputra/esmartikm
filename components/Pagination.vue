<template>
  <ul v-if="total > 0" class="pagination">
    <li
      :class="[
        'pagination__item flex-1 md:flex-initial text-center',
        { disabled: currentInt <= 1 },
      ]"
      @click.stop.prevent="prevHandler"
    >
      <svg-icon name="chevron_left" />
    </li>
    <template v-if="simple">
      <li class="pagination__item">
        <input
          class="w-16 text-center"
          type="text"
          :value="current"
          @keydown.enter="toPageHandler($event.target.value)"
          @input="inputHandler($event)"
        />
      </li>
    </template>
    <template v-else>
      <li class="pagination__item md:hidden">
        <input
          class="w-16 text-center"
          type="text"
          :value="current"
          @keydown.enter="toPageHandler($event.target.value)"
          @input="inputHandler($event)"
        />
      </li>
      <li
        :class="[
          'pagination__item hidden md:block',
          { active: currentInt === 1 },
        ]"
        @click.stop.prevent="firstHandler"
      >
        1
      </li>
      <li
        v-if="pages > 5 && currentInt > 3"
        class="pagination__item disabled hidden md:block"
      >
        ...
      </li>
      <template v-for="i in pages">
        <li
          v-if="inFive(i)"
          :key="i"
          :class="[
            'pagination__item hidden md:block',
            { active: currentInt == i },
          ]"
          @click.stop.prevent="clickHandler(i)"
        >
          {{ i }}
        </li>
      </template>
      <li
        v-if="pages > 5 && pages - currentInt > 3"
        class="pagination__item disabled hidden md:block"
      >
        ...
      </li>
      <li
        v-if="pages > 1"
        :class="[
          'pagination__item hidden md:block',
          { active: currentInt === pages },
        ]"
        @click.stop.prevent="lastHandler"
      >
        {{ pages }}
      </li>
    </template>
    <li
      :class="[
        'pagination__item flex-1 md:flex-initial text-center',
        { disabled: currentInt >= pages },
      ]"
      @click.stop.prevent="nextHandler"
    >
      <svg-icon name="chevron_right" />
    </li>
    <li
      class="pagination__item total w-full md:w-auto text-center md:text-right mt-5 md:mt-0"
      v-html="
        totalRender(total, [(currentInt - 1) * rows + 1, currentInt * rows])
      "
    ></li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    total: { type: Number, required: true },
    current: { type: [Number, String], default: 1 },
    rows: { type: Number, default: 10 },
    simple: { type: Boolean, default: false },
    noMoreText: { type: String, default: 'No more data...' },
    totalRender: {
      type: Function,
      default: (total: any, range: any) => `${range[0]}-${range[1]} / ${total}`,
    },
  },
  data() {
    return {}
  },
  computed: {
    pages(this: any) {
      return Math.ceil(this.total / this.rows)
    },
    currentInt(this: any) {
      return parseInt(this.current + '')
    },
  },
  methods: {
    toPageHandler(this: any, v: any) {
      if (/^\s*$/.test(v)) {
        this.clickHandler(this.currentInt)
      } else {
        this.clickHandler(parseInt(v))
      }
    },
    inputHandler(this: any, evt: any) {
      const v = evt.target.value
      if (/^\s*$/.test(v)) {
        return
      }
      if (
        !(/(^\d+$)/.test(v) && parseInt(v) >= 1 && parseInt(v) <= this.pages)
      ) {
        evt.target.value = this.currentInt
      }
    },
    clickHandler(this: any, index: any) {
      if (index !== this.currentInt) {
        // this.current = index
        this.$emit('change', index)
      }
    },
    firstHandler(this: any) {
      if (this.currentInt > 1) {
        // this.current = 1
        this.$emit('change', 1)
      }
    },
    lastHandler(this: any) {
      if (this.currentInt < this.pages) {
        // this.current = this.pages
        this.$emit('change', this.pages)
      }
    },
    prevHandler(this: any) {
      if (this.currentInt > 1) {
        // this.current--
        this.$emit('change', this.currentInt - 1)
      }
    },
    nextHandler(this: any) {
      if (this.currentInt < this.pages) {
        // this.current++
        this.$emit('change', this.currentInt + 1)
      }
    },
    inFive(this: any, index: any) {
      if (index > 1 && index < this.pages) {
        // console.log(this.current)
        let before = this.currentInt - 2
        let after = this.currentInt + 2
        if (before <= 0) after -= before - 1
        if (after >= this.pages) {
          before -= after - this.pages
          after = index
        }
        // console.log(before, '::', after)
        if (before <= index && after >= index) return true
        return false
      }
      return false
    },
  },
})
</script>
