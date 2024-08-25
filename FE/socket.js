const socket = io("http://localhost:3000", {autoConnect: false})

document.querySelector("#namesubmit").addEventListener("click", ()=>{
    const name = document.querySelector("#sender").value
    socket.auth= { name }
    socket.connect()
})

socket.on("connect", () =>{
    console.log("Connected To Socket Backend");   
});

const msg = document.querySelector("#msg");
const msgBtn = document.querySelector("#msgBtn");

msgBtn.addEventListener("click", ()=>{
    console.log(msg.value);
    // send >> emit
    socket.emit("clientToServer", msg.value)
})

socket.on("ServerToClient", ({from, message}) =>{
    console.log("Message From Backend", message);
    const ptag = document.createElement("p")
    ptag.innerHTML = from + " : " + message
    document.querySelector("#chat-box").append(ptag)
});

socket.on("connect_error", (error) =>{
    console.log(error.message);
})