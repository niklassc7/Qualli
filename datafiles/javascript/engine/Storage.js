// Handles storing persistent data, can use different storage backend
// Supported backends: see switch in constructor
class Storage {
	constructor(backend) {
		// Set strategy for `get`, `put` and `delete`
		switch (backend) {
			case "cookie":
				this.get = this.getCookie;
				this.set = this.setCookie;
				this.delete = this.deleteCookie;
				break;
			default:
				console.error(`Storage failed to initialize (${backend} is not a valid storage backend)`)
				break;
		}

		this.backend = backend;
	}

	setCookie(key, val) {
		document.cookie = key + " = " + val + "; expires=Fri, 01 Jan 2100 12:00:00 UTC";
	}

	// TODO return undefined if not set instead of ""
	getCookie(key) {
		let regex = new RegExp('(?:(?:^|.*;\\s*)' + key + '\\s*\\=\\s*([^;]*).*$)|^.*$');
		return document.cookie.replace(regex, "$1");
	}

	deleteCookie(key) {
		document.cookie = key + " = ; expires=Sat, 01 Jan 2000 12:00:00 UTC";
	}
}
