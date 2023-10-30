import CryptoJS from 'crypto-js';
import i18next from 'i18next';
import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-select/dist/react-select.min.css';
import {
    Card, CardBody, CardHeader,
    Col, Progress
} from 'reactstrap';
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import { decompressJson } from '../../CommonComponent/JavascriptCommonFunctions';
import { INDEXED_DB_NAME, INDEXED_DB_VERSION, SECRET_KEY } from '../../Constants.js';
import DatasetService from '../../api/DatasetService';
import ProgramService from '../../api/ProgramService';
import i18n from '../../i18n';
import AuthenticationService from '../Common/AuthenticationService.js';
export default class SyncProgram extends Component {
    constructor(props) {
        super(props);
        var pIds = this.props.location.state != undefined ? this.props.location.state.programIds : [];
        this.state = {
            totalMasters: 0,
            syncedMasters: 0,
            totalProgramList: 0,
            totalDatasetList: 0,
            syncedDataset: 0,
            syncedProgram: 0,
            syncedPercentage: 0,
            message: "",
            loading: true,
            programIdsToLoad: [],
            datasetIdsToLoad: [],
            programIds: pIds
        }
        this.syncPrograms = this.syncPrograms.bind(this)
    }
    hideFirstComponent() {
        this.timeout = setTimeout(function () {
            document.getElementById('div1').style.display = 'none';
        }, 30000);
    }
    componentDidMount() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onerror = function (event) {
            this.setState({
                message: i18n.t('static.program.errortext'),
                color: 'red'
            })
            this.hideFirstComponent()
        }.bind(this);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['programQPLDetails'], 'readwrite');
            var program = transaction.objectStore('programQPLDetails');
            var getRequest = program.getAll();
            var proList = []
            getRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: 'red'
                })
                this.hideFirstComponent()
            }.bind(this);
            getRequest.onsuccess = function (event) {
                var datasetTransaction = db1.transaction(['datasetDetails'], 'readwrite');
                var dataset = datasetTransaction.objectStore('datasetDetails');
                var datasetGetRequest = dataset.getAll();
                datasetGetRequest.onsuccess = function (event) {
                    var myResult = [];
                    var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                    var userId = userBytes.toString(CryptoJS.enc.Utf8);
                    myResult = getRequest.result.filter(c => c.userId == userId);
                    var datasetMyResult = [];
                    datasetMyResult = datasetGetRequest.result.filter(c => c.userId == userId);
                    var programList = myResult;
                    var datasetList = datasetMyResult;
                    this.setState({
                        totalMasters: myResult.length + datasetList.length + 2,
                        loading: false,
                        programList: programList,
                        datasetList: datasetList,
                        totalProgramList: programList.length,
                        totalDatasetList: datasetList.length
                    }, () => {
                        if (programList.length + datasetList.length > 0) {
                            if (programList.length > 0) {
                                this.syncPrograms(programList);
                            } else {
                                var syncedMasters = this.state.syncedMasters;
                                this.setState({
                                    syncedMasters: syncedMasters + 1,
                                    syncedPercentage: Math.floor(((syncedMasters + 1) / this.state.totalMasters) * 100)
                                });
                            }
                            if (datasetList.length > 0) {
                                this.syncDataset(datasetList);
                            } else {
                                var syncedMasters = this.state.syncedMasters;
                                this.setState({
                                    syncedMasters: syncedMasters + 1,
                                    syncedPercentage: Math.floor(((syncedMasters + 1) / this.state.totalMasters) * 100)
                                });
                            }
                        } else {
                            this.props.history.push({
                                pathname: `/masterDataSync/green/` + i18n.t('static.masterDataSync.success'), state: {
                                    "programIds": this.state.programIds,
                                    "treeId": this.props.location.state != undefined && this.props.location.state.treeId != undefined ? this.props.location.state.treeId : "",
                                    "isFullSync": this.props.location.state != undefined && this.props.location.state.isFullSync != undefined ? this.props.location.state.isFullSync : false
                                }
                            })
                        }
                    })
                }.bind(this)
            }.bind(this)
        }.bind(this)
    }
    syncDataset(programList) {
        var programIdsToLoad = this.state.datasetIdsToLoad;
        var pIds = [];
        var uniqueProgramList = []
        for (var i = 0; i < programList.length; i++) {
            var index = uniqueProgramList.findIndex(c => c == programList[i].programId);
            if (index == -1) {
                uniqueProgramList.push(programList[i].programId);
            }
            pIds.push(programList[i].programId);
        }
        AuthenticationService.setupAxiosInterceptors();
        ProgramService.getLatestVersionsForPrograms(pIds).then(response1 => {
            if (response1.status == 200) {
                var list = response1.data;
                var readonlyProgramToBeDeleted = [];
                for (var i = 0; i < programList.length; i++) {
                    var latestVersion = list.filter(c => c.programId == programList[i].programId)[0].versionId;
                    var checkIfLatestVersionExists = []
                    checkIfLatestVersionExists = programList.filter(c => c.programId == programList[i].programId && c.version == latestVersion);
                    if (checkIfLatestVersionExists.length == 0) {
                        if (programList[i].readonly) {
                            var index = readonlyProgramToBeDeleted.findIndex(c => c.id == programList[i].id);
                            if (index == -1) {
                                readonlyProgramToBeDeleted.push(programList[i]);
                            }
                            programIdsToLoad.push(programList[i].programId);
                            var syncedMasters = this.state.syncedMasters;
                            var syncedDataset = this.state.syncedDataset;
                            this.setState({
                                syncedMasters: syncedMasters + 1,
                                syncedDataset: syncedDataset + 1,
                                syncedPercentage: Math.floor(((syncedMasters + 1) / this.state.totalMasters) * 100)
                            })
                        } else {
                            if (programList[i].changed) {
                                var programCode = programList[i].programCode + "~v" + programList[i].version;
                                var programCodeLocal = programList[i].programCode + "~v" + programList[i].version + " (local)";
                                var programCodeServer = programList[i].programCode + "~v" + latestVersion;
                                var cf = window.confirm(i18n.t('static.dashboard.forecasting') + " - " + i18n.t('static.sync.importantPleaseRead') + "\n\r" + i18n.t('static.sync.clickOkTo') + "\n" + i18n.t('static.sync.deleteLocalVersion', { programCodeLocal }) + "\n" + i18n.t('static.sync.loseUnsubmittedChanges') + "\n" + i18n.t('static.sync.loadLatestVersion', { programCodeServer }) + "\n\r" + i18n.t('static.sync.clickCancelTo') + "\n" + i18n.t('static.sync.keepLocalVersion', { programCodeLocal }));
                                if (cf == true) {
                                    var index = readonlyProgramToBeDeleted.findIndex(c => c.id == programList[i].id);
                                    if (index == -1) {
                                        readonlyProgramToBeDeleted.push(programList[i]);
                                    }
                                    programIdsToLoad.push(programList[i].programId);
                                    var syncedMasters = this.state.syncedMasters;
                                    var syncedDataset = this.state.syncedDataset;
                                    this.setState({
                                        syncedMasters: syncedMasters + 1,
                                        syncedDataset: syncedDataset + 1,
                                        syncedPercentage: Math.floor(((syncedMasters + 1) / this.state.totalMasters) * 100)
                                    })
                                } else {
                                    var syncedMasters = this.state.syncedMasters;
                                    var syncedDataset = this.state.syncedDataset;
                                    this.setState({
                                        syncedMasters: syncedMasters + 1,
                                        syncedDataset: syncedDataset + 1,
                                        syncedPercentage: Math.floor(((syncedMasters + 1) / this.state.totalMasters) * 100)
                                    })
                                }
                            } else {
                                var programCode = programList[i].programCode + "~v" + programList[i].version;
                                var programCodeLocal = programList[i].programCode + "~v" + programList[i].version + " (local)";
                                var programCodeServer = programList[i].programCode + "~v" + latestVersion;
                                var cf = window.confirm(i18n.t('static.dashboard.forecasting') + " - " + i18n.t('static.sync.importantPleaseRead') + "\n\r" + i18n.t('static.sync.clickOkTo') + "\n" + i18n.t('static.sync.deleteLocalVersion', { programCodeLocal }) + ", " + i18n.t("static.common.and") + "\n" + i18n.t('static.sync.loadLatestVersion', { programCodeServer }) + "\n\r" + i18n.t('static.sync.clickCancelTo') + "\n" + i18n.t('static.sync.keepLocalVersion', { programCodeLocal }));
                                if (cf == true) {
                                    var index = readonlyProgramToBeDeleted.findIndex(c => c.id == programList[i].id);
                                    if (index == -1) {
                                        readonlyProgramToBeDeleted.push(programList[i]);
                                    }
                                    programIdsToLoad.push(programList[i].programId);
                                    var syncedMasters = this.state.syncedMasters;
                                    var syncedDataset = this.state.syncedDataset;
                                    this.setState({
                                        syncedMasters: syncedMasters + 1,
                                        syncedDataset: syncedDataset + 1,
                                        syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100)
                                    })
                                } else {
                                    var syncedMasters = this.state.syncedMasters;
                                    var syncedDataset = this.state.syncedDataset;
                                    this.setState({
                                        syncedMasters: syncedMasters + 1,
                                        syncedDataset: syncedDataset + 1,
                                        syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100)
                                    })
                                }
                            }
                        }
                    } else {
                        var readonlyProgramList = programList.filter(c => c.programId == programList[i].programId && c.readonly && c.version != latestVersion);
                        for (var j = 0; j < readonlyProgramList.length; j++) {
                            var index = readonlyProgramToBeDeleted.findIndex(c => c.id == readonlyProgramList[j].id);
                            if (index == -1) {
                                readonlyProgramToBeDeleted.push(readonlyProgramList[j]);
                            }
                        }
                        var syncedMasters = this.state.syncedMasters;
                        var syncedDataset = this.state.syncedDataset;
                        this.setState({
                            syncedMasters: syncedMasters + 1,
                            syncedDataset: syncedDataset + 1,
                            syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100)
                        })
                    }
                }
                if (this.state.syncedDataset == this.state.totalDatasetList) {
                    this.loadLatestVersionDataset(programIdsToLoad, readonlyProgramToBeDeleted)
                }
            } else {
            }
        }).catch(error => {
        })
    }
    syncPrograms(programList) {
        var programIdsToLoad = this.state.programIdsToLoad;
        var pIds = [];
        var uniqueProgramList = []
        for (var i = 0; i < programList.length; i++) {
            var index = uniqueProgramList.findIndex(c => c == programList[i].programId);
            if (index == -1) {
                uniqueProgramList.push(programList[i].programId);
            }
            pIds.push(programList[i].programId);
        }
        AuthenticationService.setupAxiosInterceptors();
        ProgramService.getLatestVersionsForPrograms(pIds).then(response1 => {
            if (response1.status == 200) {
                var list = response1.data;
                var readonlyProgramToBeDeleted = [];
                for (var i = 0; i < programList.length; i++) {
                    var latestVersion = list.filter(c => c.programId == programList[i].programId)[0].versionId;
                    var checkIfLatestVersionExists = []
                    checkIfLatestVersionExists = programList.filter(c => c.programId == programList[i].programId && c.version == latestVersion);
                    if (checkIfLatestVersionExists.length == 0) {
                        if (programList[i].readonly) {
                            var index = readonlyProgramToBeDeleted.findIndex(c => c.id == programList[i].id);
                            if (index == -1) {
                                readonlyProgramToBeDeleted.push(programList[i]);
                            }
                            programIdsToLoad.push(programList[i].programId);
                            var syncedMasters = this.state.syncedMasters;
                            var syncedProgram = this.state.syncedProgram;
                            this.setState({
                                syncedMasters: syncedMasters + 1,
                                syncedProgram: syncedProgram + 1,
                                syncedPercentage: Math.floor(((syncedMasters + 1) / this.state.totalMasters) * 100)
                            })
                        } else {
                            if (programList[i].programModified) {
                                var programCode = programList[i].programCode + "~v" + programList[i].version;
                                var programCodeLocal = programList[i].programCode + "~v" + programList[i].version + " (local)";
                                var programCodeServer = programList[i].programCode + "~v" + latestVersion;
                                var cf = window.confirm(i18n.t('static.dashboard.supplyPlan') + " - " + i18n.t('static.sync.importantPleaseRead') + "\n\r" + i18n.t('static.sync.clickOkTo') + "\n" + i18n.t('static.sync.deleteLocalVersion', { programCodeLocal }) + "\n" + i18n.t('static.sync.loseUnsubmittedChanges') + "\n" + i18n.t('static.sync.loadLatestVersion', { programCodeServer }) + "\n\r" + i18n.t('static.sync.clickCancelTo') + "\n" + i18n.t('static.sync.keepLocalVersion', { programCodeLocal }));
                                if (cf == true) {
                                    var index = readonlyProgramToBeDeleted.findIndex(c => c.id == programList[i].id);
                                    if (index == -1) {
                                        readonlyProgramToBeDeleted.push(programList[i]);
                                    }
                                    programIdsToLoad.push(programList[i].programId);
                                    var syncedMasters = this.state.syncedMasters;
                                    var syncedProgram = this.state.syncedProgram;
                                    this.setState({
                                        syncedMasters: syncedMasters + 1,
                                        syncedProgram: syncedProgram + 1,
                                        syncedPercentage: Math.floor(((syncedMasters + 1) / this.state.totalMasters) * 100)
                                    })
                                } else {
                                    var syncedMasters = this.state.syncedMasters;
                                    var syncedProgram = this.state.syncedProgram;
                                    this.setState({
                                        syncedMasters: syncedMasters + 1,
                                        syncedProgram: syncedProgram + 1,
                                        syncedPercentage: Math.floor(((syncedMasters + 1) / this.state.totalMasters) * 100)
                                    })
                                }
                            } else {
                                var programCode = programList[i].programCode + "~v" + programList[i].version;
                                var programCodeLocal = programList[i].programCode + "~v" + programList[i].version + " (local)";
                                var programCodeServer = programList[i].programCode + "~v" + latestVersion;
                                var cf = window.confirm(i18n.t('static.dashboard.supplyPlan') + " - " + i18n.t('static.sync.importantPleaseRead') + "\n\r" + i18n.t('static.sync.clickOkTo') + "\n" + i18n.t('static.sync.deleteLocalVersion', { programCodeLocal }) + ", " + i18n.t("static.common.and") + "\n" + i18n.t('static.sync.loadLatestVersion', { programCodeServer }) + "\n\r" + i18n.t('static.sync.clickCancelTo') + "\n" + i18n.t('static.sync.keepLocalVersion', { programCodeLocal }));
                                if (cf == true) {
                                    var index = readonlyProgramToBeDeleted.findIndex(c => c.id == programList[i].id);
                                    if (index == -1) {
                                        readonlyProgramToBeDeleted.push(programList[i]);
                                    }
                                    programIdsToLoad.push(programList[i].programId);
                                    var syncedMasters = this.state.syncedMasters;
                                    var syncedProgram = this.state.syncedProgram;
                                    this.setState({
                                        syncedMasters: syncedMasters + 1,
                                        syncedProgram: syncedProgram + 1,
                                        syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100)
                                    })
                                } else {
                                    var syncedMasters = this.state.syncedMasters;
                                    var syncedProgram = this.state.syncedProgram;
                                    this.setState({
                                        syncedMasters: syncedMasters + 1,
                                        syncedProgram: syncedProgram + 1,
                                        syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100)
                                    })
                                }
                            }
                        }
                    } else {
                        var readonlyProgramList = programList.filter(c => c.programId == programList[i].programId && c.readonly && c.version != latestVersion);
                        for (var j = 0; j < readonlyProgramList.length; j++) {
                            var index = readonlyProgramToBeDeleted.findIndex(c => c.id == readonlyProgramList[j].id);
                            if (index == -1) {
                                readonlyProgramToBeDeleted.push(readonlyProgramList[j]);
                            }
                        }
                        var syncedMasters = this.state.syncedMasters;
                        var syncedProgram = this.state.syncedProgram;
                        this.setState({
                            syncedMasters: syncedMasters + 1,
                            syncedProgram: syncedProgram + 1,
                            syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100)
                        })
                    }
                }
                if (this.state.syncedProgram == this.state.totalProgramList) {
                    this.loadLatestVersion(programIdsToLoad, readonlyProgramToBeDeleted)
                }
            } else {
            }
        }).catch(error => {
        })
    }
    loadLatestVersionDataset(programIds, readonlyProgramToBeDeleted) {
        if (programIds.length > 0) {
            var checkboxesChecked = [];
            for (var i = 0; i < programIds.length; i++) {
                var program = this.state.datasetList.filter(c => c.programId == programIds[i])[0];
                checkboxesChecked.push({ programId: program.programId, versionId: -1 })
            }
            DatasetService.getAllDatasetData(checkboxesChecked)
                .then(response => {
                    response.data = decompressJson(response.data);
                    var json = response.data;
                    var updatedJson = json;
                    var db1;
                    getDatabase();
                    var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
                    openRequest.onerror = function (event) {
                        this.setState({
                            message: i18n.t('static.program.errortext'),
                            color: 'red'
                        })
                        this.hideFirstComponent()
                    }.bind(this);
                    openRequest.onsuccess = function (e) {
                        db1 = e.target.result;
                        var transaction = db1.transaction(['datasetDetails'], 'readwrite');
                        var program = transaction.objectStore('datasetDetails');
                        var getRequest = program.getAll();
                        getRequest.onerror = function (event) {
                            this.setState({
                                message: i18n.t('static.program.errortext'),
                                color: 'red'
                            })
                            this.hideFirstComponent()
                        }.bind(this);
                        getRequest.onsuccess = function (event) {
                            var myResult = [];
                            myResult = getRequest.result;
                            var userId = AuthenticationService.getLoggedInUserId();
                            var programDataTransaction1 = db1.transaction(['datasetData'], 'readwrite');
                            var programDataOs1 = programDataTransaction1.objectStore('datasetData');
                            for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                                var programRequest1 = programDataOs1.delete(readonlyProgramToBeDeleted[dpd].id);
                            }
                            programDataTransaction1.oncomplete = function (event) {
                                var programDataTransaction3 = db1.transaction(['datasetDetails'], 'readwrite');
                                var programDataOs3 = programDataTransaction3.objectStore('datasetDetails');
                                for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                                    var programRequest3 = programDataOs3.delete(readonlyProgramToBeDeleted[dpd].id);
                                }
                                programDataTransaction3.oncomplete = function (event) {
                                    var transactionForSavingData = db1.transaction(['datasetData'], 'readwrite');
                                    var programSaveData = transactionForSavingData.objectStore('datasetData');
                                    for (var r = 0; r < json.length; r++) {
                                        var encryptedText = CryptoJS.AES.encrypt(JSON.stringify(json[r]), SECRET_KEY);
                                        var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                                        var userId = userBytes.toString(CryptoJS.enc.Utf8);
                                        var version = json[r].currentVersion.versionId
                                        var item = {
                                            id: json[r].programId + "_v" + version + "_uId_" + userId,
                                            programId: json[r].programId,
                                            version: version,
                                            programName: (CryptoJS.AES.encrypt(JSON.stringify((json[r].label)), SECRET_KEY)).toString(),
                                            programData: encryptedText.toString(),
                                            userId: userId,
                                            programCode: json[r].programCode,
                                        };
                                        var putRequest = programSaveData.put(item);
                                    }
                                    transactionForSavingData.oncomplete = function (event) {
                                        var programQPLDetailsTransaction = db1.transaction(['datasetDetails'], 'readwrite');
                                        var programQPLDetailsOs = programQPLDetailsTransaction.objectStore('datasetDetails');
                                        var programIds = []
                                        for (var r = 0; r < json.length; r++) {
                                            var programQPLDetailsJson = {
                                                id: json[r].programId + "_v" + json[r].currentVersion.versionId + "_uId_" + userId,
                                                programId: json[r].programId,
                                                version: json[r].currentVersion.versionId,
                                                userId: userId,
                                                programCode: json[r].programCode,
                                                changed: 0,
                                                readonly: 0
                                            };
                                            programIds.push(json[r].programId + "_v" + json[r].currentVersion.versionId + "_uId_" + userId);
                                            var programQPLDetailsRequest = programQPLDetailsOs.put(programQPLDetailsJson);
                                        }
                                        programQPLDetailsTransaction.oncomplete = function (event) {
                                            var syncedMasters = this.state.syncedMasters;
                                            this.setState({
                                                syncedMasters: syncedMasters + 1,
                                                syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100)
                                            }, () => {
                                                if (this.state.syncedMasters == this.state.totalMasters) {
                                                    this.props.history.push({ pathname: `/masterDataSync/green/` + i18n.t('static.masterDataSync.success'), state: { "programIds": this.state.programIds, "treeId": this.props.location.state != undefined && this.props.location.state.treeId != undefined ? this.props.location.state.treeId : "", "isFullSync": this.props.location.state != undefined && this.props.location.state.isFullSync != undefined ? this.props.location.state.isFullSync : false } })
                                                }
                                            })
                                        }.bind(this)
                                    }.bind(this)
                                }.bind(this)
                            }.bind(this)
                        }.bind(this)
                    }.bind(this)
                })
        } else {
            var db1;
            getDatabase();
            var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
            openRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: 'red'
                })
                this.hideFirstComponent()
            }.bind(this);
            openRequest.onsuccess = function (e) {
                db1 = e.target.result;
                var transaction = db1.transaction(['datasetDetails'], 'readwrite');
                var program = transaction.objectStore('datasetDetails');
                var getRequest = program.getAll();
                getRequest.onerror = function (event) {
                    this.setState({
                        message: i18n.t('static.program.errortext'),
                        color: 'red'
                    })
                    this.hideFirstComponent()
                }.bind(this);
                getRequest.onsuccess = function (event) {
                    var myResult = [];
                    myResult = getRequest.result;
                    var userId = AuthenticationService.getLoggedInUserId();
                    var programDataTransaction1 = db1.transaction(['datasetData'], 'readwrite');
                    var programDataOs1 = programDataTransaction1.objectStore('datasetData');
                    for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                        var checkIfProgramExists = myResult.filter(c => c.programId == readonlyProgramToBeDeleted[dpd].programId && c.version == readonlyProgramToBeDeleted[dpd].version && c.readonly == 1 && c.userId == userId);
                        var programIdToDelete = 0;
                        if (checkIfProgramExists.length > 0) {
                            programIdToDelete = checkIfProgramExists[0].id;
                        }
                        var programRequest1 = programDataOs1.delete(checkIfProgramExists[0].id);
                    }
                    programDataTransaction1.oncomplete = function (event) {
                        var programDataTransaction3 = db1.transaction(['datasetDetails'], 'readwrite');
                        var programDataOs3 = programDataTransaction3.objectStore('datasetDetails');
                        for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                            var checkIfProgramExists = myResult.filter(c => c.programId == readonlyProgramToBeDeleted[dpd].programId && c.version == readonlyProgramToBeDeleted[dpd].version && c.readonly == 1 && c.userId == userId);
                            var programIdToDelete = 0;
                            if (checkIfProgramExists.length > 0) {
                                programIdToDelete = checkIfProgramExists[0].id;
                            }
                            var programRequest3 = programDataOs3.delete(checkIfProgramExists[0].id);
                        }
                        programDataTransaction3.oncomplete = function (event) {
                            var syncedMasters = this.state.syncedMasters;
                            this.setState({
                                syncedMasters: syncedMasters + 1,
                                syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100)
                            }, () => {
                                if (this.state.syncedMasters == this.state.totalMasters) {
                                    this.props.history.push({ pathname: `/masterDataSync/green/` + i18n.t('static.masterDataSync.success'), state: { "programIds": this.state.programIds, "treeId": this.props.location.state != undefined && this.props.location.state.treeId != undefined ? this.props.location.state.treeId : "", "isFullSync": this.props.location.state != undefined && this.props.location.state.isFullSync != undefined ? this.props.location.state.isFullSync : false } })
                                }
                            })
                        }.bind(this)
                    }.bind(this)
                }.bind(this)
            }.bind(this)
        }
    }
    loadLatestVersion(programIds, readonlyProgramToBeDeleted) {
        if (programIds.length > 0) {
            var checkboxesChecked = [];
            for (var i = 0; i < programIds.length; i++) {
                var program = this.state.programList.filter(c => c.programId == programIds[i])[0];
                checkboxesChecked.push({ programId: program.programId, versionId: -1 })
            }
            ProgramService.getAllProgramData(checkboxesChecked)
                .then(response => {
                    response.data = decompressJson(response.data);
                    var json = response.data;
                    var updatedJson = [];
                    for (var r = 0; r < json.length; r++) {
                        var planningUnitList = json[r].planningUnitList;
                        var consumptionList = json[r].consumptionList;
                        var inventoryList = json[r].inventoryList;
                        var shipmentList = json[r].shipmentList;
                        var batchInfoList = json[r].batchInfoList;
                        var problemReportList = json[r].problemReportList;
                        var supplyPlan = json[r].supplyPlan;
                        var generalData = json[r];
                        delete generalData.consumptionList;
                        delete generalData.inventoryList;
                        delete generalData.shipmentList;
                        delete generalData.batchInfoList;
                        delete generalData.supplyPlan;
                        delete generalData.planningUnitList;
                        generalData.actionList = [];
                        var generalEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(generalData), SECRET_KEY).toString();
                        var planningUnitDataList = [];
                        for (var pu = 0; pu < planningUnitList.length; pu++) {
                            var planningUnitDataJson = {
                                consumptionList: consumptionList.filter(c => c.planningUnit.id == planningUnitList[pu].id),
                                inventoryList: inventoryList.filter(c => c.planningUnit.id == planningUnitList[pu].id),
                                shipmentList: shipmentList.filter(c => c.planningUnit.id == planningUnitList[pu].id),
                                batchInfoList: batchInfoList.filter(c => c.planningUnitId == planningUnitList[pu].id),
                                supplyPlan: supplyPlan.filter(c => c.planningUnitId == planningUnitList[pu].id)
                            }
                            var encryptedPlanningUnitDataText = CryptoJS.AES.encrypt(JSON.stringify(planningUnitDataJson), SECRET_KEY).toString();
                            planningUnitDataList.push({ planningUnitId: planningUnitList[pu].id, planningUnitData: encryptedPlanningUnitDataText })
                        }
                        var programDataJson = {
                            generalData: generalEncryptedData,
                            planningUnitDataList: planningUnitDataList
                        };
                        updatedJson.push(programDataJson);
                    }
                    var db1;
                    getDatabase();
                    var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
                    openRequest.onerror = function (event) {
                        this.setState({
                            message: i18n.t('static.program.errortext'),
                            color: 'red'
                        })
                        this.hideFirstComponent()
                    }.bind(this);
                    openRequest.onsuccess = function (e) {
                        db1 = e.target.result;
                        var transaction = db1.transaction(['programQPLDetails'], 'readwrite');
                        var program = transaction.objectStore('programQPLDetails');
                        var getRequest = program.getAll();
                        getRequest.onerror = function (event) {
                            this.setState({
                                message: i18n.t('static.program.errortext'),
                                color: 'red'
                            })
                            this.hideFirstComponent()
                        }.bind(this);
                        getRequest.onsuccess = function (event) {
                            var myResult = [];
                            myResult = getRequest.result;
                            var userId = AuthenticationService.getLoggedInUserId();
                            var programDataTransaction1 = db1.transaction(['programData'], 'readwrite');
                            var programDataOs1 = programDataTransaction1.objectStore('programData');
                            for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                                var programRequest1 = programDataOs1.delete(readonlyProgramToBeDeleted[dpd].id);
                            }
                            programDataTransaction1.oncomplete = function (event) {
                                var programDataTransaction3 = db1.transaction(['programQPLDetails'], 'readwrite');
                                var programDataOs3 = programDataTransaction3.objectStore('programQPLDetails');
                                for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                                    var programRequest3 = programDataOs3.delete(readonlyProgramToBeDeleted[dpd].id);
                                }
                                programDataTransaction3.oncomplete = function (event) {
                                    var programDataTransaction2 = db1.transaction(['downloadedProgramData'], 'readwrite');
                                    var programDataOs2 = programDataTransaction2.objectStore('downloadedProgramData');
                                    for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                                        var programRequest2 = programDataOs2.delete(readonlyProgramToBeDeleted[dpd].id);
                                    }
                                    programDataTransaction2.oncomplete = function (event) {
                                        var transactionForSavingData = db1.transaction(['programData'], 'readwrite');
                                        var programSaveData = transactionForSavingData.objectStore('programData');
                                        for (var r = 0; r < json.length; r++) {
                                            json[r].actionList = [];
                                            var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                                            var userId = userBytes.toString(CryptoJS.enc.Utf8);
                                            var version = json[r].requestedProgramVersion;
                                            if (version == -1) {
                                                version = json[r].currentVersion.versionId
                                            }
                                            var item = {
                                                id: json[r].programId + "_v" + version + "_uId_" + userId,
                                                programId: json[r].programId,
                                                version: version,
                                                programName: (CryptoJS.AES.encrypt(JSON.stringify((json[r].label)), SECRET_KEY)).toString(),
                                                programData: updatedJson[r],
                                                userId: userId,
                                                programCode: json[r].programCode,
                                            };
                                            var putRequest = programSaveData.put(item);
                                        }
                                        transactionForSavingData.oncomplete = function (event) {
                                            var transactionForSavingDownloadedProgramData = db1.transaction(['downloadedProgramData'], 'readwrite');
                                            var downloadedProgramSaveData = transactionForSavingDownloadedProgramData.objectStore('downloadedProgramData');
                                            for (var r = 0; r < json.length; r++) {
                                                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                                                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                                                var version = json[r].requestedProgramVersion;
                                                if (version == -1) {
                                                    version = json[r].currentVersion.versionId
                                                }
                                                var item = {
                                                    id: json[r].programId + "_v" + version + "_uId_" + userId,
                                                    programId: json[r].programId,
                                                    version: version,
                                                    programName: (CryptoJS.AES.encrypt(JSON.stringify((json[r].label)), SECRET_KEY)).toString(),
                                                    programData: updatedJson[r],
                                                    userId: userId
                                                };
                                                var putRequest = downloadedProgramSaveData.put(item);
                                            }
                                            transactionForSavingDownloadedProgramData.oncomplete = function (event) {
                                                var programQPLDetailsTransaction = db1.transaction(['programQPLDetails'], 'readwrite');
                                                var programQPLDetailsOs = programQPLDetailsTransaction.objectStore('programQPLDetails');
                                                var programIds = []
                                                for (var r = 0; r < json.length; r++) {
                                                    var programQPLDetailsJson = {
                                                        id: json[r].programId + "_v" + json[r].currentVersion.versionId + "_uId_" + userId,
                                                        programId: json[r].programId,
                                                        version: json[r].currentVersion.versionId,
                                                        userId: userId,
                                                        programCode: json[r].programCode,
                                                        openCount: 0,
                                                        addressedCount: 0,
                                                        programModified: 0,
                                                        readonly: 0
                                                    };
                                                    programIds.push(json[r].programId + "_v" + json[r].currentVersion.versionId + "_uId_" + userId);
                                                    var programQPLDetailsRequest = programQPLDetailsOs.put(programQPLDetailsJson);
                                                }
                                                programQPLDetailsTransaction.oncomplete = function (event) {
                                                    var syncedMasters = this.state.syncedMasters;
                                                    var pIds = this.state.programIds;
                                                    pIds = pIds.concat(programIds)
                                                    this.setState({
                                                        syncedMasters: syncedMasters + 1,
                                                        syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100),
                                                        programIds: pIds
                                                    }, () => {
                                                        if (this.state.syncedMasters == this.state.totalMasters) {
                                                            this.props.history.push({ pathname: `/masterDataSync/green/` + i18n.t('static.masterDataSync.success'), state: { "programIds": this.state.programIds, "treeId": this.props.location.state != undefined && this.props.location.state.treeId != undefined ? this.props.location.state.treeId : "", "isFullSync": this.props.location.state != undefined && this.props.location.state.isFullSync != undefined ? this.props.location.state.isFullSync : false } })
                                                        }
                                                    })
                                                }.bind(this)
                                            }.bind(this)
                                        }.bind(this)
                                    }.bind(this)
                                }.bind(this)
                            }.bind(this)
                        }.bind(this)
                    }.bind(this)
                })
        } else {
            var db1;
            getDatabase();
            var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
            openRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: 'red'
                })
                this.hideFirstComponent()
            }.bind(this);
            openRequest.onsuccess = function (e) {
                db1 = e.target.result;
                var transaction = db1.transaction(['programQPLDetails'], 'readwrite');
                var program = transaction.objectStore('programQPLDetails');
                var getRequest = program.getAll();
                getRequest.onerror = function (event) {
                    this.setState({
                        message: i18n.t('static.program.errortext'),
                        color: 'red'
                    })
                    this.hideFirstComponent()
                }.bind(this);
                getRequest.onsuccess = function (event) {
                    var myResult = [];
                    myResult = getRequest.result;
                    var userId = AuthenticationService.getLoggedInUserId();
                    var programDataTransaction1 = db1.transaction(['programData'], 'readwrite');
                    var programDataOs1 = programDataTransaction1.objectStore('programData');
                    for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                        var checkIfProgramExists = myResult.filter(c => c.programId == readonlyProgramToBeDeleted[dpd].programId && c.version == readonlyProgramToBeDeleted[dpd].version && c.readonly == 1 && c.userId == userId);
                        var programIdToDelete = 0;
                        if (checkIfProgramExists.length > 0) {
                            programIdToDelete = checkIfProgramExists[0].id;
                        }
                        var programRequest1 = programDataOs1.delete(checkIfProgramExists[0].id);
                    }
                    programDataTransaction1.oncomplete = function (event) {
                        var programDataTransaction3 = db1.transaction(['programQPLDetails'], 'readwrite');
                        var programDataOs3 = programDataTransaction3.objectStore('programQPLDetails');
                        for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                            var checkIfProgramExists = myResult.filter(c => c.programId == readonlyProgramToBeDeleted[dpd].programId && c.version == readonlyProgramToBeDeleted[dpd].version && c.readonly == 1 && c.userId == userId);
                            var programIdToDelete = 0;
                            if (checkIfProgramExists.length > 0) {
                                programIdToDelete = checkIfProgramExists[0].id;
                            }
                            var programRequest3 = programDataOs3.delete(checkIfProgramExists[0].id);
                        }
                        programDataTransaction3.oncomplete = function (event) {
                            var programDataTransaction2 = db1.transaction(['downloadedProgramData'], 'readwrite');
                            var programDataOs2 = programDataTransaction2.objectStore('downloadedProgramData');
                            for (var dpd = 0; dpd < readonlyProgramToBeDeleted.length; dpd++) {
                                var checkIfProgramExists = myResult.filter(c => c.programId == readonlyProgramToBeDeleted[dpd].programId && c.version == readonlyProgramToBeDeleted[dpd].version && c.readonly == 1 && c.userId == userId);
                                var programIdToDelete = 0;
                                if (checkIfProgramExists.length > 0) {
                                    programIdToDelete = checkIfProgramExists[0].id;
                                }
                                var programRequest2 = programDataOs2.delete(checkIfProgramExists[0].id);
                            }
                            programDataTransaction2.oncomplete = function (event) {
                                var syncedMasters = this.state.syncedMasters;
                                this.setState({
                                    syncedMasters: syncedMasters + 1,
                                    syncedPercentage: Math.floor(((this.state.syncedMasters + 1) / this.state.totalMasters) * 100)
                                }, () => {
                                    if (this.state.syncedMasters == this.state.totalMasters) {
                                        this.props.history.push({ pathname: `/masterDataSync/green/` + i18n.t('static.masterDataSync.success'), state: { "programIds": this.state.programIds, "treeId": this.props.location.state != undefined && this.props.location.state.treeId != undefined ? this.props.location.state.treeId : "", "isFullSync": this.props.location.state != undefined && this.props.location.state.isFullSync != undefined ? this.props.location.state.isFullSync : false } })
                                    }
                                })
                            }.bind(this)
                        }.bind(this)
                    }.bind(this)
                }.bind(this)
            }.bind(this)
        }
    }
    render() {
        return (
            <div className="animated fadeIn" >
                <h6 className="mt-success" style={{ color: this.props.match.params.color }} id="div1">{i18n.t(this.props.match.params.message)}</h6>
                <h5 className="pl-md-5" style={{ color: "red" }} id="div2">{this.state.message != "" && i18n.t('static.masterDataSync.masterDataSyncFailed')}</h5>
                <div className="col-md-12" style={{ display: this.state.loading ? "none" : "block" }}>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>{i18n.t('static.program.programSync')}</strong>
                            </CardHeader>
                            <CardBody>
                                <div className="text-center">{this.state.syncedPercentage}% ({i18next.t('static.masterDataSync.synced')} {this.state.syncedMasters} {i18next.t('static.masterDataSync.of')} {this.state.totalMasters} {i18next.t('static.masterDataSync.masters')})</div>
                                <Progress value={this.state.syncedMasters} max={this.state.totalMasters} />
                            </CardBody>
                        </Card>
                    </Col>
                </div>
                <div style={{ display: this.state.loading ? "block" : "none" }}>
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                        <div class="align-items-center">
                            <div ><h4> <strong>{i18n.t('static.common.loading')}</strong></h4></div>
                            <div class="spinner-border blue ml-4" role="status">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}