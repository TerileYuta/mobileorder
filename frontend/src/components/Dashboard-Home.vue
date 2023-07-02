<template>
    <div>
        <div v-for="(trading, key) in tradingList" :key=key>
            <p>{{ trading.id }}</p>
            <p>{{ trading.grade }}</p>
            <p>{{ trading.class }}</p>
            <p>{{ trading.number }}</p>
            <p>{{ trading.transaction }}</p>
            <p>{{ trading.amount }}</p>
        </div>
    </div>
</template>

<script>
    import socket from "../webSocket"

    export default{
        data(){
            return{
                tradingList: [],
            }
        },

        mounted() {
            socket.socket.addEventListener("open", () =>{
                socket.sendMessage("getTrading","")
                console.log("faskfapo")
            })


            socket.socket.addEventListener("message", (data) =>{
                this.tradingList = JSON.parse(data.data);
            })
        }
    }
</script>