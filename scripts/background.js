browser.runtime.onInstalled.addListener(() => {

})

async function loadBookmarks() {
	const bookmarksRoot = await browser.bookmarks.getTree()
	const bookmarksToolbar = bookmarksRoot[0].children[1].children;
	const bookmarkList = document.getElementById("bookmarks");
}

async function saveBookmarks () {
	const bookmarksRoot = await browser.bookmarks.getTree()
	const bookmarksToolbar = bookmarksRoot[0].children[1].children;
	const bookmarkList = document.getElementById("bookmarks");
}

function traverseBookmarks(folder, parentElement, level) {
	for (let i = 0; i < folder.length; i++) {
		var bookmark = folder[i];
		var bookmarkElement;

		if (bookmark.type === "folder") {
			bookmarkElement = createBookmarkElement(bookmark.type, bookmark.title, level);
			traverseBookmarks(bookmark.children, bookmarkElement, level + 1);
		} else {
			bookmarkElement = createBookmarkElement(bookmark.type, bookmark.title, level, bookmark.url);
		}

		parentElement.appendChild(bookmarkElement);
	}
}