import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false;
let updateId;

document.addEventListener("DOMContentLoaded", () => {
    const addBox = document.querySelector(".add-box");
    const popupBox = document.querySelector(".popup-box");
    const popupTitle = popupBox.querySelector("header p");
    const closeIcon = popupBox.querySelector("header i");
    const titleTag = popupBox.querySelector("input");
    const descTag = popupBox.querySelector("textarea");
    const addBtn = popupBox.querySelector("button");

    addBox.addEventListener("click", () => {
        popupTitle.innerText = "Add a new Note";
        addBtn.innerText = "Add Note";
        popupBox.classList.add("show");
        document.querySelector("body").style.overflow = "hidden";
        if (window.innerWidth > 660) titleTag.focus();
    });

    closeIcon.addEventListener("click", () => {
        isUpdate = false;
        titleTag.value = descTag.value = "";
        popupBox.classList.remove("show");
        document.querySelector("body").style.overflow = "auto";
    });

    function showNotes() {
        if (!notes) return;
        const notesList = document.getElementById("notes-list");
        notesList.innerHTML = ''; // Clear the notes list
    
        notes.forEach((note, id) => {
            let filterDesc = note.description ? note.description.replaceAll("\n", '<br/>') : "";
            let liTag = `<li class="note" data-id="${id}" data-title="${note.title}" data-description="${filterDesc}">
                <div class="details">
                    <p>${note.title}</p>
                    <span>${filterDesc}</span>
                </div>
                <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                        <i class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                            <li class="edit-note"><i class="uil uil-pen"></i>Edit</li>
                            <li class="delete-note"><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>`;
            notesList.insertAdjacentHTML("beforeend", liTag);
        });
    
        // Add event listeners to note elements
        const noteElements = notesList.querySelectorAll(".note");


        noteElements.forEach((noteElement) => {
            const editButton = noteElement.querySelector(".edit-note");
            const deleteButton = noteElement.querySelector(".delete-note");
    
            editButton.addEventListener("click", () => {
                const id = noteElement.getAttribute("data-id");
                const title = noteElement.getAttribute("data-title");
                const description = noteElement.getAttribute("data-description");
                updateNote(id, title, description);
            });
    
            deleteButton.addEventListener("click", () => {
                const id = noteElement.getAttribute("data-id");
                deleteNote(id);
            });
    
            noteElement.querySelector(".uil-ellipsis-h").addEventListener("click", () => {
                showMenu(noteElement.querySelector(".uil-ellipsis-h"));
            });
        });
    }
    
    
    

    function showMenu(elem) {
        elem.parentElement.classList.add("show");
        document.addEventListener("click", e => {
            if (e.target.tagName !== "I" || e.target !== elem) {
                elem.parentElement.classList.remove("show");
            }
        });
    }

    function deleteNote(noteId) {
        let confirmDel = confirm("Are you sure you want to delete this note?");
        if (!confirmDel) return;
        notes.splice(noteId, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
    }

    function updateNote(noteId, title, filterDesc) {
        let description = filterDesc.replaceAll('<br/>', '\r\n');
        updateId = noteId;
        isUpdate = true;
        addBox.click();
        titleTag.value = title;
        descTag.value = description;
        popupTitle.innerText = "Update a Note";
        addBtn.innerText = "Update Note";
    }

    if (addBtn) {
        addBtn.addEventListener("click", e => {
            e.preventDefault();
            let title = titleTag.value.trim();
            let description = descTag.value.trim();

            if (title || description) {
                let currentDate = new Date();
                let month = months[currentDate.getMonth()];
                let day = currentDate.getDate();
                let year = currentDate.getFullYear();

                let noteInfo = { title, description, date: `${month} ${day}, ${year}` };
                if (!isUpdate) {
                    notes.push(noteInfo);
                } else {
                    isUpdate = false;
                    notes[updateId] = noteInfo;
                }
                localStorage.setItem("notes", JSON.stringify(notes));
                

            // Firebase configuration
            const firebaseConfig = {
                apiKey: "AIzaSyAxQ8RpmZMUcoLk4jfQ2rXk5S7ckfDJKkI",
                authDomain: "student-webdesk.firebaseapp.com",
                databaseURL: "https://student-webdesk-default-rtdb.firebaseio.com",
                projectId: "student-webdesk",
                storageBucket: "student-webdesk.appspot.com",
                messagingSenderId: "594056866812",
                appId: "1:594056866812:web:3dd340a4f54dd149f42079"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);

            const notesCollection = collection(db, "notes");
            console.log(title, description);


                // Initialize Firebase
                const note = {
                    title: title,
                    input: description,
                };
        
                addDoc(notesCollection, note)
                    .then((docRef) => {
                        console.log("Task added with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding task: ", error);
                    });
        
                // document.getElementById("notesTitle").value = "";
                // document.getElementById("notesInput").value = "";

                showNotes();
                closeIcon.click();
            }
        });
    }

    showNotes();
});
