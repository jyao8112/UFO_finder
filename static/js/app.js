// from data.js
var tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  tbody.html("");
  data.forEach((ufoData) => {
    var row = tbody.append("tr");
    Object.values(ufoData).forEach((value) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
}

var filters = {};

function updateFilters() {
  var changedElement = d3.select(this).select("input");
  var filterValue = changedElement.property("value");
  var filterId = changedElement.attr("id");

  if (filterValue) {
    filters[filterId] = filterValue;
  }
  else {
    delete filters[filterId];
  }
  filterTable();

}

function filterTable() {

  
  let filteredData = tableData;


  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  buildTable(filteredData);
}

d3.selectAll(".filter").on("change", updateFilters);

buildTable(tableData);