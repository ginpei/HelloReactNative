import firebase from '../config/firebase.js';

export default class Note {
	constructor(data = {}) {
		if (typeof data.val === 'function') {
			const snapshot = data;
			data = snapshot.val() || {};
			data.key = snapshot.key;
		}

		this.key = data.key || null;
		this.userId = data.userId || '';
		this.title = data.title || '';
		this.description = data.description || '';
		this.createdAt = data.createdAt || 0;
		this.updatedAt = data.updatedAt || 0;
	}

	get db() {
		if (!this.key) {
			throw new Error('Key needs to be specified.');
		}
		return Note.db.child(this.key);
	}

	save() {
		if (!this.userId) {
			return Promise.reject(new Error('User ID is not set.'));
		}

		if (!this.title || !this.title.trim()) {
			return Promise.reject(new Error('Title is required.'));
		}

		const updates = {
			createdAt: this.createdAt || Date.now(),
			description: this.description,
			title: this.title,
			updatedAt: Date.now(),
			userId: this.userId,
		};

		if (!this.key) {
			this.createKey();
		}
		return this.db.set(updates);
	}

	createKey() {
		 this.key = Note.db.push().key;
	}

	delete() {
		return this.db.set(null);
	}

	static get db() {
		return firebase.db.ref('note');
	}

	static getRefForUser(user) {
		const query = Note.db.orderByChild('userId').equalTo(user.uid)
		return query;
	}

	static fetchAllFor(user) {
		return Note.getRefForUser(user).once('value').then(snapshot => {
			const notes = Note.snapshotToArray(snapshot);
			return Promise.resolve(notes);
		});
	}

	static snapshotToArray(snapshot) {
			const noteDataMap = snapshot.val() || {};
			const notes = Object.keys(noteDataMap)
				.map(key => {
					const data = noteDataMap[key];
					data.key = key;
					const note = new Note(data);
					return note;
				})
				.sort((a, b) => b.updatedAt - a.updatedAt);
		return notes;
	}

	static removeAllFor(user) {
		return Note.getRefForUser(user).once('value').then(snapshot => {
			const notes = Note.snapshotToArray(snapshot);
			return Promise.all(notes.map(note => note.delete()));
		});
	}
}
