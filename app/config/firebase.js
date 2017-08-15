import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import cred from '../../cred.json';
import Note from '../models/Note.js';

export default {
	_initialized: false,

	get _auth() {
		return firebase.auth();
	},

	get db() {
		return firebase.database();
	},

	_user: null,
	get user() {
		return this._user;
	},

	get signedIn() {
		return this.user !== null;
	},

	get anonymous() {
		return this._auth.currentUser.providerData.length < 1;
	},

	init() {
		if (this._initialized) {
			console.log('# firebase has been already initialized.');
			return;
		}

		this._initialized = true;

		firebase.initializeApp({
			apiKey: `${cred.API_KEY}`,
			authDomain: `${cred.PROJECT_ID}.firebaseapp.com`,
			databaseURL: `https://${cred.PROJECT_ID}.firebaseio.com`,
			storageBucket: `${cred.PROJECT_ID}.appspot.com`,
		});
	},

	initAuth() {
		return this._loadSignedInUser()
			.then(user => console.log('# firebase._initAuth: User loaded (maybe null).', user));
	},

	signIn(email, password) {
		console.log('# signIn', email, password);
		if (!email) {
			return Promise.reject(this.ERRORS.INVALID_EMAIL);
		}
		else if (!password) {
			return Promise.reject(this.ERRORS.INVALID_PASSWORD);
		}

		const p = this._auth.signInWithEmailAndPassword(email, password);
		p.then(user => console.log('# auth: signIn', user));
		p.then(user => this._saveSignedInUser(user))
		p.catch(error => console.warn('# auth: signIn', error));
		return p;
	},

	signUp() {
		const p = firebase.auth().signInAnonymously()
		p.then(user => this._saveSignedInUser(user))
		return p;
	},

	linkToEmail(email, password) {
		var credential = firebase.auth.EmailAuthProvider.credential(email, password);
		return this._auth.currentUser.linkWithCredential(credential);
	},

	signOut() {
		const user = this.user;
		this._saveSignedInUser(null);

		let pDelete;
		if (this.anonymous) {
			pDelete = Note.removeAllFor(user)
					.then(() => this._auth.currentUser.delete());
		}
		else {
			pDelete = Promise.resolve();
		}

		return pDelete
			.then(() => {
				return this._auth.signOut();
			});
	},

	_saveSignedInUser(user) {
		console.log('# firebase._saveSignedInUser', user);
		this._user = user;
		AsyncStorage.setItem('user', JSON.stringify(user));
	},

	_loadSignedInUser() {
		const p = AsyncStorage.getItem('user')
			.then(json => {
				const user = JSON.parse(json);
				this._user = user;
				return user;
			});
		return p;
	},

	ERRORS: {
		INVALID_EMAIL: Error('Invalid email.'),
		INVALID_PASSWORD: Error('Invalid password.'),
	},
};
