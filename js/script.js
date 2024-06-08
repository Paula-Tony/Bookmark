var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var alertBtn = document.getElementById("alert");
var bookmarkContainer = document.getElementById("bookmarkContainer");
var bookmarksList = [];

if (localStorage.getItem("bookmarks")) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
  checkBookmarksListIsEmpty();
}

function validateInput(input) {
  var regex = {
    siteName: /\w{3,}/gi,
    siteUrl:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g,
  };
  if (regex[input.id].test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}

function addBookmark() {
  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    var bookmark = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    bookmarksList.push(bookmark);
    displayBookmarks();
    addBookmarksToLocalStorage();
    clearInputs();
  } else {
    alertBtn.click();
  }
}

function displayBookmarks() {
  var bookmarks = "";
  for (let i = 0; i < bookmarksList.length; i++) {
    bookmarks += `
      <tr>
        <td class="align-middle">${i + 1}</td>
        <td class="align-middle">${bookmarksList[i].name}</td>
        <td><a href="${
          bookmarksList[i].url
        }" target="_blank" class="btn btn-success d-inline-flex align-items-center"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
        <td><button class="btn btn-danger d-inline-flex align-items-center" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
      </tr>`;
  }
  bookmarkContainer.innerHTML = bookmarks;
}

function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function addBookmarksToLocalStorage() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
}

function deleteBookmark(index) {
  bookmarksList.splice(index, 1);
  checkBookmarksListIsEmpty();
  addBookmarksToLocalStorage();
}

function checkBookmarksListIsEmpty() {
  if (bookmarksList.length == 0) {
    bookmarkContainer.innerHTML = `
    <tr>
      <td class="fs-5 text-success" colspan="4">No Websites Available</td>
    </tr>`;
  } else {
    displayBookmarks();
  }
}
