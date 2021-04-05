import axios from "axios";
import { API_URL } from '../Constants.js';

class ProcurementAgentService {

    addProcurementAgent(json) {
        return axios.post(`${API_URL}/api/procurementAgent/`, json, {}
        );
    }

    getProcurementAgentListAll() {
        return axios.get(`${API_URL}/api/procurementAgent/`, {
        });
    }
    updateProcurementAgent(json) {
        return axios.put(`${API_URL}/api/procurementAgent/`, json, {
        });
    }
    getProcurementAgentPlaningUnitList(json) {
        return axios.get(`${API_URL}/api/procurementAgent/${json}/planningUnit/all`, {}
        );
    }

    getCountrySpecificPricesList(json) {
        return axios.get(`${API_URL}/api/procurementAgent/planningUnit/${json}/program/`, {}
        );
    }

    addprocurementAgentPlanningUnitMapping(json) {
        console.log("json papu---", json);
        return axios.put(`${API_URL}/api/procurementAgent/planningingUnit/`, json, {}
        );
    }

    savePlanningUnitProgramPriceForProcurementAgent(json) {
        console.log("json papu---", json);
        return axios.put(`${API_URL}/api/procurementAgent/planningingUnit/program/`, json, {}
        );
    }

    getProcurementAgentById(json) {
        return axios.get(`${API_URL}/api/procurementAgent/${json}`, {}
        );
    }

    addprocurementAgentProcurementUnitMapping(json) {
        console.log("Json", json);
        return axios.put(`${API_URL}/api/procurementAgent/procurementUnit/`, json, {}
        );
    }

    getProcurementAgentProcurementUnitList(json) {
        return axios.get(`${API_URL}/api/procurementAgent/${json}/procurementUnit/all`, {}
        );
    }

    getProcurementAgentDisplayName(json1, json2) {
        return axios.get(`${API_URL}/api/procurementAgent/getDisplayName/realmId/${json1}/name/${json2}`, {}
        );
    }
}

export default new ProcurementAgentService();
