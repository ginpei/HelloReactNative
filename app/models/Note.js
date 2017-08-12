import firebase from '../config/firebase.js';

export default class Note {
	constructor(key, data = {}) {
		this.key = key;
		this.userId = data.userId || '';
		this.title = data.title || '';
		this.description = data.description || '';
		this.createdAt = data.createdAt || 0;
		this.updatedAt = data.updatedAt || 0;
	}

	save() {
		// TODO implement
		return new Promise((_, reject) => setTimeout(_ => reject({ message: 'Wow' }), 1000));
	}

	static get db() {
		return firebase.db.ref('note');
	}

	static fetchAllFor(user) {
		const query = Note.db.orderByChild('userId').equalTo(user.uid)
		return query.once('value').then(snapshot => {
			const noteDataMap = snapshot.val() || {};
			const notes = Object.keys(noteDataMap).map(key => {
				const data = noteDataMap[key];
				const note = new Note(key, data);
				return note;
			});

			return Promise.resolve(notes);
		});
	}
}
