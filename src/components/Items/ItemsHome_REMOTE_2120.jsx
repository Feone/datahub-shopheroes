import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import 'whatwg-fetch'

class ItemsHome extends Component {
  constructor(props) {
    super(props);
    window.sourceSheet = '1HktYmh9zKprS5YrBWMakZKIfKNIa7bV9X7fp_bpaAfM';
    loadSheetList();
  }
  render() {
    return (
      <div>
        <h4>ItemsHome Container</h4>
      </div>
    )
  }
}


function loadSheetList() {
  fetch('https://spreadsheets.google.com/feeds/worksheets/'+window.sourceSheet+'/public/basic?alt=json')
  .then(function(response) {
      return response.text();
    }).then(function(sheetsJson) {
      initSheetList(sheetsJson)
    })
}

function initSheetList(sheetsJson) {
  var sheets = JSON.parse(sheetsJson);
  var entries = sheets.feed.entry;
  var arrayLength = entries.length;
  var sheetMap = {};
  for (var i = 0; i < arrayLength; i++) {
    var title = entries[i].title.$t;
    console.log(title);
    var id = entries[i].id.$t;
      var lastSlash = id.lastIndexOf('/');
      id = id.substring(lastSlash+1,id.length);
      sheetMap[title] = id;
    }
    window.sheetMap = sheetMap;

    loadItemList();
}



function loadItemList() {
    var swordsId = window.sheetMap.Swords;
    fetch('https://spreadsheets.google.com/feeds/list/'+window.sourceSheet+'/'+swordsId+'/public/basic?alt=json')
    .then(function(response) {
      return response.text();
    }).then(function(sheetsJson) {
      initItemList(sheetsJson)
    })

}
function initItemList(sheetsJson) {
  var sheet = JSON.parse(sheetsJson);
  var rows = sheet.feed.entry;
  var parsedRows = [];
  for (var i = 0; i < rows.length; i++) {
    var row = {}
    row.itemName = rows[i].title.$t;
    var otherCells = rows[i].content.$t;
    var cells = otherCells.split(',');
    for (var j = 0; j < cells.length; j++) {
      var pieces = cells[j].split(":");
      row[pieces[0]] = pieces[1];
    }
    parsedRows[i] = row;
  }
  console.log(JSON.stringify(rows));
}



export default ItemsHome;
