<template>
  <div :class="classObject">
    <div
      v-for="(file, key) in files"
      :key="key"
      class="file-input__row file-input__row--selected"
    >
      <svg-icon name="attach_file" class="file-input__indicator" />
      <label class="truncate">
        {{ file.name }}
        <input type="file" @change="fileChangeHandler(key)" />
      </label>
      <svg-icon
        name="delete"
        class="file-input__delete"
        @click="deleteClickHandler(key)"
      />
    </div>
    <div v-if="!files.length || multiple" class="file-input__row">
      <svg-icon name="attach_file" class="file-input__indicator" />
      <label>
        <span class="file-input__placeholder">{{ labelPlaceholder }}</span>
        <input
          ref="input"
          type="file"
          :multiple="multiple"
          :accept="accept"
          @change="newFileChangeHandler"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    labelPlaceholder: {
      type: String,
      default: 'Browse...',
    },
    multiple: { type: Boolean, default: false },
    accept: { type: String, default: '*' },
    error: { type: Boolean, default: false },
  },
  data() {
    return {
      value: '',
      files: [] as any[],
    }
  },
  computed: {
    classObject() {
      return ['file-input', { 'file-input--error': this.error }]
    },
  },
  watch: {
    files() {
      if (this.multiple) {
        this.$emit('input', this.files)
      } else {
        this.$emit('input', this.files.length ? this.files[0] : '')
      }
    },
  },
  methods: {
    newFileChangeHandler(e: any) {
      if (this.multiple) {
        this.files = this.files.concat(Array.from(e.target.files))
        const input = this.$refs.input as HTMLInputElement
        input.value = ''
      } else {
        this.files = Array.from(e.target.files)
      }
    },
    fileChangeHandler(e: any) {
      this.files.concat(Array.from(e.target.files))
    },
    deleteClickHandler(key: number) {
      this.files.splice(key, 1)
    },
  },
})
</script>
