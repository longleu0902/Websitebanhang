import { db } from "./firebase-config";
import{
    collection ,
    getDocs,
} from "firebase/firestore"
const ListCollectionRef = collection(db,"Lists");
class ListDataService{
    getAllLists = () => {
        return getDocs(ListCollectionRef)
    };
}
export default new ListDataService();