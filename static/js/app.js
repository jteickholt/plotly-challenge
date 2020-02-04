
/////////////////////////////////////////////////////
/// This is the main function that will create/update all of the charts
/////////////////////////////////////////////////////


function updateCharts() {
    d3.json("https://jteickholt.github.io/plotly-challenge/samples.json").then(function (data) {
        
        /////////////////////////////////////////////////////
        /// This section of code populates the demogaphic panel
        /////////////////////////////////////////////////////

        // Identify which subject was chosen
        var subject = +d3.select('#selDataset').node().value;

        // bring in the metadata and then filter for the particular subject
        var metaData = data.metadata;
        var subjectData = metaData.filter(person => person.id === subject)[0];

        //select the panel body to display the metadata
        var demobox = d3.select(".panel-body"); 

        // Clean the panel of data 
        demobox.html("");

        // Output the keys and values to the panel
        Object.entries(subjectData).forEach(([key,value]) => {
            var cell = demobox.append("p").text(`${key}: ${value}`);
        });

        /////////////////////////////////////////////////////
        /// This section of code creates the bar chart
        /////////////////////////////////////////////////////

        //bring in the sample data and filter for the chosen subject

        var sample = data.samples;

        var subjectSample = sample.filter(person => person.id == subject)[0];

        //Slice the otu_ids to keep just the top 10 
        var otuId = subjectSample.otu_ids.slice(0,10);

        // Create labels to be used on bar chart
        var otuLabels = otuId.map(entry => "OTU " + entry);
        
        // Slice the sample_value to keep just the top 10
        var sampleValues = subjectSample.sample_values.slice(0,10);
    
        // define the trace
        var trace1 = {
            x: sampleValues.reverse(),
            y: otuLabels.reverse(),
            text: otuLabels,
            name: "Sample",
            type: "bar",
            orientation: "h"
        };
        
        // define data
        var data = [trace1];
        
        // Define layout
        var layout = {
            margin: {
            l: 100,
            r: 100,
            t: 5,
            b: 25
            }
        };
        
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", data, layout);
        

        /////////////////////////////////////////////////////
        /// This section of code creates the bubble chart
        /////////////////////////////////////////////////////

        var trace1 = {
            x: subjectSample.otu_ids,
            y: subjectSample.sample_values,
            mode: 'markers',
            marker: {
            size: subjectSample.sample_values,
            color: subjectSample.otu_ids
            }
        };

        data=[trace1]

        var layout = {
            showlegend: false,
        
        };

        Plotly.newPlot("bubble", data, layout);

        /////////////////////////////////////////////////////
        /// This section of code creates the bonsus gauge chart
        /// I got the basic chart, but wasn't able to customize like shown in the instructions.
        /////////////////////////////////////////////////////

        var washFreq = subjectData.wfreq;

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washFreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",  
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                    { range: [0, 1], color: "rgba(295, 295, 255, 0)" },
                    { range: [1, 2], color: "rgba(235, 232, 232, 0.5)" },
                    { range: [2, 3], color: "rgba(232, 226, 202, .5)" },
                    { range: [3, 4], color: "rgba(210, 206, 145, .5)" },
                    { range: [4, 5], color: "rgba(202, 209, 95, .5)" },
                    { range: [5, 6], color: "rgba(202, 209, 95, .5)" },
                    { range: [6, 7], color: "rgba(170, 202, 42, .5)" },
                    { range: [7, 8], color: "rgba(110, 154, 22, .5)" },
                    { range: [8, 9], color: "rgba(50, 154, 22, .5)" },
                    ],
                    
                }
            }
        ];
        
        // Create the gauge plot
        Plotly.newPlot('gauge', data, layout);

    });

}

/////////////////////////////////////////////////////
/// This next function will load the subject id's into the dropdown.
/// It also calls the updateCharts function which will initialize the charts
/// using the first subject on the list.
/////////////////////////////////////////////////////

function loaddropdown() {
    d3.json("https://jteickholt.github.io/plotly-challenge/samples.json").then(function (data) {
        var names = data.names;
        var dropdown = d3.select("#selDataset");
        names.forEach((name) => {
            dropdown
            .append("option")
            .text(name)
            .property("value", name);
        });
    });
    // Here I call the main function which ititializes the page based on the first subject on the list
    updateCharts();  
}

// call function to load subject id's into dropdown
loaddropdown();


// Selects that dropdown element and upon change executes the main function to update the charts
d3.selectAll('#selDataset').on('change', updateCharts);

