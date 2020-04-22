/*introduce the first json file*/
var xmlhttp = new XMLHttpRequest();
var url = "./json/prizesByYear.json";
var parsedObj, parsedObj2;
xmlhttp.onreadystatechange = function () {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		//		console.log(xmlhttp.readyState)
		//		console.log(xmlhttp.status)
		//Parse the JSON data to a JavaScript variable. 
		parsedObj = JSON.parse(xmlhttp.responseText); // This function is defined below and deals with the JSON data parsed from the file. 
	}
};
xmlhttp.open("GET", url, false);
xmlhttp.send();

/*introduce the second json file*/
var xmlhttp2 = new XMLHttpRequest();
var url = "./json/winnersByID.json";
xmlhttp2.onreadystatechange = function () {
	if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
		//		console.log(xmlhttp.readyState)
		//		console.log(xmlhttp.status)
		//Parse the JSON data to a JavaScript variable. 
		parsedObj2 = JSON.parse(xmlhttp2.responseText);
		// This function is defined below and deals with the JSON data parsed from the file. 

	}
};
xmlhttp2.open("GET", url, false);
xmlhttp2.send();


//get the value of category
var prizes = parsedObj.prizes;
var arr = [];

for (var i = 0; i < prizes.length; i++) {
	var category = prizes[i].category;
	//		console.log(category);
	arr.push(category);
}
//console.log(arr)

var r = [];
for (var i = 0; i < arr.length; i++) {
	if (r.indexOf(arr[i]) == -1) {
		r.push(arr[i]);
	}
}
//console.log(r)
r.unshift("all category");

console.log("r" + r);
var selectbutton = "";
for (var k = 0; k < r.length; k++) {
	selectbutton += "<option value='" + r[k] + "'>" + r[k] + "</option>";
}
console.log(selectbutton);
document.getElementById("CATEGORY").innerHTML = selectbutton;

//get the value of category
var arr2 = [];

for (var i = 0; i < prizes.length; i++) {
	var year = prizes[i].year;
	//		console.log(category);
	arr2.push(year);
}
//console.log(arr2);
var r2 = [];
for (var i = 0; i < arr2.length; i++) {
	if (r2.indexOf(arr2[i]) == -1) {
		r2.push(arr2[i]);
	}
}
var r3 = r2;
console.log(r2);
r3.reverse();
console.log(r3);

var selectbutton2 = "";
for (var k = 0; k < r2.length; k++) {
	selectbutton2 += "<option value='" + r2[k] + "'>" + r2[k] + "</option>";
}
//console.log(selectbutton);
var selectbutton3 = "";
for (var k = 0; k < r3.length; k++) {
	selectbutton3 += "<option value='" + r3[k] + "'>" + r3[k] + "</option>";
}
//console.log(selectbutton);
console.log(selectbutton2);
console.log(selectbutton3);
document.getElementById("ENDDATE").innerHTML = selectbutton2;
document.getElementById("STARTDATE").innerHTML = selectbutton3;



function search() {
	var startdate = document.getElementById("STARTDATE").value;
	var enddate = document.getElementById("ENDDATE").value;
	if (startdate > enddate) {
		document.getElementById("table").innerHTML = "Startdate should be smaller than or equal to Enddate! ";
	} else {
		var genderinput =
			'<input name="gender" id="ALLGENDER" type="radio" value="allgender" onchange="genderselect()">All gender<input name="gender" id="MALE" type="radio" value="male" onchange="genderselect()">Male<input name="gender" id="FEMALE" type="radio" value="female" onchange="genderselect()">Female'
		document.getElementById("genderbutton").innerHTML = genderinput;

		var catchoice = document.getElementById("CATEGORY").value;
		//			extract the main properties in the root object.
		var prizes = parsedObj.prizes;
		var content = "<div id='content2'><div class='contentyear'>YEAR</div><div class='contentcategory'>CATEGORY</div><div id='contentnT'>NAME</div><div class='contentoverallmotivation'>OVERALLMOTIVATION</div></div>";
		//		console.log(prizes);
		var line = 1;
		for (var i = 0; i < prizes.length; i++) {
			//			console.log(i);
			//			read the data inside the address object.
			var year = prizes[i].year;
			//				console.log(year)
			var category = prizes[i].category;
			var laureates = prizes[i].laureates;
			var overallmotivation = prizes[i].overallMotivation;
			//					console.log(laureates)
			if (catchoice == "all category" || category == catchoice) {
				if (year >= startdate && year <= enddate) {
					if (i % 2 == 0) {
						content += "<div class='content1' id='line" + line + "'>";
						//				console.log(content)
					} else {
						content += "<div class='content2' id='line" + line + "'>";
					}
					content += "<div class='contentyear' id='contentyear" + line + "'>" + year + "</div><div class='contentcategory' id='contentcategory" + line + "'>" + category + "</div>";
					content += "<div class='contentn' id='contentname" + line + "'>";
					for (var j = 0; j < laureates.length; j++) {
						var id = laureates[j].id;
						var firstname = laureates[j].firstname;
						var surname = laureates[j].surname;
						content += "<p class='contentnn' onclick='show(this)' id='" +
							id + "' value='" + id + "'>" + firstname + " " + surname + "</p><div class='detail' id='detail" + id + "'></div>";
						console.log(content);
					}
					if (overallmotivation) {
						content += "</div><div class='contentoverallmotivation'>" +
							overallmotivation + "</div></div>";
					} else {
						content += "</div><div class='contentoverallmotivation'><p>NONE</p></div></div>";
					}
					//			console.log(content);
					document.getElementById("table").innerHTML = content;
					line += 1;
				}
			}
		}
	}
}

