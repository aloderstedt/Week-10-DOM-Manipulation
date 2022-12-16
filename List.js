class Item {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

class List {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    deleteItem(item) {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }
}

let lists = [];
let listId = 0;

onClick('new-list', () => {
    lists.push(new List(listId++, getValue('new-list-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let listDiv = document.getElementById('lists');
    clearElement(listDiv);
    for (list of lists) {
        let table = createListTable(list);
        let title = document.createElement('h2');
        title.innerHTML = list.name;
        title.appendChild(createDeleteListButton(list));
        listDiv.appendChild(title);
        listDiv.appendChild(table);
        for (item of list.items) {
            createItemRow(list, table, item);
        }
    }
}

function createItemRow(list, table, item) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = item.name;
    row.insertCell(1).innerHTML = item.quantity;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(list, item));
}

function createDeleteRowButton(list, item) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = list.items.indexOf(item);
        list.items.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteListButton(list) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete List';
    btn.onclick = () => {
        let index = lists.indexOf(list);
        lists.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewItemButton(list) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        list.items.push(new Item(getValue(`name-input-${list.id}`), getValue(`quantity-input-${list.id}`)));
        drawDOM();
    };
    return btn;
}

function createListTable(list) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let quantityColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    quantityColumn.innerHTML = 'Quantity';
    row.appendChild(nameColumn);
    row.appendChild(quantityColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let quantityTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${list.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let quantityInput = document.createElement('input');
    quantityInput.setAttribute('id', `quantity-input-${list.id}`);
    quantityInput.setAttribute('type', 'text');
    quantityInput.setAttribute('class', 'form-control');
    let newItemButton = createNewItemButton(list);
    nameTh.appendChild(nameInput);
    quantityTh.appendChild(quantityInput);
    createTh.appendChild(newItemButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(quantityTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

