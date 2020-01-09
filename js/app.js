'use strict';

$('#keyWords').on('change', showKeywordPic);

let dropDownArray = [];

let allHorns = [];
function Animal(animalObj) {
  this.imageUrl = animalObj.image_url;
  this.title = animalObj.title;
  this.description = animalObj.description;
  this.keyword = animalObj.keyword;
  this.horns = animalObj.horns;
  allHorns.push(this);
  if (!dropDownArray.includes(animalObj.keyword)) {
    dropDownArray.push(animalObj.keyword);
  }
}

function renderOptions() {
  dropDownArray.forEach(element => {
    const $newOption = $(`<option>${element}</option>`);
    $('select').append($newOption);
  });
}

Animal.prototype.render = function () {
  const myTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');

  $newSection.html(myTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.imageUrl);
  $newSection.find('img').attr('alt', this.title);
  $newSection.find('p').text(this.description);
  $newSection.attr('class', this.keyword);

  $('main').append($newSection);
};


function showKeywordPic() {
  $('section').hide();
  let selectedKeyword = $(this).val();
  if (selectedKeyword === 'default') {
    $('section').show();
    $('#photo-template').hide();
  } else {
    $('.' + selectedKeyword).show();
  }
}

if (window.location.pathname.endsWith('index.html')) {
  $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
    .then(data => {
      data.forEach(element => {
        let horny = new Animal(element);
        horny.render();
      });
      renderOptions();
    });

} else if (window.location.pathname.endsWith('index2.html')) {
  $.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' })
    .then(data => {
      data.forEach(element => {
        let horny = new Animal(element);
        horny.render();
      });
      renderOptions();
    });

}
