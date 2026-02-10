// Homepage JavaScript functionality:
// Variables:
// Grabbing all the elements that have the class attribute of projectItem.
let projectItems = document.querySelectorAll(".ProjectItem");

// Functions:

// Clicking on projects:
projectItems.forEach((item) =>
{
    // Adding event listener to listen for user clicks while the cursor is over the projectItem element:
    item.addEventListener("click", function () 
    {
        // Retrieves the projectItem's image element id and uses it to transport the user to the corresponding page:
        const itemId = item.children[0].getAttribute("id");
        window.location.href = `./src/projects/${itemId}/index.html`;
    });
});