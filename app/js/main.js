// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  // the e is an event parameter

  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  // bookmark to submit to local storage
  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // ----------------------------------------------------
  // Local Storage test (local storages only strings)
  // setItem(key, value)
  // localStorage.setItem('test', 'hello world'); // set
  // console.log(localStorage.getItem('test')); // get
  // localStorage.removeItem('test'); // delete
  // console.log(localStorage.getItem('test'));
  // ----------------------------------------------------

  if (localStorage.getItem('bookmarks') === null) {
    // init array
    var bookmarks = [];
    // add to array
    bookmarks.push(bookmark);
    // set to local storage
    // localStorage.setItem('bookmarks', bookmarks) is a JSON array and we need to save it as a string
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // get bookmarks from local storage
    // localStorage.getItem('bookmarks') is a string and we need a JSON now
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // add bookmark to array
    bookmarks.push(bookmark);
    // re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // clear form
  document.getElementById('myForm').reset();

  // re-fetch bookmarks
  fetchBookmarks();

  e.preventDefault(); // prevent form from submitting
}

// first we have done the fetch bookmarks
// Delete bookmarks
function deleteBookmark(url) {
  //console.log(url);
  // get bookmarks
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // remove from array
      bookmarks.splice(i, 1);
    }
  }
  // re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // re-fetch bookmarks
  fetchBookmarks();
}


// Fetch bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //console.log(bookmarks);
  // get output id
  var bookmarksResults = document.getElementById('bookmarksResults');
  // build output
  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">' +
                                    '<h3>' + name +
                                      ' <a class="btn btn-default" target="_blank" href="'+ url +'">Visit</a>' +
                                      ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' +
                                    '</h3>' +
                                  '</div>';
  }
}

// validates form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }
  // url validation
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=])?/gi;
  var regex = new RegExp(expression);
  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }
  return true;
}
