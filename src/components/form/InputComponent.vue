<script setup>
import {useField} from 'vee-validate';

const props = defineProps({
  type: {type: String, default: 'text'},
  placeholder: {type: String},
  errors: {type: Array},
  label: {type: String},
  name: {type: String, required: true},
  modelValue: {required: true},
  rules: {},
})

defineEmits(['update:modelValue'])

const {errorMessage, value} = useField(() => props.name, props.rules);
</script>

<template>
  <div class="input w-100">
    <div class="input__wrap">
      <label class="input__label d-flex w-100 align-items-center">
        <div v-if="label" class="input__label-text mr-2">{{ label }}:</div>

        <div class="input__item-wrap ml-2">
            <input :value="modelValue" :name="name" :type="type" :placeholder="placeholder"
                   @input="$emit('update:modelValue', $event.target.value)" class="input__item form-control w-100">

          <span v-if="errorMessage" class="input__error error">{{ errorMessage }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input__label-text {
  margin-right: 10px;
}
</style>