# [JSL06] Submission: CodeCuisine Menu Display System Challenge

# Below is the summarry of what I've done.

## addToOrder Function
   <li>Checks if the selected item is already in the order list.</li>
   <li>If the item is present, it increases the quantity and updates the total price.</li>
   <li>If the item is not present, it creates a new list item with buttons for increasing and decreasing the quantity.</li>

## Increase and Decrease Buttons
   <li>For each item in the order list, two buttons are added: one for increasing and one for decreasing the quantity.</li>
   <li>These buttons are appended to the list item along with the item name, quantity, and total price.</li.>

## increaseQuantity Function
   <li>Handles the logic for increasing the quantity of an item in the order.</li>
   <li>Updates the quantity and total price of the item, as well as the total order price.</li>

## decreaseQuantity Function
  <li>Handles the logic for decreasing the quantity of an item in the order.</li>
  <li>Updates the quantity and total price of the item, as well as the total order price.</li>
  <li>Ensures the quantity doesn't go below 1.</li>
