var labs = ["CF162:0:25", "CF164:0:25", "CF414:0:20", "CF416:1:20", "CF418:1:20", "CF405:1:25", "CF404:1:6", "CF409:1:5", "Linux:1:12"];
var countdown = 0;

function checkRun() {
	if(countdown-- <= 0) { countdown = 15; allLoad(); }
	document.getElementById("count").innerHTML = countdown + " seconds to next reload.";
}

function firstLoad() {
    var template = "<table style='width:100%;'><tr>";
    for(l = 0; l < labs.length; l++) {
        var labData = labs[l].split(":");
        template += "<td style='width:11%; vertical-align:top;'>";
        template += "<h2 class=\"labTitle\">" + labData[0] + "</h2>";
        for(i = labData[1]; i <= labData[2]; i++) {
            template += "<div id=\"" + labData[0] + ((i < 10) ? "-0" + i : "-" + i) + "\">";
			template += "<div class=\"Grey\">" + ((i < 10) ? "0" + i : i) + "</div></div>";
        }
        template += "</td>";
    }
    template += "</tr></table>";
    document.getElementById("bodyMaster").innerHTML=template;
	setInterval(function(){checkRun()}, 1000); checkRun();
}

function allLoad() {
    for(l = 0; l < labs.length; l++) {
        labData = labs[l].split(":");
        labLoad(labData[0], labData[1], labData[2]);
    }
	d = new Date();
	document.getElementById("updated").innerHTML = "Last updated at " + d.toLocaleTimeString();
}

function labLoad(lab, start, end) {
    for(i = start; i <= end; i++) { machineLoad(lab + ((i < 10) ? "-0" + i : "-" + i)); }
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
    xhr.open('GET', 'http://sw.cs.wwu.edu/~fugiera/dev/machineStat.php?machine='+machine, true);
    xhr.send(null);
}
