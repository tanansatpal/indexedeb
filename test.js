var db;
var DBOpenRequest = window.indexedDB.open("users");
DBOpenRequest.onsuccess = function (e) {
    db = DBOpenRequest.result;
    console.log("data added sucessfully");
    getForm();
};
DBOpenRequest.onupgradeneeded = function (event) {
    db = DBOpenRequest.result;
    var store = db.createObjectStore("satpal", {keyPath: "firstName"});
};

DBOpenRequest.onerror = function (e){
    alert("data added not sucessfully");
};


function addForm() {
    var data = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,


    };
    if (document.getElementById('male').checked) {
        data.gender = "M";
    }
    else data.gender = "F";
    console.log(data);

    var transaction = db.transaction(["satpal"], "readwrite");
    transaction.oncomplete = function(event) {
        console.log("transaction added sucessfully");
    };
    transaction.onerror = function(event) {
        console.log("transaction added not sucessfully");
    };

    var objectStore = transaction.objectStore("satpal");
    var objectStoreRequest = objectStore.add(data);
    objectStoreRequest.onsuccess = function(event) {
        // report the success of the request (this does not mean the item
        // has been stored successfully in the DB - for that you need transaction.onsuccess)
        console.log("objectstore added sucessfully");
    };




};
function getForm(){


    var transaction = db.transaction(["satpal"], "readwrite");

    // report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function(event) {
        alert("transtion");
    };

    transaction.onerror = function(event) {
        alert("transtion error");
    };
    var objectStore = transaction.objectStore("satpal");
    var listTable = document.createElement('table');
    var listBody = document.createElement('tbody');
    var listHeading = document.createElement('th');
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if(cursor) {

            var listRow = document.createElement("tr");
            var listData = document.createElement("td");
            var listData2 = document.createElement("td");
            var listData3 = document.createElement("td");
            var itemValue = document.createTextNode(cursor.value.firstName);
            var itemValue2 = document.createTextNode(cursor.value.lastName);
            var itemValue3 = document.createTextNode(cursor.value.email);
            listData.appendChild(itemValue);
            listRow.appendChild(listData);

            listData2.appendChild(itemValue2);
            listRow.appendChild(listData2);

            listData3.appendChild(itemValue3);
            listRow.appendChild(listData3);

            console.log("test",cursor.value);
            listBody.appendChild(listRow);
            listTable.appendChild(listBody);


            cursor.continue();
        } else {
            document.body.appendChild(listTable);
            console.log('Entries all displayed.');
        }
    };

}



document.getElementById("newForm").addEventListener("submit", function (event) {
    event.preventDefault()
    addForm();
});