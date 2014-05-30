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

  document.getElementById('countdown').innerHTML = countDown;
}

// Only run when the page first loads to initialize the environment.
function initPage() {
  var tr = document.getElementsByTagName('tr')[0];
  labs.forEach(function(lab) {
    var td = document.createElement('td');

    // Create a header for each lab.
    var h2 = document.createElement('h2');
    h2.innerHTML = lab.name;
    td.appendChild(h2);

    // Create a div for each machine in a given lab.
    for(i = lab.first; i <= lab.last; i++) {
      var machine = ((i < 10) ? "0" : "") + i;
      var div = document.createElement('div');
      div.setAttribute('id', lab.name + "-" + machine);
      div.setAttribute('class', 'Grey');
      div.innerHTML = machine;
      td.appendChild(div);
    }

    // Append the new table data element to the table row.
    tr.appendChild(td);
  });
  setInterval(function(){checkRun()}, 1000); checkRun();
}

// Load the data for an individual machine.
function machineLoad(machine) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var res = JSON.parse(xhr.responseText);
      var div = document.getElementById(machine);
      div.setAttribute('class', res.os);
    }
  }

  xhr.open('GET', 'machineStat.php?machine='+machine, true);
  xhr.send(null);
}

// Load the data for an entire lab.
function labLoad(lab) {
  for (var i = lab.first; i <= lab.last; i++) {
    var machine = lab.name + ((i < 10) ? "-0" : "-") + i;
    machineLoad(machine);
  }
}

// Load the data for all lab machines in the department.
function allLoad() {
  for (var l = 0; l < labs.length; l++) {
    labLoad(labs[l]);
  }
  d = new Date();
  document.getElementById("updated").innerHTML = d.toLocaleTimeString();
}
