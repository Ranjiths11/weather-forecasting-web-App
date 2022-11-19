function showData(e) {
    e.preventDefault();
    var inp = document.getElementById("myInput").value;
    // inp = inp.replaceAll()
    
    // var key ="374b929e9dbb926db0761ca76e817fc9"
    var src =
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyAbkfMbHnkJAx7ZkJSgGZRHD6FE3TfOq30&q=";
    src += inp;
    // src+="Delhi";
    var iframe = document.querySelector("iframe");
    iframe.setAttribute("src", src);
    var timeEl = document.getElementById("time");
    var dateEl = document.getElementById("date");
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      const ampm = hour >= 12 ? "PM" : "AM";
  
      timeEl.innerHTML =
        (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds) +
        " " +
        `<span id="am-pm">${ampm}</span>`;
      dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
    }, 1000);
    //show weather
    var key = "fea74d61489aeb266caea601dd5a609e";
    // var key ="AIzaSyArGwkoC8UwkwCuQ_lGFgma5ul0DEz8zaU"
    // var url = `https://api.openweathermap.org/data/2.5/weather?q=${inp}&units=imperial&appid=${key}`
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${inp}&appid=${key}&units=imperial&cnt=7`;
    //  var url = `https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=imperial&appid=${key}`
    getData();
    async function getData() {
      var response = await fetch(url);
      var data = await response.json();
      console.log(data);
      var populaion = document.getElementById("population");
      var pop = data.city.population.toString();
      pop.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      populaion.innerHTML =
        "Population <span style='float:right;'>" + pop + "</span>";
      var lt = data.city.coord.lat;
      var lg = data.city.coord.lon;
      document.getElementById("lat").innerHTML =
        "Latitude <span style='float:right;'>" + lt + "</span>";
      document.getElementById("long").innerHTML =
        "Longitude <span style='float:right;'>" + lg + "</span>";
      var icon = data.list[0].weather[0].icon;
      console.log(icon);
      
      imgSrc = "Icons/" + icon + ".png";
      if (icon == "10d" || icon == "09d")
        // rain -day
        imgSrc = "Icons/10d_09d.png";
      else if (icon == "09n" || icon == "10n")
        // rain - night
        imgSrc = "Icons/10n_09n.png";
      document.getElementById("weather-img").setAttribute("src", imgSrc);
      var tempr = (data.list[0].main.temp - 32) * (5 / 9);
      var minTempr = ((data.list[0].main.temp_min - 32) * (5 / 9)).toFixed(2);
      var maxTempr = ((data.list[0].main.temp_max - 32) * (5 / 9)).toFixed(2);
      document.getElementById("weather-temp").innerHTML =
        tempr.toFixed(2) + "<sup style='font-size:18px;'>°C</sup>";
      document.getElementById("humidity").innerHTML =
        data.list[0].main.humidity + "%";
      document.getElementById("wind").textContent = data.list[0].wind.speed;
      document.getElementById("min-temp").textContent = minTempr;
      document.getElementById("max-temp").textContent = maxTempr;
      //  document.getElementById("cloud").textContent = data.clouds.all;
      const sunrise = new Date(data.city.sunrise * 1000);
      const sunset = new Date(data.city.sunset * 1000);
      document.getElementById("sunrise").textContent =
        sunrise.getHours() + ":" + sunrise.getMinutes() + "";
      document.getElementById("sunset").textContent =
        sunset.getHours() + ":" + sunset.getMinutes() + "";
      document.getElementById("descr").textContent =
        data.list[0].weather[0].description;
      document.querySelector(".day-container").style.display = "block";
      document.querySelector(".weather-container").style.display = "flex";
      document.querySelector(".seven-days-container").style.display = "flex";
     
      const newDate = new Date();
      var showDay = newDate.getDay();
      for (var y = 0; y < data.list.length; y++) {
        var showDay2 = days[showDay++ % 7];
        document.querySelector(`.day-${y + 1} > #weekday`).textContent = showDay2;
        var tempr = (data.list[y].main.temp - 32) * (5 / 9);
        document.querySelector(
          `.day-${y + 1} > .middle-container > #temp`
        ).innerHTML = tempr.toFixed(2) + "<sup style='font-size:12px;'>°C</sup>";
        var icon = data.list[y].weather[0].icon;
        console.log(icon);
       
        imgSrc = "Icons/" + icon + ".png";
        if (icon == "10d" || icon == "09d")
          // rain -day
          imgSrc = "Icons/10d_09d.png";
        else if (icon == "09n" || icon == "10n")
          // rain - night
          imgSrc = "Icons/10n_09n.png";
        document.querySelector(`.day-${y + 1}  img`).setAttribute("src", imgSrc);
        var minTempr = ((data.list[y].main.temp_min - 32) * (5 / 9)).toFixed(2);
        var maxTempr = ((data.list[y].main.temp_max - 32) * (5 / 9)).toFixed(2);
        document.querySelector(`.day-${y + 1}  #weekday-min-temp`).innerHTML =
          minTempr + "<sup style='font-size:12px;'>°C</sup>";
        document.querySelector(`.day-${y + 1}  #weekday-max-temp`).innerHTML =
          maxTempr + "<sup style='font-size:12px;'>°C</sup>";
      }
     
    }
  }
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      var a,b,i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) {
        //up
        /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }
  /*An array containing all the country names in the world:*/
  var countries = ["Abdul, India","Adilabad, India","Adwani, India","Agartala, India","Agra, India","Ahmedabad, India","Ahmednagar, India","Aizawl, India","Ajabpur, India","Ajmer, India","Akividu, India","Akola, India","Alanallur, India","Alangulam, India","Alappuzha, India","Aldona, India","Alibag, India","Aligarh, India","Alipur, India",
  "Allahabad, India","Almora, India","Aluva, India","Alwar, India","Amal, India","Amalapuram, India","Ambad, India","Ambah, India","Ambala, India","Ambarnath, India","Ambejogai, India","Ambikapur, India","Ambur, India","Amer, India","Amet, India","Amravati, India","Amreli, India","Amritsar, India","Anand, India","Anantapur, India","Anantnag, India","Anantpur, India",
  "Anchal, India","Andheri, India","Andra, India","Angadipuram, India","Angul, India","Ankleshwar, India","Annamalainagar, India","Antapur, India","Arakkonam, India","Arani, India","Aranmula, India","Arch, India","Ariyalur, India","Arora, India","Arpora, India", "Arunachal, India", "Arvi, India","Asansol, India", "Assagao, India","Attingal, India","Attur, India", "Aundh, India", "Aurangabad, India","Avanigadda, India", "Azamgarh, India","Baddi, India","Badlapur, India","Bagalkot, India","Bagh, India","Bagpat, India","Bahadurgarh, India","Baharampur, India","Baidyabati, India","Bala, India","Balaghat, India","Balana, India","Balanagar, India","Balangir, India","Balasore, India","Bali, India","Ballabgarh, India","Balu, India","Balurghat, India","Bambolim, India","Banda, India","Bandra, India","Banga, India","Bangalore, India","Bangaon, India","Bank, India", "Banka, India","Bankura, India","Banswara, India","Bapatla, India","Barakpur, India","Baramati, India", "Barddhaman, India","Bardoli, India", "Bareilly, India","Bargarh, India","Barmer, India","Barnala, India", "Baroda, India","Barpali, India", "Barpeta, India", "Basirhat, India","Basti, India","Basu, India","Batala, India","Bawan, India","Bawana, India","Beawar, India","Begusarai, India","Behala, India","Bela, India","Belapur, India","Belgaum, India", "Belgharia, India","Bellare, India","Bellary, India","Bemetara, India","Berasia, India","Betalbatim, India","Betim, India","Betul, India","Bhadath, India","Bhadohi, India","Bhadravati, India","Bhagalpur, India",
  "Dindori, India","Dipas, India","Dogadda, India","Dona Paula, India","Dumka, India","Durg, India","Durgapur, India","Dwarahat, India","Dwarka, India","Edavanna, India","Ekkattuthangal, India","Ellora Caves, India","Eluru, India","Eral, India","Ernakulam, India","Erode, India","Etawah, India","Faizabad, India", "Farakka, India","Faridabad, India","Faridkot, India","Fatehabad, India","Fatehgarh, India","Fatehpur, India","Firozabad, India","Firozpur, India","Fort, India","Gadag, India","Gampalagudem, India","Gandhidham, India","Gandhigram, India","Gandhinagar, India","Ganga, India","Ganganagar, India","Gangapur, India","Gangrar, India","Gangtok, India","Gannavaram, India","Ganpat, India","Gargoti, India","Garhshankar, India","Gaya, India","Ghana, India","Ghatal, India","Ghatkopar, India","Ghaziabad, India","Goa, India","Gobichettipalayam, India","Godhra, India","Gohana, India","Golaghat, India","Gold, India","Gonda, India","Gorakhpur, India","Goregaon, India","Goshaingaon, India","Gudivada, India","Gudur, India","Guindy, India","Gujrat, India","Gulbarga, India","Guna, India","Guntur, India","Gurdaspur, India","Gurgaon, India","Guruvayur, India","Guwahati, India","Gwalior, India","Habra, India","Hadadi, India","Haldia, India","Haldwani, India","Hamirpur, India","Hansi, India","Hapur, India","Hari, India","Haridwar, India","Haripad, India","Haripur, India","Haryana, India","Hassan, India","Haveri, India","Hazaribagh, India","Himatnagar, India","Hinganghat, India","Hingoli, India","Hira, India","Hiriyur, India","Hisar, India","Honavar, India","Hong, India","Hoshangabad, India","Hoshiarpur, India","Hosur, India","Howrah, India","Hubli, India","Hugli, India", "Hyderabad, India","Ichalkaranji, India","Idukki, India", "Igatpuri, India","Iglas, India","Imphal, India", "Indore, India", "Indraprast, India", "Irinjalakuda, India","Itanagar, India","Jabalpur, India", "Jadabpur, India", "Jagdalpur, India", "Jagraon, India", "Jaipur, India","Jaisalmer, India", "Jajpur, India", "Jalalabad, India", "Jalalpur, India", "Jalandhar, India", "Jalesar, India", "Jalgaon Jamod, India", "Jalna, India", "Jalpaiguri, India", "Jamal, India","Jammu, India",
  "Jamnagar, India","Jamshedpur, India","Janjgir, India", "Jaspur, India","Jatani, India","Jaunpur, India","Jayanti, India", "Jaynagar, India","Jaypur, India","Jha Jha, India", "Jhajjar, India","Jhalawar, India",  "Jhansi, India", "Jhargram, India","Jharsuguda, India","Jhunjhunun, India","Jind, India","Jodhpur, India", "Jorhat, India", "Junagadh, India", "Kadapa, India","Kagal, India","Kailaras, India","Kaimganj, India","Kaithal, India", "Kakdwip, India", "Kakinada, India","Kaladi, India","Kalam, India","Kalamboli, India", "Kalan, India", "Kalinga, India", "Kalka, India","Kalkaji Devi, India","Kalol, India","Kalpakkam, India","Kalpetta, India","Kalra, India","Kalyan, India","Kalyani, India","Kamalpur, India","Kamalpura, India", "Kamat, India","Kanakpura, India","Kanchipuram, India","Kanchrapara, India","Kandi, India", "Kangayam, India", "Kangra, India","Kanhangad, India","Kanigiri, India", "Kaniyambadi, India", "Kankauli, India", "Kanniyakumari, India", "Kannur, India", "Kanpur, India", "Kapurthala Town, India","Karad, India","Karaikal, India","Karaikudi, India","Karamadai, India", "Karamsad, India", "Karanja, India", "Karari, India","Kargil, India", "Karimganj, India","Karimnagar, India", "Karjat, India", "Karnal, India", "Karsiyang, India", "Karur, India",  "Karwar, India", "Kasal, India", "Kasaragod, India", "Kasganj, India",  "Kashipur, India",  "Kasia, India", "Kataria, India", "Kathua, India", "Katni, India","Katoya, India","Katra, India", "Kaul, India", "Kavali, India","Kavaratti, India","Kayamkulam, India", "Keshod, India","Khajuraho Group of Monuments, India", "Khalapur, India", "Khambhat, India", "Khammam, India", "Khan, India", "Khanna, India", "Kharagpur, India","Kharar, India",  "Khargone, India", "Khatauli, India", "Kheda, India", "Khergam, India", "Kheri, India", "Khinwara, India", "Khopoli, India","Khurda, India", "Khurja, India", "Kishangarh, India", "Koch Bihar, India","Kochi, India", "Kodaikanal, India",  "Kodungallur, India", "Kohima, India",  "Kokrajhar, India","Kolar, India",  "Kolayat, India",  "Kolhapur, India", "Kolkata, India", "Kollam, India",  "Kollegal, India",  "Koni, India", "Konnagar, India", "Koothanallur, India",  "Koppal, India", "Koraput, India",  "Korba, India",  "Kosamba, India",  "Kot Isa Khan, India", "Kota, India",  "Kotian, India", "Kottagudem, India", "Kottakkal, India",  "Kottarakara, India","Kottayam, India","Kovilpatti, India","Kovvur, India","Kozhikode, India","Krishnagiri, India","Kulti, India",
  "Kumar, India","Kumbakonam, India","Kumhari, India","Kundan, India","Kunwar, India","Kuppam, India","Kurali, India","Kurnool, India","Kushalnagar, India","Kuzhithurai, India","Ladwa, India","Lakhimpur, India","Lala, India","Lalgudi, India","Lamba Harisingh, India","Lanka, India","Latur, India","Liluah, India","Lohaghat, India", "Lucknow, India", "Ludhiana, India", "Machhiwara, India",  "Machilipatnam, India", "Madanapalle, India","Madgaon, India", "Madhoganj, India",  "Madikeri, India",  "Madurai, India",  "Madurantakam, India",  "Mahabalipuram, India",  "Mahad, India",  "Mahajan, India",  "Mahal, India",  "Maharaj, India",  "Mahatma, India",  "Mahesana, India",  "Mahesh, India",  "Mahim, India",  "Mahulia, India",  "Malappuram, India",  "Maldah, India",  "Malpur, India",  "Manali, India",  "Mancherial, India",  "Mandal, India",  "Mandapeta, India", "Mandi, India",  "Mandla, India",  "Mandsaur, India",  "Mandvi, India", "Mandya, India", "Mangalagiri, India", "Mangalore, India", "Mangaon, India", "Manipala, India",  "Manipur, India", "Manjeri, India", "Manna, India",  "Mannargudi, India",  "Manor, India", "Mansa, India", "Manu, India", "Markal, India", "Markapur, India",  "Marmagao, India", "Maru, India", "Mashobra, India",  "Matar, India",  "Mathan, India", "Mathura, India", "Mattanur, India", "Mavelikara, India", "Mawana, India",  "Mayapur, India", "Medak, India", "Medarametla, India", "Medchal, India", "Medinipur, India","Meerut, India", "Mehra, India", "Mettur, India", "Mhow, India",  "Mill, India",  "Miraj, India",  "Mirza Murad, India",  "Mirzapur, India",  "Mithapur, India","Modasa, India","Moga, India","Mohala, India", "Mohali, India","Mohan, India", "Moradabad, India",  "Morena, India",  "Morinda, India" , "Morvi, India", "Motihari, India", "Mount Abu, India",  "Muddanuru, India", "Mukerian, India",  "Muktsar, India", "Multi, India",  "Mumbai, India",  "Mundgod, India",  "Mundra, India",  "Munger, India", "Murshidabad, India","Mussoorie, India",  "Muzaffarnagar, India",  "Muzaffarpur, India",  "Mylapore, India",  "Mysore, India",  "Nabadwip, India",  "Nabha, India", "Nadgaon, India",  "Nadia, India",  "Nadiad, India",  "Nagal, India",  "Nagapattinam, India",  "Nagar, India","Nagara, India", "Nagari, India","Nagaur, India",  "Nagercoil, India",  "Nagpur, India",  "Nagwa, India",  "Naini, India",  "Nalagarh, India",  "Nalbari, India",  "Nalgonda, India",  "Namakkal, India",  "Namrup, India",  "Nanda, India",  "Nanded, India", "Nandi, India",
  "Nandigama, India","Nandurbar, India","Nandyal, India","Naraina, India","Narasaraopet, India","Narayangaon, India","Narela, India","Narnaul, India","Narsapur, India","Nashik, India","Nathdwara, India", "Navelim, India", "Navsari, India","Nayagarh, India","Nazira, India","Nehra, India","Nellore, India","Neral, India","Neri, India","New Delhi, India","Neyveli, India","Nila, India","Nilambur, India","Nilokheri, India","Nizamabad, India", "Noida, India", "Nongpoh, India", "Nongstoin, India","North Lakhimpur, India","Nurpur, India","Nuzvid, India","Odhan, India","Omalur, India","Ongole, India","Ooty, India","Orai, India","Osmanabad, India", "Ottappalam, India","Pachmarhi, India", "Padrauna, India","Pahalgam, India","Pakala, India","Pala, India","Palakkad, India", "Palampur, India","Palani, India", "Palayam, India","Palghar, India", "Pali, India","Palladam, India","Paloncha, India","Palus, India","Palwal, India","Panchal, India","Panchgani, India","Pandharpur, India","Panipat, India","Panjim, India","Panruti, India","Pantnagar, India", "Panvel, India","Paonta Sahib, India","Parappanangadi, India","Paravur, India","Parbhani, India","Parel, India","Parra, India", "Patan, India", "Patancheru, India", "Patel, India","Patelguda, India","Pathanamthitta, India","Pathankot, India", "Patiala, India","Patna, India", "Pattambi, India","Pattukkottai, India","Pauri, India", "Payyanur, India","Peddapuram, India",
  "Pehowa, India","Perambalur, India","Peranampattu, India","Perundurai, India", "Petlad, India", "Phagwara, India", "Phaphamau, India", "Piduguralla, India", "Pilani, India","Pileru, India","Pilkhuwa, India","Pimpri, India","Pitampura, India","Pithapuram, India","Pithoragarh, India","Pochampalli, India","Pollachi, India", "Ponda, India","Ponnani, India","Ponneri, India","Porbandar, India","Port Blair, India", "Potti, India","Powai, India","Proddatur, India","Puducherry, India","Pudukkottai, India", "Puliyur, India","Punalur, India","Pune, India",  "Puras, India","Puri, India", "Purnea, India","Puruliya, India", "Pusa, India", "Pushkar, India","Puttur, India", "Quepem, India", "Raichur, India", "Raigarh, India", "Raipur, India", "Rajahmundry, India",  "Rajapalaiyam, India",  "Rajapur, India",  "Rajkot, India",  "Rajpur, India", "Rajpura, India",  "Raju, India", "Rama, India",  "Ramanagaram, India",  "Ramanathapuram, India",  "Ramapuram, India",  "Ramavaram, India",  "Ramgarh, India",  "Ramnagar, India",  "Rampur, India", "Rana, India",  "Ranaghat, India", "Ranchi, India", "Rander, India",  "Raniganj, India", "Ranippettai, India",  "Ranjan, India", "Ratlam, India",  "Ratnagiri, India",  "Raurkela, India",  "Rawal, India",  "Raxaul, India",  "Rayagada, India",  "Rewa, India",  "Rewari, India",  "Ring, India",  "Rishikesh, India", "Rohtak, India", "Roorkee, India","Roshan, India","Rudrapur, India","Rupnagar, India","Rupnarayanpur, India","Sachin, India","Sagar, India","Saha, India","Saharanpur, India","Sahibabad, India","Sakri, India","Salem, India","Saligao, India","Salt Lake City, India","Samastipur, India","Sambalpur, India","Sanand, India","Sandur, India","Sangam, India","Sangamner, India","Sangli, India","Sangola, India","Sangrur, India","Sanquelim, India","Saranga, India","Sarangi, India","Sarwar, India", "Satara, India","Satna, India","Sattur, India","Sawi, India","Secunderabad, India","Sehore, India","Sendhwa, India","Serampore, India","Shadnagar, India","Shahabad, India","Shahapur, India","Shahdara, India","Shahdol, India","Shahjahanpur, India","Shahkot, India", "Shamsabad, India","Shanti Grama, India","Shillong, India","Shimla, India","Shimoga, India","Shirgaon, India","Shiv, India","Sholavandan, India","Shoranur, India","Shrigonda, India","Shyamnagar, India", "Sibsagar, India","Sidhi, India", "Sidhpur, India","Sikar, India","Sikka, India", "Silchar, India","Siliguri, India","Silvassa, India","Singarayakonda, India","Singtam, India",
  "Sinnar, India","Sion, India","Sirhind, India","Sirkazhi, India","Sirohi, India","Sirsa, India","Sirsi, India", "Siruguppa, India", "Siruseri, India","Sirwani, India","Sitapur, India","Siuri, India", "Sivaganga, India","Sivakasi, India","Sodhi, India","Sojat, India","Solan, India","Solapur, India","Solim, India","Somnath, India","Soni, India","Sonipat, India","Sopara, India","Srikakulam, India","Srikalahasti, India","Srinagar, India","Sriperumbudur, India","Srirangam, India","Srivilliputhur, India","Sukma, India","Sultan, India", "Sultanpur, India","Sultans Battery, India","Suman, India","Sunam, India", "Sundargarh, India","Surana, India","Suratgarh, India","Surendranagar, India","Suriapet, India","Tadepallegudem, India","Tala, India","Talcher, India","Talegaon Dabhade, India","Talwandi Sabo, India","Tambaram, India","Tanda, India","Tanuku, India","Tarn Taran, India","Teri, India","Tezpur, India","Thalassery, India","Thane, India", "Thanjavur, India","Thasra, India","Thenali, India","Thenkasi, India","Thirumangalam, India","Thiruthani, India","Thiruvananthapuram, India","Thiruvarur, India","Thoothukudi, India","Thrissur, India","Tikamgarh, India","Tindivanam, India","Tinsukia, India","Tiptur, India","Tiruchchendur, India","Tiruchi, India","Tirumala, India","Tirumala - Tirupati, India","Tirunelveli, India","Tiruppur, India",  "Tirur, India","Tiruvalla, India","Tiruvallur, India","Tiruvannamalai, India","Tohana, India","Tonk, India","Trimbak, India","Tuljapur, India","Turaiyur, India","Udaigiri, India","Udaipur, India","Udupi, India","Ujjain, India","Ulhasnagar, India","Ulubari, India","Umred, India","Unnao, India","Uppal, India","Uttarkashi, India","Vadamadurai, India","Vadner, India","Vadodara, India","Vaikam, India","Vainguinim, India","Valsad, India","Vandalur, India","Vandavasi, India","Vaniyambadi, India","Vapi, India","Varanasi, India","Vasai, India","Vasco, India","Vashi, India","Vazhakulam, India","Vellore, India","Verna, India","Vidisha, India","Vijapur, India","Vijayawada, India","Vikarabad, India","Vikasnagar, India","Villupuram, India","Vinukonda, India","Virar, India","Visakhapatnam, India","Visnagar, India","Vizianagaram, India","Wai, India","Warangal, India","Wardha, India","Wellington, India","Yadgir, India","Yamunanagar, India","Yanam, India","Yavatmal, India","Yeola, India","Yercaud, India",
  ];
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("myInput"), countries);