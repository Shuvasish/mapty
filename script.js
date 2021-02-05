'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._neWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  //getting user position
  _getPosition() {
    if (navigator.geolocation) {
      console.log(this);
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
          console.log(this.#map);
        }
      );
    }
  }

  //loading map
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const cords = [latitude, longitude];
    // console.log(cords);

    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    console.log(this);
    this.#map = L.map('map').setView(cords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //handling click on maps

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    console.log(this);
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _neWorkout(e) {
    e.preventDefault();

    //clearing input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';

    //display marker
    console.log(this.#mapEvent.latlng.lat, this.#mapEvent.latlng.lng);
    L.marker([this.#mapEvent.latlng.lat, this.#mapEvent.latlng.lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('workout')
      .openPopup();
    // form.classList.add('hidden');
  }
}

//creating new instance using App class
const app = new App();
