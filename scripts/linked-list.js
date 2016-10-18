var count = 0;

// create bookmark
// TODO: get user input on click and enter key
$('#create-button').on('click', function() {
    var title = $('#title-form').val();
    var url = $('#url-form').val();
    count++;

    $('.list').append('<div id=>\
                      <h1 class="bookmark-title"> ' + title + '</h1>\
                      <p class=".bookmark-url">' + url + '</p>\
                      </div>')

});


// each bookmark should have a "Mark as Read" button
$('.read-button').on('click', function() {

});


// each bookmark should have a "Remove" button
$('.delete-button').on('click', function() {

});

$('bookmark-title')

$('bookmark-url')


// bookmark list
