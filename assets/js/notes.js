showNotes();
// NAVBAR
let menuIcon = document.getElementById("menu-icon");
let closeBtn = document.getElementById("closeBtn");
let navlist = document.getElementById('nav-list');
menuIcon.addEventListener('click',()=>{
    navlist.classList.add('show');
})
closeBtn.addEventListener('click',()=>{
    navlist.classList.remove('show');
})
//Notes
let addNote = document.getElementById("addNote");
let txtarea = document.getElementById("txtarea");

// txtarea.addEventListener('input',(e)=>{
//     // console.log("input event")
//     // console.log(e.target.value)
    
// })
addNote.addEventListener('click',(e)=>{
    console.log("clicked");
    let notes = localStorage.getItem("notes");
    // console.log(notes);
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(txtarea.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    txtarea.value = "";
    console.log(notesObj);
    showNotes();
})
function showNotes(){
    let html = ``;
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.forEach((element,index) => {
        html += ` <div class="notes">
    <div class="noteHeading"><h3>Note ${index+1}</h3></div>
    <div class="noteContent" style="height:auto;">${element} </div>
    <div class="delBtn" id="${index}" onClick="delNote(this.id)"><button>Delete Note</button></div>
    </div>`
    });
     
    let notesElm = document.getElementById("notesPopulate");
    if (notesObj.length != 0){
        notesElm.innerHTML = html;  
    }
    else{
        notesElm.innerHTML = `NOTHING TO SHOW.YOU CAN ADD NOTES HERE`;
    }
}

function delNote(id){
    // console.log("del button clicked");
    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(id,1);
    localStorage.setItem("notes",JSON.stringify(notesObj)); 
    showNotes();
}