'use strict';

let allHorns = [];
function Animal(animalObj) {
  this.imageUrl = animalObj.image_url;
  this.title = animalObj.title;
  this.keyword = animalObj.keyword;
  this.horns = animalObj.horns;
  allHorns.push(this);
}

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then (data => {
    data.forEach(element => {
      let horny = new Animal(element);
    });
  });
