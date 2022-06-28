const getRandomNumber = (min, max) => {
  if (min >= max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRandomItem = (array) => {
    let randomIndex =getRandomNumber(0, array.length);
    return array[randomIndex];
}

const maxSymbols = (str, maxLength) => {
  return str.length <= maxLength;
}

const COMMENTS_STR = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS_STR  = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8', 'Описание 9', 'Описание 10',
'Описание 11', 'Описание 12', 'Описание 13', 'Описание 14', 'Описание 15', 'Описание 16', 'Описание 17', 'Описание 18', 'Описание 19', 'Описание 20', 'Описание 21',
'Описание 22', 'Описание 23', 'Описание 24', 'Описание 25',];

const NAME_STR = ['Петя', 'Ваня', 'Зина', 'Люба', 'Саша', 'Александра', 'Дима', 'Фил', 'Бил', 'Джони']
const MESSAGE_STR = ['Как то так', 'А можно лучше', 'Это гениально', 'А что, не плохо', 'То что надо']

const fillCommentsPicture = () => {
  let numComments =  getRandomNumber(0, 100);
  let photoComments = [];
  for (let i = 0; i < numComments; i++) {
    let comment = {
      id: getRandomNumber (1, 1000),
      avatar: 'avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomItem(MESSAGE_STR),
      name: getRandomItem(NAME_STR),
     }
     photoComments.push(comment);
    }
    return photoComments;
  }
let photos = [];

for (let i = 0; i <= 25; i++){
  let picture = {
      id: i,
      url: 'photos/' + (1 + i) + '.jpg',
      description: getRandomItem(DESCRIPTIONS_STR),
      likes: getRandomNumber (15, 200),
      comments: fillCommentsPicture()
    }
  photos.push(picture);
}


  console.log(photos);
