import axios from "axios";
import { API_URL } from '../Constants.js';


class ProductService {

    addProduct(json) {
        return axios.post(`${API_URL}/api/product/`, json, {}
        );
    }

    getProductList() {
        return axios.get(`${API_URL}/api/product/`, {
        });
    }

    editProduct(json) {
        return axios.put(`${API_URL}/api/product/`, json, {}
        );
    }

    getProdcutCategoryListByRealmId(json) {
        // /productCategory/realmId/{realmId}/list/{productCategoryId}/{includeCurrentLevel}/{includeAllChildren}
        return axios.get(`${API_URL}/api/productCategory/realmId/${json}/list/1/1/1`, {}
        );
    }
    getProductDataById(json) {
        return axios.get(`${API_URL}/api/product/${json}`, {}
        );

    }
    getProductCategoryList(realmId) {
        // /productCategory/realmId/{realmId}/list/{productCategoryId}/{includeCurrentLevel}/{includeAllChildren}
        return axios.get(`${API_URL}/api/productCategory/realmId/${realmId}`, {}
        );
    }
    getConsumptionData(realmId,programId,productId,startDate,endDate){
        return axios.get(`${API_URL}/api/consumption/${realmId}/${programId}/${productId}/${startDate}/${endDate}`,{});   
    }
    getStockStatusMatrixData(realmId,productCategoryId,productId,view){
        return axios.get(`${API_URL}/api/stockmatrix/${realmId}/${productCategoryId}/${productId}/${view}`,{});   
    }

}
export default new ProductService();