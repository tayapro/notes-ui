<script setup>
import { ref } from 'vue'
import ModalBase from './lib/ModalBase.vue'
const emit = defineEmits(['cancel', 'submit'])
const props = defineProps([
    'greeting',
    'visible',
    'errorMsg',
    // 'prop_text',
    // 'prop_icon',
])
// import { XMarkIcon } from '@heroicons/vue/24/outline'

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
            <div class="xmark-div">
                <button class="xmark-btn" @click="emit('cancel')">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div class="greeting">
                <h3>{{ props.greeting }}</h3>
            </div>

            <input ref="usernameRef" type="text" placeholder="Username" />
            <input ref="passwordRef" type="text" placeholder="Password" />
            <button class="submit-btn" @click="onSubmit()">submit</button>
            <!-- <XMarkIcon size="1.0rem" /> -->
            <!-- <button>
                    <div class="button-with-icon">
                        <component :is="XMarkIcon" class="icon" />
                        <p>{{ prop_text }}</p>
                    </div>
                </button> -->
            <span class="error">{{ props.errorMsg }}</span>
        </div>
    </ModalBase>
</template>

<style scoped>
.greeting {
    display: flex;
    justify-content: center;
    width: 100%;
}

.xmark-div {
    display: flex;
    justify-content: end;
}

.xmark-btn {
    display: flex;
    padding: 0.01rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 1.3rem;
    margin-top: 1.3rem;
}

.submit-btn {
    padding: 0.5rem;
    margin-left: 1.3rem;
    margin-right: 1.3rem;
    color: rgb(245, 245, 245);
    background-color: rgb(0, 153, 153);
    border: none;
    border-radius: 15px;
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
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    width: 300px;
    padding-bottom: 0.7rem;
}

.modal h3 {
    text-align: center;
}

.modal input {
    margin-bottom: 0.7rem;
    padding: 0.5rem;
    margin-left: 1.3rem;
    margin-right: 1.3rem;
    text-align: left;
    border: 1px solid rgba(51, 51, 52, 0.3);
}

.modal input:focus {
    border: 1px solid rgba(0, 153, 153, 1);
    outline: none;
}
</style>
