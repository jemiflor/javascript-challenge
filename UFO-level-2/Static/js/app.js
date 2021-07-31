// from data.js
var tableData = data;

// YOUR CODE HERE!

function drawtable(data){

    // get hold of the tbody table element
    var tbody = d3.select('tbody')

    data.forEach((ufosighting) => {

        // append row to tbody for each json object in the json data array
        var row = tbody.append("tr");

        //append a cell to each table row for every key value in the json object in the json dat array
        Object.entries(ufosighting).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });

      });
}

drawtable(tableData)

// Select the filter-btn buttons and filter form elements
var filterByDateButton = d3.select("#filter-btn");
var dateInput = d3.select("#datetime");
var cityInput = d3.select("#city-select");
var stateInput = d3.select("#state-select");
var countryInput = d3.select("#country-select");
var shapeInput = d3.select("#shape-select");


filterByDateButton.on("click", function() {
    
    // get the entered/selected filter data
    var dateToFilter = dateInput.property('value');
    var cityToFilter = cityInput.property('value');
    var stateToFilter = stateInput.property('value');
    var countryToFilter = countryInput.property('value');
    var shapeToFilter = shapeInput.property('value');
    
    //initialize result with unfiltered data
    var multiFilterResult = tableData;

    //filter ufo sightings by the date filter value if available
    multiFilterResult = multiFilterResult
      .filter(ufoSighting => 
          (ufoSighting.datetime === (dateToFilter ||  ufoSighting.datetime)) &&
          (ufoSighting.city === (cityToFilter || ufoSighting.city)) &&
          (ufoSighting.state === (stateToFilter || ufoSighting.state)) &&
          (ufoSighting.country === (countryToFilter || ufoSighting.country)) &&
          (ufoSighting.shape === (shapeToFilter || ufoSighting.shape))
        );
    //Research Reference: https://stackoverflow.com/questions/476436/is-there-a-null-coalescing-operator-in-javascript?answertab=active#tab-top    

    // Remove all rows from the table
    var rows = d3.select('tbody').selectAll("tr")    
                 .data([])                
                 .exit()
                 .remove();

    // Draw the table with filtered data
    drawtable(multiFilterResult)

  });