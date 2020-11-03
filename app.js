 // finds the one <form>, listens for submit action, calls handleSubmitform function
 document.querySelector('form').addEventListener('submit', handleSubmitForm);

 // executed when enter key or plus icon are pressed
function handleSubmitForm(e) {
	e.preventDefault(); // stops event default behaviour so my code can run

	let input = document.querySelector('input'); // stores text from <input>

	// if input is not empty run addTodo function and pass input.value as parameter
	if (input.value != '') addTodo(input.value); 
	// input value is reset to an empty string ready for the next item to be input
	input.value = ''; 
}

// runs when input is not empty and passes input.value (typed todo from user) as parameter 
function addTodo(todo) {
	let ul = document.querySelector('ul'); // area of todos <ul>
	let li = document.createElement('li'); // creates new <li> in <ul>
	li.innerHTML = `
	<span contenteditable=true class="todo-item">${todo}</span>
    <button name="checkButton"><i class="fas fa-check-square"></i></button>
    <button name="deleteButton"><i class="fas fa-trash"></i></button>
    <button name="prioritiseButton"><i class="fas fa-arrow-up"></i></button>
    <button name="deprioritiseButton"><i class="fas fa-arrow-down"></i></button>
    `; // inserts innerHTML code for each <li> element (todo) added
	li.classList.add('todo-list-item');
	ul.appendChild(li); // adds li to ul for browser visibility
}

// listens for click on todo area <ul> which contains all the todo as their action icons, runs handleClick function when a click is matched
document.querySelector('ul').addEventListener('click', handleClick);

function handleClick(e) {
	let icon = e.target.name; // icon = the click point
	if (icon == 'checkButton') archiveTodo(e);
	if (icon == 'deleteButton') deleteTodo(e);
	if (icon == 'prioritiseButton') prioritiseTodo(e);
	if (icon == 'deprioritiseButton') deprioritiseTodo(e);
}

function archiveTodo(e) {
	let item = e.target.parentNode; // the click
	let ol = document.querySelector('ol');
	let li = document.createElement('li');
	li.innerHTML = `<span>${item.innerText}</span>`; // archives todo on <span> not icons
	li.classList.add('archived-todo-list-item'); // adds styles to the archived list (green)
	ol.prepend(li); // adds changes to browser for visibility
	item.remove(); // removes original todo item from <ul> after it has been added to the archive <ol> section
}

// runs when garbage icon is clicked from handleClick function
function deleteTodo(e) {
	let item = e.target.parentNode; // references parent node (list item)

	item.addEventListener('transitionend', function() { // The transitionend event is fired when a CSS transition has completed (see CSS file 'todo-list-item-fall' for transition style)
		item.remove();
	});

	item.classList.add('todo-list-item-fall'); // item animation for fun
}

function prioritiseTodo(e) {
	let item = e.target.parentNode; // individual <li> item with classes and buttons
	let todoArray = Array.from(document.getElementsByClassName('todo-list-item')); // creates shallow copy of array from HTMLCollectiom
	// Shallow copy = new bit-wise copy of an object where it has an exact copy of the values in the original object. If any of the fields of the object are references to other objects, just the reference addresses are copied i.e., only the memory address is copied. In OOP a field (data member or member variable) is a particular piece of data encapsulated within a class or object.
	let updatedTodoArray = []; // sets new array
	let itemCount = 0;
	for (let i = 0; i < todoArray.length; i++) {
		if (todoArray[i] === item && itemCount === 0) {
			itemCount++;
		} else {
			updatedTodoArray.push(todoArray[i].innerText);
		}
	}
	// Question
	// The result of the below RHS code in the console prints out the correct order of variable updatedNewArray. If I remove this code, updatedNewArray has duplicated or omits array elements that are showing on screen. How?

	let newOrder = updatedTodoArray.unshift(item.innerText);
	console.log("updatedNewArray = " + updatedTodoArray);
	printUpdatedTodoArrayToDocument();

	function printUpdatedTodoArrayToDocument(e) {
		let ul = document.querySelector('ul');
		let li = document.createElement('li');
		li.innerHTML = `
        <span contenteditable=true class="todo-item">${item.innerText}</span>
	    <button name="checkButton"><i class="fas fa-check-square"></i></button>
	    <button name="deleteButton"><i class="fas fa-trash"></i></button>
	    <button name="prioritiseButton"><i class="fas fa-arrow-up"></i></button>
	    <button name="deprioritiseButton"><i class="fas fa-arrow-down"></i></button>
	    `;
		li.classList.add('todo-list-item');
		ul.prepend(li);
		item.remove();
		addSpanClass();
	}
	
	// adds styles to the prioritised item
	function addSpanClass(e) {
		let span = document.querySelector('span');
		span.classList.add('todo-item-prioritised');
	}
}

function deprioritiseTodo(e) {
	let item = e.target.parentNode;
	let todoArray = Array.from(document.getElementsByClassName('todo-list-item')); // creates shallow copy of array from HTMLCollectiom
	let newArray = [];
	let itemCount = 0;
	for (let i = 0; i < todoArray.length; i++) {
		if (todoArray[i] === item && itemCount === 0) {
			itemCount++;
		} else {
			newArray.push(todoArray[i].innerText);
		}
	}
	
	// Question
	// Similiar to previous question about RHS of below code
	let newOrder = newArray.push(item.innerText); // returns value of length count
	console.log("new array = " + newArray);
	printUpdatedNewArrayToDocument();
	
	function printUpdatedNewArrayToDocument(e) {
		let ul = document.querySelector('ul');
		let li = document.createElement('li');
		li.innerHTML = `
        <span contenteditable=true class="todo-item">${item.innerText}</span>
	    <button name="checkButton"><i class="fas fa-check-square"></i></button>
	    <button name="deleteButton"><i class="fas fa-trash"></i></button>
	    <button name="prioritiseButton"><i class="fas fa-arrow-up"></i></button>
	    <button name="deprioritiseButton"><i class="fas fa-arrow-down"></i></button>
	    `;
		li.classList.add('todo-list-item');
		ul.appendChild(li);
		item.remove();
		findTheLastSpan();
	}
	
	// finds and add a class to the last span returned from all the span on the todo list
	function findTheLastSpan() {
		let spans = document.querySelectorAll('span');
		let spansArray = Array.from(spans); // shallow copy of NodeList
		let lastSpan = spansArray[spansArray.length - 1]; // access last span
		lastSpan.classList.add('todo-item-deprioritised');
	}
}

document.getElementById('clearAll').addEventListener('click', handleClearAll); // clearAll link

function handleClearAll(e) {
	document.querySelector('ul').innerHTML = '';
};

function showProjectLearnings() {
	let learnings = document.getElementById("learnings");

	if (learnings.style.display === "block") {
		learnings.style.display = "none";
	} else {
		learnings.style.display = "block";
	}
}

function showChallenges(e) {
	let challenges = document.getElementById("challenges");

	if (challenges.style.display === "block") {
		challenges.style.display = "none";
	} else {
		challenges.style.display = "block";
	}
}