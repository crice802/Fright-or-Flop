// OMG, CACHED ELEMENT REFERENCES?!?!? NO WAI!!!!
let message = document.getElementById("message");
let username = document.getElementById("username");
let send_message = document.getElementById("send_message");
let chatroom = document.getElementById("chatroom");
let avatar = document.getElementById("avatar");
let isTyping = document.getElementById("isTyping");
let chatters = document.getElementById("chatters");

//-----*  Event Listeners Here:  *-----// 
// (No, you're not having a flashback.  Everything will be ok!)

/**
 * When 'send message' is clicked, emit a message containing the chat 
 * info to the server and send the message to the database for storage
 */
 send_message.addEventListener("click", () => {
  socket.emit("send_message", {
    username: username.value,
    message: message.value,
    avatar: avatar.value,
  });
  fetch("/chatroom", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      avatar: avatar.value,
      username: username.value,
      message: message.value,
    })
  })
  message.value = "";
})

/**
 * When a user presses the 'Enter' key, emit a message containing the 
 * chat info to the server and send the message to the database for storage
 */
 message.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    socket.emit("send_message", {
      username: username.value,
      message: message.value,
      avatar: avatar.value,
    })
    fetch("/chatroom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar: avatar.value,
        username: username.value,
        message: message.value,
      })
    })
    message.value = "";
  }
})

/**
 * When a user presses a key while typing in the 'message' element, 
 * send the user's name to the server
 */
message.addEventListener("keypress", () => {
  socket.emit("typing", { username: username.value });
});


//-----*  Socket Events Here:  *-----// 

/**
 * Send the username to register them with the server 
 * 
 */
function registerUser() {
  socket.emit("register-user", username.value)
}

registerUser()

/**
 * When the socket receives an updated chat list, re-render the list 
 * of users connected
 */
socket.on('update-chatter-list', username => {
  let chatterList = "<li>" + username.join("</li><li>") + "</li>";
  chatters.innerHTML = chatterList;
})

// When a user enters the room, play a sound
socket.on('user-enter', ()=> {
  enterAudio.play()
})
// When a user leaves the room, play a sound
socket.on('user-exit', ()=> {
  exitAudio.play()
})
/**
 * When someone is typing (something we'll need the server to tell us),
 * adjust the 'isTyping' element to reflect that
 */
socket.on("typing", (data) => {
  isTyping.innerText = `${data.username} is typing...`;
});

/**
 * When a new message is posted, play a sound, update the newMessage 
 * element with the message/user info.
 */

 socket.on("new_message", (data) => {
  isTyping.innerText = "";
  messageAudio.play();
  let newMessage = document.createElement("p");
  newMessage.innerHTML = `<p><img id="avatar" height="30" src="${data.avatar}" alt=""> ${data.username}: ${data.message}</p>`;
  chatroom.prepend(newMessage);
});