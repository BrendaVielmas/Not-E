import firebase from './Firebase';

export function createNote(title, message) {
	if (message === "") {
		return "Error. El mensaje no puede estar vacío";
	}
	let uid = firebase.auth().currentUser.uid;
	let db = firebase.firestore();
	let day = new Date();
	return db.collection("Notes").add({
			"title": title,
			"message": message,
			"uid": uid,
			"dates": day
		})
		.then((docRef) => {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
}

export function deleteNote(noteId) {
	let db = firebase.firestore()
	//let noteId = db.collection("Notes").doc(uid)
	console.log(noteId);
	return db.collection("Notes").doc(noteId).delete().then(() => {
		console.log("Document successfully deleted!");
	}).catch(function(error) {
		console.error("Error removing document: ", error);
	});
}

export function editNote(noteId, newTitle, newMessage) {
	let db = firebase.firestore();
	return db.collection("Notes").doc(noteId).set({
		"title": newTitle,
		"message": newMessage
	}, {
		merge: true
	}).then(() => {
		console.log("Document successfully edit!");
	}).catch(function(error) {
		console.error("Error edit document: ", error);
	});
}

export function getNotesSnapshot(cb) {
	let db = firebase.firestore()
	let uid = firebase.auth().currentUser.uid;
	return db.collection("Notes").orderBy("dates", "desc").where("uid", "==", uid).onSnapshot(cb);
}