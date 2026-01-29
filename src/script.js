// Grabbing all the elements that have the class attribute of menuTab.
let menuLabels = document.querySelectorAll(".menuLabel");
console.log(menuLabels);

// When called, changes the element color dependant on whether the mouse is hovering over it:
function hover_over_tab(_element, _isHovering)
{
    console.log("hover");

    let elementId = _element.getAttribute("id");
    const tab = document.querySelector(`#${elementId}.menuTab`);
    // Style changes are applied dependant on whether the user is hovering over the element:
    if(_isHovering)
    {
        _element.style.color= "rgb(123, 224, 255)";
        tab.style.height = "5px";
    }
    else
    {
        _element.style.color = "rgb(255, 255, 255)";
        tab.style.height = "3px";
    };

};


// Assigning event listeners to all tabs:
menuLabels.forEach((mLabel) =>
{
    // Listening for mouse entering and leaving the element:
    mLabel.addEventListener("mouseenter", function ()  {hover_over_tab(mLabel, true)}, false);
    mLabel.addEventListener("mouseleave", function ()  {hover_over_tab(mLabel, false)}, false);
});

