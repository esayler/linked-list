var count = 0;
updateCounters();
// create bookmark
// TODO: get user input on click and enter key
$('#create-button').on('click', function() {
    var title = $('#title-form').val();
    var url = $('#url-form').val();
    count++;

    $('.list').append('<article class="box" id="bookmark-' + count + '">\
                         <h1 class="bookmark-title"> ' + title + '</h1>\
                           <a class=".bookmark-url" href="' + url + '">\
                             <p>' + url + '</p>\
                           </a>\
                         <div class="bookmark-buttons">\
                            <button type="button" name="Read" class="read-button">\
                              <p>Read</p>\
                            </button>\
                            <button type="button" name="Delete" class="delete-button">\
                               <p>Delete</p>\
                            </button>\
                          </div>\
                       </article>');

});


// each bookmark should have a "Mark as Read" button
$(document).on('click', '.read-button', function() {
  $(this).parents('article').toggleClass('read');
  updateCounters();
});


// each bookmark should have a "Remove" button
//$('.delete-button').on('click', function() {
$(document).on('click', '.delete-button', function() {
  $(this).parents('article').remove();
  updateCounters();
});

// clear all read bookmarks

$(document).on('click', '#clear-button', function() {
  $('.list').children('.read').remove()
  updateCounters();
});

function updateCounters() {
  var numTotal = $('.box').length;
  var numRead = $('.read').length;
  var numUnread = numTotal - numRead;

  $('#num-total').text(numTotal);

  $('#num-read').text(numRead);

  $('#num-unread').text(numUnread);

};
