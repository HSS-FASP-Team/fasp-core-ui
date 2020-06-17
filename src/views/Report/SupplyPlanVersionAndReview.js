import React, { Component, lazy } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import pdfIcon from '../../assets/img/pdf.png';
import csvicon from '../../assets/img/csv.png'
import { LOGO } from '../../CommonComponent/Logo.js'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import i18n from '../../i18n'
import AuthenticationService from '../Common/AuthenticationService.js';
import getLabelText from '../../CommonComponent/getLabelText';
import PlanningUnitService from '../../api/PlanningUnitService';
import ProductService from '../../api/ProductService';
import Picker from 'react-month-picker'
import MonthBox from '../../CommonComponent/MonthBox.js'
import RealmCountryService from '../../api/RealmCountryService';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import {
    Button, Card, CardBody, CardHeader, Col, Row, FormGroup, Input, InputGroup, InputGroupAddon, Label, Form
} from 'reactstrap';
import ProgramService from '../../api/ProgramService';
import ReportService from '../../api/ReportService';

const options = {
    title: {
        display: true,
        text: i18n.t('static.dashboard.supplyplanversionandreview')
    },
    scales: {
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: i18n.t('static.report.stock')
                },
                ticks: {
                    beginAtZero: true,
                    Max: 900
                }
            }
        ]
    },
    tooltips: {
        mode: 'index',
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
        display: true,
        position: 'bottom',
        labels: {
            usePointStyle: true,
        }
    }
}

