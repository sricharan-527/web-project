//alert("hello from js")

const users = [
    {
        "name" : "John Doe",
        "gender" : "male",
        "img" : "john.png"
    }, 
    {
        "name" : "Jane Doe",
        "gender" : "female",
        "img" : "jane.png"
    }
]

var curIndex = 0;

function Toggle() {
    if(curIndex == 0)
        curIndex = 1;
    else
        curIndex = 0;

    document.getElementById("card-name").innerText = users[curIndex].name;
    document.getElementById("card-gender").innerText = users[curIndex].gender;
    document.getElementById("card-image").src = users[curIndex].img;
}