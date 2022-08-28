function traverseBookmarks(folder, parentElement, level) {
	for (let i = 0; i < folder.length; i++) {
		var bookmark = folder[i];
		var bookmarkElement;

		if(level > 3) {
			bookmarkElement.style.display = "none";
		}

		if (bookmark.type === "folder") {
			bookmarkElement = createBookmarkElement(bookmark.type, bookmark.title, level);
			traverseBookmarks(bookmark.children, bookmarkElement, level + 1);
		} else {
			bookmarkElement = createBookmarkElement(bookmark.type, bookmark.title, level, bookmark.url);
		}

		parentElement.appendChild(bookmarkElement);
	}
}

async function loadBookmarks() {
	const bookmarksRoot = await browser.bookmarks.getTree()
	const bookmarksToolbar = bookmarksRoot[0].children[1].children;
	const bookmarkList = document.getElementById("bookmarks");

	traverseBookmarks(bookmarksToolbar, bookmarkList, 0);
}

function createBookmarkElement(type, title, level, url = "") {
	var bookmarkElement = document.createElement("div");
	var checkbox = document.createElement("input");	

	checkbox.type = "checkbox";
	checkbox.id = title + "_isSyncedCheckbox";

	let padding = ""
	for (let i = 0; i < level; i++) {
		padding += ">";
	}
	

	if (type === "folder") {
		bookmarkElement.innerHTML = padding + title;
	} else {
		bookmarkElement.innerHTML =  padding;
		var bookmarkLink = document.createElement("a");
		bookmarkLink.innerHTML = title;
		bookmarkLink.href = url;
		bookmarkElement.appendChild(bookmarkLink);
	}

	bookmarkElement.appendChild(checkbox);

	return bookmarkElement;
}

loadBookmarks();