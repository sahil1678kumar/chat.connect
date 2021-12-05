
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
    getFirestore, collection,
    addDoc,
    onSnapshot,
    query, where,
    orderBy,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBtYrAIuLPZcDjPZfYL9lZ2Il-rFhezIk",
    authDomain: "chat-room-f5e38.firebaseapp.com",
    projectId: "chat-room-f5e38",
    storageBucket: "chat-room-f5e38.appspot.com",
    messagingSenderId: "563664615922",
    appId: "1:563664615922:web:32bff395a2a02160f2136b"
  };

initializeApp(firebaseConfig);


////


const db = getFirestore();
const colRef = collection(db, 'chats');


                                                        //   A P P . J S
// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const chatRoomChange = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message).then(()=>{
        newChatForm.reset();
    }).catch(err=>{
        console.log(err.message);
    })
})

//update username
newNameForm.addEventListener('submit', e=>{
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    // show and hide the name change message
    updateMssg.innerText = `Username changed to ${newName} succesfully`;
    setTimeout(()=>{
        updateMssg.innerText = '';
    },3000);
});

import {Chatroom} from './chat.js';
import {ChatUI} from './ui.js'

// class instance
const chatroom = new Chatroom('general', 'anonymous');
// checking name in local storage
if(localStorage.getItem('name'))
    chatroom.updateName(localStorage.getItem('name'));
const chatUI = new ChatUI(chatList);

// changing rooms
chatRoomChange.addEventListener('click', e=>{

    if(e.target.localName === 'button'){
        chatUI.clear();
        chatroom.updateRoom(e.target.id);
        chatroom.getChats((data)=>{
            chatUI.render(data);
        });
    }
})


//get chats and render
chatroom.getChats((data)=>{
        chatUI.render(data);
});