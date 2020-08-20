window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'C';
    const button2 = document.querySelector('button[data-action="move"]');
    button2.innerText = 'M';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                lat: 37.319010,
                lng: -121.944110,
            },
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        var latitude = place.location.lat;
        var longitude = place.location.lng;

        var model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');
        var entity = document.querySelector('[gps-entity-place]');
        var newIndex = modelIndex % models.length;
        
        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });
        
        document.querySelector('button[data-action="move"]').addEventListener('click', function () {
            latitude = document.getElementById('lat_id').value;
            longitude = document.getElementById('lng_id').value;
            model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            entity = document.querySelector('[gps-entity-place]');
            entity.setAttribute('position', model.position);
            setModel(model, entity);
            scene.appendChild(model);
        });

        scene.appendChild(model);
    });
}
