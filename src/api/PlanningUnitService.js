import axios from "axios";
import { API_URL } from '../Constants.js';

class PlanningUnitService {

    addPlanningUnit(json) {
        return axios.post(`${API_URL}/api/planningUnit/`, json, {}
        );
    }

    getActivePlanningUnitList() {
        return axios.get(`${API_URL}/api/planningUnit/`, {
        });
    }
    getAllPlanningUnitList() {
        return axios.get(`${API_URL}/api/planningUnit/all`, {
        });
    }
    getPlanningUnitByRealmId(json) {
        return axios.get(`${API_URL}/api/planningUnit/realmId/${json}`, {}
        );
    }

    editPlanningUnit(json) {
        return axios.put(`${API_URL}/api/planningUnit/`, json, {}
        );
    }
    getPlanningUnitById(json) {
        return axios.get(`${API_URL}/api/planningUnit/${json}`, {}
        );
    }

    getPlanningUnitCapacityForId(planningUnitId) {
        return axios.get(`${API_URL}/api/planningUnit/capacity/${planningUnitId}`, {}
        );
    }

    editPlanningUnitCapacity(json) {
        return axios.put(`${API_URL}/api/planningUnit/capacity`, json, {}
        );
    }
    getPlanningUnitByProductCategoryId(json) {
        return axios.get(`${API_URL}/api/planningUnit/productCategory/${json}/all`, {}
        );
    }
    getPlanningUnitByProgramIds(json) {
        return axios.post(`${API_URL}/api/planningUnit/programs`, json, {}
        );
    }
    getPlanningUnitByTracerCategory(planningUnitId, procurementAgentId) {
        return axios.get(`${API_URL}/api/getPlanningUnitByTracerCategory/planningUnitId/${planningUnitId}/${procurementAgentId}`, {}
        );
    }
}
export default new PlanningUnitService();
