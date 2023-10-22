<script setup>
import { ref } from 'vue'
import ModalBase from './lib/ModalBase.vue'
const emit = defineEmits(['cancel', 'submit'])
const props = defineProps(['greeting', 'visible'])

const usernameRef = ref()
const passwordRef = ref()

function onSubmit() {
    const username = usernameRef.value.value
    const password = passwordRef.value.value
    emit('submit', username, password)
    usernameRef.value.value = ''
    passwordRef.value.value = ''
    // this.$refs.passwordRef.internalValue = ''
}
</script>

<template>
    <ModalBase :prop_visible="props.visible">
        <div class="modal">
            <h3>{{ props.greeting }}</h3>
            <input ref="usernameRef" type="text" placeholder="username" />
            <input ref="passwordRef" type="text" placeholder="password" />
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
