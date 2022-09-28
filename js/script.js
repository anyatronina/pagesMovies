/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

//загружать скрипт, когда будет готова DOM-структура
document.addEventListener('DOMContentLoaded', () => {


    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
        //   listOfMovies = document.querySelectorAll('.promo__interactive-item'),
          movieList = document.querySelector('.promo__interactive-list'),
          btnAddFilm = document.querySelector('.add').lastElementChild,
          valueOfInput = document.querySelector('.adding__input'),
          
        //   favoriteFilm = document.querySelector('[type="checkbox"]');
          favoriteFilm = document.querySelector('.yes').previousElementSibling;
    
    const makeChanges = () => {
        //2
        genre.textContent = 'драма';
        
        //3
        // console.log(logo.style.background.innerHTML);
        // poster.style.cssText = `background: url('../img/bg.jpg')`;
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
    
    makeChanges();
    deleteAdv(adv);
    
    //4, 5 
    // movieDB.movies.sort();
    // listOfMovies.forEach((item, i) => {
    //     item.innerHTML = `${i+1}. ` + movieDB.movies[i] + ' <div class="delete"></div>';
    // });
    
    
    createMovieList(movieDB.movies, movieList);  
    
    //1, 2, 5
    btnAddFilm.addEventListener('click', (e) => {
        e.preventDefault();

        let newFilm = valueOfInput.value;
        // let favorite = favoriteFilm.checked;

        if (newFilm) {
            if (favoriteFilm.checked) {
                console.log('Добавляем любимый фильм');
                favoriteFilm.checked = false;
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
    
        valueOfInput.value = ""; //почему не работает newFilm = ''
    });
    
    //3
    // movieList.addEventListener('click', e => {
    //     if (e.target.classList.contains('delete')) {
    //         e.preventDefault();
            
    //         let num = e.target.parentElement.textContent.slice(' ')[0];
    //         e.target.parentElement.remove();
            
    //         movieDB.movies.splice(num-1, 1);
    //         createMovieList(movieDB.movies, movieList);
    //     }
    // });




});



