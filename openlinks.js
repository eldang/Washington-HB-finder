var currentBiennium = (function () {
  var date = new Date();
  var thisYear = date.getFullYear();
  var firstYear = (thisYear % 2) ? thisYear : thisYear - 1;
  var secondYear = firstYear - 1999;
  return "" + firstYear + "-" + secondYear;
})();

$(document).ready(function() {
	$("#biennium")[0].textContent = $("#biennium")[0].value =  currentBiennium;
});

function submit(){
	var timeout = 10; // timeout incrementing lets us avoid some basic open-multiple-windows protections.
	var hb = $("#billNumber")[0].value;
	var dates = $("#biennium")[0].value;

	var urls = {
		"digest": "https://lawfilesext.leg.wa.gov/biennium/" + dates + "/Htm/Digests/House/" + hb + ".DIG.htm",
		"fullUrl": "https://lawfilesext.leg.wa.gov/biennium/" + dates + "/Htm/Bills/House%20Bills/" + hb + ".htm",
		"docs": "https://app.leg.wa.gov/dlr/tld/results.aspx?params=" + dates + "," + hb,
		"status": "https://app.leg.wa.gov/billsummary?BillNumber=" + hb + "&Year=" + dates.substring(0,4),
		"feedback": dates === currentBiennium ? "https://app.leg.wa.gov/pbc/bill/" + hb : ""
	};

	var openLink = function(title, url) {
		window.open(url, title);
	}

	for (var title in urls) {
    if (urls.hasOwnProperty(title) && urls[title]) {
      setTimeout(openLink(title, urls[title]), timeout);
      timeout += 10;
    }
	}
}
