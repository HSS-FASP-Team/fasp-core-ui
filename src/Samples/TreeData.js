import { PageFitMode, Enabled, Colors, TextOrientationType, OrgItemConfig } from 'basicprimitives';
export default {
    node_data: [
        { id: 0, valueType: -1, parent: null, description: "Chief Executive Officer (CEO)", email: "akil.m@altius.cc", phone: "352-206-7599", title: "Akil Mahimwala", label: "Akil Mahimwala" },
        { id: 1, valueType: -1, parent: 0, description: "Co-Presidents, Platform Products & Services Division", email: "ravi.s@altius.cc", phone: "505-791-1689", title: "Ravi Sharma", label: "Jeanna White" },
        { id: 2, valueType: -1, parent: 0, description: "Sr. VP, Server & Tools Division", email: "sameer.g@altiusbpo.com", phone: "262-215-7998", title: "Sameer Gharpurey", label: "James Holt" },
        { id: 3, valueType: -1, parent: 2, description: "VP, Server & Tools Marketing and Solutions", email: "thomwill@name.com", phone: "904-547-5342", title: "Anchal", label: "Thomas Williams" },
        { id: 4, valueType: -1, parent: 2, description: "VP, Software & Enterprise Management Division", email: "sarakemp@name.com", phone: "918-257-4218", title: "Dolly", label: "Sara Kemp" },
        { id: 5, valueType: -1, parent: 2, description: "Sr. VP, Software Server System", email: "georduon@name.com", phone: "434-406-2189", title: "Palash", label: "George Duong" },
        { id: 6, valueType: -1, parent: 2, description: "Sr. VP, Software Server System", email: "georduon@name.com", phone: "434-406-2189", title: "Shubham D", label: "George Duong" },
        { id: 7, valueType: -1, parent: 1, description: "Sr. VP, Software Server System", email: "georduon@name.com", phone: "434-406-2189", title: "Harshana", label: "George Duong" },
        { id: 8, valueType: -1, parent: 1, description: "Sr. VP, Software Server System", email: "georduon@name.com", phone: "434-406-2189", title: "Shubham Y", label: "George Duong" }

    ],
    morbidity_scenario_one: [
        {
            id: 0,
            parent: null,
            title: "Malaria patients",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 0",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '5,405,301',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 1,
            parent: 0,
            title: "Malaria pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 1",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '35% = 1,891,855',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 2,
            parent: 0,
            title: "Malaria non-pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 1",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '65% = 3,513,446',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 3,
            parent: 2,
            title: "Falcifarum non-pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 2",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '75% = 2,635,084',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 4,
            parent: 2,
            title: "Vivax non-pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 2",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '25% = 878,361',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 5,
            parent: 4,
            title: "5 to 14kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '34% = 298,643',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 6,
            parent: 4,
            title: "15 to 24kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '21% = 184,456',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 7,
            parent: 4,
            title: "25 to 34kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '27% = 237,158',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 8,
            parent: 4,
            title: "> 35kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '18% = 158,105',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 9,
            parent: 5,
            title: "Artemeter 1x6 Dosage",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 4",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '100% = 298,643 * (2/day * 30 days)',
            nodeBackgroundColor: Colors.Black,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.White
        },

        {
            id: 10,
            parent: 6,
            title: "Primaquine 7.5mg",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 4",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '31% = 57,181 * (3/day * 15 days)',
            nodeBackgroundColor: Colors.Black,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.White
        },


    ],
    morbidity_scenario_two: [
        {
            id: 0,
            parent: null,
            title: "Malaria patients",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 0",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '5,405,301',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 1,
            parent: 0,
            title: "Malaria pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 1",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '40% = 2,162,120',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 2,
            parent: 0,
            title: "Malaria non-pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 1",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '60% = 3,243,180',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 3,
            parent: 2,
            title: "Falcifarum non-pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 2",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '65% = 2,108,067',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 4,
            parent: 2,
            title: "Vivax non-pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 2",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '35% = 1,135,113',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 5,
            parent: 4,
            title: "5 to 14kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '35% = 397,290',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 6,
            parent: 4,
            title: "15 to 24kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '20% = 227,023',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 7,
            parent: 4,
            title: "25 to 34Kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '30% = 340,534',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 8,
            parent: 4,
            title: "> 35kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '15% = 170,267',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 9,
            parent: 5,
            title: "Artemeter 1x6 Dosage",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 4",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '100% = 397,290 * (1/day * 30 days)',
            nodeBackgroundColor: Colors.Black,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.White
        },

        {
            id: 10,
            parent: 6,
            title: "Primaquine 7.5mg",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 4",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '31% = 70,377 * (2/day * 15 days)',
            nodeBackgroundColor: Colors.Black,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.White
        },


    ],
    morbidity_scenario_three: [
        {
            id: 0,
            parent: null,
            title: "Malaria patients",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 0",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '5,405,301',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 1,
            parent: 0,
            title: "Malaria pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 1",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '45% = 2,432,385',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 2,
            parent: 0,
            title: "Malaria non-pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 1",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '55% = 2,972,915',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 3,
            parent: 2,
            title: "Falcifarum non-pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 2",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '80% = 2,378,332',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 4,
            parent: 2,
            title: "Vivax non-pregnant",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 2",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '20% = 594,583',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 5,
            parent: 4,
            title: "5 to 14kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '33% = 196,212',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 6,
            parent: 4,
            title: "15 to 24kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '17% = 101,079',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 7,
            parent: 4,
            title: "25 to 34Kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '27% = 160,537',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 8,
            parent: 4,
            title: "> 35kgs",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '23% = 136,754',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },

        {
            id: 9,
            parent: 5,
            title: "Artemeter 1x6 Dosage",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 4",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '50% = 98,106 * (2/day * 30 days)',
            nodeBackgroundColor: Colors.Black,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.White
        },

        {
            id: 10,
            parent: 6,
            title: "Primaquine 7.5mg",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 4",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '50% = 50,540 * (2/day * 15 days)',
            nodeBackgroundColor: Colors.Black,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.White
        },
    ],
    demographic_scenario_one: [
        {
            id: 0,
            parent: null,
            title: "Country Population",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 0",
            // groupTitleColor: Colors.Blue, 
            nodeType: 1,
            nodePercentage: "",
            nodeValue: '100,829,000',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            nodeValueType: 2,
            percentage: '',
            label: "",
            nodeValueColor: Colors.Black,
            // dosage:'',
            dosageSet: {},
            scaling: 1,
        },
        {
            id: 1,
            parent: 0,
            title: "Male Population",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 1",
            // groupTitleColor: Colors.Blue, 
            nodeType: 1,
            nodePercentage: 59.7,
            nodeValue: '60,194,913',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            nodeValueType: 1,
            percentage: 59.7,
            label: "59.7%",
            nodeValueColor: Colors.Black,
            // dosage:'',
            dosageSet: {},
            scaling: 2,
        },
        {
            id: 2,
            parent: 0,
            title: "Female Population",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 2",
            // groupTitleColor: Colors.Blue, 
            nodeType: 1,
            nodePercentage: 40.3,
            nodeValue: '40,634,087',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            nodeValueType: 1,
            percentage: 40.3,
            label: "40.3",
            nodeValueColor: Colors.Black,
            // dosage:'',
            dosageSet: {},
            scaling: 2,
        },
        {
            id: 3,
            parent: 1,
            title: "Sexually active men",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeType: 1,
            nodePercentage: 75.4,
            nodeValue: '45,386,964',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            nodeValueType: 1,
            percentage: 75.4,
            label: "75.4%",
            nodeValueColor: Colors.Black,
            // dosage:'',
            dosageSet: {},
            scaling: 2,

        },
        {
            id: 4,
            parent: 3,
            title: "Men who use condoms",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 4",
            // groupTitleColor: Colors.Blue, 
            nodeType: 1,
            nodePercentage: 36.8,
            nodeValue: '16,702,402',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            nodeValueType: 1,
            percentage: 36.8,
            label: "36.8%",
            nodeValueColor: Colors.Black,
            // dosage:'',
            dosageSet: {},
            scaling: 2,
        },
        {
            id: 5,
            parent: 4,
            title: "Condoms",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 5",
            // groupTitleColor: Colors.Blue, 
            nodeType: 2,
            nodeValue: '',
            nodeBackgroundColor: Colors.Black,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            nodePercentage: '',
            nodeValueType: -1,
            percentage: '',
            label: "",
            nodeValueColor: Colors.White,
            // dosage:'30 condoms /person/year (1/CYP)',
            dosageSet: {
                dosageSetId: 1,
                label: {
                    id: '123',
                    label_en: 'Condoms'
                },
                dosage: {
                    forecastingUnit: {
                        id: 1,
                        label: {
                            id: '456',
                            label_en: 'Male Condom (Latex) Lubricated, No Logo, 49 mm Male Condom'
                        }
                    },
                    fuPerApplication: 1.00,
                    noOfTimesPerDay: 1,
                    chronic: false,
                    noOfDaysPerMonth: 2.5,
                    totalQuantity: 41756005

                }

            },
            scaling: -1,
        },
    ],
    demographic_scenario_two: [
        {
            id: 0,
            parent: null,
            title: "Country Population",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 0",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '100,829,000',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 1,
            parent: 0,
            title: "People with malaria",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 1",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '65% = 65,538,850',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "65%",
            nodeValueColor: Colors.Black
        },
        {
            id: 2,
            parent: 1,
            title: "People with fever",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 2",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '25.5% = 16,712,407',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "25.5%",
            nodeValueColor: Colors.Black
        },
        {
            id: 3,
            parent: 2,
            title: "Patient who seek treatment",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '80% = 13,369,926',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "80%",
            nodeValueColor: Colors.Black
        },
        {
            id: 4,
            parent: 3,
            title: "Patient who get mRDT",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 4",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 5,
            parent: 4,
            title: "mRDT",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 5",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '50% of patients * 1test/patient * 1/day',
            nodeBackgroundColor: Colors.Black,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.White
        },
    ],
    demographic_scenario_three: [
        {
            id: 0,
            parent: null,
            title: "Country Population",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 0",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '100,829,000',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 1,
            parent: 0,
            title: "People with malaria",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 1",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '78.6% = 79,251,594',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "78.6%",
            nodeValueColor: Colors.Black
        },
        {
            id: 2,
            parent: 1,
            title: "People with fever",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 2",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '18% = 14,265,287',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "18%",
            nodeValueColor: Colors.Black
        },
        {
            id: 3,
            parent: 2,
            title: "Patient who seek treatment",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 3",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '77% = 10,984,271',
            nodeBackgroundColor: Colors.White,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "77%",
            nodeValueColor: Colors.Black
        },
        {
            id: 4,
            parent: 3,
            title: "Patient who get mRDT",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 4",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '',
            nodeBackgroundColor: Colors.Yellow,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.Black
        },
        {
            id: 5,
            parent: 4,
            title: "mRDT",
            itemTitleColor: Colors.White,
            titleTextColor: Colors.Black,
            // groupTitle: "Level 5",
            // groupTitleColor: Colors.Blue, 
            nodeValue: '85% of patients * 1test/patient * 1/day',
            nodeBackgroundColor: Colors.Black,
            borderColor: Colors.Black,
            description: "Chief Executive Officer (CEO)",
            email: "akil.m@altius.cc",
            phone: "352-206-7599",
            valueType: -1,
            label: "",
            nodeValueColor: Colors.White
        },

    ]
}