// Site JavaScript Functionality:
// Variables:
// Grabbing all the elements that have the class attribute of menuOption.
const menuOptions = document.querySelectorAll(".menuOption");

// Functions:
// When called, changes the element color dependant on whether the mouse is hovering over it:
function hover_over_tab(_element, _isHovering)
{
    // Retrieves the menu option's tab visual and text as well as assigning the pointer value to cursor:
    const tab = _element.children[0]
    const text = _element.children[2];
    let dropdown = null;
    _element.style.cursor = "pointer";

    /* if the element has more children the assign it to dropdown:*/
    if(_element.children.length > 3)
    {
        dropdown = _element.children[3];
    }

    // Style changes are applied dependant on whether the user is hovering over the element:
    if(_isHovering)
    {
        // When hovering: enlarge the tab and change the colour of the text:
        tab.style.fontSize = "5px";
        text.style.color = "rgb(123, 224, 255)";
        // if dropdown is valid:
        if(dropdown !== null)
        {
            // Change the dropdown's display style to block e.g. visible:
            dropdown.style.display = "block";
        }
    }
    else
    {
        // When not hovering: reset both menuOption tab and text:
        tab.style.fontSize = "3px";
        text.style.color = "rgb(255, 255, 255)";
        // Again if dropdown is valid
        if(dropdown !== null)
        {
            // Change dropdown's display style to none e.g. hidden:
            dropdown.style.display = "none";
        }
    };
};

// Hovering over menu option tabs:
// Assigning event listeners to all tabs:
menuOptions.forEach((mOption) =>
{
    // Listening for mouse entering and leaving the element:
    mOption.addEventListener("mouseenter", function ()  {hover_over_tab(mOption, true)}, false);
    mOption.addEventListener("mouseleave", function ()  {hover_over_tab(mOption, false)}, false);
});

// Adding click event listeners:
// Option Menu: Home, when clicked, sends the user to the website homepage:
menuOptions[0].addEventListener("click", function ()
{
    window.location.href = "../../../src/home/index.html";
});
// Option Menu: CV, when clicked, sends the user to the website homepage:
menuOptions[menuOptions.length-1].addEventListener("click", function ()
{
    window.location.href = "../../../src/cv/index.html";
});