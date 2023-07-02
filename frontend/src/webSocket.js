const URL = "ws://localhost:3000/"
const PROTOCOL = "ishiyama"

const socket = new WebSocket(URL, PROTOCOL)

socket.addEventListener('error', () => {
    console.log('error')
})

socket.addEventListener('close', () => {
    console.log('close')
})

const sendMessage = (key, data) => {
    var sendData = JSON.stringify({"key": key, "data": data})
    socket.send(sendData)
}



export default{
  sendMessage,
  socket
}