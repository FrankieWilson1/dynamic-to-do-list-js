document.addEventListener('DOMContentLoaded', () => {

    // Select the DOM element
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Call loadtask
    loadTasks();

    // Initialize and Load Tasks
    function loadTasks() {
        // Retrive the JSON string from localStorage
        const storedTasks = localStorage.getItem('task');

        if (storedTasks) {
            const saveTasks = JSON.parse(storedTasks);

            saveTasks.forEach(taskText => {
                const liElement = document.createElement('li');
                liElement.innerHTML = taskText;

                // Create "Remove" Button
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = 'Remove';
                removeBtn.classList.add("remove-btn");

                // Update event listener to als update localstorage
                removeBtn.addEventListener("click", () => {
                    liElement.remove();
                    updateLocalStorage();
                });

                // Append to DOM
                liElement.appendChild(removeBtn);
                taskList.append(liElement);
            });
        }
    }

    // Update local function to remove or add task
    function updateLocalStorage() {
        const allLiElements = taskList.querySelectorAll('li');
        const currentTaskArray = [...allLiElements].map(li => {
            return li.firstChild.textContent.trim();
        });
        const jsonData = JSON.stringify(currentTaskArray);
        localStorage.setItem('task', jsonData);
        
    }

    // addTask function that will be called to add new tasks to the list.
    function addTask() {
        // Retrieve and trim the value from the task input field.
        const taskText = taskInput.value.trim();
        // Check if taskText is empty or not

        if (taskText == "") {
            alert("Enter Task");
            return;
        } else {
            // Task Creation and removal

            // Creat a new li element, set its textContent to taskText.
            const liElement = document.createElement('li');
            liElement.innerHTML = taskText;

            // Create a new button element for removing the task. Set it's textContent to "Remove", and give it a class name of 'remove-btn' 
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = 'Remove';
            removeBtn.classList.add("remove-btn");

            // Assign an "onclick" event to the remove button that when triggered, removes button to the li element, then append the the "li" element from "taskList".
            removeBtn.addEventListener("click", () => {
                liElement.remove();
                updateLocalStorage();
            });

            // Append the remove button to the li element, then append the li to taskList.
            liElement.appendChild(removeBtn);
            taskList.append(liElement);

            // Clear the task input field
            taskInput.value = '';
        }

        // save task
        updateLocalStorage();
    }

    // Event listener that calls "addTask" when the button is clicked.
    addButton.addEventListener("click", () => {
        // AddTask is triggered once the button is clicked.
        addTask();
    });

    // Add an event to "taskInput" for the enter button
    taskInput.addEventListener("keypress", (event) => {
        // Check for keypress value
        if (event.key === 'Enter') {
            // addTask is called if condition is met
            addTask();
        } else {
            return;
        }
    });
});
