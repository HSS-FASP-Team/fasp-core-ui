import axios from "axios"
import { API_URL } from '../Constants.js'

class ProcurementUnitService {

    getProcurementUnitList() {
        return axios.get(`${API_URL}/api/procurementUnit/all`, {
        });
    }

    getProcurementUnitListActive() {
        return axios.get(`${API_URL}/api/procurementUnit/`, {
        });
    }

    addProcurementUnit(json) {
        return axios.post(`${API_URL}/api/procurementUnit/`, json, {}
        );
    }

    getProcurementUnitById(json) {
        return axios.get(`${API_URL}/api/procurementUnit/${json}`, {}
        );
    }

    editProcurementUnit(json) {
        return axios.put(`${API_URL}/api/procurementUnit/`, json, {}
        );
    }

    getProcurementUnitByRealmId(json) {
        return axios.get(`${API_URL}/api/procurementUnit/realmId/${json}`, {}
        );
    }
}
export default new ProcurementUnitService()