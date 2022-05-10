import moment from "moment";
import ExtrapolationService from "../../api/ExtrapolationService";
import i18n from "../../i18n";
import { calculateCI } from "./CalculateCI";
import { calculateError } from "./ErrorCalculations";
import jexcel from 'jexcel-pro';

export function calculateArima(inputData, p, d, q, confidenceLevel, noOfProjectionMonths, props, minStartDate, isTreeExtrapolation, seasonality) {
    console.log("inputData@@@@@@", inputData);
    console.log("@@@@@@@@noOfMonthsForProjection", noOfProjectionMonths)
    var startYear = moment(minStartDate).format("YYYY");
    var startMonth = moment(minStartDate).format("M");
    var decimal = (startMonth - 1) / 12;
    var startParam = Number(Number(startYear) + Number(decimal));
    console.log("StartYear@@@@@@", startYear);
    console.log("StartMonth@@@@@@", startMonth);
    console.log("Decimal@@@@@@", decimal);
    console.log("StartParam@@@@@@", startParam);
    // var date = minStartDate;
    var data = []
//     inputData=[{"month":1,"actual":10000,"forecast":null},
// {"month":1,"actual":20500,"forecast":null},
// {"month":1,"actual":31000,"forecast":null},
// {"month":1,"actual":41500,"forecast":null},
// {"month":1,"actual":52000,"forecast":null},
// {"month":1,"actual":62500,"forecast":null},
// {"month":1,"actual":73000,"forecast":null},
// {"month":1,"actual":83500,"forecast":null},
// {"month":1,"actual":94000,"forecast":null},
// {"month":1,"actual":104500,"forecast":null},
// {"month":1,"actual":115000,"forecast":null},
// {"month":1,"actual":125500,"forecast":null},
// {"month":1,"actual":136000,"forecast":null},
// {"month":1,"actual":146500,"forecast":null},
// {"month":1,"actual":157000,"forecast":null},
// {"month":1,"actual":167500,"forecast":null},
// {"month":1,"actual":178000,"forecast":null},
// {"month":1,"actual":188500,"forecast":null},
// {"month":1,"actual":199000,"forecast":null},
// {"month":1,"actual":209500,"forecast":null},
// {"month":1,"actual":220000,"forecast":null},
// {"month":1,"actual":230500,"forecast":null},
// {"month":1,"actual":241000,"forecast":null},
// {"month":1,"actual":251500,"forecast":null}]

    for (var i = 0; i < inputData.length; i++) {
        data.push(Number(inputData[i].actual));
    }
    var json = {
        "data": data,
        "frequency": 12,
        "start": startParam,
        "p": Number(p),
        "d": Number(d),
        "q": Number(q),
        "n": Number(noOfProjectionMonths),
        "seasonality": seasonality,
        // "p": 0,
        // "d": 1,
        // "q": 1
    }
    console.log("JsonArima@@@@@@", json);
    ExtrapolationService.arima(json)
        .then(response => {
            if (response.status == 200) {
                console.log("response.statusArima@@@@@@", response.data);
                var responseData = response.data;
                var output = [];
                var count = 0;
                for (var k = 0; k < responseData.fits.length; k++) {
                    count += 1;
                    output.push({ month: count, actual: inputData[k] != undefined && inputData[k].actual != undefined && inputData[k].actual != null && inputData[k].actual != '' ? inputData[k].actual : null, forecast: responseData.fits[k] == 'NA' ? null : responseData.fits[k] > 0 ? responseData.fits[k] : 0 })
                }
                for (var j = 0; j < responseData.forecasts.length; j++) {
                    count += 1;
                    output.push({ month: count, actual: inputData[count - 1] != undefined && inputData[count - 1].actual != undefined && inputData[count - 1].actual != null && inputData[count - 1].actual != '' ? inputData[count - 1].actual : null, forecast: responseData.forecasts[j] == 'NA' ? null : responseData.forecasts[j] > 0 ? responseData.forecasts[j] : 0 })
                }

                console.log("OutPutArima@@@@@@@@@@@@@@@@@@@@@@", output)
                calculateCI(output, Number(confidenceLevel), "arimaData", props)
                calculateError(output, "arimaError", props)

            }
        }).catch(error => {
            console.log("ErrorArima@@@@@@", error)
            if (!isTreeExtrapolation) {
                // props.updateState("showData", false);
                // props.updateState("dataEl", "");
                props.updateState("loading", false);
                props.updateState("noDataMessage", i18n.t('static.extrapolation.errorOccured'));
                props.updateState("dataChanged", true);
                // props.updateState("show", false);
                // props.el = jexcel(document.getElementById("tableDiv"), '');
                // props.el.destroy();
            }
        })

}