

// Load the test subject id's into the dropdown
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

var subject =  941;

d3.json("../../samples.json").then(function (data) {
    
    // bring in the metadata and then filter for the particular subject
    var metaData = data.metadata;
    var subjectData = metaData.filter(person => person.id === subject)[0];

    //select the panel body to display the metadata
    var demobox = d3.select(".panel-body"); 

    // Output the keys and values to the panel
    Object.entries(subjectData).forEach(([key,value]) => {
        var cell = demobox.append("p").text(`${key}: ${value}`);
    });

    //bring in the sample data and filter for the particular subject

    var sample = data.samples;
    console.log(sample);
    var subjectSample = sample.filter(person => person.id == subject)[0];
    console.log(subjectSample);

    var otu_id = subjectSample.otu_ids;
    console.log(otu_id);

    var sampleValues = subjectSample.sample_values;
    console.log(sampleValues);

});


