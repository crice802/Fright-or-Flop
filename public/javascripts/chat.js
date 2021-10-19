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
 * info to the server
 */

/**
 * When a user presses the 'Enter' key, emit a message containing the 
 * chat info to the server
 */

/**
 * When a user presses a key while typing in the 'message' element, 
 * send the user's name to the server
 */


//-----*  Socket Events Here:  *-----// 

/**
 * Define/execute a function to get the username from the server so 
 * that it can be broadcast on connection
 */

/**
 * When the socket receives an updated chat list, re-render the list 
 * of users connected
 */

// When a user enters the room, play a sound

// When a user leaves the room, play a sound

/**
 * When someone is typing (something we'll need the server to tell us),
 * adjust the 'isTyping' element to reflect that
 */

/**
 * When a new message is posted, play a sound, update the newMessage 
 * element with the message/user info, and add the message to the 
 * database (we'll check server-side to make sure the message is only 
 * posted once, by checking the id of the user making the post)
 */
