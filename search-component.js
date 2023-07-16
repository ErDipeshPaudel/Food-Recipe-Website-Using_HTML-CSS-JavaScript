document.addEventListener('DOMContentLoaded', function () {
  let searchInput = document.getElementById('search-input');
  let personList = document.getElementById('person-list');

  let people = [
    {
      name: 'Burger',
      type: 'Vegeterian',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/burgercombo.jpg',
    },

    {
      name: 'Barbecue',
      type: 'Vegetarian',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/barbecue.jpg',
    },
    {
      name: 'Pulau',
      type: 'Vegetarian',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/Chicken-Biryani-Square.jpg',
    },
    {
      name: 'Khir',
      type: 'Vegetarian',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/Chicken-Biryani-Square.jpg',
    },
    {
      name: 'Paneer',
      type: 'Vegetarian',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/Chicken-Biryani-Square.jpg',
    },
    {
      name: 'Kulcha',
      type: 'Vegetarian',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/Chicken-Biryani-Square.jpg',
    },
    {
      name: 'Biryani',
      type: 'Vegetarian',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/biryani.jpg',
    },
    {
      name: 'Tandori',
      type: 'Non-Veg',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/Chicken-Biryani-Square.jpg',
    },
    {
      name: 'Milkshake',
      type: 'Vegetarian',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/milkshake.jpg',
    },
    {
      name: 'Momo',
      type: 'Vegetarian',
      ingredients: 'Flour, Oil, Vegetables',
      photo: './img/momo.jpg',
    },
    // Add details for the remaining people
    // ...
  ];

  function generatePersonCard(person) {
    let card = document.createElement('div');
    card.className = 'person-card';

    let photo = document.createElement('div');
    photo.className = 'person-photo';
    let img = document.createElement('img');
    img.src = person.photo;
    photo.appendChild(img);

    let name = document.createElement('div');
    name.className = 'person-name';
    name.textContent = person.name;

    let type = document.createElement('div');
    type.className = 'person-info';
    type.textContent = 'Type: ' + person.type;

    let ingredients = document.createElement('div');
    ingredients.className = 'person-info';
    ingredients.textContent = 'Ingredients: ' + person.ingredients;

    card.appendChild(photo);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(ingredients);

    return card;
  }

  function renderPersonList(people) {
    personList.innerHTML = '';

    for (let i = 0; i < people.length; i++) {
      let card = generatePersonCard(people[i]);
      personList.appendChild(card);
    }
  }

  renderPersonList(people);

  searchInput.addEventListener('keyup', function () {
    let searchTerm = searchInput.value.toLowerCase();
    let filteredPeople = people.filter(function (person) {
      return person.name.toLowerCase().includes(searchTerm);
    });
    renderPersonList(filteredPeople);
  });
});
