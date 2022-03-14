import React, { Component } from 'react';
import DatasetService from '../../api/DatasetService.js';
import AuthenticationService from '../Common/AuthenticationService.js';
import { Card, CardHeader, CardBody, Button, Col, FormGroup, Label, InputGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, CardFooter, FormFeedback, Form } from 'reactstrap';
import getLabelText from '../../CommonComponent/getLabelText'
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent'
import jexcel from 'jexcel-pro';
import "../../../node_modules/jexcel-pro/dist/jexcel.css";
import "../../../node_modules/jsuites/dist/jsuites.css";
import { jExcelLoadedFunction, jExcelLoadedFunctionOnlyHideRow } from '../../CommonComponent/JExcelCommonFunctions.js'
import i18n from '../../i18n';
import { JEXCEL_PAGINATION_OPTION, JEXCEL_DATE_FORMAT_SM, JEXCEL_PRO_KEY } from '../../Constants.js';
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import { Formik } from 'formik';
import * as Yup from 'yup'
import '../Forms/ValidationForms/ValidationForms.css';
import { INDEXED_DB_NAME, INDEXED_DB_VERSION, SECRET_KEY } from '../../Constants.js'
import CryptoJS from 'crypto-js'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import classNames from 'classnames';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import moment from 'moment';
const entityname = i18n.t('static.common.listtree');

const validationSchema = function (values) {
    return Yup.object().shape({
        datasetIdModal: Yup.string()
            .test('datasetIdModal', 'Please select program',
                function (value) {
                    console.log("@@@ 1", document.getElementById("treeFlag").value);
                    console.log("@@@ 2", document.getElementById("datasetIdModal").value);
                    if (document.getElementById("treeFlag").value == "false" && document.getElementById("datasetIdModal").value == "") {
                        return false;
                    } else {
                        return true;
                    }
                }),
        treeName: Yup.string()
            .matches(/^\S+(?: \S+)*$/, i18n.t('static.validSpace.string'))
            .required(i18n.t('static.validation.selectTreeName')),
        forecastMethodId: Yup.string()
            .test('forecastMethodId', i18n.t('static.validation.selectForecastMethod'),
                function (value) {
                    console.log("@@@ 3", document.getElementById("treeFlag").value);
                    console.log("@@@ 4", document.getElementById("forecastMethodId").value);
                    if (document.getElementById("treeFlag").value == "false" && document.getElementById("forecastMethodId").value == "") {
                        console.log("fm false");
                        return false;
                    } else {
                        console.log("fm true");
                        return true;
                    }
                }),
        treeFlag: Yup.boolean(),
        regionId: Yup.string()
            .when("treeFlag", {
                is: val => {
                    return document.getElementById("treeFlag").value === "false";

                },
                then: Yup.string()
                    .required(i18n.t('static.common.regiontext'))
                    .typeError(i18n.t('static.common.regiontext')),
                otherwise: Yup.string().notRequired()
            }),
        // regionId: Yup.string()
        //     .test('regionId', i18n.t('static.validation.selectForecastMethod'),
        //         function (value) {
        //             // console.log("@@@",(parseInt(document.getElementById("nodeTypeId").value) == 3 || parseInt(document.getElementById("nodeTypeId").value) == 2) && document.getElementById("nodeUnitId").value == "");
        //             if (document.getElementById("treeFlag").value == "false" && document.getElementById("regionId").value == "") {
        //                 return false;
        //             } else {
        //                 return true;
        //             }
        //         }),
    })
}

const initialValues = {
    treeName: "",
}

const validate = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values)
        try {
            validationSchema.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error)
        }
    }
}

const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}

