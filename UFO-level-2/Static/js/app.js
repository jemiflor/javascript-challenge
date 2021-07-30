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

// Select the filter-btn buttons and date input box
var filterByDateButton = d3.select("#filter-btn");
var dateInput = d3.select("#datetime");


filterByDateButton.on("click", function() {
    
    // get the date entered to filter
    var dateToFilter = dateInput.property('value');
    
    //filter ufo sightings by the date filter value
    var ufoSightingsFilteredByDate = tableData.filter(ufoSighting => ufoSighting.datetime === dateToFilter);
  
    // Remove all rows from the table
    var rows = d3.select('tbody').selectAll("tr")    
                 .data([])                
                 .exit()
                 .remove();

    // Draw the table with filtered data
    drawtable(ufoSightingsFilteredByDate)

  });