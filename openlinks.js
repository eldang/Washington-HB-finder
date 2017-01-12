var currentBiennium = (function () {
  var date = new Date();
  var thisYear = date.getFullYear();
  var firstYear = (thisYear % 2) ? thisYear : thisYear - 1;
  var secondYear = firstYear - 1999;
  return "" + firstYear + "-" + secondYear;
})();

$(document).ready(function() {
	$("#biennium")[0].textContent = $("#biennium")[0].value =  currentBiennium;
	console.log($("#submitButton"));
});

function submit(){
	var timeout = 10; // timeout incrementing lets us avoid some basic open-multiple-windows protections.
	var hb = $("#billNumber")[0].value;
	var dates = $("#biennium")[0].value;
	
	var digestURL = "https://lawfilesext.leg.wa.gov/biennium/" + dates + "/Htm/Digests/House/" + hb + ".DIG.htm";
	setTimeout( function(){ window.open(digestURL, "digest") }, timeout);
	timeout += 10;
	
	var fullURL = "https://lawfilesext.leg.wa.gov/biennium/" + dates + "/Htm/Bills/House%20Bills/" + hb + ".htm";
	setTimeout( function(){ window.open(fullURL, "full") }, timeout);
	timeout += 10;
	
	var docsURL = "https://app.leg.wa.gov/dlr/tld/results.aspx?params=" + dates + "," + hb;
	setTimeout( function(){ window.open(docsURL, "docs") }, timeout);
	timeout += 10;
	
	var statusURL = "https://app.leg.wa.gov/billsummary?BillNumber=" + hb + "&Year=" + dates.substring(0,4);
	setTimeout( function(){ window.open(statusURL, "status") }, timeout);
	timeout += 10;

	if (dates === currentBiennium) {
		var feedbackURL = "https://app.leg.wa.gov/pbc/bill/" + hb;
		setTimeout( function(){ window.open(feedbackURL, "feedback") }, timeout);
		timeout += 10;
	}
	
	
 
}
