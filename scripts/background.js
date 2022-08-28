browser.runtime.onInstalled.addListener(() => {
	saveBookmarks();
})

async function loadBookmarks() {
	const bookmarksRoot = await browser.bookmarks.getTree()
	const bookmarksToolbar = bookmarksRoot[0].children[1].children;
	const bookmarkList = document.getElementById("bookmarks");
}

async function saveBookmarks () {
	const bookmarksRoot = await browser.bookmarks.getTree()
	const bookmarksToolbar = bookmarksRoot[0].children[1].children;

	var bookmarks = traverseBookmarks(bookmarksToolbar, 0);

	browser.storage.local.set({
		"bookmarks": bookmarks
	})
}

function traverseBookmarks(folder, level) {
	var folderContents = [];

	for (let i = 0; i < folder.length; i++) {
		var bookmark = folder[i];
		var bookmarkObj;

		if (bookmark.type === "folder") {
			bookmarkObj = {
				type: "folder",
				title: bookmark.title,
				contents: traverseBookmarks(bookmark.children, level + 1),
				isSynced: false
			} 			
		} else {
			bookmarkObj = {
				type: "bookmark",
				title: bookmark.title,
				url: bookmark.url,
				isSynced: false
			}
		}

		folderContents[i] = bookmarkObj;
	}

	return folderContents;
}