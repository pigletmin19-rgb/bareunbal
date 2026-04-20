import {
  collection, doc, getDocs, getDoc,
  addDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy
} from 'firebase/firestore'
import { db } from '../firebase'

const COL = 'products'

export async function getAllProducts() {
  const snap = await getDocs(collection(db, COL))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getProductById(id) {
  const snap = await getDoc(doc(db, COL, id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export async function getProductsByCategory(category) {
  if (!category || category === 'all') return getAllProducts()
  if (category === 'sale') {
    const snap = await getDocs(query(collection(db, COL), where('tags', 'array-contains', 'sale')))
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  }
  const snap = await getDocs(query(collection(db, COL), where('category', '==', category)))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createProduct(product) {
  const { id, ...data } = product
  await setDoc(doc(db, COL, id), data)
  return id
}

export async function updateProduct(id, data) {
  await updateDoc(doc(db, COL, id), data)
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, COL, id))
}
