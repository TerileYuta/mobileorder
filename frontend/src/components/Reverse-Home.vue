<template>
    <div class="m-5">
    import MenuBox from "./Menu-Box.vue";
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                学年
            </label>
            <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" v-model="gradeNumber">
                <option value="1">１年</option>
                <option value="2">２年</option>
                <option value="3">３年</option>
                </select>
                <!--
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
                -->
            </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                クラス
            </label>
            <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" v-model="classNumber">
                <option value="1">１組</option>
                <option value="2">２組</option>
                <option value="3">３組</option>
                <option value="4">４組</option>
                <option value="5">５組</option>
                <option value="6">６組</option>
                <option value="7">７組</option>
                <option value="8">８組</option>
                <option value="9">９組</option>
                </select>
                <!--
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
                -->
            </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                出席番号
            </label>
            <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" v-model="studentNumber">
                <option v-for="number in studentNumberList" :key="number" :value="number">{{ number }}</option>
                </select>
                <!--
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
                -->
            </div>
        </div>
        
        <MenuCard menuTitle="ポップコーン" price="20" :quantity="popcorn_number" @Child_click="popcorn_number += $event"/>
        <MenuCard menuTitle="大学芋" price="100" :quantity="potato_number" @Child_click="potato_number += $event"/>
        <MenuCard menuTitle="ワッフル" price="60" :quantity="waffle_number" @Child_click="waffle_number += $event"/>
        <MenuCard menuTitle="バニラアイス" price="30" :quantity="ice_number" @Child_click="ice_number += $event"/>
        <MenuCard menuTitle="ファンタオレンジ" price="30" :quantity="fanta_number" @Child_click ="fanta_number += $event"/>

        <DefaultButton message="確認" @click.stop="confirmedFunc"/>

        <Qrcode :inputText="qrcodeText"/>
    </div>
</template>

<script>
    import MenuCard from "./Menu-Card.vue"
    import DefaultButton from "./Default-Button.vue"
    import Qrcode from "./Qrcode-create.vue"

    export default {
        data(){
            return{
                studentNumberList: [...Array(45)].map((_, i) => i),

                gradeNumber: "",
                classNumber: "",
                studentNumber: "",

                popcorn_number: 0,
                potato_number: 0,
                waffle_number: 0,
                ice_number: 0,
                fanta_number: 0,

                customerData: "",
                reservationNumber: "",
                qrcodeText: "",
            }
        },

        components:{
            MenuCard,
            DefaultButton,
            Qrcode
        },

        methods:{
            confirmedFunc(){
                console.log("確認しました")

                this.customerData = ""
                this.reservationNumber = Math.floor( Math.random() * (9999 + 1 - 1000) ) + 1000

                if(this.studentNumber < 10){
                    this.studentNumber = `0${String(this.studentNumber)}`
                }else{
                    this.studentNumber = String(this.studentNumber)
                }

                this.customerData = String(this.gradeNumber) + String(this.classNumber) + String(this.studentNumber)


                this.qrcodeText = String(this.reservationNumber) + this.customerData +  + String(this.popcorn_number) + String(this.potato_number) + String(this.waffle_number) + String(this.ice_number) + String(this.fanta_number);                
            }
        }
    }    
</script>