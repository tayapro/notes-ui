<script setup>
const props = defineProps(['prop_text', 'prop_match'])

function splitText() {
    const str = props.prop_text
    const array_str = str.split(props.prop_match)
    const result = []
    for (let i of array_str) {
        result.push(i)
        result.push(props.prop_match)
    }
    result.pop()
    return result
}

function getClass(str) {
    if (str === props.prop_match) return 'highligt'
    return ''
}
</script>

<template>
    <div>
        <span
            :class="getClass(item)"
            v-for="(item, index) in splitText()"
            :key="index"
        >
            {{ item }}
        </span>
    </div>
</template>

<style scoped>
.wrap-text {
    overflow-wrap: break-word;
    background-color: aqua;
}
.highligt {
    color: red;
}
</style>
