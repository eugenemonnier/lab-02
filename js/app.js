'use strict';

let allHorns = [];
function Animal(animalObj) {
  this.imageUrl = animalObj.image_url;
  this.title = animalObj.title;
  this.description = animalObj.description;
  this.keyword = animalObj.keyword;
  this.horns = animalObj.horns;
  allHorns.push(this);
}

Animal.prototype.render = function() {
  const myTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');

  $newSection.html(myTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.imageUrl);
  $newSection.find('img').attr('alt', this.title);
  $newSection.find('p').text(this.description);

  $('main').append($newSection);

};

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then (data => {
    data.forEach(element => {
      let horny = new Animal(element);
      horny.render();
    });
  });
