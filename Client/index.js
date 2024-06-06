function onPageLoad() {
  console.log("Document Loading");
  var url = "http://127.0.0.1:5000/get_location_names";
  $.get(url, function (data, status) {
    if (status === "success" && data && data.locations) {
      var locations = data.locations;
      var uilocations = document.getElementById("uilocations");
      $("#uilocations").empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $("#uilocations").append(opt);
      }
    } else {
      console.error("Failed to load locations:", status);
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("AJAX request failed:", textStatus, errorThrown);
  });
}

function estimatePrice(event) {
  var sqft = document.getElementById("uiSqft");
  var bhk = getbhkValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uilocations");
  var estPrice = document.getElementById("uiEstimatedPrice");
  var url = "http://127.0.0.1:5000/predict_home_price";
  console.log(sqft.value + " " + bhk + " " + bathrooms + " " + location.value);
  $.post(
    url,
    {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value,
    },
    function (data, status) {
      if (status === "success" && data && data.estimated_price) {
        console.log(data.estimated_price);
        estPrice.innerHTML =
          "<h2>" + data.estimated_price.toString() + " hundred thousand </h2>";
        console.log(status);
      } else {
        console.error("Failed to get estimated price:", status);
      }
    }
  ).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("AJAX request failed:", textStatus, errorThrown);
  });
}

function getBathValue() {
  var uibathrooms = document.getElementsByName("bath");
  for (var i in uibathrooms) {
    if (uibathrooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getbhkValue() {
  var uibhkrooms = document.getElementsByName("bhk");
  for (var i in uibhkrooms) {
    if (uibhkrooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1;
}

window.onload = onPageLoad;
