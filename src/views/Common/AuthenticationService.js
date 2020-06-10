import axios from 'axios'
import { Online } from "react-detect-offline";
import jwt_decode from 'jwt-decode'
import { API_URL } from '../../Constants.js'
import CryptoJS from 'crypto-js'
import { SECRET_KEY } from '../../Constants.js'
import bcrypt from 'bcryptjs';
import moment from 'moment';

let myDt;
class AuthenticationService {

    isUserLoggedIn(username) {
        var decryptedPassword = "";
        for (var i = 0; i < localStorage.length; i++) {
            var value = localStorage.getItem(localStorage.key(i));
            if (localStorage.key(i).includes("user-")) {
                let user = JSON.parse(CryptoJS.AES.decrypt(value.toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8));
                let decryptedUsername = user.username;
                if (decryptedUsername == username) {
                    localStorage.setItem("tempUser", user.userId);
                    decryptedPassword = user.password;
                }
            }

        }
        return decryptedPassword;
    }

    syncExpiresOn() {
        let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
        let decryptedUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user-" + decryptedCurUser), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8));
        let syncExpiresOn = moment(decryptedUser.syncExpiresOn);
        console.log("syncExpiresOn---", syncExpiresOn);
        var curDate = moment(new Date());
        const diff = curDate.diff(syncExpiresOn, 'days');
        // const diffDuration = moment.duration(diff);
        console.log("diff---", diff);
        // console.log("diffDuration---",diffDuration)
        // console.log("Days:", diffDuration.days());
        console.log("days diff new------ ---", curDate.diff(syncExpiresOn, 'days'));
        if (diff < 30) {
            return false;
        }
        return true;
    }

    getLoggedInUsername() {
        if (localStorage.getItem('curUser') != null && localStorage.getItem('curUser') != '') {
            let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
            let decryptedUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user-" + decryptedCurUser), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8));
            return decryptedUser.username;
        }
        return "";
    }

    getLoggedInUserRole() {
        if (localStorage.getItem('curUser') != null && localStorage.getItem('curUser') != '') {
            let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
            let decryptedUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user-" + decryptedCurUser), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8));
            let roles = "";
            for (let i = 0; i <= decryptedUser.roles.length; i++) {
                let role = decryptedUser.roles[i];
                // if (role != null && role != "") {
                //     if (i > 0) {
                //         roles += "," + role.label.label_en;
                //     } else {
                //         roles += role.label.label_en;
                //     }
                // }
            }
            console.log("decryptedUser.roles---" + decryptedUser.roles);
            return decryptedUser.roles;
        }
    }

    getLoggedInUserId() {
        let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
        return decryptedCurUser;
    }

    getLanguageId() {
        let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
        let decryptedUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user-" + decryptedCurUser), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8));
        return decryptedUser.language.languageId;
    }

    getRealmId() {
        let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
        let decryptedUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user-" + decryptedCurUser), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8));
        // console.log(decryptedUser);
        return decryptedUser.realm.realmId;
    }

    checkTypeOfSession() {
        let typeOfSession = localStorage.getItem('typeOfSession');
        if ((typeOfSession === 'Online' && navigator.onLine) || (typeOfSession === 'Offline' && !navigator.onLine)) {
            return true;
        } else {
            return false;



        }
    }

