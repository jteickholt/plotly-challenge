


/////////////////////////////////////////////////////
/// This next function will load the subject id's into the dropdown
/////////////////////////////////////////////////////

function loaddropdown() {
    d3.json("../../samples.json").then(function (data) {
        var names = data.names;
        var dropdown = d3.select("#selDataset");
        names.forEach((name) => {
            dropdown
            .append("option")
            .text(name)
            .property("value", name);
        });
    });
    
}

// call function to load subject id's
loaddropdown();

var subject =  941;

d3.json("../../samples.json").then(function (data) {
    
    /////////////////////////////////////////////////////
    /// This section of code populates the demogaphic panel
    /////////////////////////////////////////////////////

    // bring in the metadata and then filter for the particular subject
    var metaData = data.metadata;
    var subjectData = metaData.filter(person => person.id === subject)[0];

    //select the panel body to display the metadata
    var demobox = d3.select(".panel-body"); 

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
    /// This section of code creates the gauge chart
    /////////////////////////////////////////////////////

    var washFreq = subjectData.wfreq;

    console.log(washFreq);

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
                  { range: [0, 1], color: "Beige" },
                  { range: [1, 2], color: "BlanchedAlmond" },
                  { range: [2, 3], color: "Bisque" },
                  { range: [3, 4], color: "Khaki" },
                  { range: [4, 5], color: "LemonChiffon" },
                  { range: [5, 6], color: "HoneyDew" },
                  { range: [6, 7], color: "LightGreen" },
                  { range: [7, 8], color: "rgb(0,90,60)" },
                  { range: [8, 9], color: "rgb(0,100,110)" },
                ],
                
            }
        }
    ];
    

    Plotly.newPlot('gauge', data, layout);

});


