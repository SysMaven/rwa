
const buoys = ['46253', '46275', '46224', '46225', '46274'];


var buoysRow = document.getElementById("buoys");

buoys.forEach(buoy => {

    const col = document.createElement("div");
    col.classList.add('col-lg-3', 'col-md-6');

    const card = document.createElement("div");
    card.classList.add('card', 'h-100');

    var cardBody = document.createElement("div");
    cardBody.classList.add('card-body');
    //cardBody.innerHTML = buoy;

    buoysRow.appendChild(col).appendChild(card).appendChild(cardBody);

    const RSSUrl = `https://www.ndbc.noaa.gov/data/latest_obs/${buoy}.rss`;
    const RSSConverter = `https://api.rss2json.com/v1/api.json?rss_url=${RSSUrl}`;
    fetch(RSSConverter)
        .then(res => res.json())
        .then((out) => {
            //console.log(out.items);
            cardBody.innerHTML = `<h6>${out.items[0].title}</h6>` + out.items[0].content;
        })
        .catch(err => console.error(err));

});
