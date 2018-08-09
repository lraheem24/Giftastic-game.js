var animals = ["tiger", "bear", "goat", "pig", "horse", "dog", "cat", "chicken", "goose"];

function makeButtons(topics) {
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];
        var button = $("<button>");
        button.attr("topic", topic);
        button.text(topic);
        $("#button-zone").append(button)
    }
}

function makeGifs(topic) {
    var searchTerm = $(this).attr("topic");
    var img = $("<img/>");
    img.attr("src", response.data[0].images.original.url);
    $("body").append(img);
}

//we have to add attributes for state (playing or not) add attributes to store fixed heights vs and
// still vrs and inside of click handler look at attibutes and create if/else
function renderGifs(topic) {
    var img = $("<img/>");
    img.attr("src", topic.images.fixed_height.url);
    $("#gif-zone").append(img);
}

function getGifs() {
    var searchTerm = $(this).attr("topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=1" + "&q=" + searchTerm;


    $.ajax({

        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        for (j = 0; j < results.length; j++) {
            renderGifs(results[j]);

        }



    })
}

$(document).ready(function() {

    $("#button-zone").on("click", "button", getGifs);
    $("#gif-zone").on("click", "img", function() {

        //IF THEN logic for pausing buttons



        console.log(this);

    })
    makeButtons(animals);


});