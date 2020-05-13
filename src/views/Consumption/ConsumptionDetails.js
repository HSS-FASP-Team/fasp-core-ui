import React from "react";
import ReactDOM from 'react-dom';
import jexcel from 'jexcel';
// import "./style.css";
import "../../../node_modules/jexcel/dist/jexcel.css";
import * as JsStoreFunctions from "../../CommonComponent/JsStoreFunctions.js";
import {
    Card, CardBody, CardHeader,
    Label, Input, FormGroup,
    CardFooter, Button, Col, Form, InputGroup, InputGroupAddon
    , FormFeedback, Row
} from 'reactstrap';
import { Formik } from 'formik';
import CryptoJS from 'crypto-js'
import { SECRET_KEY } from '../../Constants.js'
import getLabelText from '../../CommonComponent/getLabelText'
import moment from "moment";
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import i18n from '../../i18n';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
const entityname = i18n.t('static.dashboard.consumptiondetails');

export default class ConsumptionDetails extends React.Component {

    constructor(props) {
        super(props);
        this.options = props.options;
        this.state = {
            lang: localStorage.getItem("lang"),
            programList: [],
            categoryList: [],
            productList: [],
            consumptionDataList: [],
            changedFlag: 0,
            planningUnitList: [],
            productCategoryId: '',
        }
        this.getProductList = this.getProductList.bind(this);
        // this.getConsumptionData = this.getConsumptionData.bind(this);
        this.saveData = this.saveData.bind(this)
        this.getPlanningUnitList = this.getPlanningUnitList.bind(this)
        this.formSubmit = this.formSubmit.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
    }

