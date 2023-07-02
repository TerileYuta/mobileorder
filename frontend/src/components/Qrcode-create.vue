<template>
    <div>
        <p>{{ targetText }}</p>
        <vue-qrcode v-if="targetText" :value="targetText" :options="option" tag="img"></vue-qrcode>
    </div>
  </template>
  
  <script>
  import VueQrcode from "@chenfengyuan/vue-qrcode";
  export default {
    components: {
      VueQrcode
    },

    props:["inputText"],

    data() {
      return {
        targetText: "",
        option: {
          errorCorrectionLevel: "M",
          maskPattern: 0,
          margin: 10,
          scale: 2,
          width: 300,
          color: {
            dark: "#000000FF",
            light: "#FFFFFFFF"
          }
        }
      };
    },

    watch:{
        inputText: function(to){
            this.targetText = to
        }
    }
  };
  </script>
  <style scoped>
  </style>