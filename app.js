var db;

var DBOpenRequest = window.indexedDB.open("manju");

DBOpenRequest.onsuccess = function (e) {
    db = DBOpenRequest.result;
    getData();
};

DBOpenRequest.onupgradeneeded = function (event) {
    db = DBOpenRequest.result;
    var store = db.createObjectStore("satpal", {keyPath: "firstName"});
};

DBOpenRequest.onerror = function (e) {
    alert("DB Error");
};

function addRecord(event) {
    var data = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    if (document.getElementById("male").checked) {
        data.gender = "M";
    }
    else data.gender = "F";


    console.log(data);

    addData();

    event.preventDefault();

    //check for support
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }


    function addData() {
        var transaction = db.transaction('satpal', 'readwrite');

        transaction.oncomplete = function (event) {
            alert("Transaction completed: database modification finished.");
            document.getElementById("addForm").reset();
        };


        transaction.onerror = function (event) {
            alert("Transaction not opened due to error. Duplicate items not allowed.");
        };
        var store = transaction.objectStore('satpal');
        data.createdOn = new Date().getTime();
        store.
        (data);
    }


}


function getData() {
    var transaction = db.transaction('satpal', "readonly");
    var objectStore = transaction.objectStore('satpal');

    var data = [];
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else {
            console.log('Entries all displayed.');
            console.log(data);

            var table = document.getElementById("records");
            var tbody = document.createElement("tbody");
            for (var d of data) {
                var tr = document.createElement("tr");
                for(var key in d){
                    var td = document.createElement("td");
                    td.appendChild(document.createTextNode(d[key]));
                    tr.appendChild(td);
                }
                var td = document.createElement("td");
                var button = document.createElement("button");
                button.onclick = function (ev) {
                    updateRecord();
                }
                button.appendChild(document.createTextNode("Edit"));
                td.appendChild(button);
                var button2 = document.createElement("button");
                button2.appendChild(document.createTextNode("Delete"));
                button2.onclick = function (ev) {
                    deleteRecord();
                }
                td.appendChild(button2);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
        }
    };
}


function deleteRecord(){
    alert("Delete");
}
function updateRecord(){
    alert("Update");
}
document.getElementById("addForm").addEventListener("submit", addRecord);
