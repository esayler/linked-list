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
  $('.error-msg').css('opacity', '1');
  $('.error-msg').css('transition-duration', '.5s');
}

inputFields.on('blur keyup', function () {
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

inputFields.keypress(function(event){
       if (event.which == 13) {
         $('#create-button').click();
       }
});

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

$(document).on('click', '.read-button', function() {
  $(this).parents('article').toggleClass('read');
  updateCounters();
});

$(document).on('click', '.delete-button', function() {
  $(this).parents('article').remove();
  updateCounters();
});

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
  } else {
    $('#clear-button').prop( "disabled", true );
  }
}
