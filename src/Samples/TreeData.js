import { PageFitMode, Enabled, Colors, TextOrientationType, OrgItemConfig } from 'basicprimitives';
export default{
    node_data: [
        { id: 0,valueType:-1, parent: null, description: "Chief Executive Officer (CEO)", email: "akil.m@altius.cc", phone: "352-206-7599", title: "Akil Mahimwala", label: "Akil Mahimwala" },
        { id: 1,valueType:-1, parent: 0, description: "Co-Presidents, Platform Products & Services Division", email: "ravi.s@altius.cc", phone: "505-791-1689", title: "Ravi Sharma", label: "Jeanna White" },
        { id: 2,valueType:-1, parent: 0, description: "Sr. VP, Server & Tools Division", email: "sameer.g@altiusbpo.com", phone: "262-215-7998", title: "Sameer Gharpurey", label: "James Holt" },
        { id: 3,valueType:-1, parent: 2, description: "VP, Server & Tools Marketing and Solutions", email: "thomwill@name.com", phone: "904-547-5342", title: "Anchal", label: "Thomas Williams" },
        { id: 4,valueType:-1, parent: 2, description: "VP, Software & Enterprise Management Division", email: "sarakemp@name.com", phone: "918-257-4218", title: "Dolly", label: "Sara Kemp" },
        { id: 5,valueType:-1, parent: 2, description: "Sr. VP, Software Server System", email: "georduon@name.com", phone: "434-406-2189", title: "Palash", label: "George Duong" },
        { id: 6,valueType:-1, parent: 2, description: "Sr. VP, Software Server System", email: "georduon@name.com", phone: "434-406-2189", title: "Shubham D", label: "George Duong" },
        { id: 7,valueType:-1, parent: 1, description: "Sr. VP, Software Server System", email: "georduon@name.com", phone: "434-406-2189", title: "Harshana", label: "George Duong" },
        { id: 8,valueType:-1, parent: 1, description: "Sr. VP, Software Server System", email: "georduon@name.com", phone: "434-406-2189", title: "Shubham Y", label: "George Duong" }

    ],
    morbidity_scenario_one: [
        {   id: 0,
            parent: null,
            title: "Malaria patients", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 0",
            groupTitleColor: Colors.Blue, 
            nodeValue:'5405301', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 1,
            parent: 0,
            title: "Malaria pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 1",
            groupTitleColor: Colors.Blue, 
            nodeValue:'35% = 1891855.35', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 2,
            parent: 0,
            title: "Malaria non-pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 1",
            groupTitleColor: Colors.Blue, 
            nodeValue:'65% = 3513445.65', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 3,
            parent: 2,
            title: "Falcifarum non-pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 2",
            groupTitleColor: Colors.Blue, 
            nodeValue:'75% = 2635084.238', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 4,
            parent: 2,
            title: "Vivax non-pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 2",
            groupTitleColor: Colors.Blue, 
            nodeValue:'25% = 878361.4125', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 5,
            parent: 4,
            title: "5 to 14kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'34% = 298642.8803', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 6,
            parent: 4,
            title: "15 to 24kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'21% = 184455.8966', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 7,
            parent: 4,
            title: "35 to 34Kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'27% = 237157.5814', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 8,
            parent: 4,
            title: "> 35kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'18% = 158105.0543', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },

        {   id: 9,
            parent: 5,
            title: "Artemeter 1x6 Dosage", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 4",
            groupTitleColor: Colors.Blue, 
            nodeValue:'100% = 298642.8803 * (2/day * 30 days)', 
            nodeBackgroundColor:Colors.Black,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.White
        },

        {   id: 10,
            parent: 6,
            title: "Primaquine 7.5mg", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 4",
            groupTitleColor: Colors.Blue, 
            nodeValue:'31% = 57181.32795 * (3/day * 15 days)', 
            nodeBackgroundColor:Colors.Black,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.White
        },
        

    ],
    morbidity_scenario_two: [
        {   id: 0,
            parent: null,
            title: "Malaria patients", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 0",
            groupTitleColor: Colors.Blue, 
            nodeValue:'5405301', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 1,
            parent: 0,
            title: "Malaria pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 1",
            groupTitleColor: Colors.Blue, 
            nodeValue:'40% = 2162120.4', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 2,
            parent: 0,
            title: "Malaria non-pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 1",
            groupTitleColor: Colors.Blue, 
            nodeValue:'60% = 3243180.6', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 3,
            parent: 2,
            title: "Falcifarum non-pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 2",
            groupTitleColor: Colors.Blue, 
            nodeValue:'65% = 2108067.39', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 4,
            parent: 2,
            title: "Vivax non-pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 2",
            groupTitleColor: Colors.Blue, 
            nodeValue:'35% = 1135113.21', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 5,
            parent: 4,
            title: "5 to 14kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'35% = 397289.6235', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 6,
            parent: 4,
            title: "15 to 24kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'20% = 227022.642', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 7,
            parent: 4,
            title: "35 to 34Kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'30% = 340533.963', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 8,
            parent: 4,
            title: "> 35kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'15% = 170266.9815', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },

        {   id: 9,
            parent: 5,
            title: "Artemeter 1x6 Dosage", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 4",
            groupTitleColor: Colors.Blue, 
            nodeValue:'100% = 397289.6235 * (1/day * 30 days)', 
            nodeBackgroundColor:Colors.Black,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.White
        },

        {   id: 10,
            parent: 6,
            title: "Primaquine 7.5mg", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 4",
            groupTitleColor: Colors.Blue, 
            nodeValue:'31% = 70377.01902 * (2/day * 15 days)', 
            nodeBackgroundColor:Colors.Black,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.White
        },
        

    ],
    morbidity_scenario_three: [
        {   id: 0,
            parent: null,
            title: "Malaria patients", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 0",
            groupTitleColor: Colors.Blue, 
            nodeValue:'5405301', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 1,
            parent: 0,
            title: "Malaria pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 1",
            groupTitleColor: Colors.Blue, 
            nodeValue:'45% = 2432385.45', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 2,
            parent: 0,
            title: "Malaria non-pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 1",
            groupTitleColor: Colors.Blue, 
            nodeValue:'55% = 2972915.55', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 3,
            parent: 2,
            title: "Falcifarum non-pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 2",
            groupTitleColor: Colors.Blue, 
            nodeValue:'80% = 2378332.44', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        {   id: 4,
            parent: 2,
            title: "Vivax non-pregnant", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 2",
            groupTitleColor: Colors.Blue, 
            nodeValue:'20% = 594583.11', 
            nodeBackgroundColor:Colors.White,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 5,
            parent: 4,
            title: "5 to 14kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'25% = 148645.7775', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 6,
            parent: 4,
            title: "15 to 24kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'25% = 148645.7775', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 7,
            parent: 4,
            title: "35 to 34Kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'25% = 148645.7775', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },
        
        {   id: 8,
            parent: 4,
            title: "> 35kgs", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 3",
            groupTitleColor: Colors.Blue, 
            nodeValue:'25% = 148645.7775', 
            nodeBackgroundColor:Colors.Yellow,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.Black
        },

        {   id: 9,
            parent: 5,
            title: "Artemeter 1x6 Dosage", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 4",
            groupTitleColor: Colors.Blue, 
            nodeValue:'50% = 74322.88875 * (2/day * 30 days)', 
            nodeBackgroundColor:Colors.Black,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.White
        },

        {   id: 10,
            parent: 6,
            title: "Primaquine 7.5mg", 
            itemTitleColor: Colors.White,
            titleTextColor:Colors.Black,
            groupTitle: "Level 4",
            groupTitleColor: Colors.Blue, 
            nodeValue:'50% = 74322.88875 * (2/day * 15 days)', 
            nodeBackgroundColor:Colors.Black,
            borderColor:Colors.Black,
            description: "Chief Executive Officer (CEO)", 
            email: "akil.m@altius.cc", 
            phone: "352-206-7599", 
            valueType:-1,
            label: "" ,
            nodeValueColor:Colors.White
        },
        

    ]
}