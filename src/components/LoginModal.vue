<script setup>
import { ref } from 'vue'
import ModalBase from './lib/ModalBase.vue'
const emit = defineEmits(['cancel', 'submit'])
const props = defineProps(['greeting', 'visible', 'errorMsg'])

const usernameRef = ref()
const passwordRef = ref()

function onSubmit() {
    const username = usernameRef.value.value
    const password = passwordRef.value.value
    emit('submit', username, password)
    usernameRef.value.value = ''
    passwordRef.value.value = ''
}
</script>

<template>
    <ModalBase :prop_visible="props.visible">
        <div class="modal">
            <h3>{{ props.greeting }}</h3>
            <input ref="usernameRef" type="text" placeholder="username" />
            <input ref="passwordRef" type="text" placeholder="password" />
            <div class="div-btns">
                <button class="btn" @click="onSubmit()">submit</button>
                <button class="btn" @click="emit('cancel')">cancel</button>
            </div>
            <span class="error">{{ props.errorMsg }}</span>
        </div>
    </ModalBase>
</template>

<style scoped>
.btn {
    padding: 0.3rem;
    padding-right: 0.6rem;
    padding-left: 0.6rem;
}

.error {
    color: red;
    width: 100%;
    height: 1rem;
    font-size: 0.8rem;
    text-align: center;
    margin-top: 1rem;
}
.modal {
    background-color: rgb(255, 255, 255);
    padding: 1.5rem;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    width: 300px;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
}

.modal h3 {
    text-align: center;
}

.modal input {
    margin-bottom: 0.7rem;
    padding: 0.3rem;
    margin-left: 1.3rem;
    margin-right: 1.3rem;
    text-align: center;
}

.div-btns {
    display: flex;
    justify-content: space-around;
    margin-top: 0.7rem;
}
</style>
