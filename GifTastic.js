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
    var stillUrl = topic.images.fixed_height_still.url;
    var gifUrl = topic.images.fixed_height.url;

    $("#gif-zone").append("<div><img class='image-item' data-state='still' data-gif='" + gifUrl + "' data-still='" + stillUrl + "' src='" + stillUrl + "'><p>" + topic.rating + "</p></div>");
}

function getGifs() {
    var searchTerm = $(this).attr("topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=9" + "&q=" + searchTerm;

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
    $(document).on("click", ".image-item", function() {

        //IF THEN logic for pausing buttons

        //Access attributes and grab their values for processing
        var stillUrl = $(this).attr('data-still');
        var gifUrl = $(this).attr('data-gif');
        var stillState = $(this).attr('data-state');
        if (stillState === 'still') {
            //Change image to a gif
            $(this).attr('data-state', 'gif');
            $(this).attr('src', gifUrl);
        } else {
            //CHange image to a still
            $(this).attr('data-state', 'still');
            $(this).attr('src', stillUrl);
        }
    })
    makeButtons(animals);


});