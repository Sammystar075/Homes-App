import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private db: firebase.firestore.Firestore;

  constructor() {
    this.db = firebase.firestore();
  }

  // Create or update a document
  setDoc(collection: string, docId: string, data: any) {
    return this.db.collection(collection).doc(docId).set(data);
  }

  // Add a new document with auto-generated ID
  addDoc(collection: string, data: any) {
    return this.db.collection(collection).add(data);
  }

  // Get a single document
  getDoc(collection: string, docId: string) {
    return this.db.collection(collection).doc(docId).get();
  }

  // Get all documents in a collection
  getCollection(collection: string) {
    return this.db.collection(collection).get();
  }

  // Delete a document
  deleteDoc(collection: string, docId: string) {
    return this.db.collection(collection).doc(docId).delete();
  }

  // Update specific fields in a document
  updateDoc(collection: string, docId: string, data: any) {
    return this.db.collection(collection).doc(docId).update(data);
  }

  // Query documents
  query(collection: string, field: string, operator: any, value: any) {
    return this.db.collection(collection).where(field, operator, value).get();
  }
}