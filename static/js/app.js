// Populate initial demographics
d3.json("samples.json").then(function(sample_data){
    console.log(sample_data);
// Populate dropdown
    Object.values(sample_data.names).forEach(function(name) {
        d3.selectAll("#selDataset").append("option").text(name).property(name);
    });
    Data(sample_data.names[0]);
    Demographics(sample_data.names[0]);
});

// Create function to get the data
function Data(id) {
    d3.json("samples.json").then(function(sample_data){
        console.log(sample_data);

        let filteredSampleInfo = sample_data.samples.filter(details => details.id.toString() === id)[0];
        

        let sample_values = filteredSampleInfo.sample_values
        console.log(sample_values)

        let otu_ids = filteredSampleInfo.otu_ids
        console.log(otu_ids) 

        let top_otus = otu_ids.map(function(otuNumber){
            return "OTU " + otuNumber;
        })

        let otu_labels = filteredSampleInfo.otu_labels
        console.log(otu_labels) 

        // Create horizontal bar graph
        let barTrace = {
            x: sample_values.slice(0,10).reverse(),
            y: top_otus.slice(0,10).reverse(),
            text: otu_labels,
            type: "bar",
            orientation: "h",
            marker: {
                color: "#6b5b9c"
            }
        };
        let barData = [barTrace];

        let subject_id = filteredSampleInfo.id
        let barLayout = {
            title: `Top OTU IDs for Subject ${subject_id}`,
            font:{
                family: 'Quicksand, sans-serif'
              },
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 75,
                r: 75,
                t: 25,
                b: 50
            }
        };
    Plotly.newPlot("bar", barData, barLayout)   
    
    // https://plotly.com/javascript/bubble-charts/
    let bubbleTrace = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids
        },
        text: otu_labels
      };
      
      let bubbleData = [bubbleTrace];
      
      let bubbleLayout = {
        showlegend: false,
        height: 600,
        width: 1000,
        
      };
      
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Plot gauge chart
    // https://plotly.com/python/v3/gauge-charts/
    let filteredWFreq = sample_data.metadata.filter(details => details.id.toString() === id)[0];
    let washingFreq = filteredWFreq.wfreq
    console.log(washingFreq)
    let data = [
        {
            // domain: { x: [0, 9], y: [0, 9], stroke: "white" },
            value: washingFreq,
            title: { text: "Scrubs Per Week" },
            type: "indicator",
            mode: "gauge+number",
            strokecolor: "white",
            gauge: {
              axis: { range: [null, 9], showticklabels: false, tickcolor: "white", strokecolor: "white" },
              bar: { color: "#ffffffb3" },
              bordercolor: "white",	
              steps: [
                { range: [0, 1], color: '#d2b091' },
                { range: [1, 2], color: '#d2bc91' },
                { range: [2, 3], color: '#d2ce91' }, 
                { range: [3, 4], color: '#cad15f' }, 
                { range: [4, 5], color: '#cac12a' }, 
                { range: [5, 6], color: '#418c15e6' }, 
                { range: [6, 7], color: '#228c15e6' }, 
                { range: [7, 8], color: '#228c15' },
                { range: [8, 9], color: '#0e7f00' }],
            }
          }
        ];
    
    let layout = { 
        width: 500, 
        height: 300, 
        margin: { t: 0, b: 0 },
        showticklabels: false,
    };
    Plotly.newPlot("gauge", data, layout);

    });
}

// Create function to get the demographic information

function Demographics(id) {

    d3.json("samples.json").then(function(sample_data) {
        let filteredDemoInfo = sample_data.metadata.filter(details => details.id.toString() === id)[0];

        let demographicInfo = d3.select("#sample-metadata");
            
        demographicInfo.html("");
    
        Object.entries(filteredDemoInfo).forEach(function([key, value]) {   
            demographicInfo.append("h5").text(`${key}: ${value}`);    
        });
    });
}

function optionChanged(id) {
    Data(id);
    Demographics(id);
}

// UNUSED CODE AS TRYING TO PROCESS
    // Retrieve data
        // let names = Object.values(sample_data.names)
        // console.log(names)
        // let samples = Object.values(sample_data.samples)
        // console.log(samples)
        // let sample_values = samples.map(function (sampleVal){
        //     return (sampleVal.sample_values).sort(function (a, b) {
        //         return b - a;
        //     })
        // });
        // console.log(sample_values)
        // let slicedSampleVals = sample_values.map(function(value) {
        //     return value.slice(0, 10);
        // });
        
        // let otu_ids = samples.map(function(otu){
        //     return otu.otu_ids;
        // });
        // console.log(otu_ids) 

        // let slicedOtuIds = otu_ids.map(function(otus){
        //     return otus.slice(0, 10);
        // });
        // console.log(slicedOtuIds)

        // let otu_labels = samples.map(function(labels){
        //     return labels.otu_labels;
        // });
        // // console.log(otu_labels)
        // let slicedLabels =  otu_labels.map(function(value) {
        //     return value.slice(0, 10);
        // });