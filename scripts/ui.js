
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

                                                        //  U I. J S


//render chat templates to the DOM
//clear the list of chats (when the room changes)
export class ChatUI{
    constructor(list){ // list where we are outping the template to (list-group in html)
        this.list = list;
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){ 
        // responsible for createing html snippet or template for each documen we ge back rendering that to dom
            // console.log('Data test: ',data);

            const date = data.created_at.toDate().getDate();
            const month = data.created_at.toDate().getMonth();
            const year = data.created_at.toDate().getYear();
            const min = data.created_at.toDate().getMinutes();
            const hours = data.created_at.toDate().getHours();
            const sec = data.created_at.toDate().getSeconds();

            const html = `
            <li class="list-group-item"> 
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${hours}:${min}:${sec}  ${date}/${month}/${year}</div>
            </li>
            `
    
            this.list.innerHTML += html;

       // console.log('AFter updaeing');
    }
}

