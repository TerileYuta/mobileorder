<template>
    <div>
        <h1>{{ menuTitle }}</h1>
        <img :src=img alt="">
        <p>￥{{ price }}</p>
        
        <button @click="$emit('Child_click', -1)">ー</button>
        <p>{{ quantity }}</p>
        <button @click="$emit('Child_click', 1)">＋</button>
    </div>
</template>

<script>
    export default {
        props:[
            "menuTitle",
            "img",
            "price",
            "quantity"
        ],
    }    
</script>