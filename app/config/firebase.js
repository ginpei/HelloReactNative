import firebase from 'firebase';
import cred from '../../cred.json';

export default {
	get _auth() {
		return firebase.auth();
	},

	_user: null,
	get user() {
		return this._user;
	},

	get signedIn() {
		return this.user !== null;
	},

	init() {
		firebase.initializeApp({
			apiKey: `${cred.API_KEY}`,
			authDomain: `${cred.PROJECT_ID}.firebaseapp.com`,
			databaseURL: `https://${cred.PROJECT_ID}.firebaseio.com`,
			storageBucket: `${cred.PROJECT_ID}.appspot.com`,
		});

		this._initAuth();
	},

	_initAuth() {
		this._auth.onAuthStateChanged(function(user) {
			console.log('# onAuthStateChanged', user);
			this._user = user;
		});
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
		p.catch(error => console.warn('# auth: signIn', error));
		return p;
	},

	signOut() {
		return this._auth.signOut();
	},

	ERRORS: {
		INVALID_EMAIL: Error('Invalid email.'),
		INVALID_PASSWORD: Error('Invalid password.'),
	},
};
