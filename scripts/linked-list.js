var totalCounter = $('#num-total');
var readCounter = $('#num-read');
var unreadCounter = $('#num-unread');

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

titleForm.focus();

function displayError() {
  errorMsg.css('opacity', '.85');
  errorMsg.css('transition-duration', '.5s');
};

function hideError() {
  errorMsg.css('opacity', '0');
  errorMsg.css('transition-duration', '.5s');
};

inputFields.on('blur keypress', function () {

  var titleString = $('#title-form').val();
  var urlString = $('#url-form').val();
  var titleEmpty = stringIsEmpty(titleString);
  var urlEmpty = stringIsEmpty(urlString);

  if (urlEmpty || titleEmpty) {
    createButton.attr('disabled', true);
  } else if (!urlEmpty && !titleEmpty) {
    hideError();
    createButton.attr('disabled', false);
  }
});

function stringIsEmpty(string) {
  return string.length === 0 || (/^(\s)*$/g).test(string);
}

// click the create-button when user hits enter key
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
    addCardToList(titleText, validURL);
    updateCounters();
    createButton.attr('disabled', true);
    hideError();
    titleForm.focus();
  } else {
    displayError();
  }
});

function addCardToList(titleText, validURL) {
  var newCard = $('<article class="box" id="bookmark-' + count + '">\
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
               </article>').hide().fadeIn('normal');
  list.append(newCard);
};

function urlIsValid(titleText, urlText) {
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/ig.test(urlText);
};

function urlPrepend(url) {
  return /^(http(s)?:\/\/).*|(www.).*$/g.test(url) ? url : 'http://www.' + url;
}

$('.list').on('click', '.read-button', function() {
  $(this).parents('article').toggleClass('read');
  updateCounters();
});

$('.list').on('click', '.delete-button', function() {
  $(this).parents('.box').fadeOut('normal', function () {
    $(this).remove();
  });
  updateCounters();
});

$('.form').on('click', '#clear-button', function() {
  $('.list').children('.read').fadeOut('normal', function () {
    $(this).remove();
  });
  updateCounters();
});

function updateCounters() {
  var numTotal = $('.box').length;
  var numRead = $('.read').length;
  var numUnread = numTotal - numRead;

  totalCounter.text(numTotal);
  readCounter.text(numRead);
  unreadCounter.text(numUnread);

  updateClearButtonStatus(numRead);
};

function updateClearButtonStatus (numRead) {
  if (numRead > 0) {
    $('#clear-button').prop( "disabled", false );
  } else {
    $('#clear-button').prop( "disabled", true );
  }
};
