var currentBiennium = (function () {
  var date = new Date();
  var thisYear = date.getFullYear();
  var firstYear = (thisYear % 2) ? thisYear : thisYear - 1;
  var secondYear = firstYear - 1999;
  return "" + firstYear + "-" + secondYear;
})();

$(document).ready(function() {
	// prefill the biennium box with the current session because that's going to be what people want most often
	$("#biennium")[0].textContent = $("#biennium")[0].value =  currentBiennium;

	// event listener so that pressing return but not tab a text box submits the form
	$(":input").keypress(function(event){
		if(event.keyCode === 13){
			submit();
		}
	});
});


function submit(){
	var timeout = 10; // timeout incrementing lets us avoid some basic open-multiple-windows protections.
	var billNum = $("#billNumber")[0].value;
	var dates = $("#biennium")[0].value;
	var chamber = billNum < 5000 ? "House" : "Senate";

	var urls = {
		"digest": "https://lawfilesext.leg.wa.gov/biennium/" + dates + "/Htm/Digests/" + chamber + "/" + billNum + ".DIG.htm",
		"fullUrl": "https://lawfilesext.leg.wa.gov/biennium/" + dates + "/Htm/Bills/" + chamber + "%20Bills/" + billNum + ".htm",
		"docs": "https://app.leg.wa.gov/dlr/tld/results.aspx?params=" + dates + "," + billNum,
		"status": "https://app.leg.wa.gov/billsummary?BillNumber=" + billNum + "&Year=" + dates.substring(0,4),
		"feedback": dates === currentBiennium ? "https://app.leg.wa.gov/pbc/bill/" + billNum : ""
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
