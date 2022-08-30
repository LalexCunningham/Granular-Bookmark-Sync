var bookmarks = {};

browser.runtime.onInstalled.addListener(() => {
	saveBookmarks();

})

browser.bookmarks.onCreated.addListener(handleCreatedBookmark);

browser.bookmarks.onChanged.addListener(handleChangedBookmark);

async function loadBookmarks() {
	const bookmarksRoot = await browser.bookmarks.getTree()
	const bookmarksToolbar = bookmarksRoot[0].children[1].children;
	const bookmarkList = document.getElementById("bookmarks");
}

async function saveBookmarks () {
	const bookmarksRoot = await browser.bookmarks.getTree()
	const bookmarksToolbar = bookmarksRoot[0].children[1];

	loadBrowserBookmarksRecursive(bookmarksToolbar, "");

	browser.storage.local.set({
		"bookmarks": bookmarks
	})
}

function loadBrowserBookmarksRecursive(bookmark, parentId) {
	var bookmarkEntry = {
		type: "folder",
		title: bookmark.title,
		dateAdded: bookmark.dateAdded,
		parent: parentId,
		children: [],
		isSynced: false,
	}

	bookmarks[bookmark.id] = bookmarkEntry;

	for (let i = 0; i < bookmark.children.length; i++) {
		var child = bookmark.children[i];

		bookmarks[bookmark.id].children.push(child.id);

		if (child.type === "folder") {
			loadBrowserBookmarksRecursive(child, bookmark.id);
		} else {
			bookmarks[child.id] = {
				type: "bookmark",
				title: child.title,
				url: child.url,
				dateAdded: child.dateAdded,
				parent: bookmark.id,
				isSynced: false
			}
		}
	}
}

function handleChangedBookmark(id, changeInfo) {
	if (changeInfo.title) {
		console.log(changeInfo.title);
	}

	if (changeInfo.url) {
		console.log(changeInfo.url);
	}		
}

function handleCreatedBookmark(id, bookmarkInfo) {
	console.log(id);
	console.log(bookmarkInfo);
}

function handleMovedBookmark(id, moveInfo) {

}

function handleRemovedBookmark(id, removeInfo) {

}

