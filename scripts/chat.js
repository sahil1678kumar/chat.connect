//adding new chat documents
// setting up a real time listener
//updating the username
// updating the room

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


const db = getFirestore();
const colRef = collection(db, 'chats');


export class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = collection(db, 'chats');
        this.unsub;
    }
    async addChat(message){
        // create a chat object
        const now = new Date();

            const chat = {
                message: message,
                username: this.username,
                room: this.room,
                created_at: now
            };
            // save the chat document
            // const response = await this.chats.add(chat);
            // return response;
            addDoc(colRef,chat);

    }
    // getting chats realtime
    getChats(callback){
        const q = query(colRef, where("room", "==", this.room), orderBy('created_at')); //listening for events only in the current room
        this.unsub = onSnapshot(q, (snapshot)=>{
            snapshot.docChanges().forEach(change=>{
                if (change.type === "added") {
                    callback(change.doc.data());
                  //  console.log('LOOOOOOOK HEREREEEE',change.doc.data(), 'THATS ALLLLLLL');
                }
            });
        });
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('name', username);
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated to : ', this.room);
        if(this.unsub)
            this.unsub(); // unsubscribing from the changes of the previous room
    }
}

/*const checkingFunctions(){
// const chatroom = new Chatroom('gaming', 'sahil');


// //chatroom.getChats();

// chatroom.getChats(messages=>{
//     console.log('Here are the message: ');
//     messages.forEach(message=>{
//         console.log(message);
//     })
// })

// chatroom.updateRoom('general'); // will change room and unsub
// // so geting chats again

// chatroom.getChats(messages=>{
//     console.log('Here are the message: ');
//     messages.forEach(message=>{
//         console.log(message);
//     })
// })


// // chatroom.addChat('Finally, past this lecture').then(()=>{
// //     console.log('Chat added');
// // }).catch(err=>{
// //     console.log(err.message);
// // });

}*/