const pickerLang = {
    months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
    from: 'From', to: 'To',
}
class SupplyPlanVersionAndReview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            matricsList: [],
            dropdownOpen: false,
            radioSelected: 2,
            statuses: [],
            programs: [],
            countries: [],
            message:'',
            rangeValue: { from: { year: new Date().getFullYear() - 1, month: new Date().getMonth() + 1 }, to: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } },



        };


        this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.handleRangeDissmis = this.handleRangeDissmis.bind(this);
        this.getCountrylist = this.getCountrylist.bind(this);
        this.getStatusList = this.getStatusList.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.getPrograms = this.getPrograms.bind(this);
        this.formatLabel = this.formatLabel.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.editprogramStatus = this.editprogramStatus.bind(this)
    }
    makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
        return '?'
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        this.getCountrylist();
        this.getPrograms()
        this.getStatusList()
    }
    formatLabel(cell, row) {
        return getLabelText(cell, this.state.lang);
    }
    checkValue(cell, row) {
        if (row.versionStatus.id == 2)
            return cell;
        else
            return '';
    }
    editprogramStatus(supplyPlan) {
        console.log(supplyPlan);
        this.props.history.push({
            pathname: `/report/editStatus/${supplyPlan.program.id}/${supplyPlan.versionId}`,
            // state: { country: country }
        });

    }

    show() {
    }
    handleRangeChange(value, text, listIndex) {
        //
    }
    handleRangeDissmis(value) {
        this.setState({ rangeValue: value })
        this.fetchData();
    }

    _handleClickRangeBox(e) {
        this.refs.pickRange.show()
    }

    getCountrylist() {
        AuthenticationService.setupAxiosInterceptors();
        let realmId = AuthenticationService.getRealmId();
        RealmCountryService.getRealmCountryrealmIdById(realmId)
            .then(response => {
                this.setState({
                    countries: response.data
                })
            }).catch(
                error => {
                    this.setState({
                        countries: []
                    })
                    if (error.message === "Network Error") {
                        this.setState({ message: error.message });
                    } else {
                        switch (error.response ? error.response.status : "") {
                            case 500:
                            case 401:
                            case 404:
                            case 406:
                            case 412:
                                this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.Country') }) });
                                break;
                            default:
                                this.setState({ message: 'static.unkownError' });
                                break;
                        }
                    }
                }
            );

    }

    getPrograms() {
        AuthenticationService.setupAxiosInterceptors();
        let realmId = AuthenticationService.getRealmId();
        ProgramService.getProgramByRealmId(realmId)
            .then(response => {
                console.log(JSON.stringify(response.data))
                this.setState({
                    programs: response.data
                })
            }).catch(
                error => {
                    this.setState({
                        programs: []
                    })
                    if (error.message === "Network Error") {
                        this.setState({ message: error.message });
                    } else {
                        switch (error.response ? error.response.status : "") {
                            case 500:
                            case 401:
                            case 404:
                            case 406:
                            case 412:
                                this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.program') }) });
                                break;
                            default:
                                this.setState({ message: 'static.unkownError' });
                                break;
                        }
                    }
                }
            );

    }
    getStatusList() {
        AuthenticationService.setupAxiosInterceptors();
        ProgramService.getVersionStatusList().then(response => {
            console.log('**' + JSON.stringify(response.data))
            this.setState({
                statuses: response.data,
            })
        })
            .catch(
                error => {
                    this.setState({
                        statuses: [],
                    })
                    if (error.message === "Network Error") {
                        this.setState({ message: error.message });
                    } else {
                        switch (error.response ? error.response.status : "") {
                            case 500:
                            case 401:
                            case 404:
                            case 406:
                            case 412:
                                this.setState({ message: error.response.data.messageCode });
                                break;
                            default:
                                this.setState({ message: 'static.unkownError' });
                                break;
                        }
                    }
                }
            );

    }
    fetchData() {
        let programId = document.getElementById("programId").value;
        let countryId = document.getElementById("countryId").value;
        let versionStatusId = document.getElementById("versionStatusId").value;
        let startDate = this.state.rangeValue.from.year + '-' + this.state.rangeValue.from.month + '-01';
        let endDate = this.state.rangeValue.to.year + '-' + this.state.rangeValue.to.month + '-' + new Date(this.state.rangeValue.to.year, this.state.rangeValue.to.month + 1, 0).getDate();

        AuthenticationService.setupAxiosInterceptors();
        ReportService.getProgramVersionList(programId, countryId, versionStatusId, startDate, endDate)
            .then(response => {
                console.log(JSON.stringify(response.data))
                this.setState({
                    matricsList: response.data
                })
            }).catch(
                error => {
                    this.setState({
                        matricsList: []
                    })
                    if (error.message === "Network Error") {
                        this.setState({ message: error.message });
                    } else {
                        switch (error.response ? error.response.status : "") {
                            case 500:
                            case 401:
                            case 404:
                            case 406:
                            case 412:
                                this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.program') }) });
                                break;
                            default:
                                this.setState({ message: 'static.unkownError' });
                                break;
                        }
                    }
                }
            );


    }


    exportCSV(columns) {

        var csvRow = [];
        csvRow.push((i18n.t('static.report.dateRange') + ' , ' + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to)).replaceAll(' ', '%20'))

        csvRow.push(i18n.t('static.dashboard.country') + ' , ' + ((document.getElementById("countryId").selectedOptions[0].text).replaceAll(',', '%20')).replaceAll(' ', '%20'))
        csvRow.push(i18n.t('static.program.program') + ' , ' + ((document.getElementById("programId").selectedOptions[0].text).replaceAll(',', '%20')).replaceAll(' ', '%20'))
        csvRow.push((i18n.t('static.common.status')).replaceAll(' ', '%20') + ' , ' + ((document.getElementById("versionStatusId").selectedOptions[0].text).replaceAll(',', '%20')).replaceAll(' ', '%20'))
        csvRow.push('')
        csvRow.push('')
        csvRow.push((i18n.t('static.common.youdatastart')).replaceAll(' ', '%20'))
        csvRow.push('')

        const headers = [];
        columns.map((item, idx) => { headers[idx] = item.text.replaceAll(' ', '%20') });


        var A = [headers]

        this.state.matricsList.map(elt => A.push([(elt.program.label.label_en.replaceAll(',', '%20')).replaceAll(' ', '%20'), elt.versionId,(elt.versionType.label.label_en.replaceAll(',', '%20')).replaceAll(' ', '%20'), elt.createdDate.replaceAll(' ', '%20'), elt.createdBy.username, elt.versionStatus.label.label_en.replaceAll(' ', '%20'), elt.versionStatus.id == 2 ? elt.lastModifiedBy.username : '', elt.versionStatus.id == 2 ? elt.lastModifiedDate.replaceAll(' ', '%20') : '', (elt.notes.replaceAll(',', '%20')).replaceAll(' ', '%20')
        ]));


        for (var i = 0; i < A.length; i++) {
            csvRow.push(A[i].join(','))
        }

        var csvString = csvRow.join("%0A")
        var a = document.createElement("a")
        a.href = 'data:attachment/csv,' + csvString
        a.target = "_Blank"
        a.download = "SupplyPlanVersionAndReview.csv"
        document.body.appendChild(a)
        a.click()
    }


    exportPDF = (columns) => {

        const addFooters = doc => {

            const pageCount = doc.internal.getNumberOfPages()

            doc.setFont('helvetica', 'bold')
            doc.setFontSize(10)
            for (var i = 1; i <= pageCount; i++) {
                doc.setPage(i)

                doc.setPage(i)
                doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 9, doc.internal.pageSize.height - 30, {
                    align: 'center'
                })
                doc.text('Quantification Analytics Tool', doc.internal.pageSize.width * 6 / 7, doc.internal.pageSize.height - 30, {
                    align: 'center'
                })


            }
        }
        const addHeaders = doc => {

            const pageCount = doc.internal.getNumberOfPages()
            doc.setFont('helvetica', 'bold')

            //  var file = new File('QAT-logo.png','../../../assets/img/QAT-logo.png');
            // var reader = new FileReader();

            //var data='';
            // Use fs.readFile() method to read the file 
            //fs.readFile('../../assets/img/logo.svg', 'utf8', function(err, data){ 
            //}); 
            for (var i = 1; i <= pageCount; i++) {
                doc.setFontSize(12)
                doc.setPage(i)
                doc.addImage(LOGO, 'png', 0, 10, 180, 50, 'FAST');
                /*doc.addImage(data, 10, 30, {
                  align: 'justify'
                });*/
                doc.setTextColor("#002f6c");
                doc.text(i18n.t('static.report.supplyplanversionandreviewReport'), doc.internal.pageSize.width / 2, 60, {
                    align: 'center'
                })
                if (i == 1) {
                    doc.setFontSize(9)
                    doc.text(i18n.t('static.report.dateRange') + ' : ' + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to), doc.internal.pageSize.width / 8, 90, {
                        align: 'left'
                    })
                    doc.text(i18n.t('static.dashboard.country') + ' : ' + document.getElementById("countryId").selectedOptions[0].text, doc.internal.pageSize.width / 8, 110, {
                        align: 'left'
                    })
                    doc.text(i18n.t('static.program.program') + ' : ' + document.getElementById("programId").selectedOptions[0].text, doc.internal.pageSize.width / 8, 130, {
                        align: 'left'
                    })
                    doc.text(i18n.t('static.common.status') + ' : ' + document.getElementById("versionStatusId").selectedOptions[0].text, doc.internal.pageSize.width / 8, 150, {
                        align: 'left'
                    })

                }

            }
        }

        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape

        const marginLeft = 10;
        const doc = new jsPDF(orientation, unit, size, true);

        doc.setFontSize(8);

        // const title = i18n.t('static.report.supplyplanversionandreviewReport');
        const headers = [];
        columns.map((item, idx) => { headers[idx] = item.text });
        const header = [headers];
        console.log(header);
        const data = this.state.matricsList.map(elt => [elt.program.label.label_en, elt.versionId,elt.versionType.label.label_en, elt.createdDate, elt.createdBy.username, elt.versionStatus.label.label_en, elt.versionStatus.id == 2 ? elt.lastModifiedBy.username : '', elt.versionStatus.id == 2 ? elt.lastModifiedDate : '', elt.notes]);

        let content = {
            startY: 200,
            head: header,
            body: data,
            columnStyles: {
                0: { cellWidth: '8%' },
                2: { cellWidth: '8%' },
                3: { cellWidth: '8%' },
                4: { cellWidth: '8%' },
                5: { cellWidth: '8%' },
                6: { cellWidth: '8%' },
                7: { cellWidth: '8%' },
                8: { cellWidth: '8%' },
                9: { cellWidth: '8%' },
                10: { cellWidth: '8%' },
                11: { cellWidth: '8%' },
                12: { cellWidth: '8%' },

            }
        };

        //  doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        addHeaders(doc)
        addFooters(doc)
        doc.save("SupplyPlanVersionAndReview.pdf")
    }


    handleChange(countrysId) {

        var countryIdArray = [];
        for (var i = 0; i < countrysId.length; i++) {
            countryIdArray[i] = countrysId[i].value;

        }
        console.log(countryIdArray);
        this.setState({
            countryValues: countryIdArray
        })
    }



    render() {
        const { programs } = this.state;
        let programList = programs.length > 0
            && programs.map((item, i) => {
                return (
                    <option key={i} value={item.programId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);
        const { countries } = this.state;
        let countryList = countries.length > 0 && countries.map((item, i) => {
            return (
                <option key={i} value={item.realmCountryId}>
                    {getLabelText(item.country.label, this.state.lang)}
                </option>
            )

        }, this);
        const { statuses } = this.state;
        let statusList = statuses.length > 0
            && statuses.map((item, i) => {
                return (
                    <option key={i} value={item.id} selected={item.id==1?'selected':''}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);


        const bar = {
            labels: this.state.matricsList.map((item, index) => (item.date)),
            datasets: [
                {
                    type: "line",
                    label: "MOS past 3",
                    backgroundColor: 'transparent',
                    borderColor: '#ffc107',
                    lineTension: 0,
                    showActualPercentages: true,
                    showInLegend: true,
                    pointStyle: 'line',

                    data: this.state.matricsList.map((item, index) => (item.MOS_pass3))
                },
                {
                    type: "line",
                    label: "MOS P+F",
                    backgroundColor: 'transparent',
                    borderColor: '#4dbd74',
                    lineTension: 0,
                    showActualPercentages: true,
                    showInLegend: true,
                    pointStyle: 'line',

                    data: this.state.matricsList.map((item, index) => (item.MOS_PF))
                },
                {
                    type: "line",
                    label: "MOS Future 3",
                    backgroundColor: 'transparent',
                    borderColor: '#ed5626',
                    lineTension: 0,
                    showActualPercentages: true,
                    showInLegend: true,
                    pointStyle: 'line',

                    data: this.state.matricsList.map((item, index) => (item.MOS_Feature3))
                }
            ]
        }
        const columns = [
            {
                dataField: 'program.label',
                text: i18n.t('static.program.program'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.formatLabel

            },
            {
                dataField: 'versionId',
                text: i18n.t('static.report.version'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            },
            {
                dataField: 'versionType.label',
                text: i18n.t('static.report.versiontype'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.formatLabel
            },
            {
                dataField: 'createdDate',
                text: i18n.t('static.report.veruploaddate'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            }
            , {
                dataField: 'createdBy.username',
                text: i18n.t('static.report.veruploaduser'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            }, {
                dataField: 'versionStatus.label',
                text: i18n.t('static.report.issupplyplanapprove'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.formatLabel
            }
            , {
                dataField: 'lastModifiedBy.username',
                text: i18n.t('static.report.approver'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.checkValue
            }, {
                dataField: 'lastModifiedDate',
                text: i18n.t('static.report.approveddate'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.checkValue

            }, {
                dataField: 'notes',
                text: i18n.t('static.report.comment'),
                sort: true,
                align: 'center',
                headerAlign: 'center',

            }];
        const options = {
            hidePageListOnlyOnePage: true,
            firstPageText: i18n.t('static.common.first'),
            prePageText: i18n.t('static.common.back'),
            nextPageText: i18n.t('static.common.next'),
            lastPageText: i18n.t('static.common.last'),
            nextPageTitle: i18n.t('static.common.firstPage'),
            prePageTitle: i18n.t('static.common.prevPage'),
            firstPageTitle: i18n.t('static.common.nextPage'),
            lastPageTitle: i18n.t('static.common.lastPage'),
            showTotal: true,
            paginationTotalRenderer: customTotal,
            disablePageTitle: true,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '30', value: 30
            }
                ,
            {
                text: '50', value: 50
            },
            {
                text: 'All', value: this.state.matricsList.length
            }]
        };
        const { SearchBar, ClearSearchButton } = Search;
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                {i18n.t('static.common.result', { from, to, size })}
            </span>
        );

        const pickerLang = {
            months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
            from: 'From', to: 'To',
        }
        const { rangeValue } = this.state

        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
            return '?'
        }
        return (
            <div className="animated fadeIn" >
                <h6 className="mt-success">{i18n.t(this.props.match.params.message)}</h6>
                <h5>{i18n.t(this.state.message)}</h5>

                <Card>
                    <CardHeader className="pb-1">
                        <i className="icon-menu"></i><strong>{i18n.t('static.report.supplyplanversionandreviewReport')}</strong>
                        {
                            this.state.matricsList.length > 0 &&
                            <div className="card-header-actions">
                                <a className="card-header-action">
                                    <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={pdfIcon} title="Export PDF" onClick={() => this.exportPDF(columns)} />

                                </a>
                                <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={csvicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportCSV(columns)} />
                            </div>
                        }
                    </CardHeader>
                    <CardBody>

                        <div>
                            <Form >
                                <Col md="12 pl-0">
                                    <div className="row">
                                        <FormGroup className="col-md-3">
                                            <Label htmlFor="appendedInputButton">{i18n.t('static.report.dateRange')}<span className="stock-box-icon  fa fa-sort-desc ml-1"></span></Label>
                                            <div className="controls edit">

                                                <Picker
                                                    ref="pickRange"
                                                    years={{ min: 2013 }}
                                                    value={rangeValue}
                                                    lang={pickerLang}
                                                    //theme="light"
                                                    onChange={this.handleRangeChange}
                                                    onDismiss={this.handleRangeDissmis}
                                                >
                                                    <MonthBox value={makeText(rangeValue.from) + ' ~ ' + makeText(rangeValue.to)} onClick={this._handleClickRangeBox} />
                                                </Picker>
                                            </div>

                                        </FormGroup>
                                        <FormGroup className="col-md-3">
                                            <Label htmlFor="countryId">{i18n.t('static.program.realmcountry')}<span className="red Reqasterisk">*</span></Label>
                                            <InputGroup>
                                                <Input
                                                    type="select"
                                                    bsSize="sm"
                                                    name="countryId"
                                                    id="countryId"
                                                    onChange={(e) => { this.handleChange(e); this.fetchData() }}
                                                >  <option value="0">{i18n.t('static.common.select')}</option>
                                                    {countryList}</Input>
                                                {!!this.props.error &&
                                                    this.props.touched && (
                                                        <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
                                                    )}</InputGroup></FormGroup>

                                        <FormGroup className="col-md-3">
                                            <Label htmlFor="appendedInputButton">{i18n.t('static.program.program')}</Label>
                                            <div className="controls ">
                                                <InputGroup>
                                                    <Input
                                                        type="select"
                                                        name="programId"
                                                        id="programId"
                                                        bsSize="sm"
                                                        onChange={(e) => { this.fetchData(e) }}


                                                    >
                                                        <option value="0">{i18n.t('static.common.select')}</option>
                                                        {programList}
                                                    </Input>

                                                </InputGroup>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="col-md-3">
                                            <Label htmlFor="appendedInputButton">{i18n.t('static.common.status')}</Label>
                                            <div className="controls">
                                                <InputGroup>
                                                    <Input
                                                        type="select"
                                                        name="versionStatusId"
                                                        id="versionStatusId"
                                                        bsSize="sm"
                                                        onChange={(e) => { this.fetchData(e) }}
                                                    >  <option value="-1">{i18n.t('static.common.all')}</option>
                                                        {statusList}</Input>
                                                </InputGroup>    </div></FormGroup>

                                    </div>
                                </Col>
                            </Form>
                            <Col md="12 pl-0">

                                <div className="row">
                                    <div className="col-md-12">
                                        {this.state.matricsList.length > 0 &&
                                            <ToolkitProvider
                                                keyField="procurementUnitId"
                                                data={this.state.matricsList}
                                                columns={columns}
                                                exportCSV exportCSV
                                                search={{ searchFormatted: true }}
                                                hover
                                                filter={filterFactory()}

                                            >
                                                {
                                                    props => (
                                                        <div className="TableCust">
                                                            <div className="col-md-6 pr-0 offset-md-6 text-right mob-Left">
                                                                <SearchBar {...props.searchProps} />
                                                                <ClearSearchButton {...props.searchProps} /></div>
                                                            <BootstrapTable striped rowClasses={this.rowClassNameFormat} hover noDataIndication={i18n.t('static.common.noData')} tabIndexCell
                                                                pagination={paginationFactory(options)}
                                                                rowEvents={{
                                                                    onClick: (e, row, rowIndex) => {
                                                                        if (row.versionStatus.id == 1
                                                                          //  && row.versionType.versionTypeId==1
                                                                            )
                                                                            this.editprogramStatus(row);
                                                                    }
                                                                }}
                                                                {...props.baseProps}
                                                            /></div>

                                                    )
                                                }
                                            </ToolkitProvider>

                                        }

                                    </div>
                                </div>
                            </Col>

                        </div>
                    </CardBody></Card>
            </div>


        );

    }

}



export default SupplyPlanVersionAndReview
