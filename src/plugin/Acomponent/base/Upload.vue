<template>
    <div>
        <a-button >
            <input type="file"/>
            <slot></slot>
        </a-button>
    </div>
</template>
<script>
export default {
    name:"a-upload",
}
</script>