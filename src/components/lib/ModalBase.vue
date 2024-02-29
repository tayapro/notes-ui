<script setup>
const props = defineProps(['prop_visible'])
</script>

<template>
    <Transition name="outer">
        <div v-show="prop_visible" class="overlay">
            <div class="center">
                <Transition name="inner">
                    <div v-show="prop_visible">
                        <slot></slot>
                    </div>
                </Transition>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.inner-enter-active,
.inner-leave-active {
    transition: all 1s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.inner-enter-from,
.inner-leave-to {
    opacity: 0;
    transform: scale(1, 0);
}

.outer-enter-active,
.outer-leave-active {
    transition: opacity 1s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.outer-enter-from,
.outer-leave-to {
    opacity: 0;
}

.overlay {
    background-color: rgba(99, 119, 119, 0.362);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
