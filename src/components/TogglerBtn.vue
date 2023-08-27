<script>
export default {
    name: 'TogglerBtn',
    props: {
        active: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<template>
    <div :class="{ active, disabled }">
        <span>{{ active ? '✔️' : '❌' }}</span>
        <slot />
    </div>
</template>

<style scoped>
div {
    padding: 5px 15px;
    background-color: tomato;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    user-select: none;
    color: white;
}

div:hover {
    filter: contrast(1.3);
}

.active {
    background-color: yellowgreen;
    color: black;
}

.disabled {
    background-color: #666;
    cursor: default;
}
</style>