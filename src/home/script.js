// Homepage JavaScript functionality:
// Variables:
// Grabbing all the elements that have the class attribute of projectImg.
let projectImgs = document.querySelectorAll(".projectImg");

// Functions:

// Clicking on projects:
projectImgs.forEach((img) =>
{
    img.addEventListener("click", function () 
    {
        // Retrieves the image's id and uses it to transport the user to the corresponding page:
        let imgId = img.getAttribute("id");
        window.location.href = `../projects/${imgId}/${imgId}.html`;
    });
});