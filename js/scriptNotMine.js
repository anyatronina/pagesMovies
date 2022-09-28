/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики
const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const movieList = document.querySelector('.promo__interactive-list'),
      addForm = document.querySelector('form.add'),
      addInput = addForm.querySelector('.adding__input'),
      checkbox = addForm.querySelector('[type="checkbox"]');

const adv = document.querySelectorAll('.promo__adv img'),
      poster = document.querySelector('.promo__bg'),
      genre = poster.querySelector('.promo__genre');
    
const makeChanges = () => {
    //2
    genre.textContent = 'драма';
    
    //3
    poster.style.backgroundImage = 'url("img/bg.jpg")';
};

const deleteAdv = (arr) => {
    //1
    arr.forEach(item => {
        item.remove();
    });
};

const sortArr = (arr) => {
    arr.sort();
};

function createMovieList(films, parent) {
    //4, 5
    parent.innerHTML = '';
    sortArr(films);
    films.forEach((film, i) => {
        parent.innerHTML += `
            <li class="promo__interactive-item">${i+1} ${film}
                <div class="delete"></div>
            </li>
        `;
    });
    
    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);
            
            createMovieList(films, parent);
        });
    });
}

addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let newFilm = addInput.value;
    const favorite = checkbox.checked;
    if (newFilm) {

        if (favorite) {
            console.log('Добавляем любимый фильм');
        }

        if (newFilm.length > 21) {
            movieDB.movies.push(`${newFilm.substr(0, 21)}...`);
        } else {
            movieDB.movies.push(newFilm);
        }

        for (let i = 0; i < movieDB.movies.length; i++ ) {
            movieDB.movies[i] = movieDB.movies[i][0].toUpperCase() + movieDB.movies[i].slice(1);
        }

        createMovieList(movieDB.movies, movieList);
    }

    e.target.reset();
});

makeChanges();
deleteAdv(adv);
createMovieList(movieDB.movies, movieList);
