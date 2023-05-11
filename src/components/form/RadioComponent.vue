<script setup>
import {useField} from 'vee-validate';

const props = defineProps({
  options: {type: Array, required: true},
  name: {type: String, required: true},
  label: {type: String},
  modelValue: {},
  rules: {},
})

const emit = defineEmits(['update:modelValue'])

const {errorMessage, value} = useField(() => props.name, props.rules);
</script>

<template>
  <div class="radio d-flex">
    <div v-if="label" class="radio-label">{{ label }}</div>

    <div class="d-flex">
      <div v-for="(option, optionIndex) in options" class="form-check radio__option">
        <input class="form-check-input" type="radio" :name="name" :id="`radio-${name}-${optionIndex}`"
               :checked="option.value === modelValue"
               @change="$emit('update:modelValue', option.value)">
        <label class="form-check-label" :for="`radio-${name}-${optionIndex}`">
          {{ option.label }}
        </label>
      </div>

      <span v-if="errorMessage" class="input__error error">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.radio-label {
  margin-right: 20px;
}

.radio__option {
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
}
</style>