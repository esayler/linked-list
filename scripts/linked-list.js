//$('.error-msg').hide()

var count = 0;

updateCounters();

var titleForm = $('#title-form');
var urlForm = $('#url-form');
var inputFields = $('#url-form, #title-form');
var createButton = $('#create-button');
var clearButton = $('#clear-button');

$('#clear-button').attr('disabled', true);
$('#create-button').attr('disabled', true);

function displayError() {
//function displayError(errorMessage) {
  //$('.error-msg').text(errorMessage);
  $('.error-msg').css('opacity', '1');
}

inputFields.on('blur keyup', function () {
  //$('.error-msg').fadeOut(1600)
  $('.error-msg').css('opacity', '0');
  $('.error-msg').css('transition-duration', '.5s');
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
    $('#create-button').attr('disabled', true);

    $('.list').append('<article class="box" id="bookmark-' + count + '">\
                         <h1 class="bookmark-title"> ' + titleText + '</h1><hr>\
                           <a class=".bookmark-url" href="' + urlText + '">\
                             <p><span class="hov-line">' + urlText + '</span></p>\
                           </a><hr>\
                         <div class="bookmark-buttons">\
                            <button type="button" name="Read" class="read-button">\
                              <p><span class="hov-line">Read</span></p>\
                            </button>\
                            <button type="button" name="Delete" class="delete-button">\
                               <p><span class="hov-line">Delete</span></p>\
                            </button>\
                          </div>\
                       </article>');
  } else {
    displayError();
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
    $('#clear-button').prop( "disabled", false );
    //$('#clear-button').attr('disabled', false);
  } else {
    $('#clear-button').prop( "disabled", true );
    //$('#clear-button').attr('disabled', true);
  }
}
