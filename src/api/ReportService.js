import axios from "axios";
import { API_URL } from '../Constants.js';

class ReportService {
    getForecastMatricsOverTime(json) {
        return axios.post(`${API_URL}/api/report/forecastError`,json, {
        });
    }
    getGlobalConsumptiondata(json) {
        return axios.post(`${API_URL}/api/report/globalConsumption`, json,{}
        );
    }
    getForecastError(json) {
        return axios.post(`${API_URL}/api/report/forecastMetrics`, json,{}
        );
    }
    getAnnualShipmentCost(json) {
        return axios.post(`${API_URL}/api/report/annualShipmentCost`, json,{}
        );
    }
    getProgramVersionList(programId,realmCountryId,versionStatusId,startDate,stopDate) {
        return axios.get(`${API_URL}/api/programVersion/programId/${programId}/versionId/-1/realmCountryId/${realmCountryId}/healthAreaId/-1/organisationId/-1/versionTypeId/-1/versionStatusId/${versionStatusId}/dates/${startDate}/${stopDate}`,{}
        );
    }

    getStockOverTime(json) {
        return axios.post(`${API_URL}/api/report/stockOverTime`,json,{}
        );
    }

}
export default new ReportService();