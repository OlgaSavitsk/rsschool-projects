mapboxgl.accessToken =
  "pk.eyJ1Ijoib2xnYXNhdiIsImEiOiJja3VwemJ6N3gxaTNnMnVwZjY0azM0N3ZmIn0.5zSFY4Vdpq-tcFG7cyfzIQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [2.3364, 48.86091],
  zoom: 16,
});

const marker1 = new mapboxgl.Marker({
  color: "#464646;",
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

const marker2 = new mapboxgl.Marker({
  color: "rgb(104, 102, 102)",
})
  .setLngLat([2.3333, 48.8602])
  .addTo(map);

const marker3 = new mapboxgl.Marker({
  color: "rgb(104, 102, 102)",
})
  .setLngLat([2.3397, 48.8607])
  .addTo(map);

const marker4 = new mapboxgl.Marker({
  color: "rgb(104, 102, 102)",
})
  .setLngLat([2.333, 48.8619])
  .addTo(map);

const marker5 = new mapboxgl.Marker({
  color: "rgb(104, 102, 102)",
})
  .setLngLat([2.3365, 48.8625])
  .addTo(map);