    checkIfDifferentUserIsLoggedIn(newUsername) {
        let usernameStored = localStorage.getItem('username');
        if (usernameStored !== null && usernameStored !== "") {
            var usernameDecrypted = CryptoJS.AES.decrypt(usernameStored, `${SECRET_KEY}`)
            var originalText = usernameDecrypted.toString(CryptoJS.enc.Utf8);
            if (originalText !== newUsername) {
                if (window.confirm("Are you sure you want to overrride already logged in user's details?")) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        } else {
            return true;
        }
    }

    checkIfTokenExpired() {
        let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
        let decryptedToken = CryptoJS.AES.decrypt(localStorage.getItem('token-' + decryptedCurUser).toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8)
        var decoded = jwt_decode(decryptedToken);
        let tokenExpiryTime = new Date(decoded.exp * 1000);
        var curDate = new Date();
        if (new Date(decoded.exp * 1000) > new Date()) {
            return true;
        } else {
            return false;
        }
    }

    checkSessionTimeOut() {
        let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
        let decryptedUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('user-' + decryptedCurUser).toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8))
        return decryptedUser.sessionExpiresOn;
    }

    // refreshToken() {
    //     let token = localStorage.getItem('token');
    //     this.setupAxiosInterceptors();
    //     return axios.get(`${API_URL}/refresh`, {}).then(response => {
    //     }).catch(
    //         error => {
    //         })
    // }


    setupAxiosInterceptors() {
        // axios.defaults.headers.common['Authorization'] = '';
        // delete axios.defaults.headers.common['Authorization'];
        let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
        let decryptedToken = CryptoJS.AES.decrypt(localStorage.getItem('token-' + decryptedCurUser).toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
        let basicAuthHeader = 'Bearer ' + decryptedToken
        axios.defaults.headers.common['Authorization'] = basicAuthHeader;
        // axios.interceptors.request.use(
        //     (config) => {
        //         config.headers.authorization = decryptedToken ? basicAuthHeader : '';
        //         return config;
        //     }
        // )


        // // Add a response interceptor
        // axios.interceptors.response.use(function (response) {
        //     return response;
        // }, function (error) {
        //     return Promise.reject(error);
        // });

    }

    storeTokenInIndexedDb(token, decodedObj) {
        let userObj = {
            token: token,
            typeOfSession: "Online",
            userId: decodedObj.userId
        }
        let userId = {
            userId: decodedObj.userId
        }
        if (!('indexedDB' in window)) {
            alert('This browser does not support IndexedDB');
        } else {
            var db;
            var customerObjectStore;
            var openRequest = indexedDB.open('fasp', 1);

            openRequest.onupgradeneeded = function (e) {
                var db = e.target.result;
                if (!db.objectStoreNames.contains('programData')) {
                    customerObjectStore = db.createObjectStore('programData', { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('lastSyncDate')) {
                    customerObjectStore = db.createObjectStore('lastSyncDate', { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('language')) {
                    customerObjectStore = db.createObjectStore('language', { keyPath: 'languageId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('country')) {
                    customerObjectStore = db.createObjectStore('country', { keyPath: 'countryId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('currency')) {
                    customerObjectStore = db.createObjectStore('currency', { keyPath: 'currencyId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('unit')) {
                    customerObjectStore = db.createObjectStore('unit', { keyPath: 'unitId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('dimension')) {
                    customerObjectStore = db.createObjectStore('dimension', { keyPath: 'dimensionId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('organisation')) {
                    customerObjectStore = db.createObjectStore('organisation', { keyPath: 'organisationId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('healthArea')) {
                    customerObjectStore = db.createObjectStore('healthArea', { keyPath: 'healthAreaId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('region')) {
                    customerObjectStore = db.createObjectStore('region', { keyPath: 'regionId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('fundingSource')) {
                    customerObjectStore = db.createObjectStore('fundingSource', { keyPath: 'fundingSourceId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('subFundingSource')) {
                    customerObjectStore = db.createObjectStore('subFundingSource', { keyPath: 'subFundingSourceId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('product')) {
                    customerObjectStore = db.createObjectStore('product', { keyPath: 'productId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('productCategory')) {
                    customerObjectStore = db.createObjectStore('productCategory', { keyPath: 'productCategoryId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('dataSource')) {
                    customerObjectStore = db.createObjectStore('dataSource', { keyPath: 'dataSourceId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('dataSourceType')) {
                    customerObjectStore = db.createObjectStore('dataSourceType', { keyPath: 'dataSourceTypeId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('shipmentStatus')) {
                    customerObjectStore = db.createObjectStore('shipmentStatus', { keyPath: 'shipmentStatusId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('shipmentStatusAllowed')) {
                    customerObjectStore = db.createObjectStore('shipmentStatusAllowed', { keyPath: 'shipmentStatusAllowedId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('supplier')) {
                    customerObjectStore = db.createObjectStore('supplier', { keyPath: 'supplierId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('logisticsUnit')) {
                    customerObjectStore = db.createObjectStore('logisticsUnit', { keyPath: 'logisticsUnitId', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('planningUnit')) {
                    customerObjectStore = db.createObjectStore('planningUnit', { keyPath: 'planningUnitId', autoIncrement: true });
                }
            }.bind(this);

            openRequest.onsuccess = function (e) {
                db = e.target.result;
                var transaction = db.transaction(['user'], 'readwrite');
                var user = transaction.objectStore('user');
                var result;
                result = user.delete(decodedObj.userId);

                result.onsuccess = function (event) {
                    result = user.add(userObj);
                    result.onerror = function (event) {
                    };

                    result.onsuccess = function (event) {
                    };
                };
                result.onerror = function (event) {
                };


                var transaction1 = db.transaction(['curuser'], 'readwrite');
                var curuser = transaction1.objectStore('curuser');
                result = curuser.clear();
                result.onsuccess = function (event) {
                    result = curuser.add(userId);
                    result.onerror = function (event) {
                    };

                    result.onsuccess = function (event) {
                    };
                };
                result.onerror = function (event) {
                };

            }.bind(this);

        }
    }
    checkLastActionTaken() {
        if (localStorage.getItem('lastActionTaken') != null && localStorage.getItem('lastActionTaken') != "") {
            var lastActionTakenStorage = CryptoJS.AES.decrypt(localStorage.getItem('lastActionTaken').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
            var lastActionTaken = moment(lastActionTakenStorage);
            // console.log("lastActionTakenStorage---", lastActionTakenStorage);
            var curDate = moment(new Date());
            const diff = curDate.diff(lastActionTaken);
            const diffDuration = moment.duration(diff);
            // console.log("Total Duration in millis:", diffDuration.asMilliseconds());
            // console.log("Days:", diffDuration.days());
            // console.log("Hours:", diffDuration.hours());
            // console.log("Minutes:", diffDuration.minutes());
            // console.log("Seconds:", diffDuration.seconds());
            if (diffDuration.minutes() < 30) {
                // if (diffDuration.minutes() < 10) {
                return true;
            }
            return false;
        }
        return false;
    }
    getLoggedInUserDetails() {
        if (!('indexedDB' in window)) {
            alert('This browser does not support IndexedDB');
        } else {
            var db;
            var customerObjectStore;
            var userObj = 0;
            var openRequest = indexedDB.open('fasp', 1);

            openRequest.onupgradeneeded = function (e) {
                db = e.target.result;
                if (!db.objectStoreNames.contains('user')) {
                    customerObjectStore = db.createObjectStore('user', { keyPath: 'userId', autoIncrement: true });
                    customerObjectStore.createIndex("userId", "userId", { unique: true });
                }
                if (!db.objectStoreNames.contains('curuser')) {
                    customerObjectStore = db.createObjectStore('curuser', { keyPath: 'userId' });
                    customerObjectStore.createIndex("userId", "userId", { unique: true });
                }
            }.bind(this);

            openRequest.onsuccess = function (e) {
                db = e.target.result;
                var result;
                var transaction1 = db.transaction(['curuser'], 'readwrite');
                var curuser = transaction1.objectStore('curuser');
                result = curuser.getAll();
                result.onsuccess = function (event) {
                    var user = db.transaction(['user'], 'readwrite').objectStore('user');
                    result = user.get(result.result[0].userId);
                    result.onerror = function (event) {
                    };

                    result.onsuccess = function (event) {
                        userObj = result.result;
                        return userObj;
                    };
                };
                result.onerror = function (event) {
                };

            }.bind(this);

        }
        return userObj;
    }

    getLoggedInUserRoleBusinessFunction() {
        if (localStorage.getItem('curUser') != null && localStorage.getItem('curUser') != '') {
            let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
            let decryptedUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user-" + decryptedCurUser), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8));
            let businessFunctions = decryptedUser.businessFunction;
            console.log("decryptedUser.businessfunctions---" + decryptedUser.businessFunction);
            return businessFunctions;
        }
        return "";
    }

    getLoggedInUserRoleBusinessFunctionArray() {
        let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
        let decryptedUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user-" + decryptedCurUser), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8));
        let businessFunctions = decryptedUser.businessFunction;
        console.log("decryptedUser.businessfunctions---" + decryptedUser.businessFunction);

        var bfunction = [];
        for (let i = 0; i < businessFunctions.length; i++) {
            bfunction.push(businessFunctions[i].authority);
        }
        return bfunction;
    }
    authenticatedRoute(route) {
        console.log("route---" + route);

        if (localStorage.getItem('curUser') != null && localStorage.getItem('curUser') != '') {
            let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
            if (navigator.onLine && (localStorage.getItem('token-' + decryptedCurUser) == null || localStorage.getItem('token-' + decryptedCurUser) == "")) {
                return false;
            }
            var bfunction = this.getLoggedInUserRoleBusinessFunctionArray();
            switch (route) {
                case "/user/addUser":
                    if (bfunction.includes("ROLE_BF_ADD_USER")) {
                        return true;
                    }
                    break;
                case "/user/editUser/:userId":
                    if (bfunction.includes("ROLE_BF_EDIT_USER")) {
                        return true;
                    }
                    break;
                case "/user/accessControl":
                    if (bfunction.includes("ROLE_BF_ACCESS_CONTROL")) {
                        return true;
                    }
                    break;
                case "/user/listUser":
                case "/user/listUser/:message":
                    if (bfunction.includes("ROLE_BF_LIST_USER")) {
                        return true;
                    }
                    break;
                case "/role/addRole":
                    if (bfunction.includes("ROLE_BF_ADD_ROLE")) {
                        return true;
                    }
                    break;
                case "/role/editRole/:roleId":
                    if (bfunction.includes("ROLE_BF_EDIT_ROLE")) {
                        return true;
                    }
                    break;
                case "/role/listRole":
                case "/role/listRole/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_ROLE")) {
                        return true;
                    }
                    break;
                case "/language/addLanguage":
                    if (bfunction.includes("ROLE_BF_ADD_LANGUAGE")) {
                        return true;
                    }
                    break;
                case "/language/editLanguage/:languageId":
                    if (bfunction.includes("ROLE_BF_EDIT_LANGUAGE")) {
                        return true;
                    }
                    break;
                case "/language/listLanguage":
                case "/language/listLanguage/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_LANGUAGE")) {
                        return true;
                    }
                    break;
                case "/country/addCountry":
                    if (bfunction.includes("ROLE_BF_ADD_COUNTRY")) {
                        return true;
                    }
                    break;
                case "/country/editCountry/:countryId":
                    if (bfunction.includes("ROLE_BF_EDIT_COUNTRY")) {
                        return true;
                    }
                    break;
                case "/country/listCountry":
                case "/country/listCountry/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_COUNTRY")) {
                        return true;
                    }
                    break;
                case "/currency/addCurrency":
                    if (bfunction.includes("ROLE_BF_ADD_CURRENCY")) {
                        return true;
                    }
                    break;
                case "/currency/editCurrency/:currencyId":
                    if (bfunction.includes("ROLE_BF_EDIT_CURRENCY")) {
                        return true;
                    }
                    break;
                case "/currency/listCurrency":
                case "/currency/listCurrency/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_CURRENCY")) {
                        return true;
                    }
                    break;
                case "/diamension/AddDiamension":
                    if (bfunction.includes("ROLE_BF_ADD_DIAMENSIONS")) {
                        return true;
                    }
                    break;
                case "/diamension/editDiamension/:dimensionId":
                    if (bfunction.includes("ROLE_BF_EDIT_DIAMENSIONS")) {
                        return true;
                    }
                    break;
                case "/diamension/diamensionlist":
                case "/diamension/diamensionlist/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_DIAMENSIONS")) {
                        return true;
                    }
                    break;
                case "/unit/addUnit":
                    if (bfunction.includes("ROLE_BF_ADD_UNITS")) {
                        return true;
                    }
                    break;
                case "/unit/editUnit/:unitId":
                    if (bfunction.includes("ROLE_BF_EDIT_UNITS")) {
                        return true;
                    }
                    break;
                case "/unit/listUnit":
                case "/unit/listUnit/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_UNITS")) {
                        return true;
                    }
                    break;
                case "/realm/addrealm":
                    if (bfunction.includes("ROLE_BF_ADD_REALMS")) {
                        return true;
                    }
                    break;
                case "/realm/updateRealm/:realmId":
                    if (bfunction.includes("ROLE_BF_EDIT_REALMS")) {
                        return true;
                    }
                    break;
                case "/realm/realmlist":
                case "/realm/realmlist/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_REALMS")) {
                        return true;
                    }
                    break;
                case "/realmCountry/listRealmCountry":
                case "/realmCountry/listRealmCountry/:message":
                    if (bfunction.includes("ROLE_BF_LIST_REALM_COUNTRY")) {
                        return true;
                    }
                    break;
                case "/realmCountry/listRealmCountryPlanningUnit":
                    if (bfunction.includes("ROLE_BF_LIST_REALM_COUNTRY_PLANNING_UNIT")) {
                        return true;
                    }
                    break;
                case "/dataSourceType/addDataSourceType":
                    if (bfunction.includes("ROLE_BF_ADD_DATASOURCE_TYPE")) {
                        return true;
                    }
                    break;
                case "/dataSourceType/editDataSourceType/:dataSourceTypeId":
                    if (bfunction.includes("ROLE_BF_EDIT_DATASOURCE_TYPE")) {
                        return true;
                    }
                    break;
                case "/dataSourceType/listDataSourceType":
                case "/dataSourceType/listDataSourceType/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_DATASOURCE_TYPE")) {
                        return true;
                    }
                    break;
                case "/dataSource/addDataSource":
                    if (bfunction.includes("ROLE_BF_ADD_DATASOURCE")) {
                        return true;
                    }
                    break;
                case "/dataSource/editDataSource/:dataSourceId":
                    if (bfunction.includes("ROLE_BF_EDIT_DATASOURCE")) {
                        return true;
                    }
                    break;
                case "/dataSource/listDataSource":
                case "/dataSource/listDataSource/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_DATASOURCE")) {
                        return true;
                    }
                    break;
                case "/fundingSource/addFundingSource":
                    if (bfunction.includes("ROLE_BF_ADD_FUNDING_SOURCE")) {
                        return true;
                    }
                    break;
                case "/fundingSource/editFundingSource/:fundingSourceId":
                    if (bfunction.includes("ROLE_BF_EDIT_FUNDING_SOURCE")) {
                        return true;
                    }
                    break;
                case "/fundingSource/listFundingSource":
                case "/fundingSource/listFundingSource/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_FUNDING_SOURCE")) {
                        return true;
                    }
                    break;
                case "/procurementAgent/addProcurementAgent":
                    if (bfunction.includes("ROLE_BF_ADD_PROCUREMENT_AGENT")) {
                        return true;
                    }
                    break;
                case "/procurementAgent/editProcurementAgent/:procurementAgentId":
                    if (bfunction.includes("ROLE_BF_EDIT_PROCUREMENT_AGENT")) {
                        return true;
                    }
                    break;
                case "/procurementAgent/listProcurementAgent":
                case "/procurementAgent/listProcurementAgent/:message":
                    if (bfunction.includes("ROLE_BF_LIST_PROCUREMENT_AGENT")) {
                        return true;
                    }
                    break;
                case "/budget/addBudget":
                    if (bfunction.includes("ROLE_BF_ADD_BUDGET")) {
                        return true;
                    }
                    break;
                case "/budget/editBudget/:budgetId":
                    if (bfunction.includes("ROLE_BF_EDIT_BUDGET")) {
                        return true;
                    }
                    break;
                case "/budget/listBudget":
                case "/budget/listBudget/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_BUDGET")) {
                        return true;
                    }
                    break;
                case "/supplier/addSupplier":
                    if (bfunction.includes("ROLE_BF_ADD_SUPPLIER")) {
                        return true;
                    }
                    break;
                case "/supplier/editSupplier/:supplierId":
                    if (bfunction.includes("ROLE_BF_EDIT_SUPPLIER")) {
                        return true;
                    }
                    break;
                case "/supplier/listSupplier":
                case "/supplier/listSupplier/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_SUPPLIER")) {
                        return true;
                    }
                    break;
                case "/region/listRegion":
                case "/region/listRegion/:message":
                    if (bfunction.includes("ROLE_BF_LIST_REGIONS")) {
                        return true;
                    }
                    break;
                case "/healthArea/addHealthArea":
                    if (bfunction.includes("ROLE_BF_ADD_HEALTHAREA")) {
                        return true;
                    }
                    break;
                case "/healthArea/editHealthArea/:healthAreaId":
                    if (bfunction.includes("ROLE_BF_EDIT_HEALTHAREA")) {
                        return true;
                    }
                    break;
                case "/healthArea/listHealthArea":
                case "/healthArea/listHealthArea/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_HEALTHAREA")) {
                        return true;
                    }
                    break;
                case "/organisation/addOrganisation":
                    if (bfunction.includes("ROLE_BF_ADD_ORGANISATION")) {
                        return true;
                    }
                    break;
                case "/organisation/editOrganisation/:organisationId":
                    if (bfunction.includes("ROLE_BF_EDIT_ORGANISATION")) {
                        return true;
                    }
                    break;
                case "/organisation/listOrganisation":
                case "/organisation/listOrganisation/:color/:message":
                    if (bfunction.includes("ROLE_BF_LIST_ORGANISATION")) {
                        return true;
                    }
                    break;
                case "/program/addProgram":
                    if (bfunction.includes("ROLE_BF_ADD_PROGRAM")) {
                        return true;
                    }
                    break;
                case "/program/editProgram/:programId":
                    if (bfunction.includes("ROLE_BF_EDIT_PROGRAM")) {
                        return true;
                    }
                    break;
                case "/program/listProgram":
                case "/program/listProgram/:message":
                    if (bfunction.includes("ROLE_BF_LIST_PROGRAM")) {
                        return true;
                    }
                    break;
                case "/tracerCategory/addTracerCategory":
                    if (bfunction.includes("ROLE_BF_ADD_TRACER_CATEGORY")) {
                        return true;
                    }
                    break;
                case "/tracerCategory/editTracerCategory/:tracerCategoryId":
                    if (bfunction.includes("ROLE_BF_EDIT_TRACER_CATEGORY")) {
                        return true;
                    }
                    break;
                case "/tracerCategory/listTracerCategory":
                case "/tracerCategory/listTracerCategory/:message":
                    if (bfunction.includes("ROLE_BF_LIST_TRACER_CATEGORY")) {
                        return true;
                    }
                    break;
                case "/productCategory/productCategoryTree":
                    if (bfunction.includes("ROLE_BF_LIST_PRODUCT_CATEGORY")) {
                        return true;
                    }
                    break;
                case "/forecastingUnit/addForecastingUnit":
                    if (bfunction.includes("ROLE_BF_ADD_FORECASTING_UNIT")) {
                        return true;
                    }
                    break;
                case "/forecastingUnit/editForecastingUnit/:forecastingUnitId":
                    if (bfunction.includes("ROLE_BF_EDIT_FORECASTING_UNIT")) {
                        return true;
                    }
                    break;
                case "/forecastingUnit/listForecastingUnit":
                case "/forecastingUnit/listForecastingUnit/:message":
                    console.log("result---" + bfunction.includes("ROLE_BF_LIST_FORECASTING_UNIT"));
                    if (bfunction.includes("ROLE_BF_LIST_FORECASTING_UNIT")) {
                        return true;
                    }
                    break;
                case "/planningUnit/addPlanningUnit":
                    if (bfunction.includes("ROLE_BF_ADD_PLANNING_UNIT")) {
                        return true;
                    }
                    break;
                case "/planningUnit/editPlanningUnit/:planningUnitId":
                    if (bfunction.includes("ROLE_BF_EDIT_PLANNING_UNIT")) {
                        return true;
                    }
                    break;
                case "/planningUnit/listPlanningUnit":
                case "/planningUnit/listPlanningUnit/:message":
                    if (bfunction.includes("ROLE_BF_LIST_PLANNING_UNIT")) {
                        return true;
                    }
                    break;
                case "/planningUnitCapacity/listPlanningUnitCapacity":
                    if (bfunction.includes("ROLE_BF_LIST_PLANNING_UNIT_CAPACITY")) {
                        return true;
                    }
                    break;
                case "/procurementUnit/addProcurementUnit":
                    if (bfunction.includes("ROLE_BF_ADD_PROCUREMENT_UNIT")) {
                        return true;
                    }
                    break;
                case "/procurementUnit/editProcurementUnit/:procurementUnitId":
                    if (bfunction.includes("ROLE_BF_EDIT_PROCUREMENT_UNIT")) {
                        return true;
                    }
                    break;
                case "/procurementUnit/listProcurementUnit":
                case "/procurementUnit/listProcurementUnit/:message":
                    if (bfunction.includes("ROLE_BF_LIST_PROCUREMENT_UNIT")) {
                        return true;
                    }
                    break;
                case "/program/programOnboarding":
                    if (bfunction.includes("ROLE_BF_LIST_SETUP_PROGRAM")) {
                        return true;
                    }
                    break;
                case "/program/syncPage":
                    if (bfunction.includes("ROLE_BF_LIST_COMMIT_VERSION")) {
                        return true;
                    }
                    break;
                case "/realmCountry/realmCountry/:realmId":
                    if (bfunction.includes("ROLE_BF_MAP_REALM_COUNTRY")) {
                        return true;
                    }
                    break;
                case "/consumptionDetails":
                    if (bfunction.includes("ROLE_BF_LIST_CONSUMPTION_DETAILS")) {
                        return true;
                    }
                    break;
                case "/inventory/addInventory":
                    if (bfunction.includes("ROLE_BF_LIST_INVENTORY")) {
                        return true;
                    }
                    break;
                case "/shipment/ShipmentList":
                case "/shipment/shipmentList/:message":
                case "/shipment/editShipment/:programId/:shipmentId/:planningUnitId/:filterBy/:startDate/:endDate/:rowIndex":
                    if (bfunction.includes("ROLE_BF_LIST_SHIPMENT")) {
                        return true;
                    }
                    break;
                case "/realmCountry/realmCountryPlanningUnit/:realmCountryId":
                    if (bfunction.includes("ROLE_BF_MAP_REALM_PLANNING_UNIT")) {
                        return true;
                    }
                    break;
                case "/procurementAgent/addProcurementAgentProcurementUnit/:procurementAgentId":
                    if (bfunction.includes("ROLE_BF_MAP_PROCUREMENT_AGENT_PROCUREMENT_UNIT")) {
                        return true;
                    }
                    break;
                case "/procurementAgent/addProcurementAgentPlanningUnit/:procurementAgentId":
                    if (bfunction.includes("ROLE_BF_MAP_PROCUREMENT_AGENT_PLANNING_UNIT")) {
                        return true;
                    }
                    break;
                case "/programProduct/addProgramProduct/:programId":
                    if (bfunction.includes("ROLE_BF_MAP_PROGRAM_PLANNING_UNIT")) {
                        return true;
                    }
                    break;
                case "/realmCountry/realmCountryRegion/:realmCountryId":
                    if (bfunction.includes("ROLE_BF_MAP_REGION")) {
                        return true;
                    }
                    break;
                case "/supplyPlan":
                case "/supplyPlanFormulas":
                    if (bfunction.includes("ROLE_BF_LIST_SUPPLY_PLAN")) {
                        return true;
                    }
                    break;
                case "/report/productCatalog":
                    if (bfunction.includes("ROLE_BF_REPORT_PRODUCT_CATALOG")) {
                        return true;
                    }
                    break;
                case "/report/consumption":
                    if (bfunction.includes("ROLE_BF_REPORT_CONSUMPTION")) {
                        return true;
                    }
                    break;
                case "/report/globalConsumption":
                    if (bfunction.includes("ROLE_BF_REPORT_CONSUMPTION_GLOBAL_VIEW")) {
                        return true;
                    }
                    break;
                case "/report/forecastOverTheTime":
                    if (bfunction.includes("ROLE_BF_REPORT_FORECAST_ERROR_OVER_TIME")) {
                        return true;
                    }
                    break;
                case "/report/forecastMetrics":
                    if (bfunction.includes("ROLE_BF_REPORT_FORECAST_METRICS")) {
                        return true;
                    }
                    break;
                case "/report/stockStatusOverTime":
                    if (bfunction.includes("ROLE_BF_REPORT_STOCK_STATUS_OVER_TIME")) {
                        return true;
                    }
                    break;
                case "/report/stockStatusMatrix":
                    if (bfunction.includes("ROLE_BF_REPORT_STOCK_STATUS_MATRIX")) {
                        return true;
                    }
                    break;
                case "/report/stockStatus":
                    if (bfunction.includes("ROLE_BF_REPORT_STOCK_STATUS")) {
                        return true;
                    }
                    break;
                case "/report/qatProblemPlusActionReport":
                    if (bfunction.includes("ROLE_BF_REPORT_PROBLEM_ACTION")) {
                        return true;
                    }
                    break;
                case "/report/funderExport":
                    if (bfunction.includes("ROLE_BF_REPORT_FUNDER")) {
                        return true;
                    }
                    break;
                case "/report/procurementAgentExport":
                    if (bfunction.includes("ROLE_BF_REPORT_PROCUREMENT_AGENT")) {
                        return true;
                    }
                    break;
                case "/report/annualShipmentCost":
                    if (bfunction.includes("ROLE_BF_REPORT_ANNUAL_SHIPMENT_COST")) {
                        return true;
                    }
                    break;
                case "/ApplicationDashboard/:color/:message":
                case "/ApplicationDashboard":
                    if (bfunction.includes("ROLE_BF_VIEW_APPL_DASHBOARD")) {
                        return true;
                    }
                    break;
                case "/report/stockStatusMatrix":
                    if (bfunction.includes("ROLE_BF_VIEW_STOCK_STATUS_MATRIX")) {
                        return true;
                    }
                    break;
                case "/program/downloadProgram":
                    if (bfunction.includes("ROLE_BF_DOWNLOAD_PROGRAM")) {
                        return true;
                    }
                    break;
                case "/program/importProgram":
                    if (bfunction.includes("ROLE_BF_IMPORT_PROGRAM")) {
                        return true;
                    }
                    break;
                case "/program/exportProgram":
                    if (bfunction.includes("ROLE_BF_EXPORT_PROGRAM")) {
                        return true;
                    }
                    break;
                case "/report/costOfInventory":
                    if (bfunction.includes("ROLE_BF_REPORT_COST_OF_INVERTORY")) {
                        return true;
                    }
                    break;
                case "/report/inventoryTurns":
                    if (bfunction.includes("ROLE_BF_REPORT_INVENTORY_TURN")) {
                        return true;
                    }
                    break;
                case "/report/supplyPlanVersionAndReview":
                    if (bfunction.includes("ROLE_BF_REPORT_SUPPLY_PLAN_VERSION_REVIEW")) {
                        return true;
                    }
                    break;
                case "/dashboard/:message":
                    if (bfunction.includes("ROLE_BF_VIEW_APPL_DASHBOARD")) {
                        return true;
                    }
                    break;
                case "/ProgramDashboard":
                    if (bfunction.includes("ROLE_BF_VIEW_PROGRAM_DASHBOARD")) {
                        return true;
                    }
                    break;
                case "/translations/labelTranslations":
                    if (bfunction.includes("ROLE_BF_LIST_LABEL_TRANSLATION")) {
                        return true;
                    }
                    break;
                case "/translations/databaseTranslations":
                    if (bfunction.includes("ROLE_BF_LIST_DATABASE_TRANSLATION")) {
                        return true;
                    }
                    break;
                case "/changePassword":
                    if (bfunction.includes("ROLE_BF_CHANGE_PASSWORD")) {
                        return true;
                    }
                    break;
                case "/logout/:message":
                case "/logout":
                    return true;
                    break;
                default:
                    console.log("Inside default-");
                    return false;
            }
        }
        return false;

    }

}


export default new AuthenticationService()
