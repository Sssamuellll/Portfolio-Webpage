// Project 2 JavaScript Functionality:

// Scaling the embedded window to an appropriate size that matches the browser window:
function scale_content()
{
    const container = document.querySelector("#gameContainer");
    const game = document.querySelector("iframe");

    // Calculating the appropriate scale dependant on the game container's scale:
    const scale = (container.offsetWidth / 960);
    game.style.transform = `scale(${scale})`;
    // Calculates the height of the game container based of the scale of the game:
    container.style.height = (642 * scale) + "px";
    //container.style.transform = `scale(${scale})`
};

window.addEventListener("resize", scale_content);
window.addEventListener("load", scale_content);