function genderselect() {
	//select gender
	var laureates2 = parsedObj2.laureates;
	var gender = document.getElementsByName("gender");
	var genderselect = "allgender";
	for (var a = 0; a < gender.length; a++) {
		if (gender[a].checked) {
			var genderselect = gender[a].value;
			break;
		}
	}
	console.log(genderselect)
	var element = document.getElementsByClassName("contentn");
	for (var d = 1; d < element.length + 1; d++) {
		console.log(element.length);
		document.getElementById("contentname" + d).innerHTML = "";
		var name = "";
		var yearget = document.getElementById("contentyear" + d).textContent;
		console.log(yearget);
		var categoryget = document.getElementById("contentcategory" + d).textContent;
		console.log(categoryget);
		for (var b = 0; b < laureates2.length; b++) {
			var firstname2 = laureates2[b].firstname;
			var surname2 = laureates2[b].surname;
			var gender2 = laureates2[b].gender;
			var prizes2 = laureates2[b].prizes;
			var id2 = laureates2[b].id;
			for (var c = 0; c < prizes2.length; c++) {
				var year = prizes2[c].year;
				var category = prizes2[c].category;
				if (year == yearget && category == categoryget) {
					if (gender2 == genderselect || genderselect == "allgender") {
						name += "<p class='contentnn' onclick='show(this)' id='" + id2 + "' value='" + id2 + "'>" + firstname2 + " " + surname2 + "</p><div class='detail' id='detail" + id2 + "'></div>";
						console.log(name);
					}
				}
			}
		}
		document.getElementById("contentname" + d).innerHTML = name;
	}
}

function show(data) {
	var idselect = data.id;
	console.log(idselect);
	var showing = document.getElementById("detail" + idselect).textContent;
	if (showing == "") {
		var laureates3 = parsedObj2.laureates;
		var content2 = "";
		for (var b = 0; b < laureates3.length; b++) {
			var id3 = laureates3[b].id;
			if (id3 == idselect) {
				var born3 = laureates3[b].born;
				var died3 = laureates3[b].died;
				var bornCity3 = laureates3[b].bornCity;
				var prizes3 = laureates3[b].prizes;
				if (died3 == "0000-00-00") {
					content2 += "<ul><li>Year of birth: " + born3 + "</li><li>Year of death: NO</li><li>City of birth: " + bornCity3 + "</li><li>Category: "
				} else {
					content2 += "<ul><li>Year of birth: " + born3 + "</li><li>Year of death: " + died3 + "</li><li>City of birth: " + bornCity3 + "</li><li>Category: "
				}
				for (var c = 0; c < prizes3.length; c++) {
					var category3 = prizes3[c].category;
					var motivation3 = prizes3[c].motivation;
					var affiliations3 = prizes3[c].affiliations;
					var year3 = prizes3[c].year;
					content2 += category3 + "<ul><li>Year: " + year3 + "</li><li>Motivation: " + motivation3 + "</li><li>Affiliations: <ul>";
					for (var d = 0; d < affiliations3.length; d++) {
						var name3 = affiliations3[d].name;
						var city3 = affiliations3[d].city;
						var country3 = affiliations3[d].country;
						content2 += "<li>Name: " + name3 + " (City: " + city3 + "," + country3 + ")</li>";
					}
					content2 += "</ul></li>";
				}
				content2 += "</ul></li></ul>";
				break;
			}
		}
		document.getElementById("detail" + idselect).innerHTML = content2;
	} else {
		document.getElementById("detail" + idselect).innerHTML = "";
	}
}
