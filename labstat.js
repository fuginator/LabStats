var labs = [
  { name: "CF162", first: 0, last: 25 },
  { name: "CF164", first: 0, last: 25 },
  { name: "CF414", first: 0, last: 20 },
  { name: "CF416", first: 1, last: 20 },
  { name: "CF418", first: 1, last: 20 },
  { name: "CF405", first: 1, last: 25 },
  { name: "CF404", first: 1, last: 6 },
  { name: "CF409", first: 1, last: 5 },
  { name: "Linux", first: 1, last: 12 },
]

var countDown = 0;

// Check to see if the page needs to reload.
function checkRun() {
  if (countDown-- <= 0) {
    countDown = 15;
    allLoad();
  }

  document.getElementById("count").innerHTML = countDown + " seconds to next reload.";
}

function firstLoad() {
  var template = "<table><tr>";
  for(l = 0; l < labs.length; l++) {
    var labData = labs[l];
    template += "<td>";
    template += "<h2 class=\"labTitle\">" + labData.name + "</h2>";
    for(i = labData.first; i <= labData.last; i++) {
      template += "<div id=\"" + labData.name + ((i < 10) ? "-0" + i : "-" + i) + "\">";
      template += "<div class=\"Grey\">" + ((i < 10) ? "0" + i : i) + "</div></div>";
    }
    template += "</td>";
  }
  template += "</tr></table>";
  document.getElementById("bodyMaster").innerHTML=template;
  setInterval(function(){checkRun()}, 1000); checkRun();
}

function machineLoad(machine) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var o = JSON.parse(xhr.responseText);
      var html  = "<div class=\"" + o.o + "\">" + o.m.split("-")[1];
      document.getElementById(o.m).innerHTML = html;
    }
  }
  xhr.open('GET', 'machineStat.php?machine='+machine, true);
  xhr.send(null);
}

function labLoad(lab) {
  for (var i = lab.first; i <= lab.last; i++) {
    var machine = lab.name + ((i < 10) ? "-0" : "-") + i;
    machineLoad(machine);
  }
}

function allLoad() {
  for (var l = 0; l < labs.length; l++) {
    labLoad(labs[l]);
  }
  d = new Date();
  document.getElementById("updated").innerHTML = "Last updated at " + d.toLocaleTimeString();
}