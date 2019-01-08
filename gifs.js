//Setting up global functions and variables//
$(document).ready(function () {
    $(document).on("click", ".animalButton", fetchAnimalGifs);

    $(document).on("click", ".animalGif", animateAnimalGif);
    
    
    var topics = ["dog", "cat", "pig", "chicken", "horse",
        "pig", "goat", "horse", "whale", "shark",
        "cow", "bear", "deer", "alligator", "kangaroo",
        "elephant", "koala", "giraffe", "hawk", "lion"];
    
    //Create function to generate buttons in the array //
    
    function renderButtons() {
        $("#buttonPanel").empty();
    
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("animalButton");
            button.attr("data-animal", topics[i]);
            button.text(topics[i]);
    
            $("#buttonPanel").append(button);
        }
    };
    
    //Create function allowing animals to be added as buttons //
    
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
    
        var animal = $("#animal-input").val().trim();
    
        topics.push(animal);
        console.log(topics);
    
    
        renderButtons();
    });
    
    // Create function that allows gifs of respected animals to be displayed //
    function fetchAnimalGifs() {
        var animalName = $(this).attr("data-animal");
        var animalStr = animalName.split(" ").join("+");
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalStr +
            "&api_key=ia9avzFaQmiszFiueudIvPgxnCaF2mcQ";
        console.log($);
        console.log($.jquery);
        $.ajax({
            method: "GET",
            url: queryURL,
        })
            .done(function (result) {
                var dataArray = result.data;
    
                //Set the number of gif images to show...in this case, 10//
    
                $("#gifPanel").empty();
                for (var i = 0; i < 10; i++) {
                    var newDiv = $("<div>");
                    newDiv.addClass("animalGif");
    
                    var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
                    newDiv.prepend(newRating);
    
                    var newImg = $("<img>");
                    newImg.attr("src", dataArray[i].images.fixed_height_still.url);
                    newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
                    newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
                    newImg.attr("data-state", "still");
                    newDiv.prepend(newImg);
    
                    $("#gifPanel").prepend(newDiv);
                }
            });
    }
    
    function animateAnimalGif() {
        var state = $(this).find("img").attr("data-state");
    
        if (state === "still") {
            $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
            $(this).find("img").attr("data-state", "animate");
        } else {
            $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
            $(this).find("img").attr("data-state", "still");
        }
    }

    renderButtons();
})
