window.addEventListener("load", loaded);

function loaded() {
    let buttonGetFriends = document.getElementById('button_get_friends');
    buttonGetFriends.addEventListener("click", handleGetFriends);
    let buttonsetPerson = document.getElementById('button_set_person');
    buttonsetPerson.addEventListener("click", handlePostPerson);
}


function handlePostPerson() {
    let url = 'http://localhost:3000/persons/';
    let output = document.getElementById("div_output");
    let name = document.getElementById("txt_id").value;
    let person = {name: name, friends: []};
    makeElementEmpty(output);
    fetch(url,
        {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status == 201) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        });
}


function handleGetFriends() {
    let url = 'http://localhost:3000/persons/';
    let output = document.getElementById("div_output");
    let select = document.getElementById("select_person");
    let selectedIndex = select.selectedIndex;
    makeElementEmpty(output);
    fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .then((persons) => {
            let data = [];
            let friends = [];
            for (let person of persons) {
                if (person.id == selectedIndex + 1) {
                    for (let index = 0; index < person.friends.length; index++){
                        data.push(person.friends[index])
                    }
                }
            }
            let index = 0;
            for (let person of persons) {
                if (data[index] == person.id) {
                    index++;
                    friends.push(person.name)
                }
            }
            let p = appendFriends(...friends);
            output.appendChild(p);
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        });
}

function makeElementEmpty(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}


function appendFriends(...friends) {
    let p = document.createElement("p");
    p.innerText = "sofie heeft vrienden " + friends;
    return p;
}