    componentDidMount = function () {
        console.log("In component did mount", new Date())
        const lan = 'en';
        var db1;
        getDatabase();
        var openRequest = indexedDB.open('fasp', 1);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['programData'], 'readwrite');
            var program = transaction.objectStore('programData');
            var getRequest = program.getAll();
            var proList = []
            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                for (var i = 0; i < myResult.length; i++) {
                    if (myResult[i].userId == userId) {
                        var bytes = CryptoJS.AES.decrypt(myResult[i].programName, SECRET_KEY);
                        var programNameLabel = bytes.toString(CryptoJS.enc.Utf8);
                        var programJson = {
                            name: getLabelText(JSON.parse(programNameLabel), this.state.lang) + "~v" + myResult[i].version,
                            id: myResult[i].id
                        }
                        proList[i] = programJson
                    }
                }
                this.setState({
                    programList: proList
                })

            }.bind(this);



            // var categoryTransaction = db1.transaction(['productCategory'], 'readwrite');
            // var categoryOs = categoryTransaction.objectStore('productCategory');
            // var catRequest = categoryOs.getAll();
            // var catList = []
            // catRequest.onerror = function (event) {
            //     // Handle errors!
            // };
            // catRequest.onsuccess = function (event) {
            //     var myResult = [];
            //     myResult = catRequest.result;
            //     for (var i = 0; i < myResult.length; i++) {
            //         var categoryJson = {
            //             name: myResult[i].label.label_en,
            //             id: myResult[i].productCategoryId
            //         }
            //         catList[i + 1] = categoryJson
            //     }
            //     this.setState({
            //         categoryList: catList
            //     })
            // }.bind(this);



        }.bind(this)


    };

    // formSubmit() {
    //     var programId = document.getElementById('programId').value;
    //     this.setState({ programId: programId });

    //     const lan = 'en';
    //     var db1;
    //     getDatabase();
    //     var openRequest = indexedDB.open('fasp', 1);

    //     this.el = jexcel(document.getElementById("consumptiontableDiv"), '');
    //     this.el.destroy();
    //     var json = [];
    //     var data = [[], [], [], [], [], [], [], [], [], []];
    //     // var data = [[]];
    //     // json[0] = data;
    //     var options = {
    //         data: data,
    //         // colHeaders: [
    //         //     "Month",
    //         //     "Region",
    //         //     "Data source",
    //         //     "Country SKU",
    //         //     "SKU Code",
    //         //     "Conversion units",
    //         //     "Quantity",
    //         //     "Planning Unit Qty",
    //         //     "Quantity",
    //         //     "Planning Unit Qty",
    //         //     "Quantity",
    //         //     "Planning Unit Qty",
    //         //     "Quantity",
    //         //     "Planning Unit Qty",
    //         //     "Notes",
    //         //     "Create date",
    //         //     "Created By",
    //         //     "Last Modified date",
    //         //     "Last Modified by"
    //         // ],
    //         // nestedHeaders: [
    //         //     [
    //         //         {
    //         //             title: '',
    //         //             colspan: '5',
    //         //         },
    //         //         {
    //         //             title: 'Expected Stock',
    //         //             colspan: '2'
    //         //         },
    //         //         {
    //         //             title: 'Manual Adjustment',
    //         //             colspan: '2'
    //         //         }, {
    //         //             title: 'Actual Stock count',
    //         //             colspan: '2'
    //         //         },
    //         //         {
    //         //             title: 'Final Adjustment',
    //         //             colspan: '2'
    //         //         },
    //         //         {
    //         //             title: '',
    //         //             colspan: '1',
    //         //         }
    //         //     ],
    //         // ],
    //         columnDrag: true,
    //         colWidths: [180, 180, 180, 180, 180, 180, 180, 180],
    //         columns: [
    //             // { title: 'Month', type: 'text', readOnly: true },
    //             {
    //                 title: 'Data source',
    //                 type: 'dropdown',
    //                 source: ['Data source1', 'Data source2', 'Data source3']
    //             },
    //             {
    //                 title: 'Region',
    //                 type: 'dropdown',
    //                 source: ['Data source1', 'Data source2', 'Data source3']
    //             },
    //             {
    //                 title: 'Quantity',
    //                 type: 'text'
    //             },
    //             {
    //                 title: 'Days of Stock out',
    //                 type: 'text'
    //             },
    //             {
    //                 title: 'StartDate',
    //                 type: 'calendar'
    //             },
    //             {
    //                 title: 'StopDate',
    //                 type: 'calendar'
    //             },
    //             {
    //                 title: 'Consumption Quantity',
    //                 type: 'text'
    //             },
    //             {
    //                 title: 'Active',
    //                 type: 'checkbox'
    //             },


    //             // { title: 'Create date', type: 'text', readOnly: true },
    //             // { title: 'Created By', type: 'text', readOnly: true },
    //             // { title: 'Last Modified date', type: 'text', readOnly: true },
    //             // { title: 'Last Modified by', type: 'text', readOnly: true }
    //         ],
    //         pagination: false,
    //         search: true,
    //         columnSorting: true,
    //         tableOverflow: true,
    //         wordWrap: true,
    //         allowInsertColumn: false,
    //         allowManualInsertColumn: false,
    //         allowDeleteRow: false
    //     };

    //     this.el = jexcel(document.getElementById("consumptiontableDiv"), options);
    // }


    //2
    formSubmit() {
        var programId = document.getElementById('programId').value;
        this.setState({ programId: programId });

        var db1;
        getDatabase();
        var openRequest = indexedDB.open('fasp', 1);

        var dataSourceList = []
        var regionList = []
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;



            var transaction = db1.transaction(['programData'], 'readwrite');
            var programTransaction = transaction.objectStore('programData');
            var programRequest = programTransaction.get(programId);

            programRequest.onsuccess = function (event) {
                var programDataBytes = CryptoJS.AES.decrypt(programRequest.result.programData, SECRET_KEY);
                var programData = programDataBytes.toString(CryptoJS.enc.Utf8);
                var programJson = JSON.parse(programData);

                var dataSourceTransaction = db1.transaction(['dataSource'], 'readwrite');
                var dataSourceOs = dataSourceTransaction.objectStore('dataSource');
                var dataSourceRequest = dataSourceOs.getAll();
                dataSourceRequest.onsuccess = function (event) {
                    var dataSourceResult = [];
                    dataSourceResult = dataSourceRequest.result;
                    for (var k = 0; k < dataSourceResult.length; k++) {
                        if (dataSourceResult[k].program.id == programJson.programId || dataSourceResult[k].program.id == 0) {
                            if (dataSourceResult[k].realm.id == programJson.realmCountry.realm.realmId) {
                                var dataSourceJson = {
                                    name: dataSourceResult[k].label.label_en,
                                    id: dataSourceResult[k].dataSourceId
                                }
                                dataSourceList[k] = dataSourceJson
                            }
                        }
                    }



                    var regionTransaction = db1.transaction(['region'], 'readwrite');
                    var regionOs = regionTransaction.objectStore('region');
                    var regionRequest = regionOs.getAll();
                    regionRequest.onsuccess = function (event) {
                        var regionResult = [];
                        regionResult = regionRequest.result;
                        for (var k = 0; k < regionResult.length; k++) {
                            if (regionResult[k].realmCountry.realmCountryId == programJson.realmCountry.realmCountryId) {
                                var regionJson = {
                                    name: regionResult[k].label.label_en,
                                    id: regionResult[k].regionId
                                }
                                regionList[k] = regionJson
                            }
                        }


                        var planningUnitTransaction = db1.transaction(['planningUnit'], 'readwrite');
                        var planningUnitOs = planningUnitTransaction.objectStore('planningUnit');
                        var planningUnitRequest = planningUnitOs.getAll();
                        var productCategoryId = 0;

                        var e = document.getElementById("planningUnitId");
                        var selectedPlanningUnit = e.options[e.selectedIndex].value;
                        planningUnitRequest.onsuccess = function (event) {
                            var planningUnitResult = [];
                            planningUnitResult = planningUnitRequest.result;
                            for (var k = 0; k < planningUnitResult.length; k++) {
                                if (selectedPlanningUnit == planningUnitResult[k].planningUnitId) {
                                    productCategoryId = planningUnitResult[k].forecastingUnit.productCategory.id;
                                    console.log("productCategoryId-----111------ ", productCategoryId);
                                    this.setState({
                                        productCategoryId: productCategoryId
                                    })
                                }
                            }
                        }.bind(this);


                        // Get inventory data from program
                        var plannigUnitId = document.getElementById("planningUnitId").value;
                        // var consumptionList = (programJson.consumptionList).filter(c => c.planningUnit.id == plannigUnitId);
                        var consumptionList = (programJson.consumptionList);
                        // var consumptionDataList = [];
                        // var consumptionDataArr = [];
                        // for (var i = 0; i < programProductList.length; i++) {
                        //     if (programProductList[i].product.productId == this.state.productId) {
                        //         consumptionDataList = programProductList[i].product.consumptionData;
                        //     }
                        // }
                        this.setState({
                            consumptionList: consumptionList
                        });
                        console.log("consumption list----", consumptionList);
                        var data = [];
                        var consumptionDataArr = []

                        // if (consumptionList.length == 0) {
                        //     data = [];
                        //     consumptionDataArr[0] = data;
                        // }
                        var count = 0;
                        for (var j = 0; j < consumptionList.length; j++) {
                            if (consumptionList[j].planningUnit.id == plannigUnitId) {
                                data = [];
                                data[0] = consumptionList[j].consumptionDate;
                                data[1] = consumptionList[j].region.id;
                                data[2] = consumptionList[j].consumptionQty;
                                data[3] = consumptionList[j].dayOfStockOut;
                                data[4] = consumptionList[j].dataSource.id;
                                // data[5] = consumptionList[j].notes;
                                if (consumptionList[j].notes === null || consumptionList[j].notes === ' NULL') {
                                    data[5] = '';
                                } else {
                                    data[5] = consumptionList[j].notes;
                                }
                                data[6] = consumptionList[j].actualFlag;
                                data[7] = consumptionList[j].active;
                                data[8] = j;
                                consumptionDataArr[count] = data;
                                count++;
                            }
                        }
                        if (consumptionDataArr.length == 0) {
                            data = [];
                            data[7] = true;
                            consumptionDataArr[0] = data;
                        }

                        console.log("consumption aray-->", consumptionDataArr);
                        this.el = jexcel(document.getElementById("consumptiontableDiv"), '');
                        this.el.destroy();
                        var json = [];
                        var data = consumptionDataArr;
                        // var data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
                        // json[0] = data;
                        var options = {
                            data: data,
                            columnDrag: true,
                            colWidths: [130, 130, 120, 120, 100, 100, 100, 100],
                            columns: [
                                // { title: 'Month', type: 'text', readOnly: true },
                                {
                                    title: 'Consumption Date',
                                    type: 'calendar'
                                },
                                {
                                    title: i18n.t('static.inventory.region'),
                                    type: 'dropdown',
                                    source: regionList
                                },
                                {
                                    title: i18n.t('static.consumption.consumptionqty'),
                                    type: 'numeric'
                                },
                                {
                                    title: i18n.t('static.consumption.daysofstockout'),
                                    type: 'numeric'
                                },
                                {
                                    title: i18n.t('static.inventory.dataSource'),
                                    type: 'dropdown',
                                    source: dataSourceList
                                },
                                {
                                    title: 'Notes',
                                    type: 'text'
                                },
                                {
                                    title: i18n.t('static.consumption.actualflag'),
                                    type: 'dropdown',
                                    source: [{ id: true, name: i18n.t('static.consumption.actual') }, { id: false, name: i18n.t('static.consumption.forcast') }]
                                },
                                {
                                    title: i18n.t('static.common.active'),
                                    type: 'checkbox'
                                },
                                {
                                    title: 'Index',
                                    type: 'hidden'
                                }



                                // { title: 'Create date', type: 'text', readOnly: true },
                                // { title: 'Created By', type: 'text', readOnly: true },
                                // { title: 'Last Modified date', type: 'text', readOnly: true },
                                // { title: 'Last Modified by', type: 'text', readOnly: true }
                            ],
                            pagination: 10,
                            search: true,
                            columnSorting: true,
                            tableOverflow: true,
                            wordWrap: true,
                            allowInsertColumn: false,
                            allowManualInsertColumn: false,
                            allowDeleteRow: false,
                            onchange: this.changed,
                            oneditionend: this.onedit,
                            copyCompatibility: true,
                            paginationOptions: [10, 25, 50, 100],
                            position: 'top'
                        };

                        this.el = jexcel(document.getElementById("consumptiontableDiv"), options);
                    }.bind(this)
                }.bind(this)
            }.bind(this)
        }.bind(this)
    }









    addRow = function () {
        // document.getElementById("saveButtonDiv").style.display = "block";
        // this.el.insertRow();
        // var json = this.el.getJson();
        var data = [];
        data[0] = "";
        data[1] = "";
        data[2] = "";
        data[3] = "";
        data[4] = "";
        data[5] = "";
        data[6] = "";
        data[7] = true;
        data[8] = -1;
        this.el.insertRow(
            data
        );
    };

    // checkValidation() {
    // var valid = true;
    // var json = this.el.getJson();
    // console.log(json)
    // for (var y = 0; y < json.length; y++) {
    //     var col = ("A").concat(parseInt(y) + 1);
    //     var value = this.el.getValueFromCoords(0, y);
    //     if (value == "Invalid date" || value == "") {
    //         this.el.setStyle(col, "background-color", "transparent");
    //         this.el.setStyle(col, "background-color", "yellow");
    //         this.el.setComments(col, `${REQUIRED_MSG}`);
    //         valid = false;
    //     } else {
    //         this.el.setStyle(col, "background-color", "transparent");
    //         this.el.setComments(col, "");
    //     }

    //     var col = ("B").concat(parseInt(y) + 1);
    //     var value = this.el.getValueFromCoords(1, y);
    //     if (value == "Invalid date" || value == "") {
    //         this.el.setStyle(col, "background-color", "transparent");
    //         this.el.setStyle(col, "background-color", "yellow");
    //         this.el.setComments(col, `${REQUIRED_MSG}`);
    //         valid = false;
    //     } else {
    //         if (Date.parse(this.el.getValueFromCoords(0, y)) > Date.parse(value)) {
    //             this.el.setStyle(col, "background-color", "transparent");
    //             this.el.setStyle(col, "background-color", "yellow");
    //             this.el.setComments(col, `${STOP_DATE_GREATER}`);
    //             valid = false;
    //         } else {
    //             this.el.setStyle(col, "background-color", "transparent");
    //             this.el.setComments(col, "");
    //         }
    //     }

    //     var col = ("C").concat(parseInt(y) + 1);
    //     var value = this.el.getValueFromCoords(2, y);
    //     if (value == "") {
    //         this.el.setStyle(col, "background-color", "transparent");
    //         this.el.setStyle(col, "background-color", "yellow");
    //         this.el.setComments(col, `${REQUIRED_MSG}`);
    //         valid = false;
    //     } else {
    //         this.el.setStyle(col, "background-color", "transparent");
    //         this.el.setComments(col, "");
    //     }

    //     var col = ("D").concat(parseInt(y) + 1);
    //     var value = this.el.getValueFromCoords(3, y);
    //     console.log(value);
    //     if (value === "") {
    //         console.log("in value is blank");
    //         this.el.setStyle(col, "background-color", "transparent");
    //         this.el.setStyle(col, "background-color", "yellow");
    //         this.el.setComments(col, `${REQUIRED_MSG}`);
    //         valid = false;
    //     } else {
    //         if (value >= 0) {
    //             console.log("in value greater than 0")
    //             this.el.setStyle(col, "background-color", "transparent");
    //             this.el.setComments(col, "");
    //         } else {
    //             console.log("in else for days of stock out");
    //             this.el.setStyle(col, "background-color", "transparent");
    //             this.el.setStyle(col, "background-color", "yellow");
    //             this.el.setComments(col, `${NUMERIC_ONLY}`);
    //             valid = false;
    //         }
    //     }
    //     var col = ("E").concat(parseInt(y) + 1);
    //     var value = this.el.getValueFromCoords(4, y);
    //     if (value == "") {
    //         this.el.setStyle(col, "background-color", "transparent");
    //         this.el.setStyle(col, "background-color", "yellow");
    //         this.el.setComments(col, `${REQUIRED_MSG}`);
    //         valid = false;
    //     } else {
    //         this.el.setStyle(col, "background-color", "transparent");
    //         this.el.setComments(col, "");
    //     }

    //     var col1 = ("F").concat(parseInt(y) + 1);
    //     var value1 = this.el.getValueFromCoords(5, y);

    //     var col2 = ("G").concat(parseInt(y) + 1);
    //     var value2 = this.el.getValueFromCoords(6, y);
    //     if (value1 == "" && value2 == "") {
    //         this.el.setStyle(col1, "background-color", "transparent");
    //         this.el.setStyle(col1, "background-color", "yellow");
    //         this.el.setComments(col1, `${EITHER_LU_OR_PU}`);
    //         this.el.setStyle(col2, "background-color", "transparent");
    //         this.el.setStyle(col2, "background-color", "yellow");
    //         this.el.setComments(col2, `${EITHER_LU_OR_PU}`);
    //         valid = false;
    //     } else {
    //         this.el.setStyle(col1, "background-color", "transparent");
    //         this.el.setComments(col1, "");
    //         this.el.setStyle(col2, "background-color", "transparent");
    //         this.el.setComments(col2, "");
    //     }

    //     var col = ("H").concat(parseInt(y) + 1);
    //     var value = this.el.getValueFromCoords(7, y);
    //     if (value2 > 0) {
    //         if (value == "") {
    //             this.el.setStyle(col, "background-color", "transparent");
    //             this.el.setStyle(col, "background-color", "yellow");
    //             this.el.setComments(col, `${REQUIRED_MSG}`);
    //             valid = false;
    //         } else {
    //             if (value > 0) {
    //                 console.log("in value greater than 0")
    //                 this.el.setStyle(col, "background-color", "transparent");
    //                 this.el.setComments(col, "");
    //             } else {
    //                 console.log("in else for days of stock out");
    //                 this.el.setStyle(col, "background-color", "transparent");
    //                 this.el.setStyle(col, "background-color", "yellow");
    //                 this.el.setComments(col, `${NUMERIC_VALUE_GREATER_THAN_0}`);
    //                 valid = false;
    //             }
    //         }
    //     }
    //     var col = ("L").concat(parseInt(y) + 1);
    //     var value = this.el.getValueFromCoords(11, y);
    //     console.log(value);
    //     if (value === "") {
    //         console.log("in value is blank");
    //         this.el.setStyle(col, "background-color", "transparent");
    //         this.el.setStyle(col, "background-color", "yellow");
    //         this.el.setComments(col, `${REQUIRED_MSG}`);
    //         valid = false;
    //     } else {
    //         if (value > 0) {
    //             console.log("in value greater than 0")
    //             this.el.setStyle(col, "background-color", "transparent");
    //             this.el.setComments(col, "");
    //         } else {
    //             console.log("in else for days of stock out");
    //             this.el.setStyle(col, "background-color", "transparent");
    //             this.el.setStyle(col, "background-color", "yellow");
    //             this.el.setComments(col, `${NUMERIC_VALUE_GREATER_THAN_0}`);
    //             valid = false;
    //         }
    //     }
    // }
    // return valid;
    // }

    saveData = function () {
        // var validation = this.checkValidation();
        // if (validation == true) {
        //     console.log("after check validation")
        //     var tableJson = this.el.getJson();
        //     var db1;
        //     var storeOS;
        //     var openRequest = indexedDB.open('fasp', 1);
        //     openRequest.onupgradeneeded = function (e) {
        //         var db1 = e.target.result;
        //         if (!db1.objectStoreNames.contains('programData')) {
        //             storeOS = db1.createObjectStore('programData', { keyPath: 'id', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('lastSyncDate')) {
        //             storeOS = db1.createObjectStore('lastSyncDate', { keyPath: 'id', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('language')) {
        //             storeOS = db1.createObjectStore('language', { keyPath: 'languageId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('country')) {
        //             storeOS = db1.createObjectStore('country', { keyPath: 'countryId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('currency')) {
        //             storeOS = db1.createObjectStore('currency', { keyPath: 'currencyId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('unit')) {
        //             storeOS = db1.createObjectStore('unit', { keyPath: 'unitId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('unitType')) {
        //             storeOS = db1.createObjectStore('unitType', { keyPath: 'unitTypeId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('organisation')) {
        //             storeOS = db1.createObjectStore('organisation', { keyPath: 'organisationId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('healthArea')) {
        //             storeOS = db1.createObjectStore('healthArea', { keyPath: 'healthAreaId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('region')) {
        //             storeOS = db1.createObjectStore('region', { keyPath: 'regionId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('fundingSource')) {
        //             storeOS = db1.createObjectStore('fundingSource', { keyPath: 'fundingSourceId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('subFundingSource')) {
        //             storeOS = db1.createObjectStore('subFundingSource', { keyPath: 'subFundingSourceId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('product')) {
        //             storeOS = db1.createObjectStore('product', { keyPath: 'productId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('productCategory')) {
        //             storeOS = db1.createObjectStore('productCategory', { keyPath: 'productCategoryId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('dataSource')) {
        //             storeOS = db1.createObjectStore('dataSource', { keyPath: 'dataSourceId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('dataSourceType')) {
        //             storeOS = db1.createObjectStore('dataSourceType', { keyPath: 'dataSourceTypeId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('shipmentStatus')) {
        //             storeOS = db1.createObjectStore('shipmentStatus', { keyPath: 'shipmentStatusId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('shipmentStatusAllowed')) {
        //             storeOS = db1.createObjectStore('shipmentStatusAllowed', { keyPath: 'shipmentStatusAllowedId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('manufacturer')) {
        //             storeOS = db1.createObjectStore('manufacturer', { keyPath: 'manufacturerId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('logisticsUnit')) {
        //             storeOS = db1.createObjectStore('logisticsUnit', { keyPath: 'logisticsUnitId', autoIncrement: true });
        //         }
        //         if (!db1.objectStoreNames.contains('planningUnit')) {
        //             storeOS = db1.createObjectStore('planningUnit', { keyPath: 'planningUnitId', autoIncrement: true });
        //         }
        //     };
        //     openRequest.onsuccess = function (e) {
        //         db1 = e.target.result;
        //         var transaction = db1.transaction(['programData'], 'readwrite');
        //         var programTransaction = transaction.objectStore('programData');
        //         var programRequest = programTransaction.get(this.state.programId);
        //         programRequest.onsuccess = function (event) {
        //             var programDataBytes = CryptoJS.AES.decrypt(programRequest.result.programData, SECRET_KEY);
        //             var programData = programDataBytes.toString(CryptoJS.enc.Utf8);
        //             var programJson = JSON.parse(programData);
        //             var programProductList = programJson.programProductList;
        //             var consumptionDataList = [];
        //             var consumptionDataArr = [];
        //             for (var i = 0; i < programProductList.length; i++) {
        //                 if (programProductList[i].product.productId == this.state.productId) {
        //                     consumptionDataList = programProductList[i].product.consumptionData;
        //                 }
        //             }
        //             for (var i = 0; i < consumptionDataList.length; i++) {
        //                 var map = new Map(Object.entries(tableJson[i]))
        //                 consumptionDataList[i].startDate = map.get("0");
        //                 consumptionDataList[i].stopDate = map.get("1");
        //                 consumptionDataList[i].region.regionId = map.get("2");
        //                 consumptionDataList[i].daysOfStockOut = parseInt(map.get("3"));
        //                 consumptionDataList[i].dataSource.dataSourceId = map.get("4");
        //                 consumptionDataList[i].logisticsUnit.logisticsUnitId = map.get("5");
        //                 consumptionDataList[i].planningUnit.planningUnitId = map.get("6");
        //                 consumptionDataList[i].packSize = map.get("7");
        //                 consumptionDataList[i].logisticsUnit.qtyOfPlanningUnits = map.get("8");
        //                 consumptionDataList[i].logisticsUnit.planningUnit.qtyOfForecastingUnits = map.get("9");
        //                 consumptionDataList[i].planningUnit.qtyOfForecastingUnits = map.get("10");
        //                 consumptionDataList[i].consumptionQty = map.get("11");
        //             }
        //             for (var i = consumptionDataList.length; i < tableJson.length; i++) {
        //                 var map = new Map(Object.entries(tableJson[i]))
        //                 var json = {
        //                     startDate: map.get("0"),
        //                     stopDate: map.get("1"),
        //                     region: {
        //                         regionId: map.get("2")
        //                     },
        //                     daysOfStockOut: map.get("3"),
        //                     dataSource: {
        //                         dataSourceId: map.get("4")
        //                     },
        //                     logisticsUnit: {
        //                         logisticsUnitId: map.get("5"),
        //                         qtyOfPlanningUnits: map.get("8"),
        //                         planningUnit: {
        //                             qtyOfForecastingUnits: map.get("9")
        //                         }
        //                     },
        //                     planningUnit: {
        //                         planningUnitId: map.get("6"),
        //                         qtyOfForecastingUnits: map.get("10")
        //                     },
        //                     packSize: map.get("7"),
        //                     consumptionQty: map.get("11")
        //                 }
        //                 consumptionDataList[i] = json;
        //             }
        //             var productFound = 0;
        //             for (var i = 0; i < programProductList.length; i++) {
        //                 if (programProductList[i].product.productId == this.state.productId) {
        //                     productFound = 1;
        //                     programProductList[i].product.consumptionData = consumptionDataList;
        //                 }
        //             }
        //             if (productFound == 0) {
        //                 var length = programProductList.length;
        //                 programProductList[length] = {
        //                     product: {}
        //                 }
        //                 programProductList[length].product = {
        //                     productId: this.state.productId,
        //                     consumptionData: consumptionDataList
        //                 }

        //             }
        //             programJson.programProductList = programProductList;
        //             programRequest.result.programData = (CryptoJS.AES.encrypt(JSON.stringify(programJson), SECRET_KEY)).toString();
        //             var putRequest = programTransaction.put(programRequest.result);

        //             putRequest.onerror = function (event) {
        //                 // Handle errors!
        //             };
        //             putRequest.onsuccess = function (event) {
        //                 $("#saveButtonDiv").hide();
        //                 this.setState({
        //                     message: `${CONSUMPTION_SAVE_SUCCESS}`,
        //                     changedFlag: 0
        //                 })
        //             }.bind(this)
        //         }.bind(this)
        //     }.bind(this)
        // } else {
        //     this.setState({
        //         message: `${INVALID_DATA}`
        //     })
        // }

        var validation = this.checkValidation();
        if (validation == true) {
            this.setState(
                {
                    changedFlag: 0
                }
            );
            console.log("all good...", this.el.getJson());
            var tableJson = this.el.getJson();
            var db1;
            var storeOS;
            getDatabase();
            var openRequest = indexedDB.open('fasp', 1);
            openRequest.onsuccess = function (e) {
                db1 = e.target.result;
                var transaction = db1.transaction(['programData'], 'readwrite');
                var programTransaction = transaction.objectStore('programData');

                var programId = (document.getElementById("programId").value);

                var programRequest = programTransaction.get(programId);
                programRequest.onsuccess = function (event) {
                    // console.log("(programRequest.result)----", (programRequest.result))
                    var programDataBytes = CryptoJS.AES.decrypt((programRequest.result).programData, SECRET_KEY);
                    var programData = programDataBytes.toString(CryptoJS.enc.Utf8);
                    var programJson = JSON.parse(programData);
                    var plannigUnitId = document.getElementById("planningUnitId").value;

                    var consumptionDataList = (programJson.consumptionList).filter(c => c.planningUnit.id == plannigUnitId);
                    var consumptionDataListNotFiltered = programJson.consumptionList;

                    // console.log("000000000000000   ", consumptionDataList)
                    // var count = 0;
                    for (var i = 0; i < consumptionDataList.length; i++) {
                        // if (consumptionDataList[count] != undefined) {
                        // if (consumptionDataList[count].consumptionId == consumptionDataListNotFiltered[i].consumptionId) {
                        // if (consumptionDataList[count].consumptionId == consumptionDataListNotFiltered[i].consumptionId && consumptionDataList[count].planningUnit.id == consumptionDataListNotFiltered[i].planningUnit.id) {
                        var map = new Map(Object.entries(tableJson[i]));
                        consumptionDataListNotFiltered[parseInt(map.get("8"))].consumptionDate = moment(map.get("0")).format("YYYY-MM-DD");
                        consumptionDataListNotFiltered[parseInt(map.get("8"))].region.id = map.get("1");
                        consumptionDataListNotFiltered[parseInt(map.get("8"))].consumptionQty = map.get("2");
                        consumptionDataListNotFiltered[parseInt(map.get("8"))].dayOfStockOut = parseInt(map.get("3"));
                        consumptionDataListNotFiltered[parseInt(map.get("8"))].dataSource.id = map.get("4");
                        consumptionDataListNotFiltered[parseInt(map.get("8"))].notes = map.get("5");
                        consumptionDataListNotFiltered[parseInt(map.get("8"))].actualFlag = map.get("6");
                        consumptionDataListNotFiltered[parseInt(map.get("8"))].active = map.get("7");

                        // if (consumptionDataList.length >= count) {
                        //     count++;
                        // }
                        // }

                        // }

                    }


                    console.log("productCategoryId--2222-->>>>>>>>> ", this.state.productCategoryId);
                    for (var i = consumptionDataList.length; i < tableJson.length; i++) {
                        var map = new Map(Object.entries(tableJson[i]))
                        var json = {
                            consumptionId: 0,
                            consumptionDate: moment(map.get("0")).format("YYYY-MM-DD"),
                            region: {
                                id: map.get("1")
                            },
                            consumptionQty: map.get("2"),
                            dayOfStockOut: parseInt(map.get("3")),
                            dataSource: {
                                id: map.get("4")
                            },
                            notes: map.get("5"),
                            actualFlag: map.get("6"),
                            active: map.get("7"),

                            // planningUnit: {
                            //     id: plannigUnitId
                            // }
                            planningUnit: {
                                id: plannigUnitId,
                                forecastingUnit: {
                                    productCategory: {
                                        id: this.state.productCategoryId
                                    }
                                }
                            }
                        }
                        consumptionDataList.push(json);
                        consumptionDataListNotFiltered.push(json);
                    }


                    console.log("1111111111111111111   ", consumptionDataList)
                    programJson.consumptionList = consumptionDataListNotFiltered;
                    programRequest.result.programData = (CryptoJS.AES.encrypt(JSON.stringify(programJson), SECRET_KEY)).toString();
                    var putRequest = programTransaction.put(programRequest.result);

                    putRequest.onerror = function (event) {
                        // Handle errors!
                    };
                    putRequest.onsuccess = function (event) {
                        // $("#saveButtonDiv").hide();
                        this.setState({
                            message: 'static.message.consumptionSaved',
                            changedFlag: 0
                        })
                        // this.props.history.push(`/consumptionDetails/${document.getElementById('programId').value}/${document.getElementById("planningUnitId").value}/` + i18n.t('static.message.consumptionSuccess'))
                        this.props.history.push(`/consumptionDetails/` + i18n.t('static.message.consumptionSuccess'));
                    }.bind(this)
                }.bind(this)
            }.bind(this)


        } else {
            console.log("some thing get wrong...");
        }

    }.bind(this);

    render() {
        const lan = 'en';
        const { programList } = this.state;
        let programs = programList.length > 0
            && programList.map((item, i) => {
                return (
                    //             // {this.getText(dataSource.label,lan)}
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);

        // const { categoryList } = this.state;
        // let categories = categoryList.length > 0
        //     && categoryList.map((item, i) => {
        //         return (
        //             <option key={i} value={item.id}>{item.name}</option>
        //         )
        //     }, this);
        // const { productList } = this.state;
        // let products = productList.length > 0
        //     && productList.map((item, i) => {
        //         return (
        //             <option key={i} value={item.id}>{item.name}</option>
        //         )
        //     }, this);
        const { planningUnitList } = this.state;
        let planningUnits = planningUnitList.length > 0
            && planningUnitList.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.name}</option>
                )
            }, this);
        return (
            // <>
            //     <Col xs="12" sm="12">
            //         <Card>
            //             <CardHeader>
            //                 <strong>Inventory details</strong>
            //             </CardHeader>
            //             <CardBody>
            //                 <Formik
            //                     render={
            //                         ({
            //                         }) => (
            //                                 <Form name='simpleForm'>
            //                                     <CardHeader>
            //                                         <strong>Consumption details</strong>
            //                                     </CardHeader>
            //                                     <CardBody>
            //                                         <Card className="card-accent-success">
            //                                             {/* <Col xs="8" sm="8"> */}
            //                                             <Row>
            //                                                 <Col md="1"></Col>
            //                                                 <Col md="3">
            //                                                     <br />
            //                                                     <Label htmlFor="select">Program</Label><br />
            //                                                     <Input type="select"
            //                                                         bsSize="sm"
            //                                                         value={this.state.programId}
            //                                                         name="programId" id="programId"
            //                                                         onChange={(e) => { this.getPlanningUnitList(e) }}
            //                                                     >
            //                                                         <option value="0">Please select</option>
            //                                                         {programs}
            //                                                     </Input><br />
            //                                                 </Col>
            //                                                 <Col md="3">
            //                                                     <br />
            //                                                     <Label htmlFor="select">Planning Unit</Label><br />
            //                                                     <Input type="select"
            //                                                         bsSize="sm"
            //                                                         value={this.state.planningUnitId}
            //                                                         name="planningUnitId" id="planningUnitId"
            //                                                     // onChange={(e) => { this.getProductList(e) }}
            //                                                     >
            //                                                         <option value="0">Please select</option>
            //                                                         {planningUnits}
            //                                                     </Input><br />
            //                                                 </Col>
            //                                                 {/* <Col md="3">
            //                                                 <br />
            //                                                 <Label htmlFor="select">Product category</Label><br />
            //                                                 <Input type="select"
            //                                                     bsSize="sm"
            //                                                     value={this.state.productCategoryId}
            //                                                     name="categoryId" id="categoryId"
            //                                                     onChange={(e) => { this.getProductList(e) }}>
            //                                                     <option value="0">Please select</option>
            //                                                     {categories}
            //                                                 </Input><br />
            //                                             </Col>
            //                                             <Col md="3">
            //                                                 <br />
            //                                                 <Label htmlFor="select">Product</Label><br />
            //                                                 <Input type="select"
            //                                                     bsSize="sm"
            //                                                     value={this.state.productId}
            //                                                     name="productId" id="productId">
            //                                                     <option value="0">Please select</option>
            //                                                     {products}
            //                                                 </Input><br />
            //                                             </Col> */}
            //                                                 <Col md="1">
            //                                                     <br /><br />
            //                                                     <FormGroup>
            //                                                         <Button type="button" size="sm" color="primary" className="float-right btn btn-secondary Gobtn btn-sm mt-2" onClick={() => this.formSubmit()}> Go</Button>
            //                                                         &nbsp;
            //                                                 </FormGroup>
            //                                                     {/* <Button type="button" onClick={() => this.formSubmit()} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i>Go</Button> */}
            //                                                 </Col>
            //                                             </Row>
            //                                             {/* </Col> */}
            //                                         </Card>
            //                                     </CardBody>
            //                                 </Form>
            //                             )} />
            //             </CardBody>
            //         </Card>
            //     </Col>
            //     <Col xs="12" sm="12">
            //         <Card>
            //             <CardHeader>
            //                 <strong>Consumption details</strong>
            //             </CardHeader>
            //             <CardBody>
            //                 <div className="table-responsive"><div id="consumptiontableDiv" >
            //                 </div></div>

            //             </CardBody>
            //             <CardFooter>
            //                 <input type="button" value='Add Row' onClick={() => this.addRow()} />
            //             </CardFooter>
            //             <CardFooter>
            //                 <input type='button' value='Save Data' onClick={() => this.saveData()}></input>
            //             </CardFooter>
            //         </Card>
            //     </Col>
            // </>


            <div className="animated fadeIn">
                <AuthenticationServiceComponent history={this.props.history} message={(message) => {
                    this.setState({ message: message })
                }} />
                <h5>{i18n.t(this.props.match.params.message, { entityname })}</h5>
                <h5>{i18n.t(this.state.message, { entityname })}</h5>
                <Col xs="12" sm="12">
                    <Card>

                        <CardHeader>
                            <strong>{i18n.t('static.consumption.consumptionadd')}</strong>
                        </CardHeader>
                        <CardBody>
                            <Formik
                                render={
                                    ({
                                    }) => (
                                            <Form name='simpleForm'>

                                                <Col md="9 pl-0">
                                                    <div className="d-md-flex">
                                                        <FormGroup className="tab-ml-1">
                                                            <Label htmlFor="appendedInputButton">{i18n.t('static.consumption.program')}</Label>
                                                            <div className="controls SelectGo">
                                                                <InputGroup>
                                                                    <Input type="select"
                                                                        bsSize="sm"
                                                                        value={this.state.programId}
                                                                        name="programId" id="programId"
                                                                        onChange={this.getPlanningUnitList}
                                                                    >
                                                                        <option value="0">{i18n.t('static.common.select')}</option>
                                                                        {programs}
                                                                    </Input>
                                                                </InputGroup>
                                                            </div>
                                                        </FormGroup>
                                                        <FormGroup className="tab-ml-1">
                                                            <Label htmlFor="appendedInputButton">{i18n.t('static.consumption.planningunit')}</Label>
                                                            <div className="controls SelectGo">
                                                                <InputGroup>
                                                                    <Input
                                                                        type="select"
                                                                        name="planningUnitId"
                                                                        id="planningUnitId"
                                                                        bsSize="sm"
                                                                        value={this.state.planningUnitId}
                                                                    >
                                                                        <option value="0">{i18n.t('static.common.select')}</option>
                                                                        {planningUnits}
                                                                    </Input>
                                                                    <InputGroupAddon addonType="append">
                                                                        <Button color="secondary Gobtn btn-sm" onClick={this.formSubmit}>{i18n.t('static.common.go')}</Button>
                                                                    </InputGroupAddon>
                                                                </InputGroup>
                                                            </div>
                                                        </FormGroup>
                                                    </div>
                                                </Col>
                                            </Form>
                                        )} />

                            <Col xs="12" sm="12">
                                <div className="table-responsive">
                                    <div id="consumptiontableDiv">
                                    </div>
                                </div>
                            </Col>
                        </CardBody>
                        <CardFooter>
                            <FormGroup>
                                <Button type="button" size="md" color="danger" className="float-right mr-1" onClick={this.cancelClicked}><i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                <Button type="submit" size="md" color="success" className="float-right mr-1" onClick={() => this.saveData()} ><i className="fa fa-check"></i>{i18n.t('static.common.saveData')}</Button>
                                <Button type="submit" size="md" color="success" className="float-right mr-1" onClick={() => this.addRow()} ><i className="fa fa-check"></i>{i18n.t('static.common.addRow')}</Button>

                                &nbsp;
</FormGroup>
                        </CardFooter>
                    </Card>
                </Col>

            </div >




            // <div>
            //     <div class="row">
            //         <div class="col-md-12">
            //             <div class="panel panel-default">
            //                 <div class="panel-heading">
            //                     <h3 class="panel-title">{TITLE_CONSUMPTION_DETAILS}</h3>
            //                 </div>
            //                 <div class="panel-body">
            //                     {this.state.message}
            //                     <div id="filter">
            //                         <div class="panel panel-warning">
            //                             <div class="panel-body">
            //                                 <form name="form1" id="form1">
            //                                     <div class="row">
            //                                         <div class="col-md-2">
            //                                             <div class="form-group">
            //                                                 {PROGRAM} : <select id="programId" name="programId">
            //                                                     {programItems}
            //                                                 </select>
            //                                             </div>
            //                                         </div>
            //                                         <div class="col-md-2">
            //                                             <div class="form-group">
            //                                                 {CATEGORY} : <select id="categoryId" name="categoryId" onChange={this.getProductList}>
            //                                                     {categoryItems}
            //                                                 </select>
            //                                             </div>
            //                                         </div>
            //                                         <div class="col-md-2">
            //                                             <div class="form-group">
            //                                                 {PRODUCT} : <select id="productId" name="productId">
            //                                                     {productItems}
            //                                                 </select>
            //                                             </div>
            //                                         </div>

            //                                         <div class="col-md-2 btn-filter">
            //                                             <button type="button" class="btn-info btn-sm" name="btnSubmit" onClick={this.getConsumptionData}>{BTN_GO}</button>
            //                                         </div>
            //                                     </div>
            //                                 </form>
            //                             </div>
            //                         </div>
            //                     </div>
            //                     <br />
            //                     <br />
            //                     <div id="consumptionId">{this.options}</div>
            //                     <div />
            //                     <br />
            //                     <input
            //                         type="button"
            //                         value={ADD_ROW}
            //                         onClick={() => this.addRow()}
            //                     />
            //                     <div id="saveButtonDiv" style={{ "display": "none" }}>
            //                         <input
            //                             type="button"
            //                             value={BTN_SAVE}
            //                             onClick={() => this.saveData()}
            //                         />
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }

    getProductList(event) {
        console.log("in product list")
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open('fasp', 1);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var productTransaction = db1.transaction(['product'], 'readwrite');
            var productOs = productTransaction.objectStore('product');
            var productRequest = productOs.getAll();
            var proList = []
            productRequest.onerror = function (event) {
                // Handle errors!
            };
            productRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = productRequest.result;
                console.log("myResult", myResult);
                // console.log(event.target.value);
                var categoryId = document.getElementById("categoryId").value;
                console.log(categoryId)
                for (var i = 0; i < myResult.length; i++) {
                    if (myResult[i].productCategory.productCategoryId == categoryId) {
                        var productJson = {
                            name: getLabelText(myResult[i].label, lan),
                            id: myResult[i].productId
                        }
                        proList[i] = productJson
                    }
                }
                this.setState({
                    productList: proList
                })
            }.bind(this);
        }.bind(this)
    }


    getPlanningUnitList(event) {
        console.log("-------------in planning list-------------")
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open('fasp', 1);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['programPlanningUnit'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('programPlanningUnit');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                console.log("myResult", myResult);
                var programId = (document.getElementById("programId").value).split("_")[0];
                console.log('programId----->>>', programId)
                console.log(myResult);
                var proList = []
                for (var i = 0; i < myResult.length; i++) {
                    if (myResult[i].program.id == programId) {
                        var productJson = {
                            name: getLabelText(myResult[i].planningUnit.label, this.state.lang),
                            id: myResult[i].planningUnit.id
                        }
                        proList[i] = productJson
                    }
                }
                console.log("proList---" + proList);
                this.setState({
                    planningUnitList: proList
                })
            }.bind(this);
        }.bind(this)
    }

    // getConsumptionData() {
    // this.setState({
    //     productId: $("#productId").val(),
    //     productCategoryId: $("#categoryId").val(),
    //     programId: $("#programId").val()
    // })
    // if (this.state.changedFlag == 1) {
    //     alert(`${CLICK_SAVE_TO_CONTINUE}`)
    // } else {
    //     this.el = jexcel(ReactDOM.findDOMNode(this).children[0].children[0].children[0].children[1].children[3], '');
    //     this.el.destroy();
    //     var db1;
    //     var storeOS;
    //     var openRequest = indexedDB.open('fasp', 1);
    //     openRequest.onupgradeneeded = function (e) {
    //         var db1 = e.target.result;
    //         if (!db1.objectStoreNames.contains('programData')) {
    //             storeOS = db1.createObjectStore('programData', { keyPath: 'id', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('lastSyncDate')) {
    //             storeOS = db1.createObjectStore('lastSyncDate', { keyPath: 'id', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('language')) {
    //             storeOS = db1.createObjectStore('language', { keyPath: 'languageId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('country')) {
    //             storeOS = db1.createObjectStore('country', { keyPath: 'countryId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('currency')) {
    //             storeOS = db1.createObjectStore('currency', { keyPath: 'currencyId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('unit')) {
    //             storeOS = db1.createObjectStore('unit', { keyPath: 'unitId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('unitType')) {
    //             storeOS = db1.createObjectStore('unitType', { keyPath: 'unitTypeId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('organisation')) {
    //             storeOS = db1.createObjectStore('organisation', { keyPath: 'organisationId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('healthArea')) {
    //             storeOS = db1.createObjectStore('healthArea', { keyPath: 'healthAreaId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('region')) {
    //             storeOS = db1.createObjectStore('region', { keyPath: 'regionId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('fundingSource')) {
    //             storeOS = db1.createObjectStore('fundingSource', { keyPath: 'fundingSourceId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('subFundingSource')) {
    //             storeOS = db1.createObjectStore('subFundingSource', { keyPath: 'subFundingSourceId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('product')) {
    //             storeOS = db1.createObjectStore('product', { keyPath: 'productId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('productCategory')) {
    //             storeOS = db1.createObjectStore('productCategory', { keyPath: 'productCategoryId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('dataSource')) {
    //             storeOS = db1.createObjectStore('dataSource', { keyPath: 'dataSourceId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('dataSourceType')) {
    //             storeOS = db1.createObjectStore('dataSourceType', { keyPath: 'dataSourceTypeId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('shipmentStatus')) {
    //             storeOS = db1.createObjectStore('shipmentStatus', { keyPath: 'shipmentStatusId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('shipmentStatusAllowed')) {
    //             storeOS = db1.createObjectStore('shipmentStatusAllowed', { keyPath: 'shipmentStatusAllowedId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('manufacturer')) {
    //             storeOS = db1.createObjectStore('manufacturer', { keyPath: 'manufacturerId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('logisticsUnit')) {
    //             storeOS = db1.createObjectStore('logisticsUnit', { keyPath: 'logisticsUnitId', autoIncrement: true });
    //         }
    //         if (!db1.objectStoreNames.contains('planningUnit')) {
    //             storeOS = db1.createObjectStore('planningUnit', { keyPath: 'planningUnitId', autoIncrement: true });
    //         }
    //     };
    //     openRequest.onsuccess = function (e) {
    //         db1 = e.target.result;
    //         var transaction = db1.transaction(['programData'], 'readwrite');
    //         var programTransaction = transaction.objectStore('programData');
    //         var programRequest = programTransaction.get(this.state.programId);
    //         programRequest.onsuccess = function (event) {
    //             var programDataBytes = CryptoJS.AES.decrypt(programRequest.result.programData, SECRET_KEY);
    //             var programData = programDataBytes.toString(CryptoJS.enc.Utf8);
    //             var programJson = JSON.parse(programData);
    //             var programProductList = programJson.programProductList;
    //             var consumptionDataList = [];
    //             var consumptionDataArr = [];
    //             for (var i = 0; i < programProductList.length; i++) {
    //                 if (programProductList[i].product.productId == this.state.productId) {
    //                     consumptionDataList = programProductList[i].product.consumptionData;
    //                 }
    //             }
    //             this.setState({
    //                 consumptionDataList: consumptionDataList
    //             })
    //             var data = [];
    //             if (consumptionDataList.length == 0) {
    //                 data = [];
    //                 consumptionDataArr[0] = data;
    //             }
    //             for (var j = 0; j < consumptionDataList.length; j++) {
    //                 data = [];
    //                 data[0] = moment(consumptionDataList[j].startDate).format('YYYY-MM-DD');// A
    //                 data[1] = moment(consumptionDataList[j].stopDate).format('YYYY-MM-DD');//B
    //                 data[2] = consumptionDataList[j].region.regionId;//C
    //                 data[3] = consumptionDataList[j].daysOfStockOut;//D
    //                 data[4] = consumptionDataList[j].dataSource.dataSourceId;//E
    //                 data[5] = consumptionDataList[j].logisticsUnit.logisticsUnitId;//F
    //                 data[6] = consumptionDataList[j].planningUnit.planningUnitId;//G
    //                 data[7] = consumptionDataList[j].packSize;//H
    //                 data[8] = consumptionDataList[j].logisticsUnit.qtyOfPlanningUnits;//I
    //                 data[9] = consumptionDataList[j].logisticsUnit.planningUnit.qtyOfForecastingUnits;//J
    //                 data[10] = consumptionDataList[j].planningUnit.qtyOfForecastingUnits;//K
    //                 data[11] = consumptionDataList[j].consumptionQty;//L
    //                 data[12] = `=IF(F${j + 1}!=0,I${j + 1}*J${j + 1}*L${j + 1},H${j + 1}*K${j + 1}*L${j + 1})`
    //                 consumptionDataArr[j] = data;
    //             }
    //             var regionTransaction = db1.transaction(['region'], 'readwrite');
    //             var regionOs = regionTransaction.objectStore('region');
    //             var regList = []
    //             var regionRequest = regionOs.getAll();
    //             regionRequest.onsuccess = function (event) {
    //                 var regionResult = [];
    //                 regionResult = regionRequest.result;
    //                 for (var k = 0; k < regionResult.length; k++) {
    //                     var regionJson = {
    //                         name: regionResult[k].label.labelEn,
    //                         id: regionResult[k].regionId
    //                     }
    //                     regList[k] = regionJson
    //                 }


    //                 var dataSourceTransaction = db1.transaction(['dataSource'], 'readwrite');
    //                 var dataSourceOs = dataSourceTransaction.objectStore('dataSource');
    //                 var dataSourceList = []
    //                 var dataSourceRequest = dataSourceOs.getAll();
    //                 dataSourceRequest.onsuccess = function (event) {
    //                     var dataSourceResult = [];
    //                     dataSourceResult = dataSourceRequest.result;
    //                     for (var k = 0; k < dataSourceResult.length; k++) {
    //                         var dataSourceJson = {
    //                             name: dataSourceResult[k].label.labelEn,
    //                             id: dataSourceResult[k].dataSourceId
    //                         }
    //                         dataSourceList[k] = dataSourceJson
    //                     }

    //                     var logisticsUnitTransaction = db1.transaction(['logisticsUnit'], 'readwrite');
    //                     var logisticsUnitOs = logisticsUnitTransaction.objectStore('logisticsUnit');
    //                     var logisticsUnitList = []
    //                     var logisticsUnitRequest = logisticsUnitOs.getAll();
    //                     logisticsUnitRequest.onsuccess = function (event) {
    //                         var logisticsUnitResult = [];
    //                         logisticsUnitResult = logisticsUnitRequest.result;
    //                         var logisticsUnitListLength = 0;
    //                         var planningUnitListLength = 0;
    //                         var nothingSelectedJson = {
    //                             name: "",
    //                             id: 0
    //                         }
    //                         logisticsUnitList[logisticsUnitListLength] = nothingSelectedJson;
    //                         console.log("Logistics unit", logisticsUnitResult);
    //                         for (var k = 0; k < logisticsUnitResult.length; k++) {
    //                             if (logisticsUnitResult[k].planningUnit.productId == this.state.productId) {
    //                                 logisticsUnitListLength++;
    //                                 var logisticsUnitJson = {
    //                                     name: logisticsUnitResult[k].label.labelEn,
    //                                     id: logisticsUnitResult[k].logisticsUnitId
    //                                 }
    //                                 logisticsUnitList[logisticsUnitListLength] = logisticsUnitJson
    //                             }
    //                         }
    //                         console.log("Logistics unit list", logisticsUnitList.length);
    //                         var planningUnitTransaction = db1.transaction(['planningUnit'], 'readwrite');
    //                         var planningUnitOs = planningUnitTransaction.objectStore('planningUnit');
    //                         var planningUnitList = []
    //                         var planningUnitRequest = planningUnitOs.getAll();
    //                         planningUnitRequest.onsuccess = function (event) {
    //                             var planningUnitResult = [];
    //                             planningUnitResult = planningUnitRequest.result;
    //                             var nothingSelectedJson = {
    //                                 name: "",
    //                                 id: 0
    //                             }
    //                             planningUnitList[planningUnitListLength] = nothingSelectedJson;
    //                             for (var k = 0; k < planningUnitResult.length; k++) {
    //                                 if (planningUnitResult[k].productId == this.state.productId) {
    //                                     planningUnitListLength++;
    //                                     var planningUnitJson = {
    //                                         name: planningUnitResult[k].label.labelEn,
    //                                         id: planningUnitResult[k].planningUnitId
    //                                     }
    //                                     planningUnitList[planningUnitListLength] = planningUnitJson
    //                                 }
    //                             }

    //                             var options = {
    //                                 data: consumptionDataArr,
    //                                 colHeaders: [
    //                                     `${START_DATE}`,
    //                                     `${STOP_DATE}`,
    //                                     `${REGION}`,
    //                                     `${DAYS_OF_STOCK_OUT}`,
    //                                     `${DATA_SOURCE}`,
    //                                     `${LOGISTICS_UNIT}`,
    //                                     `${PLANNING_UNIT}`,
    //                                     `${PACK_SIZE}`,
    //                                     `${QUANTITY_OF_PLANNING_UNIT}`,
    //                                     `${QUANTITY_OF_FORECAST_UNIT_FOR_LU}`,
    //                                     `${QUANTITY_OF_FORECAST_UNIT_FOR_PU}`,
    //                                     `${QUANTITY}`,
    //                                     `${QUANTITY_IN_TERMS_OF_FORECAST_UNIT}`
    //                                 ],
    //                                 colWidths: [80, 80, 120, 100, 80, 200, 200, 80, 80, 80, 80, 80, 80],
    //                                 columns: [
    //                                     { type: 'calendar', options: { format: 'DD/MM/YYYY' } },
    //                                     { type: 'calendar', options: { format: 'DD/MM/YYYY' } },
    //                                     { type: 'dropdown', source: regList },
    //                                     { type: 'numeric' },
    //                                     { type: 'dropdown', source: dataSourceList },
    //                                     { type: 'dropdown', source: logisticsUnitList },
    //                                     { type: 'dropdown', source: planningUnitList },
    //                                     { type: 'numeric' },
    //                                     { type: 'hidden' },
    //                                     { type: 'hidden' },
    //                                     { type: 'hidden' },
    //                                     { type: 'numeric' },
    //                                     { type: 'numeric', readOnly: true },
    //                                 ],
    //                                 pagination: 10,
    //                                 search: true,
    //                                 columnSorting: true,
    //                                 tableOverflow: true,
    //                                 wordWrap: true,
    //                                 paginationOptions: [25, 50, 75, 100],
    //                                 allowInsertColumn: false,
    //                                 allowManualInsertColumn: false,
    //                                 onchange: this.changed,
    //                                 allowDeleteRow: false
    //                             };
    //                             // this.setState({ 
    //                             // el: jexcel(ReactDOM.findDOMNode(this).children[0].children[0].children[0].children[1].children[3], options)
    //                             // })
    //                             this.el = jexcel(ReactDOM.findDOMNode(this).children[0].children[0].children[0].children[1].children[3], options);


    //                         }.bind(this)
    //                     }.bind(this)
    //                 }.bind(this)
    //             }.bind(this)
    //         }.bind(this)
    //     }.bind(this);
    // }
    // }

    changed = function (instance, cell, x, y, value) {
        //     $("#saveButtonDiv").show();
        //     this.setState({
        //         changedFlag: 1
        //     })
        //     if (x == 0) {
        //         var col = ("A").concat(parseInt(y) + 1);
        //         console.log(col);
        //         if (value == "") {
        //             console.log("in if")
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setStyle(col, "background-color", "yellow");
        //             this.el.setComments(col, `${REQUIRED_MSG}`);
        //         } else {
        //             console.log("in else")
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setComments(col, "");
        //         }
        //     }

        //     if (x == 1) {
        //         var col = ("B").concat(parseInt(y) + 1);
        //         if (value == "") {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setStyle(col, "background-color", "yellow");
        //             this.el.setComments(col, `${REQUIRED_MSG}`);
        //         } else {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setComments(col, "");
        //         }

        //         if (value != "" && Date.parse(this.el.getValueFromCoords(0, y)) > Date.parse(value)) {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setStyle(col, "background-color", "yellow");
        //             this.el.setComments(col, `${STOP_DATE_GREATER}`);
        //         } else {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setComments(col, "");
        //         }
        //     }

        //     if (x == 3) {
        //         var col = ("D").concat(parseInt(y) + 1);
        //         if (value >= 0) {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setComments(col, "");
        //         } else {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setStyle(col, "background-color", "yellow");
        //             this.el.setComments(col, `${NUMERIC_ONLY}`);
        //         }
        //     }
        //     if (x == 11) {
        //         var col = ("L").concat(parseInt(y) + 1);
        //         if (value > 0 && value != "") {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setComments(col, "");
        //         } else {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setStyle(col, "background-color", "yellow");
        //             this.el.setComments(col, `${NUMERIC_VALUE_GREATER_THAN_0}`);
        //         }
        //     }
        //     var logisticsUnitData = {}
        //     var planningUnitData = {}
        //     var elInstance = this.el;
        //     if (x == 11 && elInstance.getValueFromCoords(5, y) > 0) {
        //         var qtyInTermsOfForecastUnit = parseFloat(elInstance.getValueFromCoords(8, y) * elInstance.getValueFromCoords(9, y) * elInstance.getValueFromCoords(11, y));
        //         elInstance.setValueFromCoords(12, y, qtyInTermsOfForecastUnit, true)
        //     }
        //     if (x == 11 && elInstance.getValueFromCoords(6, y) > 0) {
        //         var qtyInTermsOfForecastUnit = parseFloat(elInstance.getValueFromCoords(7, y) * elInstance.getValueFromCoords(10, y) * elInstance.getValueFromCoords(11, y));
        //         elInstance.setValueFromCoords(12, y, qtyInTermsOfForecastUnit, true)
        //     }
        //     if (x == 7 && value > 0) {
        //         elInstance.setValueFromCoords(5, y, "", true)
        //         if (elInstance.getValueFromCoords(6, y) > 0 && elInstance.getValueFromCoords(11, y) > 0) {
        //             var qtyInTermsOfForecastUnit = parseFloat(elInstance.getValueFromCoords(7, y) * elInstance.getValueFromCoords(10, y) * elInstance.getValueFromCoords(11, y));
        //             elInstance.setValueFromCoords(12, y, qtyInTermsOfForecastUnit, true)
        //         }
        //     }

        //     if (x == 5 && value != "" && value != 0) {
        //         var col = ("F").concat(parseInt(y) + 1);
        //         this.el.setStyle(col, "background-color", "transparent");
        //         this.el.setComments(col, "");
        //         var col = ("G").concat(parseInt(y) + 1);
        //         this.el.setStyle(col, "background-color", "transparent");
        //         this.el.setComments(col, "");
        //         var db1;
        //         var storeOS;
        //         var openRequest = indexedDB.open('fasp', 1);
        //         openRequest.onupgradeneeded = function (e) {
        //             var db1 = e.target.result;
        //             if (!db1.objectStoreNames.contains('programData')) {
        //                 storeOS = db1.createObjectStore('programData', { keyPath: 'id', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('lastSyncDate')) {
        //                 storeOS = db1.createObjectStore('lastSyncDate', { keyPath: 'id', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('language')) {
        //                 storeOS = db1.createObjectStore('language', { keyPath: 'languageId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('country')) {
        //                 storeOS = db1.createObjectStore('country', { keyPath: 'countryId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('currency')) {
        //                 storeOS = db1.createObjectStore('currency', { keyPath: 'currencyId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('unit')) {
        //                 storeOS = db1.createObjectStore('unit', { keyPath: 'unitId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('unitType')) {
        //                 storeOS = db1.createObjectStore('unitType', { keyPath: 'unitTypeId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('organisation')) {
        //                 storeOS = db1.createObjectStore('organisation', { keyPath: 'organisationId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('healthArea')) {
        //                 storeOS = db1.createObjectStore('healthArea', { keyPath: 'healthAreaId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('region')) {
        //                 storeOS = db1.createObjectStore('region', { keyPath: 'regionId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('fundingSource')) {
        //                 storeOS = db1.createObjectStore('fundingSource', { keyPath: 'fundingSourceId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('subFundingSource')) {
        //                 storeOS = db1.createObjectStore('subFundingSource', { keyPath: 'subFundingSourceId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('product')) {
        //                 storeOS = db1.createObjectStore('product', { keyPath: 'productId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('productCategory')) {
        //                 storeOS = db1.createObjectStore('productCategory', { keyPath: 'productCategoryId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('dataSource')) {
        //                 storeOS = db1.createObjectStore('dataSource', { keyPath: 'dataSourceId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('dataSourceType')) {
        //                 storeOS = db1.createObjectStore('dataSourceType', { keyPath: 'dataSourceTypeId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('shipmentStatus')) {
        //                 storeOS = db1.createObjectStore('shipmentStatus', { keyPath: 'shipmentStatusId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('shipmentStatusAllowed')) {
        //                 storeOS = db1.createObjectStore('shipmentStatusAllowed', { keyPath: 'shipmentStatusAllowedId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('manufacturer')) {
        //                 storeOS = db1.createObjectStore('manufacturer', { keyPath: 'manufacturerId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('logisticsUnit')) {
        //                 storeOS = db1.createObjectStore('logisticsUnit', { keyPath: 'logisticsUnitId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('planningUnit')) {
        //                 storeOS = db1.createObjectStore('planningUnit', { keyPath: 'planningUnitId', autoIncrement: true });
        //             }
        //         };
        //         openRequest.onsuccess = function (e) {
        //             db1 = e.target.result;
        //             var luTransaction = db1.transaction(['logisticsUnit'], 'readwrite');
        //             var luObjectStore = luTransaction.objectStore('logisticsUnit');
        //             var luRequest = luObjectStore.get(parseInt(value));
        //             luRequest.onsuccess = function (e) {
        //                 logisticsUnitData = luRequest.result;
        //                 elInstance.setValueFromCoords(6, y, "", true)
        //                 elInstance.setValueFromCoords(7, y, "", true)
        //                 elInstance.setValueFromCoords(8, y, logisticsUnitData.qtyOfPlanningUnits, true)
        //                 elInstance.setValueFromCoords(9, y, logisticsUnitData.planningUnit.qtyOfForecastingUnits, true)
        //                 if (elInstance.getValueFromCoords(11, y) > 0) {
        //                     var qtyInTermsOfForecastUnit = parseFloat(logisticsUnitData.qtyOfPlanningUnits * logisticsUnitData.planningUnit.qtyOfForecastingUnits * elInstance.getValueFromCoords(11, y));
        //                     elInstance.setValueFromCoords(12, y, qtyInTermsOfForecastUnit, true)
        //                 }
        //             }
        //         }

        //     } else if (x == 5 && elInstance.getValueFromCoords(6, y) == "") {
        //         var col = ("F").concat(parseInt(y) + 1);
        //         this.el.setStyle(col, "background-color", "transparent");
        //         this.el.setStyle(col, "background-color", "yellow");
        //         this.el.setComments(col, `${EITHER_LU_OR_PU}`);
        //     }
        //     if (x == 6 && value != "" && value != 0) {
        //         var col = ("G").concat(parseInt(y) + 1);
        //         this.el.setStyle(col, "background-color", "transparent");
        //         this.el.setComments(col, "");
        //         var col = ("F").concat(parseInt(y) + 1);
        //         this.el.setStyle(col, "background-color", "transparent");
        //         this.el.setComments(col, "");
        //         var db1;
        //         var storeOS;
        //         var openRequest = indexedDB.open('fasp', 1);
        //         openRequest.onupgradeneeded = function (e) {
        //             var db1 = e.target.result;
        //             if (!db1.objectStoreNames.contains('programData')) {
        //                 storeOS = db1.createObjectStore('programData', { keyPath: 'id', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('lastSyncDate')) {
        //                 storeOS = db1.createObjectStore('lastSyncDate', { keyPath: 'id', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('language')) {
        //                 storeOS = db1.createObjectStore('language', { keyPath: 'languageId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('country')) {
        //                 storeOS = db1.createObjectStore('country', { keyPath: 'countryId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('currency')) {
        //                 storeOS = db1.createObjectStore('currency', { keyPath: 'currencyId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('unit')) {
        //                 storeOS = db1.createObjectStore('unit', { keyPath: 'unitId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('unitType')) {
        //                 storeOS = db1.createObjectStore('unitType', { keyPath: 'unitTypeId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('organisation')) {
        //                 storeOS = db1.createObjectStore('organisation', { keyPath: 'organisationId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('healthArea')) {
        //                 storeOS = db1.createObjectStore('healthArea', { keyPath: 'healthAreaId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('region')) {
        //                 storeOS = db1.createObjectStore('region', { keyPath: 'regionId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('fundingSource')) {
        //                 storeOS = db1.createObjectStore('fundingSource', { keyPath: 'fundingSourceId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('subFundingSource')) {
        //                 storeOS = db1.createObjectStore('subFundingSource', { keyPath: 'subFundingSourceId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('product')) {
        //                 storeOS = db1.createObjectStore('product', { keyPath: 'productId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('productCategory')) {
        //                 storeOS = db1.createObjectStore('productCategory', { keyPath: 'productCategoryId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('dataSource')) {
        //                 storeOS = db1.createObjectStore('dataSource', { keyPath: 'dataSourceId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('dataSourceType')) {
        //                 storeOS = db1.createObjectStore('dataSourceType', { keyPath: 'dataSourceTypeId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('shipmentStatus')) {
        //                 storeOS = db1.createObjectStore('shipmentStatus', { keyPath: 'shipmentStatusId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('shipmentStatusAllowed')) {
        //                 storeOS = db1.createObjectStore('shipmentStatusAllowed', { keyPath: 'shipmentStatusAllowedId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('manufacturer')) {
        //                 storeOS = db1.createObjectStore('manufacturer', { keyPath: 'manufacturerId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('logisticsUnit')) {
        //                 storeOS = db1.createObjectStore('logisticsUnit', { keyPath: 'logisticsUnitId', autoIncrement: true });
        //             }
        //             if (!db1.objectStoreNames.contains('planningUnit')) {
        //                 storeOS = db1.createObjectStore('planningUnit', { keyPath: 'planningUnitId', autoIncrement: true });
        //             }
        //         };
        //         openRequest.onsuccess = function (e) {
        //             db1 = e.target.result;
        //             var puTransaction = db1.transaction(['planningUnit'], 'readwrite');
        //             var puObjectStore = puTransaction.objectStore('planningUnit');
        //             var puRequest = puObjectStore.get(parseInt(value));
        //             puRequest.onsuccess = function (e) {
        //                 planningUnitData = puRequest.result;
        //                 elInstance.setValueFromCoords(5, y, "", true)
        //                 elInstance.setValueFromCoords(10, y, planningUnitData.qtyOfForecastingUnits, true)
        //                 if (elInstance.getValueFromCoords(11, y) > 0) {
        //                     var qtyInTermsOfForecastUnit = parseFloat(planningUnitData.qtyOfForecastingUnits * elInstance.getValueFromCoords(7, y) * elInstance.getValueFromCoords(11, y));
        //                     elInstance.setValueFromCoords(12, y, qtyInTermsOfForecastUnit, true)
        //                 }
        //             }
        //         }
        //     } else if (x == 6 && elInstance.getValueFromCoords(5, y) == "") {
        //         var col = ("G").concat(parseInt(y) + 1);
        //         this.el.setStyle(col, "background-color", "transparent");
        //         this.el.setStyle(col, "background-color", "yellow");
        //         this.el.setComments(col, `${EITHER_LU_OR_PU}`);
        //     }

        //     if (x == 7) {
        //         var col = ("H").concat(parseInt(y) + 1);
        //         if (value > 0 && value != "" && elInstance.getValueFromCoords(5, y) == "") {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setComments(col, "");
        //         } else if (elInstance.getValueFromCoords(5, y) == "") {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setStyle(col, "background-color", "yellow");
        //             this.el.setComments(col, `${NUMERIC_VALUE_GREATER_THAN_0}`);
        //         }
        //     }


        //     $("#saveButtonDiv").show();
        this.setState({
            changedFlag: 1
        })

        if (x == 0) {
            var col = ("A").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                if (isNaN(Date.parse(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.invaliddate'));
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            }
        }

        if (x == 1) {
            var col = ("B").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }
        if (x == 2) {
            var col = ("C").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                if (isNaN(Number.parseInt(value)) || value < 0) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }

            }
        }
        if (x == 3) {
            var reg = /^[0-9\b]+$/;
            var col = ("D").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                if (isNaN(parseInt(value)) || !(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }


            }
        }

        if (x == 4) {
            var col = ("E").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }
        // if (x == 5) {
        //     var col = ("F").concat(parseInt(y) + 1);
        //     if (value == "") {
        //         this.el.setStyle(col, "background-color", "transparent");
        //         this.el.setStyle(col, "background-color", "yellow");
        //         this.el.setComments(col, i18n.t('static.label.fieldRequired'));
        //     } else {
        //         if (isNaN(Date.parse(value))) {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setStyle(col, "background-color", "yellow");
        //             this.el.setComments(col, i18n.t('static.message.invaliddate'));
        //         } else {
        //             this.el.setStyle(col, "background-color", "transparent");
        //             this.el.setComments(col, "");
        //         }
        //     }
        // }

        if (x == 6) {
            var col = ("G").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }

        // var skuData = {}
        // var elInstance = this.el;
        // if (x == 3) {
        //     var col = ("D").concat(parseInt(y) + 1);
        //     if (value == "") {
        //         this.el.setStyle(col, "background-color", "transparent");
        //         this.el.setStyle(col, "background-color", "yellow");
        //         this.el.setComments(col, "This field is required.");
        //     } else {
        //         this.el.setStyle(col, "background-color", "transparent");
        //         this.el.setComments(col, "");

        //         var db1;
        //         var storeOS;
        //         getDatabase();
        //         var openRequest = indexedDB.open('fasp', 1);
        //         openRequest.onsuccess = function (e) {

        //             db1 = e.target.result;
        //             var skuTransaction = db1.transaction(['realmCountryPlanningUnit'], 'readwrite');
        //             var skuObjectStore = skuTransaction.objectStore('realmCountryPlanningUnit');
        //             var skuRequest = skuObjectStore.get(parseInt(value));
        //             skuRequest.onsuccess = function (e) {
        //                 skuData = skuRequest.result;
        //                 elInstance.setValueFromCoords(4, y, skuData.multiplier, true)
        //                 // elInstance.setValueFromCoords(7, y, "", true)
        //                 // elInstance.setValueFromCoords(8, y, skuData.qtyOfPlanningUnits, true)
        //                 // elInstance.setValueFromCoords(9, y, skuData.planningUnit.qtyOfForecastingUnits, true)
        //                 // if (elInstance.getValueFromCoords(11, y) > 0) {
        //                 //     var qtyInTermsOfForecastUnit = parseFloat(logisticsUnitData.qtyOfPlanningUnits * logisticsUnitData.planningUnit.qtyOfForecastingUnits * elInstance.getValueFromCoords(11, y));
        //                 //     elInstance.setValueFromCoords(12, y, qtyInTermsOfForecastUnit, true)
        //                 // }
        //             }

        //         }
        //     }
        // }

    }.bind(this)

    checkValidation() {
        var valid = true;
        var json = this.el.getJson();
        for (var y = 0; y < json.length; y++) {
            var col = ("A").concat(parseInt(y) + 1);
            var value = this.el.getValueFromCoords(0, y);
            if (value == "Invalid date" || value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                valid = false;
            } else {
                // if (isNaN(Date.parse(value))) {
                //     this.el.setStyle(col, "background-color", "transparent");
                //     this.el.setStyle(col, "background-color", "yellow");
                //     this.el.setComments(col, "In valid Date.");
                //     valid = false;
                // } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
                // }
            }

            var col = ("B").concat(parseInt(y) + 1);
            var value = this.el.getValueFromCoords(1, y);
            if (value == "Invalid date" || value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                valid = false;
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }

            var col = ("C").concat(parseInt(y) + 1);
            var value = this.el.getValueFromCoords(2, y);
            if (value == "" || isNaN(Number.parseInt(value)) || value < 0) {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                valid = false;
                if (isNaN(Number.parseInt(value)) || value < 0) {
                    this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                } else {
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                }
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }

            var col = ("D").concat(parseInt(y) + 1);
            var value = this.el.getValueFromCoords(3, y);
            var reg = /^[0-9\b]+$/;
            // if (value === "" || isNaN(Number.parseInt(value)) || !Number.isInteger(value) ) {
            //     this.el.setStyle(col, "background-color", "transparent");
            //     this.el.setStyle(col, "background-color", "yellow");
            //     if (isNaN(Number.parseInt(value)) || !Number.isInteger(value) ) {
            //         this.el.setComments(col, i18n.t('static.message.invalidnumber'));
            //     } else {
            //         this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            //     }
            //     valid = false;
            // } else {
            //     this.el.setStyle(col, "background-color", "transparent");
            //     this.el.setComments(col, "");
            // }

            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                if (isNaN(parseInt(value)) || !(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }


            }

            var col = ("E").concat(parseInt(y) + 1);
            var value = this.el.getValueFromCoords(4, y);
            if (value == "Invalid date" || value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                valid = false;
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }

            // var col = ("F").concat(parseInt(y) + 1);
            // var value = this.el.getValueFromCoords(5, y);
            // if (value == "Invalid date" || value == "") {
            //     this.el.setStyle(col, "background-color", "transparent");
            //     this.el.setStyle(col, "background-color", "yellow");
            //     this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            //     valid = false;
            // } else {
            //     // if (isNaN(Date.parse(value))) {
            //     //     this.el.setStyle(col, "background-color", "transparent");
            //     //     this.el.setStyle(col, "background-color", "yellow");
            //     //     this.el.setComments(col, "In valid Date.");
            //     //     valid = false;
            //     // } else {
            //     this.el.setStyle(col, "background-color", "transparent");
            //     this.el.setComments(col, "");
            //     // }
            // }

            var col = ("G").concat(parseInt(y) + 1);
            var value = this.el.getValueFromCoords(6, y);
            if (value == "Invalid date" || value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                valid = false;
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }

            // var col = ("H").concat(parseInt(y) + 1);
            // var value = this.el.getValueFromCoords(7, y);
            // if (value == "Invalid date" || value == "") {
            //     this.el.setStyle(col, "background-color", "transparent");
            //     this.el.setStyle(col, "background-color", "yellow");
            //     this.el.setComments(col, "This field is required.");
            //     valid = false;
            // } else {
            //     this.el.setStyle(col, "background-color", "transparent");
            //     this.el.setComments(col, "");
            // }




            // var col = ("D").concat(parseInt(y) + 1);
            // var value = this.el.getValueFromCoords(3, y);
            // if (value == "Invalid date" || value == "") {
            //     this.el.setStyle(col, "background-color", "transparent");
            //     this.el.setStyle(col, "background-color", "yellow");
            //     this.el.setComments(col, "This field is required.");
            //     valid = false;
            // } else {
            //     this.el.setStyle(col, "background-color", "transparent");
            //     this.el.setComments(col, "");
            // }
        }
        return valid;
    }
    cancelClicked() {
        this.props.history.push(`/dashboard/` + i18n.t('static.message.cancelled'))
    }
}
