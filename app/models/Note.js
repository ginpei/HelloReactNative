import firebase from '../config/firebase.js';

export default class Note {
	constructor(data = {}) {
		this.key = data.key || null;
		this.userId = data.userId || '';
		this.title = data.title || '';
		this.description = data.description || '';
		this.createdAt = data.createdAt || 0;
		this.updatedAt = data.updatedAt || 0;
	}

	save() {
		if (!this.userId) {
			return Promise.reject(new Error('User ID is not set.'));
		}

		const updates = this._prepareDataPushing({
			createdAt: this.createdAt || Date.now(),
			description: this.description,
			title: this.title,
			updatedAt: Date.now(),
			userId: this.userId,
		});
		console.log('# save', updates);

		return Note.db.update(updates);
	}

	_prepareDataPushing(data) {
		const key = this.key || Note.db.push().key;
		const names = Object.keys(data);
		const updates = names.reduce((updates, name) => (updates[`${key}/${name}`] = data[name], updates), {})
		return updates;
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
}
