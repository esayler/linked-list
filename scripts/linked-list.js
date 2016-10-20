var count = 0;
updateCounters();
var titleForm = $('#title-form');
var urlForm = $('#url-form');
var inputFields = $('#url-form, #title-form');
var createButton = $('#create-button');

//$('#create-button').attr('disabled', true);
$('#clear-button').attr('disabled', true);

function displayError(errorMessage) {
  $('.error-msg').text(errorMessage);
}

inputFields.on('blur keyup', function () {
  var titleFormContent = $('#title-form').val();
  var urlFormContent = $('#url-form').val();
  var titleEmpty = titleFormContent.length === 0 || (/^(\s)*$/g).test(titleFormContent)
  var urlEmpty = urlFormContent.length === 0 || (/^(\s)*$/g).test(urlFormContent)

  if (urlEmpty || titleEmpty) {
    createButton.attr('disabled', true);
  } else if (!urlEmpty && !titleEmpty) {
    createButton.attr('disabled', false);
  }
});



// create bookmark
// TODO: get user input on click and enter key
$('#create-button').on('click', function() {
  var titleText = titleForm.val();
  var urlText = urlForm.val();


  if (urlIsValid(titleText, urlText)) {
    urlText = urlPrepend(urlText);
    titleForm.val('');
    urlForm.val('');
    count++;
    updateCounters();

    $('.list').append('<article class="box" id="bookmark-' + count + '">\
                         <h1 class="bookmark-title"> ' + titleText + '</h1>\
                           <a class=".bookmark-url" href="' + urlText + '">\
                             <p>' + urlText + '</p>\
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
  } else {
    displayError('URL is not valid!');
  }
});

function urlIsValid(titleText, urlText) {
  //var titleFormContent = $('#title-form').val();
  //var urlFormContent = $('#url-form').val();
  var titleFormContent = titleText;
  var urlFormContent = urlText;

  if (/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/ig.test(urlFormContent)) {
    return true;
  } else {
    return false;
  }
};

function urlPrepend(urlString) {

  if (/^(http:\/\/).*|(https:\/\/).*|(www.).*$/g.test(urlString)) {
    return urlString;
  } else {
    return 'http://www.' + urlString;
  }
}


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

  disableClearButton(numRead);
};

function disableClearButton (numRead) {
  if (numRead > 0) {
    $('#clear-button').attr('disabled', false);
  } else {
    $('#clear-button').attr('disabled', true);
  }
}
