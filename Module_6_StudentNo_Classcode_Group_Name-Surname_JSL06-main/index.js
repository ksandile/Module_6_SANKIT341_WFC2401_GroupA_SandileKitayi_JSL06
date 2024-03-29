// Sample menu data (Consider fetching this data from a server in a real-world scenario)
const menu = {
    Starters: [
        { name: "Garlic Bread", price: 5.00 },
        { name: "Bruschetta", price: 6.50 }
    ],
    MainCourses: [
        { name: "Margherita Pizza", price: 10.00 },
        { name: "Spaghetti Carbonara", price: 12.00 }
    ],
    Desserts: [
        { name: "Tiramisu", price: 7.00 },
        { name: "Cheesecake", price: 8.00 }
    ]
};

// Function to display menu items by category
function displayMenuItems(menu) {
    // Get the menu container element from the HTML
    const menuContainer = document.getElementById('menu');

    // Loop through each category and its items in the menu object
    for (const category in menu) {
        if (menu.hasOwnProperty(category)) {
            // Create an element to represent the category
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('category');

            // Set the text content of the category element to the category name
            categoryElement.textContent = category;

            // Apply CSS style to make the category name bold
            if (category === 'Starters' || category === 'MainCourses' || category === 'Desserts') {
                categoryElement.style.fontSize = '20px';
                categoryElement.style.fontWeight = 'bold';
                categoryElement.style.padding = '5px';
                categoryElement.style.fontSize = '40px';
            }

            // Append the category element to the menu container
            menuContainer.appendChild(categoryElement);

            // Create an element to represent a list of items
            const itemListElement = document.createElement('ul');
            itemListElement.classList.add('item-list');

            // Append a list of items element to the menu container
            menuContainer.appendChild(itemListElement);

            // Loop through the items in the category and create list items
            menu[category].forEach(item => {
                // Create a list item element
                const listItemElement = document.createElement('li');

                // Create a span element for the price
                const priceSpan = document.createElement('span');
                priceSpan.textContent = ` - R${item.price.toFixed(2)}`;
                // Apply inline styles to the price span
                priceSpan.style.color = 'black'; // for example, you can set the color to blue

                // Set the text content of the list item element to the item name
                listItemElement.textContent = item.name;

                // Append a space character before the price span
                listItemElement.appendChild(document.createTextNode(' '));

                // Append the price span to the list item
                listItemElement.appendChild(priceSpan);

                // Create a span element for the quantity
                const quantitySpan = document.createElement('span');
                quantitySpan.textContent = ' +';
                // Apply inline styles to the quantity span
                quantitySpan.style.cursor = 'pointer'; // Change cursor to pointer on hover
                quantitySpan.style.marginLeft = '5px'; // Add some margin for spacing

                // Attach a click event listener to the quantity span to increase the quantity
                let quantity = 0; // Initial quantity
                quantitySpan.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent the event from bubbling up to the list item
                    quantity++; // Increase quantity
                    updateOrderQuantity(item.name, quantity); // Update order quantity display
                });

                // Append the quantity span to the list item
                listItemElement.appendChild(quantitySpan);

                // Attach a click event listener to the list item to add it to the order
                listItemElement.addEventListener('click', () => addToOrder(item.name, item.price));

                // Append the list item to the list of items
                itemListElement.appendChild(listItemElement);
            });
        }
    }
}

// Function to update the quantity of an item in the order
function updateOrderQuantity(itemName, quantity) {
    const orderItems = document.getElementById('order-items').getElementsByTagName('li');
    for (const orderItem of orderItems) {
        if (orderItem.textContent.startsWith(itemName)) {
            const quantitySpan = document.createElement('span');
            quantitySpan.textContent = ` x${quantity}`; 
            quantitySpan.style.color = 'green'; 
            orderItem.appendChild(quantitySpan); // Append quantity span to the order item
            break;
        }
    }
}

// Function to initialize the menu system
function initMenuSystem(menu) {
    // Call the function to display menu items
    displayMenuItems(menu);
}

// Start the menu system by calling the init function
initMenuSystem(menu);

// Function to add an item to the order
function addToOrder(itemName, itemPrice) {
    // Get the order items list and the order total element from the HTML
    const orderItemsList = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');

    // Check if the item is already in the order
    let existingItem = null;
    const orderItems = orderItemsList.getElementsByTagName('li');
    for (const orderItem of orderItems) {
        if (orderItem.textContent.startsWith(itemName)) {
            existingItem = orderItem;
            break;
        }
    }

    if (existingItem) {
        // If the item already exists in the order, update its quantity and total price
        const quantitySpan = existingItem.querySelector('.quantity');
        let quantity = parseInt(quantitySpan.textContent.slice(2));
        quantity++;
        quantitySpan.textContent = `x${quantity}`;
        const totalPrice = itemPrice * quantity;
        existingItem.querySelector('.total-price').textContent = ` - R${totalPrice.toFixed(2)}`;

        // Calculate and update the total price
        const currentTotal = parseFloat(orderTotalElement.textContent);
        const newTotal = currentTotal + itemPrice;
        orderTotalElement.textContent = newTotal.toFixed(2);
    } else {
        // If the item is not in the order, create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = `${itemName} `;
        const quantitySpan = document.createElement('span');
        quantitySpan.classList.add('quantity');
        quantitySpan.textContent = 'x1';
        listItem.appendChild(quantitySpan);
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => increaseQuantity(listItem, itemPrice, orderTotalElement));
        listItem.appendChild(increaseButton);
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => decreaseQuantity(listItem, itemPrice, orderTotalElement));
        listItem.appendChild(decreaseButton);
        const totalPriceSpan = document.createElement('span');
        totalPriceSpan.classList.add('total-price');
        totalPriceSpan.textContent = ` - R${itemPrice.toFixed(2)}`;
        listItem.appendChild(totalPriceSpan);
        orderItemsList.appendChild(listItem);

        // Calculate and update the total price
        const currentTotal = parseFloat(orderTotalElement.textContent);
        const newTotal = currentTotal + itemPrice;
        orderTotalElement.textContent = newTotal.toFixed(2);
    }
}

// Function to increase the quantity of an item in the order
function increaseQuantity(listItem, itemPrice, orderTotalElement) {
    const quantitySpan = listItem.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.textContent.slice(1));
    quantity++;
    quantitySpan.textContent = `x${quantity}`;

    // Update total price
    const totalPriceSpan = listItem.querySelector('.total-price');
    const currentTotalPrice = parseFloat(totalPriceSpan.textContent.slice(3));
    const newTotalPrice = currentTotalPrice + itemPrice;
    totalPriceSpan.textContent = ` - R${newTotalPrice.toFixed(2)}`;

    // Update total order price
    const currentTotal = parseFloat(orderTotalElement.textContent);
    const newTotal = currentTotal + itemPrice;
    orderTotalElement.textContent = newTotal.toFixed(2);
}

// Function to decrease the quantity of an item in the order
function decreaseQuantity(listItem, itemPrice, orderTotalElement) {
    const quantitySpan = listItem.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.textContent.slice(1));
    if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = `x${quantity}`;

        // Update total price
        const totalPriceSpan = listItem.querySelector('.total-price');
        const currentTotalPrice = parseFloat(totalPriceSpan.textContent.slice(3));
        const newTotalPrice = currentTotalPrice - itemPrice;
        totalPriceSpan.textContent = ` - R${newTotalPrice.toFixed(2)}`;

        // Update total order price
        const currentTotal = parseFloat(orderTotalElement.textContent);
        const newTotal = currentTotal - itemPrice;
        orderTotalElement.textContent = newTotal.toFixed(2);
    }
}