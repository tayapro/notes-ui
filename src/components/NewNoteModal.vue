<script setup>
import { ref } from 'vue'
import ModalBase from './lib/ModalBase.vue'
const emit = defineEmits(['cancel', 'submit'])
const props = defineProps(['greeting', 'visible'])

const titleRef = ref()
const textRef = ref()
const tagsRef = ref()

function onSubmit() {
    const title = titleRef.value.value
    const text = textRef.value.value
    const tags = tagsRef.value.value
    emit('submit', title, text, tags)
    titleRef.value.value = ''
    textRef.value.value = ''
    tagsRef.value.value = ''
}
</script>

<template>
    <ModalBase :prop_visible="props.visible">
        <div class="modal">
            <h3>{{ props.greeting }}</h3>
            <input ref="titleRef" type="text" placeholder="title" />
            <input ref="textRef" type="text" placeholder="text" />
            <input ref="tagsRef" type="text" placeholder="tag" />
            <div class="btns">
                <button @click="onSubmit()">submit</button>
                <button @click="emit('cancel')">cancel</button>
            </div>
        </div>
    </ModalBase>
</template>

<style scoped>
.modal {
    background-color: rgb(255, 255, 255);
    padding: 2rem;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
}

.modal input {
    margin-bottom: 0.7rem;
    padding: 0.3rem;
    text-align: center;
}

.btns {
    display: flex;
    justify-content: space-around;
}
</style>
