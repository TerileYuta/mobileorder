<template>
    <div>
        <input type="text" placeholder="コードを入力" v-model="reservationCode">
        <qrcodeReader/>

        
        <p>{{ reservationNumber }}</p>
        <p>{{ gradeNumber }}</p>
        <p>{{ classNumber }}</p>
        <p>{{ studentNumber }}</p>
        <p>{{ amount }}</p>

        <MenuCard menuTitle="ポップコーン" price="20" :quantity="popcorn_number" @Child_click="popcorn_number += $event"/>
        <MenuCard menuTitle="大学芋" price="100" :quantity="potato_number" @Child_click="potato_number += $event"/>
        <MenuCard menuTitle="ワッフル" price="60" :quantity="waffle_number" @Child_click="waffle_number += $event"/>
        <MenuCard menuTitle="バニラアイス" price="30" :quantity="ice_number" @Child_click="ice_number += $event"/>
        <MenuCard menuTitle="ファンタオレンジ" price="30" :quantity="fanta_number" @Child_click ="fanta_number += $event"/>

        <DefaultButton message="取引確定" @click.stop="order"/>
    </div>
</template>

<script>
    import qrcodeReader from './Qrcode-reader.vue'
    import MenuCard from "./Menu-Card.vue"
    import DefaultButton from "./Default-Button.vue"
    import socket from "../webSocket"

    export default{
        components:{
            MenuCard,
            qrcodeReader,
            DefaultButton,
        },

        data(){
            return {
                reservationCode: "",
                amount: 0,

                reservationNumber: "",
                gradeNumber: "",
                classNumber: "",
                studentNumber: "",

                popcorn_number: 0,
                potato_number: 0,
                waffle_number: 0,
                ice_number: 0,
                fanta_number: 0,
            }
        },

        watch:{
            reservationCode(){
                this.getOrderData()
            }
        },

        methods:{
            getOrderData(){
                this.reservationNumber = this.reservationCode.substring(0,4)
                
                this.gradeNumber = this.reservationCode.substring(4,5)
                this.classNumber = this.reservationCode.substring(5,6)
                this.studentNumber = this.reservationCode.substring(6,8)

                this.popcorn_number = this.reservationCode.substring(8,9)   
                this.potato_number = this.reservationCode.substring(9,10)
                this.waffle_number = this.reservationCode.substring(10,11)
                this.ice_number = this.reservationCode.substring(11,12)
                this.fanta_number = this.reservationCode.substring(12,13)    

                this.amount = Number(this.popcorn_number) * 20 + Number(this.potato_number) * 100 + Number(this.waffle_number) * 60 + Number(this.ice_number) * 60 + Number(this.fanta_number) * 30
            }, 

            order(){
                socket.sendMessage("order",
                    {
                    "reservationNo": this.reservationNumber,
                    "grade": this.gradeNumber,
                    "class": this.classNumber,
                    "studentNo": this.studentNumber,
                    "popcorn": this.popcorn_number,
                    "potato": this.potato_number,
                    "waffle": this.waffle_number,
                    "ice": this.ice_number,
                    "fanta": this.fanta_number,
                    "amount": this.amount
                }
                )
            }
        }
    }
</script>