<script setup>
import { onUpdated, ref } from 'vue'
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom'

const props = defineProps({
    content: String,
    placement: {
        type: String,
        default: 'bottom',
    },
    visible: {
        type: Boolean,
        default: false,
    },
})

const referenceRef = ref()
const floatingRef = ref()
const arrowRef = ref()

async function calculatePosition() {
    const { x, y, middlewareData, placement } = await computePosition(
        referenceRef.value,
        floatingRef.value,
        {
            placement: props.placement,
            middleware: [
                offset(8),
                flip(),
                shift({ padding: 5 }),
                arrow({ element: arrowRef.value }),
            ],
        }
    )

    Object.assign(floatingRef.value.style, {
        left: `${x}px`,
        top: `${y}px`,
    })

    const { x: arrowX, y: arrowY } = middlewareData.arrow

    const opposedSide = {
        left: 'right',
        right: 'left',
        bottom: 'top',
        top: 'bottom',
    }[placement.split('-')[0]]

    Object.assign(arrowRef.value.style, {
        left: arrowX ? `${arrowX}px` : '',
        top: arrowY ? `${arrowY}px` : '',
        bottom: '',
        right: '',
        [opposedSide]: '-4px',
    })
}

onUpdated(async () => {
    if (props.visible) {
        calculatePosition()
    }
})
</script>

<template>
    <div class="inline-block1">
        <div class="inline-block" ref="referenceRef">
            <slot />
        </div>

        <Transition name="fade">
            <div v-show="visible" ref="floatingRef" class="tooltip">
                <span>{{ props.content }}</span>
                <div ref="arrowRef" class="arrow"></div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.fade-enter-active {
    transition: opacity 0.01s ease-in;
}

.fade-leave-active {
    transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.inline-block {
    display: inline-block;
}

.tooltip {
    background-color: rgb(51, 51, 52);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    font-size: 0.8rem;
}

.arrow {
    width: 8px;
    height: 8px;
    background-color: rgb(51, 51, 52);
    transform: rotateY(0deg) rotate(45deg);
    position: absolute;
}
</style>