export default class ListTreeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            missingPUList: [],
            treeTemplate: '',
            active: true,
            forecastMethod: {
                id: "",
                label: {
                    label_en: '',
                    label_fr: '',
                    label_sp: '',
                    label_pr: ''
                }
            },
            regionId: '',
            regionList: [],
            regionValues: [],
            notes: '',
            treeTemplateList: [],
            treeData: [],
            datasetList: [],
            message: '',
            loading: true,
            treeName: '',
            isModalOpen: false,
            programId: '',
            versionId: '',
            treeId: '',
            datasetId: '',
            treeFlag: true,
            forecastMethodList: [],
            realmCountryId: '',
            datasetIdModal: ''
        }
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
        this.buildJexcel = this.buildJexcel.bind(this);
        this.buildTree = this.buildTree.bind(this);
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.getDatasetList = this.getDatasetList.bind(this);
        this.getTreeList = this.getTreeList.bind(this);
        this.getTreeTemplateList = this.getTreeTemplateList.bind(this);
        this.copyDeleteTree = this.copyDeleteTree.bind(this);
        this.modelOpenClose = this.modelOpenClose.bind(this);
        this.getForecastMethodList = this.getForecastMethodList.bind(this);
        this.getRegionList = this.getRegionList.bind(this);
        this.findMissingPUs = this.findMissingPUs.bind(this);
        this.buildMissingPUJexcel = this.buildMissingPUJexcel.bind(this);
    }
    buildMissingPUJexcel() {
        var missingPUList = this.state.missingPUList;
        console.log("missingPUList--->", missingPUList);
        var dataArray = [];
        let count = 0;
        if (missingPUList.length > 0) {
            for (var j = 0; j < missingPUList.length; j++) {
                data = [];
                // data[0] = missingPUList[j].month
                // data[1] = missingPUList[j].startValue
                data[0] = getLabelText(missingPUList[j].tracerCategory.label, this.state.lang)
                data[1] = getLabelText(missingPUList[j].planningUnit.label, this.state.lang) + " | " + missingPUList[j].planningUnit.id
                dataArray[count] = data;
                count++;
            }
        }
        this.el = jexcel(document.getElementById("missingPUJexcel"), '');
        this.el.destroy();
        var data = dataArray;
        console.log("DataArray>>>", dataArray);

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [50, 50],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    // 0
                    title: i18n.t('static.tracercategory.tracercategory'),
                    type: 'test',
                    readOnly: true
                },
                {
                    // 1
                    title: i18n.t('static.product.product'),
                    type: 'text',
                    readOnly: true

                }

            ],
            text: {
                // showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.to')} {1} ${i18n.t('static.jexcel.of')} {1}`,
                showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.of')} {1} ${i18n.t('static.jexcel.pages')}`,
                show: '',
                entries: '',
            },
            onload: this.loadedMissingPU,
            pagination: localStorage.getItem("sesRecordCount"),
            search: false,
            columnSorting: true,
            tableOverflow: true,
            wordWrap: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: false,
            copyCompatibility: true,
            allowExport: false,
            paginationOptions: JEXCEL_PAGINATION_OPTION,
            position: 'top',
            filters: true,
            license: JEXCEL_PRO_KEY,
            contextMenu: function (obj, x, y, e) {
                return false;
            }.bind(this),

        };
        var missingPUJexcel = jexcel(document.getElementById("missingPUJexcel"), options);
        this.el = missingPUJexcel;
        this.setState({
            missingPUJexcel
        }
        );
    }

    loadedMissingPU = function (instance, cell, x, y, value) {
        console.log("loaded 2---",document.getElementsByClassName('jexcel_pagination'));
        jExcelLoadedFunction(instance);
    }

    findMissingPUs() {
        var missingPUList = [];
        var json;
        var treeTemplate = this.state.treeTemplate;
        console.log("dataset Id template---", this.state.datasetIdModal);
        var dataset = this.state.datasetList.filter(x => x.id == this.state.datasetIdModal)[0];
        console.log("dataset---", dataset);
        console.log("treeTemplate---", treeTemplate);
        var puNodeList = treeTemplate.flatList.filter(x => x.payload.nodeType.id == 5);
        console.log("planningUnitIdListTemplate---", puNodeList.map((x) => x.payload.nodeDataMap[0][0].puNode.planningUnit.id).join(', '));
        var planningUnitList = dataset.programData.planningUnitList.filter(x => x.treeForecast == true);
        console.log("planningUnitIdListPUSettings---", planningUnitList.map((x) => x.planningUnitId).join(', '));
        for (let i = 0; i < puNodeList.length; i++) {
            console.log("pu Id---", puNodeList[i].payload.nodeDataMap[0][0].puNode.planningUnit.id);
            if (planningUnitList.filter(x => x.planningUnitId == puNodeList[i].payload.nodeDataMap[0][0].puNode.planningUnit.id).length == 0) {
                var parentNodeData = treeTemplate.flatList.filter(x => x.id == puNodeList[i].parent)[0];
                console.log("parentNodeData---", parentNodeData);
                json = {
                    tracerCategory: parentNodeData.payload.nodeDataMap[0][0].fuNode.forecastingUnit.tracerCategory,
                    planningUnit: puNodeList[i].payload.nodeDataMap[0][0].puNode.planningUnit
                };
                missingPUList.push(json);
            }
        }
        console.log("missingPUList---", missingPUList);
        this.setState({
            missingPUList
        }, () => {
            this.buildMissingPUJexcel();
        });
    }
    handleRegionChange = (regionIds) => {
        console.log("regionIds---", regionIds);

        this.setState({
            regionValues: regionIds.map(ele => ele),
            // regionLabels: regionIds.map(ele => ele.label)
        }, () => {
            console.log("regionValues---", this.state.regionValues);
            // console.log("regionLabels---", this.state.regionLabels);
            // if ((this.state.regionValues).length > 0) {
            var regionList = [];
            var regions = this.state.regionValues;
            console.log("regions---", regions)
            for (let i = 0; i < regions.length; i++) {
                var json = {
                    id: regions[i].value,
                    label: {
                        label_en: regions[i].label
                    }
                }
                regionList.push(json);
            }
            console.log("final regionList---", regionList);
            this.setState({ regionList });
            // }
        })
    }


    getRegionList() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['region'], 'readwrite');
            var program = transaction.objectStore('region');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                var regionList = [];
                if (this.state.realmCountryId != null && this.state.realmCountryId != "") {
                    regionList = myResult.filter(x => x.realmCountry.realmCountryId == this.state.realmCountryId);
                    console.log("filter if regionList---", regionList);
                } else {
                    regionList = myResult;
                    this.setState({
                        regionValues: []
                    });
                    console.log("filter else regionList---", regionList);
                }
                var regionMultiList = []
                regionList.map(c => {
                    regionMultiList.push({ label: getLabelText(c.label, this.state.lang), value: c.regionId })
                })
                this.setState({
                    regionList,
                    regionMultiList,
                    missingPUList: []
                }, () => {
                    if (this.state.treeTemplate != "")
                        this.findMissingPUs();
                });
                for (var i = 0; i < myResult.length; i++) {
                    console.log("myResult--->", myResult[i])

                }

            }.bind(this);
        }.bind(this);
    }
    getForecastMethodList() {
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['forecastMethod'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('forecastMethod');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                console.log("myResult===============2", myResult)
                this.setState({
                    forecastMethodList: myResult.filter(x => x.forecastMethodTypeId == 1)
                }, () => {

                })
            }.bind(this);
        }.bind(this)
    }

    touchAll(setTouched, errors) {
        setTouched({
            treeName: true,
            forecastMethodId: true,
            regionId: true,
            datasetIdModal: true
        }
        )
        this.validateForm(errors)
    }
    validateForm(errors) {
        this.findFirstError('modalForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }
    findFirstError(formName, hasError) {
        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            if (hasError(form[i].name)) {
                form[i].focus()
                break
            }
        }
    }

    copyDeleteTree(treeId, programId, versionId, operationId) {

        console.log("TreeId--------------->", treeId, programId, versionId, operationId);
        var program = this.state.treeFlag ? (this.state.datasetList.filter(x => x.programId == programId && x.version == versionId)[0]) : (this.state.datasetList.filter(x => x.id == programId)[0]);
        let tempProgram = JSON.parse(JSON.stringify(program))
        let treeList = program.programData.treeList;
        if (operationId == 1) {//delete
            const index = treeList.findIndex(c => c.treeId == treeId);
            if (index > 0) {
                const result = treeList.splice(index, 1);
            }
        } else if (operationId == 2) {//copy
            let treeName = this.state.treeName;

            for (let i = 0; i < treeList.length; i++) {
                if (treeList[i].treeId == treeId) {
                    let treeObj = JSON.parse(JSON.stringify(treeList[i]));
                    let maxTreeId = treeList.length > 0 ? Math.max(...treeList.map(o => o.treeId)) : 0;
                    treeObj.treeId = maxTreeId + 1;
                    treeObj.label = {
                        "createdBy": null,
                        "createdDate": null,
                        "lastModifiedBy": null,
                        "lastModifiedDate": null,
                        "active": true,
                        "labelId": '',
                        "label_en": treeName,
                        "label_sp": null,
                        "label_fr": null,
                        "label_pr": null
                    }

                    treeList.push(treeObj);
                    break;
                }
            }

            console.log("TreeId--------------->12", treeList);
        } else if (operationId == 3) {
            // program = (this.state.datasetList.filter(x => x.id == programId)[0]);
            var maxTreeId = treeList.length > 0 ? Math.max(...treeList.map(o => o.treeId)) : 0;
            treeId = parseInt(maxTreeId) + 1;
            var nodeDataMap = {};
            var tempArray = [];
            var tempJson = {};
            var tempTree = {};
            var treeTemplateId = document.getElementById('templateId').value;
            if (treeTemplateId != "") {
                var treeTemplate = this.state.treeTemplateList.filter(x => x.treeTemplateId == treeTemplateId)[0];
                console.log("treeTemplate 123----", treeTemplate);
                var flatList = treeTemplate.flatList;
                for (let i = 0; i < flatList.length; i++) {
                    nodeDataMap = {};
                    tempArray = [];
                    // var nodeDataMap[1] = flatList.payload.nodeDataMap[0][0];
                    console.log("flatList[i]---", flatList[i]);
                    tempJson = flatList[i].payload.nodeDataMap[0][0];
                    tempArray.push(tempJson);
                    nodeDataMap[1] = tempArray;
                    flatList[i].payload.nodeDataMap = nodeDataMap;
                }
                tempTree = {
                    treeId: treeId,
                    active: this.state.active,
                    forecastMethod: treeTemplate.forecastMethod,
                    label: treeTemplate.label,
                    notes: this.state.notes,
                    regionList: this.state.regionList,
                    scenarioList: [{
                        id: 1,
                        label: {
                            label_en: i18n.t('static.realm.default'),
                            label_fr: '',
                            label_sp: '',
                            label_pr: ''
                        },
                        active: true,
                        notes: ''
                    }],
                    tree: {
                        flatList: flatList
                    }
                }
            } else {
                tempJson = {
                    nodeDataId: 1,
                    notes: '',
                    month: moment(program.programData.currentVersion.forecastStartDate).startOf('month').format("YYYY-MM-DD"),
                    dataValue: "",
                    calculatedDataValue: '',
                    displayDataValue: '',
                    nodeDataModelingList: [],
                    nodeDataOverrideList: [],
                    nodeDataMomList: [],
                    fuNode: {
                        noOfForecastingUnitsPerPerson: '',
                        usageFrequency: '',
                        forecastingUnit: {
                            label: {
                                label_en: ''
                            },
                            tracerCategory: {

                            },
                            unit: {
                                id: ''
                            }
                        },
                        usageType: {
                            id: ''
                        },
                        usagePeriod: {
                            usagePeriodId: ''
                        },
                        repeatUsagePeriod: {
                            usagePeriodId: ''
                        },
                        noOfPersons: ''
                    },
                    puNode: {
                        planningUnit: {
                            unit: {

                            }
                        },
                        refillMonths: ''
                    }
                };
                tempArray.push(tempJson);
                nodeDataMap[1] = tempArray;
                tempTree = {
                    treeId: treeId,
                    active: this.state.active,
                    forecastMethod: this.state.forecastMethod,
                    label: {
                        label_en: this.state.treeName,
                        label_fr: '',
                        label_sp: '',
                        label_pr: ''
                    },
                    notes: this.state.notes,
                    regionList: this.state.regionList,
                    scenarioList: [{
                        id: 1,
                        label: {
                            label_en: i18n.t('static.realm.default'),
                            label_fr: '',
                            label_sp: '',
                            label_pr: ''
                        },
                        active: true,
                        notes: ''
                    }],
                    tree: {
                        flatList: [{
                            id: 1,
                            level: 0,
                            parent: null,
                            sortOrder: "00",
                            payload: {
                                label: {
                                    label_en: ''
                                },
                                nodeType: {
                                    id: 2
                                },
                                nodeUnit: {
                                    id: ''
                                },
                                extrapolation: false,
                                nodeDataMap: nodeDataMap
                            },
                            parentItem: {
                                payload: {
                                    nodeUnit: {

                                    }
                                }
                            }
                        }]
                    }
                }
            }

            console.log("region values---", this.state.regionValues);
            // console.log("curTreeObj.regionList---", curTreeObj.regionList);


            treeList.push(tempTree);
        }

        tempProgram.programData.treeList = treeList;
        var programData = (CryptoJS.AES.encrypt(JSON.stringify(tempProgram.programData), SECRET_KEY)).toString();
        tempProgram.programData = programData;

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
            var transaction = db1.transaction(['datasetData'], 'readwrite');
            var programTransaction = transaction.objectStore('datasetData');

            var programRequest = programTransaction.put(tempProgram);
            console.log("---hurrey---");

            transaction.oncomplete = function (event) {

                this.setState({
                    // loading: false,
                    message: i18n.t('static.mt.dataUpdateSuccess'),
                    color: "green",
                }, () => {
                    if (operationId == 3) {
                        confirmAlert({
                            message: "Do you want to move to manage tree page?",
                            buttons: [
                                {
                                    label: i18n.t('static.program.yes'),
                                    onClick: () => {
                                        this.props.history.push({
                                            pathname: `/dataSet/buildTree/tree/${treeId}/${programId}`,
                                            // state: { role }
                                        });

                                    }
                                },
                                {
                                    label: i18n.t('static.program.no'),
                                    onClick: () => {
                                        this.getDatasetList();
                                    }
                                }
                            ]
                        });
                    } else {
                        this.getDatasetList();
                    }

                });
                console.log("Data update success1");
                // alert("success");


            }.bind(this);
            transaction.onerror = function (event) {
                this.setState({
                    loading: false,
                    color: "red",
                }, () => {
                    this.hideSecondComponent();
                });
                console.log("Data update errr");
            }.bind(this);
        }.bind(this);


    }


    getTreeTemplateList() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['treeTemplate'], 'readwrite');
            var program = transaction.objectStore('treeTemplate');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                var treeTemplateList = myResult.filter(x => x.active == true);
                treeTemplateList.sort((a, b) => {
                    var itemLabelA = getLabelText(a.label, this.state.lang).toUpperCase(); // ignore upper and lowercase
                    var itemLabelB = getLabelText(b.label, this.state.lang).toUpperCase(); // ignore upper and lowercase                   
                    return itemLabelA > itemLabelB ? 1 : -1;
                });
                this.setState({
                    treeTemplateList
                });
                // for (var i = 0; i < myResult.length; i++) {
                //     console.log("treeTemplateList--->", myResult[i])

                // }

            }.bind(this);
        }.bind(this);
    }

    getTreeList() {
        // var proList = [];
        // var datasetId = document.getElementById('datasetId').value;
        var realmCountryId = "";
        var datasetId = document.getElementById("datasetId").value;
        localStorage.setItem("sesDatasetId", datasetId);
        var datasetList = this.state.datasetList;
        console.log("filter tree---", datasetList);
        if (datasetId != 0) {
            datasetList = datasetList.filter(x => x.id == datasetId);
            console.log('inside if')
            realmCountryId = datasetList[0].programData.realmCountry.realmCountryId;
            // proList.push(datasetList)
        }

        // console.log("pro list---", proList);
        this.setState({
            datasetId,
            datasetIdModal: datasetId,
            treeData: datasetList,
            realmCountryId
        }, () => {
            this.buildJexcel();
        });
    }
    getDatasetList() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['datasetData'], 'readwrite');
            var program = transaction.objectStore('datasetData');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                for (var i = 0; i < myResult.length; i++) {
                    console.log("myResult[i].programData---", myResult[i].programData);
                    var databytes = CryptoJS.AES.decrypt(myResult[i].programData, SECRET_KEY);
                    var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
                    console.log("myResult[i].programData after---", programData);
                    myResult[i].programData = programData;
                }
                myResult = myResult.sort(function (a, b) {
                    a = a.programCode.toLowerCase();
                    b = b.programCode.toLowerCase();
                    return a < b ? -1 : a > b ? 1 : 0;
                });
                this.setState({
                    datasetList: myResult
                }, () => {
                    var datasetId = "", realmCountryId = "";
                    if (this.state.datasetList.length == 1) {
                        datasetId = this.state.datasetList[0].id;
                        realmCountryId = this.state.datasetList[0].programData.realmCountry.realmCountryId;
                    } else if (localStorage.getItem("sesDatasetId") != "" && this.state.datasetList.filter(c => c.id == localStorage.getItem("sesDatasetId")).length > 0) {
                        datasetId = localStorage.getItem("sesDatasetId");
                        realmCountryId = this.state.datasetList.filter(x => x.id == datasetId)[0].programData.realmCountry.realmCountryId;
                    }
                    console.log("datasetId---", datasetId);
                    this.setState({ datasetId, datasetIdModal: datasetId, realmCountryId }, () => { this.getTreeList(); })

                });

            }.bind(this);
        }.bind(this);
    }

    onTemplateChange(event) {
        if (event.target.value == 0 || event.target.value == "") {
            this.setState({
                treeTemplate: '',
                treeFlag: false,
                isModalOpen: !this.state.isModalOpen,
                treeName: '',
                active: true,
                forecastMethod: {
                    id: "",
                    label: {
                        label_en: '',
                        label_fr: '',
                        label_sp: '',
                        label_pr: ''
                    }
                },
                regionId: '',
                regionList: [],
                regionValues: [],
                notes: ''
            }, () => {
                if (this.state.datasetIdModal != "") {
                    console.log("this.state.datasetIdModal---", this.state.datasetIdModal)
                    this.getRegionList();
                }
            });
            // this.buildTree();
        } else {
            console.log("id--->>>", this.state.datasetIdModal);
            var treeTemplate = this.state.treeTemplateList.filter(x => x.treeTemplateId == event.target.value)[0];
            console.log("treeTemplate---", treeTemplate)
            this.setState({
                treeFlag: false,
                isModalOpen: !this.state.isModalOpen,
                treeName: treeTemplate.label.label_en,
                active: treeTemplate.active,
                forecastMethod: treeTemplate.forecastMethod,
                regionId: '',
                regionList: [],
                regionValues: [],
                notes: '',
                treeTemplate
            }, () => {
                if (this.state.datasetIdModal != "" && this.state.datasetIdModal != 0) {
                    console.log("this.state.datasetIdModal---", this.state.datasetIdModal)
                    this.getRegionList();
                }
            });
            // this.props.history.push({
            //     pathname: `/dataSet/buildTree/template/${event.target.value}`,
            //     // state: { role }
            // });
        }

    }

    buildTree() {

        this.props.history.push({
            pathname: `/dataSet/buildTree/`,
            // state: { role }
        });

    }
    buildJexcel() {
        let programList = this.state.treeData;
        console.log(">>>", programList);
        let treeArray = [];
        let count = 0;
        var selStatus = document.getElementById("active").value;
        var tempSelStatus = selStatus != "" ? (selStatus == "true" ? true : false) : "";
        for (var j = 0; j < programList.length; j++) {
            console.log("programList[j]---", programList[j]);
            var treeList = programList[j].programData.treeList;

            if (treeList.length > 0) {
                for (var k = 0; k < treeList.length; k++) {

                    data = [];
                    data[0] = treeList[k].treeId
                    data[1] = programList[j].programCode + "~v" + programList[j].programData.currentVersion.versionId
                    // data[1] = programList[j].programCode
                    data[2] = getLabelText(treeList[k].label, this.state.lang)
                    data[3] = treeList[k].regionList.map(x => getLabelText(x.label, this.state.lang)).join(", ")
                    console.log("forecast method--->", treeList[k].forecastMethod.label)
                    data[4] = getLabelText(treeList[k].forecastMethod.label, this.state.lang)
                    data[5] = treeList[k].scenarioList.map(x => getLabelText(x.label, this.state.lang)).join(", ")
                    data[6] = treeList[k].notes
                    data[7] = programList[j].programId
                    data[8] = programList[j].id
                    data[9] = programList[j].version
                    data[10] = treeList[k].active
                    console.log("selStatus---", selStatus)
                    if (selStatus != "") {
                        if (tempSelStatus == treeList[k].active) {
                            // treeArray = treeArray.filter(x => x[10] == tempSelStatus);
                            treeArray[count] = data;
                            count++;
                        }
                    } else {
                        treeArray[count] = data;
                        count++;
                    }
                }
            }
        }



        const sortArray = (sourceArray) => {
            const sortByName = (a, b) => a[2].localeCompare(b[2], 'en', { numeric: true });
            return sourceArray.sort(sortByName);
        };

        if (treeArray.length > 0) {
            sortArray(treeArray);
        }
        this.el = jexcel(document.getElementById("tableDiv"), '');
        this.el.destroy();
        var json = [];
        var data = treeArray;

        var options = {
            data: data,
            columnDrag: true,
            // colWidths: [150, 150, 100],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    title: 'Tree Id',
                    type: 'hidden'
                },
                {
                    title: i18n.t('static.dashboard.programheader'),
                    type: 'text',
                    readOnly: true
                },
                {
                    title: i18n.t('static.common.treeName'),
                    type: 'text',
                    readOnly: true
                },
                {
                    title: i18n.t('static.common.region'),
                    type: 'text',
                    readOnly: true
                },
                {
                    title: i18n.t('static.forecastMethod.forecastMethod'),
                    type: 'text',
                    readOnly: true
                },

                {
                    title: i18n.t('static.common.scenarioName'),
                    type: 'text',
                    readOnly: true
                },
                {
                    title: i18n.t('static.program.notes'),
                    type: 'text',
                    readOnly: true
                },
                {
                    title: 'ProgramId',
                    type: 'hidden',
                    readOnly: true
                },
                {
                    title: 'id',
                    type: 'hidden',
                    readOnly: true
                },
                {
                    title: 'versionId',
                    type: 'hidden',
                    readOnly: true
                },
                {
                    type: 'dropdown',
                    title: i18n.t('static.common.status'),
                    readOnly: true,
                    source: [
                        { id: true, name: i18n.t('static.common.active') },
                        { id: false, name: i18n.t('static.common.disabled') }
                    ]
                }

            ],
            text: {
                // showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.to')} {1} ${i18n.t('static.jexcel.of')} {1} ${i18n.t('static.jexcel.pages')}`,
                showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.of')} {1} ${i18n.t('static.jexcel.pages')}`,
                show: '',
                entries: '',
            },
            onload: this.loaded,
            pagination: localStorage.getItem("sesRecordCount"),
            search: true,
            columnSorting: true,
            tableOverflow: true,
            wordWrap: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: false,
            onselection: this.selected,
            oneditionend: this.onedit,
            copyCompatibility: true,
            allowExport: false,
            paginationOptions: JEXCEL_PAGINATION_OPTION,
            position: 'top',
            filters: true,
            license: JEXCEL_PRO_KEY,
            contextMenu: function (obj, x, y, e) {
                var items = [];
                if (y != null) {
                    if (obj.options.allowInsertRow == true) {
                        items.push({
                            title: i18n.t('static.common.deleteTree'),
                            onclick: function () {
                                confirmAlert({
                                    message: "Are you sure you want to delete this tree.",
                                    buttons: [
                                        {
                                            label: i18n.t('static.program.yes'),
                                            onClick: () => {
                                                this.setState({ treeFlag: true }, () => {
                                                    this.copyDeleteTree(this.el.getValueFromCoords(0, y), this.el.getValueFromCoords(7, y), this.el.getValueFromCoords(9, y), 1);
                                                })

                                            }
                                        },
                                        {
                                            label: i18n.t('static.program.no')
                                        }
                                    ]
                                });

                            }.bind(this)
                        });

                        items.push({
                            title: i18n.t('static.common.duplicateTree'),
                            onclick: function () {
                                this.setState({
                                    programId: this.el.getValueFromCoords(7, y),
                                    versionId: this.el.getValueFromCoords(9, y),
                                    treeId: this.el.getValueFromCoords(0, y),
                                    isModalOpen: !this.state.isModalOpen,
                                    treeName: this.el.getValueFromCoords(2, y) + "+copy",
                                    treeFlag: true,
                                    treeTemplate: ''
                                })
                            }.bind(this)
                        });
                    }
                }

                return items;
            }.bind(this),
        };
        var treeEl = jexcel(document.getElementById("tableDiv"), options);
        this.el = treeEl;
        this.setState({
            treeEl: treeEl, loading: false
        })
    }
    hideSecondComponent() {
        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';
        }, 8000);
    }
    hideFirstComponent() {
        this.timeout = setTimeout(function () {
            document.getElementById('div1').style.display = 'none';
        }, 8000);
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    componentDidMount() {
        this.hideFirstComponent();
        this.getDatasetList();
        this.getTreeTemplateList();
        this.getForecastMethodList();
    }
    modelOpenClose() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            treeFlag: true
        })
    }
    dataChange(event) {
        if (event.target.name == "treeName") {
            this.setState({
                treeName: event.target.value,
            });
        }

        if (event.target.name == "datasetIdModal") {
            var realmCountryId = "";
            if (event.target.value != "") {
                var program = (this.state.datasetList.filter(x => x.id == event.target.value)[0]);
                realmCountryId = program.programData.realmCountry.realmCountryId;
            }
            this.setState({
                realmCountryId,
                datasetIdModal: event.target.value,
            }, () => {
                localStorage.setItem("sesDatasetId", event.target.value);
                this.getRegionList();
                if (document.getElementById('templateId').value != "") {
                    this.findMissingPUs();
                }
            });
        }

        if (event.target.name == "forecastMethodId") {
            var forecastMethod = document.getElementById("forecastMethodId");
            var selectedText = forecastMethod.options[forecastMethod.selectedIndex].text;
            let label = {
                label_en: selectedText,
                label_fr: '',
                label_sp: '',
                label_pr: ''
            }
            this.setState({
                forecastMethod: {
                    id: event.target.value,
                    label: label
                },
            });
        }

        if (event.target.name == "notes") {
            this.setState({
                notes: event.target.value,
            });
        }
        if (event.target.name == "active") {
            this.setState({
                active: event.target.id === "active11" ? false : true
            });

        }
    };
    loaded = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance);
    }

    selected = function (instance, cell, x, y, value) {
        if (x == 0 && value != 0) {
            // console.log("HEADER SELECTION--------------------------");
        } else {
            if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE_TEMPLATE')) {
                var treeId = this.el.getValueFromCoords(0, x);
                var programId = this.el.getValueFromCoords(8, x);
                console.log("programId>>>", programId);
                this.props.history.push({
                    pathname: `/dataSet/buildTree/tree/${treeId}/${programId}`,
                    // state: { role }
                });
            }

        }
    }.bind(this);

    // addNewDimension() {
    //     if (isSiteOnline()) {
    //         this.props.history.push(`/diamension/addDiamension`)
    //     } else {
    //         alert("You must be Online.")
    //     }

    // }

    render() {
        const { datasetList } = this.state;
        let datasets = datasetList.length > 0
            && datasetList.map((item, i) => {
                return (
                    <option key={i} value={item.id}>
                        {item.programCode + "~v" + item.programData.currentVersion.versionId}
                    </option>
                )
            }, this);

        const { treeTemplateList } = this.state;
        let treeTemplates = treeTemplateList.length > 0
            && treeTemplateList.map((item, i) => {
                return (
                    <option key={i} value={item.treeTemplateId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);

        const { forecastMethodList } = this.state;
        let forecastMethods = forecastMethodList.length > 0
            && forecastMethodList.map((item, i) => {
                return (
                    <option key={i} value={item.forecastMethodId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);


        return (
            <div className="animated">
                <AuthenticationServiceComponent history={this.props.history} message={(message) => {
                    this.setState({ message: message })
                }} loading={(loading) => {
                    this.setState({ loading: loading })
                }} />
                <h5 className={this.props.match.params.color} id="div1">{i18n.t(this.props.match.params.message, { entityname })}</h5>
                <h5 className={this.state.color} id="div2">{i18n.t(this.state.message, { entityname })}</h5>
                <Card>
                    <div className="Card-header-addicon">
                        {/* <i className="icon-menu"></i><strong>{i18n.t('static.common.listEntity', { entityname })}</strong> */}
                        <div className="card-header-actions">
                            <div className="card-header-action">
                                <Col md="12 pl-0 pr-lg-0">
                                    <div className="d-md-flex">
                                        {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_ADD_TREE') &&
                                            // <Button type="submit" size="md" color="success" onClick={this.formSubmit} className="float-right mr-1" ><i className="fa fa-check"></i>{i18n.t('static.common.createTreeFromTemplate')}</Button>
                                            // <Col md="3" className="pl-0">
                                            <FormGroup className="tab-ml-1 mt-md-2 mb-md-0 ">
                                                {/* <Label htmlFor="appendedInputButton">{i18n.t('static.forecastProgram.forecastProgram')}</Label> */}
                                                <div className="controls SelectGo">
                                                    <InputGroup>
                                                        <Input
                                                            type="select"
                                                            name="templateId"
                                                            id="templateId"
                                                            bsSize="sm"
                                                            className="addtreebg"
                                                            onChange={(e) => { this.onTemplateChange(e) }}
                                                        >
                                                            <option value="">{i18n.t('static.tree.+AddTree')}</option>
                                                            <option value="0">{i18n.t('static.tree.blank')}</option>
                                                            {treeTemplates}
                                                        </Input>
                                                    </InputGroup>
                                                </div>
                                            </FormGroup>
                                            // </Col>
                                        }
                                        {/* {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_LIST_REALM_COUNTRY') &&
                                            <FormGroup className="tab-ml-1 mt-md-1 mb-md-0 ">
                                                <Button type="submit" size="md" color="info" onClick={this.buildTree} className="float-right pt-1 pb-1" ><i className="fa fa-plus"></i>  {i18n.t('static.common.addtree')}</Button>
                                            </FormGroup>
                                        } */}
                                    </div>
                                </Col>
                            </div>
                        </div>

                    </div>
                    <CardBody className="pb-lg-0 pt-lg-0">
                        <Col md="6 pl-0">
                            <div className="d-md-flex Selectdiv2">
                                <FormGroup className="tab-ml-0 mt-md-2 mb-md-0 ">
                                    <Label htmlFor="appendedInputButton">{i18n.t('static.program.program')}</Label>
                                    <div className="controls SelectGo">
                                        <InputGroup>
                                            <Input
                                                type="select"
                                                name="datasetId"
                                                id="datasetId"
                                                bsSize="sm"
                                                onChange={this.getTreeList}
                                                value={this.state.datasetId}
                                            >
                                                <option value="0">{i18n.t('static.common.all')}</option>
                                                {datasets}
                                            </Input>
                                        </InputGroup>
                                    </div>
                                </FormGroup>
                                <FormGroup className="tab-ml-1 mt-md-2 mb-md-0 ">
                                    <Label htmlFor="appendedInputButton">{i18n.t('static.common.status')}</Label>
                                    <div className="controls SelectGo">
                                        <InputGroup>
                                            <Input
                                                type="select"
                                                name="active"
                                                id="active"
                                                bsSize="sm"
                                                onChange={this.getTreeList}
                                            >
                                                <option value="">{i18n.t('static.common.all')}</option>
                                                <option value="true" selected>{i18n.t('static.common.active')}</option>
                                                <option value="false">{i18n.t('static.common.disabled')}</option>

                                            </Input>
                                        </InputGroup>
                                    </div>
                                </FormGroup>
                            </div>
                        </Col>
                        {/* <div id="loader" className="center"></div> */}
                        <div className="listtreetable">
                            <div id="tableDiv" className={AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_DIMENSION') ? "jexcelremoveReadonlybackground RowClickable" : "jexcelremoveReadonlybackground"} style={{ display: this.state.loading ? "none" : "block" }}>
                            </div>
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
                    </CardBody>

                    <Modal isOpen={this.state.isModalOpen}
                        className={'modal-md ' + this.props.className}>
                        <ModalHeader>
                            <strong>Tree Details</strong>
                            <Button size="md" onClick={this.modelOpenClose} color="danger" style={{ paddingTop: '0px', paddingBottom: '0px', paddingLeft: '3px', paddingRight: '3px' }} className="submitBtn float-right mr-1"> <i className="fa fa-times"></i></Button>
                        </ModalHeader>
                        <ModalBody className='pb-lg-0'>
                            {/* <h6 className="red" id="div3"></h6> */}
                            <Col sm={12} style={{ flexBasis: 'auto' }}>
                                {/* <Card> */}
                                <Formik
                                    initialValues={{
                                        treeName: this.state.treeName,
                                        forecastMethodId: this.state.forecastMethod.id,
                                        datasetIdModal: this.state.datasetIdModal,
                                        regionId: this.state.regionValues
                                    }}
                                    validate={validate(validationSchema)}
                                    onSubmit={(values, { setSubmitting, setErrors }) => {
                                        this.setState({ loading: true }, () => {
                                            this.copyDeleteTree(this.state.treeId, this.state.treeFlag ? this.state.programId : this.state.datasetIdModal, this.state.treeFlag ? this.state.versionId : 0, this.state.treeFlag ? 2 : 3);
                                            this.setState({
                                                isModalOpen: !this.state.isModalOpen,
                                            })
                                        })

                                    }}


                                    render={
                                        ({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            isSubmitting,
                                            isValid,
                                            setTouched,
                                            handleReset,
                                            setFieldValue,
                                            setFieldTouched
                                        }) => (
                                            <Form onSubmit={handleSubmit} onReset={handleReset} noValidate name='modalForm' autocomplete="off">
                                                {/* <CardBody> */}
                                                <div className="row">
                                                    <Input type="hidden"
                                                        name="treeFlag"
                                                        id="treeFlag"
                                                        value={this.state.treeFlag}
                                                    />
                                                    <div style={{ display: this.state.treeFlag ? "none" : "block" }} className="col-md-12">
                                                        <FormGroup className="col-md-12">
                                                            <Label htmlFor="appendedInputButton">{i18n.t('static.program.program')}<span className="red Reqasterisk">*</span></Label>
                                                            <div className="controls">

                                                                <Input
                                                                    type="select"
                                                                    name="datasetIdModal"
                                                                    id="datasetIdModal"
                                                                    bsSize="sm"
                                                                    valid={!errors.datasetIdModal && this.state.datasetIdModal != null ? this.state.datasetIdModal : '' != ''}
                                                                    invalid={touched.datasetIdModal && !!errors.datasetIdModal}
                                                                    onBlur={handleBlur}
                                                                    onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                                    value={this.state.datasetIdModal}
                                                                >
                                                                    <option value="">{"Please select program"}</option>
                                                                    {datasets}
                                                                </Input>
                                                                <FormFeedback>{errors.datasetIdModal}</FormFeedback>
                                                            </div>

                                                        </FormGroup>

                                                        <FormGroup className="col-md-12">
                                                            <Label htmlFor="currencyId">{i18n.t('static.forecastMethod.forecastMethod')}<span class="red Reqasterisk">*</span></Label>
                                                            <div className="controls">

                                                                <Input
                                                                    type="select"
                                                                    name="forecastMethodId"
                                                                    id="forecastMethodId"
                                                                    bsSize="sm"
                                                                    valid={!errors.forecastMethodId && this.state.forecastMethod.id != null ? this.state.forecastMethod.id : '' != ''}
                                                                    invalid={touched.forecastMethodId && !!errors.forecastMethodId}
                                                                    onBlur={handleBlur}
                                                                    onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                                    required
                                                                    value={this.state.forecastMethod.id}
                                                                >
                                                                    <option value="">{i18n.t('static.common.forecastmethod')}</option>
                                                                    {forecastMethods}
                                                                </Input>
                                                                <FormFeedback>{errors.forecastMethodId}</FormFeedback>
                                                            </div>

                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <FormGroup className="col-md-12">
                                                            <Label for="number1">Tree Name<span className="red Reqasterisk">*</span></Label>
                                                            <div className="controls">
                                                                <Input type="text"
                                                                    bsSize="sm"
                                                                    name="treeName"
                                                                    id="treeName"
                                                                    valid={!errors.treeName && this.state.treeName != ''}
                                                                    invalid={touched.treeName && !!errors.treeName}
                                                                    onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                                    onBlur={handleBlur}
                                                                    required
                                                                    value={this.state.treeName}
                                                                />
                                                                <FormFeedback className="red">{errors.treeName}</FormFeedback>
                                                            </div>

                                                        </FormGroup>
                                                    </div>
                                                    <div style={{ display: this.state.treeFlag ? "none" : "block" }} className="col-md-12">
                                                        <FormGroup className="col-md-12">
                                                            <Label htmlFor="currencyId">{i18n.t('static.region.region')}<span class="red Reqasterisk">*</span></Label>
                                                            <div className="controls">
                                                                <Select
                                                                    className={classNames('form-control', 'd-block', 'w-100', 'bg-light',
                                                                        { 'is-valid': !errors.regionId },
                                                                        { 'is-invalid': (touched.regionId && !!errors.regionId || this.state.regionValues.length == 0) }
                                                                    )}
                                                                    bsSize="sm"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setFieldValue("regionId", e);
                                                                        this.handleRegionChange(e);
                                                                    }}
                                                                    onBlur={() => setFieldTouched("regionId", true)}
                                                                    multi
                                                                    options={this.state.regionMultiList}
                                                                    value={this.state.regionValues}
                                                                />
                                                                <FormFeedback>{errors.regionId}</FormFeedback>
                                                            </div>

                                                        </FormGroup>
                                                        <FormGroup className="col-md-12">
                                                            <Label htmlFor="currencyId">{i18n.t('static.common.note')}</Label>
                                                            <div className="controls">
                                                                <Input type="textarea"
                                                                    id="notes"
                                                                    name="notes"
                                                                    onChange={(e) => { this.dataChange(e) }}
                                                                    value={this.state.notes}
                                                                ></Input>
                                                            </div>

                                                        </FormGroup>
                                                        <FormGroup className="col-md-12">
                                                            <Label className="P-absltRadio">{i18n.t('static.common.status')}</Label>
                                                            <FormGroup check inline>
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    id="active10"
                                                                    name="active"
                                                                    value={true}
                                                                    checked={this.state.active === true}
                                                                    onChange={(e) => { this.dataChange(e) }}
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    check htmlFor="inline-radio1">
                                                                    {i18n.t('static.common.active')}
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup check inline>
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    id="active11"
                                                                    name="active"
                                                                    value={false}
                                                                    checked={this.state.active === false}
                                                                    onChange={(e) => { this.dataChange(e) }}
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    check htmlFor="inline-radio2">
                                                                    {i18n.t('static.common.disabled')}
                                                                </Label>
                                                            </FormGroup>
                                                        </FormGroup>
                                                    </div>

                                                    <div className="col-md-12" style={{ display: 'inline-block' }}>
                                                        {!this.state.treeFlag && <><div><b>Missing Planning Units:</b></div><br /></>}
                                                        <div id="missingPUJexcel" className="RowClickable">
                                                        </div>
                                                    </div>
                                                    <FormGroup className="col-md-12 float-right pt-lg-4">
                                                        <Button type="button" color="danger" className="mr-1 float-right" size="md" onClick={this.modelOpenClose}><i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                                        <Button type="submit" color="success" className="mr-1 float-right" size="md" onClick={() => this.touchAll(setTouched, errors)}><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                                        &nbsp;

                                                    </FormGroup>
                                                </div>

                                                {/* <CardFooter>
                                                        <FormGroup>
                                                            <Button type="button" color="danger" className="mr-1 float-right" size="md" onClick={this.modelOpenClose}><i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                                            <Button type="submit" color="success" className="mr-1 float-right" size="md" onClick={() => this.touchAll(setTouched, errors)}><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                                            &nbsp;

                                                        </FormGroup>
                                                    </CardFooter> */}
                                            </Form>

                                        )} />

                                {/* </Card> */}
                            </Col>
                            <br />
                        </ModalBody>
                    </Modal>

                </Card>

            </div >
        );
    }
}