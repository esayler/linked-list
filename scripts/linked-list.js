updateCounters();

var count = 0;
var titleForm = $('#title-form');
var list = $('.list')
var urlForm = $('#url-form');
var inputFields = $('#url-form, #title-form');
var createButton = $('#create-button');
var clearButton = $('#clear-button');
var errorMsg = $('.error-msg');

clearButton.attr('disabled', true);
createButton.attr('disabled', true);

function displayError() {
  errorMsg.css('opacity', '1');
  errorMsg.css('transition-duration', '.5s');
};

inputFields.on('blur keyup', function () {
  errorMsg.css('opacity', '0');
  errorMsg.css('transition-duration', '.5s');

  var titleString = $('#title-form').val();
  var urlString = $('#url-form').val();
  var titleEmpty = titleString.length === 0 || (/^(\s)*$/g).test(titleString);
  var urlEmpty = urlString.length === 0 || (/^(\s)*$/g).test(urlString);

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

function clearFormInput() {
  titleForm.val('');
  urlForm.val('');
};

function getFormInput() {
  return { titleText: titleForm.val(), urlText: urlForm.val() };
};

$('#create-button').on('click', function() {
  var formInput = getFormInput();
  var titleText = formInput.titleText;
  var urlText = formInput.urlText;

  if (urlIsValid(titleText, urlText)) {
    count++;
    var validURL = urlPrepend(urlText);
    clearFormInput();
    updateCounters();
    addCardToList(titleText, validURL);
    createButton.attr('disabled', true);
  } else {
    displayError();
  }
});

function addCardToList(titleText, validURL) {
  list.append('<article class="box" id="bookmark-' + count + '">\
                 <h1 class="bookmark-title"> ' + titleText + '</h1><hr>\
                   <a class=".bookmark-url" href="' + validURL + '">\
                     <p><span class="hov-line">' + validURL + '</span></p>\
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
};

function urlIsValid(titleText, urlText) {
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/ig.test(urlText);
};

function urlPrepend(urlString) {
  if (/^(http:\/\/).*|(https:\/\/).*|(www.).*$/g.test(urlString)) {
    return urlString;
  } else {
    return 'http://www.' + urlString;
  }
}

$('.list').on('click', '.read-button', function() {
  $(this).parents('article').toggleClass('read');
  updateCounters();
});

$('.list').on('click', '.delete-button', function() {
  $(this).parents('article').remove();
  updateCounters();
});

$('.form').on('click', '#clear-button', function() {
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

  updateClearButtonStatus(numRead);
};

function updateClearButtonStatus (numRead) {
  if (numRead > 0) {
    $('#clear-button').prop( "disabled", false );
  } else {
    $('#clear-button').prop( "disabled", true );
  }
};
