'use strict';
// event listener for dropdown
$('#keyWords').on('change', showKeywordPic);
// global arrays
let dropDownArray = [];
let allHorns = [];


// constructor to populate allHorns array
function Animal(animalObj) {
  this.title = animalObj.title;
  this.description = animalObj.description;
  this.keyword = animalObj.keyword;
  this.horns = animalObj.horns;
  this.imageUrl = animalObj.image_url;
  allHorns.push(this);
  if (!dropDownArray.includes(animalObj.keyword)) {
    dropDownArray.push(animalObj.keyword);
  }
}

// function to render dropdown options
function renderOptions() {
  dropDownArray.forEach(element => {
    const $newOption = $(`<option>${element}</option>`);
    $('select').append($newOption);
  });
}

// handlebars function to render image sections
Animal.prototype.render = function () {
  let source = $('#entry-template').html();
  let template = Handlebars.compile(source);
  return template(this);
};

// function to show only selected images from dropdown
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

// checks to see which page is in browser and gets selected JSON
if (window.location.pathname.endsWith('index.html')) {
  $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
    .then(data => {
      data.forEach(element => {
        let horny = new Animal(element);
        let renderedHorns = horny.render();
        $('main').append(renderedHorns);
      });
      renderOptions();
    });

} else if (window.location.pathname.endsWith('index2.html')) {
  $.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' })
    .then(data => {
      data.forEach(element => {
        let horny = new Animal(element);
        let renderedHorns = horny.render();
        $('main').append(renderedHorns);
      });
      renderOptions();
    });

}

const hornAsc = function() {
  allHorns.sort((a, b) => {return a.horns - b.horns; });
  $('.added').remove();
  allHorns.forEach(element => {
    let renderedHorns = element.render();
    $('main').append(renderedHorns);
  });
};

const hornDsc = function() {
  allHorns.sort((a, b) => {return b.horns - a.horns; });
  // allHorns.render();
  $('.added').remove();
  allHorns.forEach(element => {
    let renderedHorns = element.render();
    $('main').append(renderedHorns);
  });
};


const titleAsc = function() {
  allHorns.sort((a, b) => {return a.title > b.title ? 1: a.title < b.title ? -1: 0;});
  // allHorns.render();
  $('.added').remove();
  allHorns.forEach(element => {
    let renderedHorns = element.render();
    $('main').append(renderedHorns);
  });
};

const titleDsc = function() {
  allHorns.sort((a, b) => {return a.title > b.title ? -1: a.title < b.title ? 1: 0;});
  // allHorns.render();
  $('.added').remove();
  allHorns.forEach(element => {
    let renderedHorns = element.render();
    $('main').append(renderedHorns);
  });
};

$('#sortHorn').on('click', hornAsc);
$('#sortTitle').on('click', titleAsc);


// $('#sortHorn').on('toggle', hornAsc, hornDsc);
// $('#sortTitle').toggle(titleAsc, titleDsc);
