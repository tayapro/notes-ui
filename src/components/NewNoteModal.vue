<script setup>
import { ref } from 'vue'
import ModalBase from './lib/ModalBase.vue'
import { XMarkIcon as CloseIcn } from '@heroicons/vue/24/outline'

const emit = defineEmits(['cancel', 'submit'])
const props = defineProps(['greeting', 'visible'])

const titleRef = ref('')
const textRef = ref('')
const tagsRef = ref()

function onSubmit() {
    const title = titleRef.value
    const text = textRef.value
    const tags = tagsRef.value.value

    emit('submit', title, text, tags)
    titleRef.value = ''
    textRef.value = ''
    tagsRef.value.value = ''
}

function isDisabled() {
    return titleRef.value.length === 0 || textRef.value.length === 0
}
</script>

<template>
    <ModalBase :prop_visible="props.visible">
        <div class="modal">
            <div class="xmark-div">
                <button class="xmark-btn" @click="emit('cancel')">
                    <CloseIcn />
                </button>
            </div>
            <div class="greeting">
                <h3>{{ props.greeting }}</h3>
            </div>
            <input type="text" placeholder="title" v-model="titleRef" />
            <input type="text" placeholder="text" v-model="textRef" />
            <input ref="tagsRef" type="text" placeholder="tag" />
            <button
                class="submit-btn"
                @click="onSubmit()"
                :disabled="isDisabled()"
            >
                submit
            </button>
        </div>
    </ModalBase>
</template>

<style scoped>
.greeting {
    display: flex;
    justify-content: center;
    width: 100%;
}

.submit-btn {
    padding: 0.5rem;
    color: rgb(245, 245, 245);
    background-color: rgb(0, 153, 153);
    border: none;
    border-radius: 10px;
    cursor: pointer;
}

.xmark-div {
    display: flex;
    justify-content: end;
    /* align-items: center; */
}

.xmark-btn {
    display: flex;
    padding: 0.01rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: rgb(255, 255, 255);
    width: 1.3rem;
    height: 1.3rem;
}

.modal {
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.35);
    width: 20rem;
    padding: 2rem;
}

.modal input {
    margin-bottom: 0.7rem;
    padding: 0.3rem;
    text-align: center;
}
</style>
