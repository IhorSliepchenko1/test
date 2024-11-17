const tbody = document.querySelector('tbody');
const pagination = document.getElementById('pagination');
const search = document.getElementById('search');

let cachedData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 8;


const formatPhoneNumber = (number) => {
     const cleanNumber = number.replace(/\D/g, '');
     if (cleanNumber.length === 10) {
          return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6)}`;
     }

     return number;
};

const renderData = (data) => {
     tbody.innerHTML = '';
     data.forEach((item) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.company}</td>
            <td>${formatPhoneNumber(item.number)}</td>
            <td>${item.email}</td>
            <td>${item.country}</td>
            <td><span class="${item.status === 'Active' ? 'active' : 'inactive'}">${item.status}</span></td>
        `;
          tbody.appendChild(tr);
     });
};

const renderPagination = (totalPages) => {
     pagination.innerHTML = '';

     const prevButton = document.createElement('button');
     prevButton.className = `prev-btn`;
     prevButton.innerHTML = `<img src="./assets/prev.svg">`;
     prevButton.onclick = () => changePage(currentPage - 1);
     prevButton.disabled = currentPage === 1;
     pagination.appendChild(prevButton);

     for (let i = 1; i <= totalPages; i++) {
          if (
               i === currentPage ||
               i === totalPages ||
               (i >= currentPage && i <= currentPage + 3)
          ) {
               const pageButton = document.createElement('button');
               pageButton.className = `page-btn`;
               pageButton.textContent = i;
               pageButton.disabled = i === currentPage;
               pageButton.onclick = () => changePage(i);
               pagination.appendChild(pageButton);
          } else if (i === currentPage + 4 && currentPage + 4 < totalPages) {
               const dots = document.createElement('span');
               dots.textContent = '...';
               pagination.appendChild(dots);
          }
     }

     const nextButton = document.createElement('button');
     nextButton.className = `next-btn`;
     nextButton.innerHTML = `<img src="./assets/next.svg">`;
     nextButton.onclick = () => changePage(currentPage + 1);
     nextButton.disabled = currentPage === totalPages;
     pagination.appendChild(nextButton);
};

const changePage = (page) => {
     currentPage = page;
     const start = (currentPage - 1) * itemsPerPage;
     const end = start + itemsPerPage;
     const dataToRender = filteredData.length ? filteredData : cachedData;
     renderData(dataToRender.slice(start, end));
     renderPagination(Math.ceil(dataToRender.length / itemsPerPage));
};

const init = async () => {
     try {
          const response = await fetch('./data.json');
          cachedData = await response.json();
          filteredData = cachedData;
          changePage(1);
     } catch (error) {
          console.error('Ошибка загрузки данных:', error);
     }
};
init();

search.addEventListener('input', (e) => {
     const searchValue = e.target.value.toLowerCase();

     filteredData = cachedData.filter((item) => {
          return (
               item.name.toLowerCase().includes(searchValue) ||
               item.company.toLowerCase().includes(searchValue) ||
               item.number.toLowerCase().includes(searchValue) ||
               item.country.toLowerCase().includes(searchValue) ||
               item.status.toLowerCase().includes(searchValue) ||
               item.email.toLowerCase().includes(searchValue)
          );
     });

     currentPage = 1;
     renderData(filteredData.slice(0, itemsPerPage));
     renderPagination(Math.ceil(filteredData.length / itemsPerPage));
});

const dashboard = document.getElementById(`dashboard`);
const product = document.getElementById(`product`);
const customers = document.getElementById(`customers`);
const income = document.getElementById(`income`);
const promote = document.getElementById(`promote`);
const help = document.getElementById(`help`);

const li = document.querySelectorAll(`li`);
const title = document.getElementById(`title`);
const sectionCustomers = document.getElementById(`section-customers`);

const pages = [
     { element: dashboard, titleText: "Hello dashboard", showCustomers: false },
     { element: product, titleText: "Hello product", showCustomers: false },
     { element: customers, titleText: "Hello Evano 👋🏼,", showCustomers: true },
     { element: income, titleText: "Hello income", showCustomers: false },
     { element: promote, titleText: "Hello promote", showCustomers: false },
     { element: help, titleText: "Hello help", showCustomers: false }
];

const changeContent = (page) => {
     li.forEach(item => item.classList.remove(`active-page`));
     page.element.classList.add(`active-page`);
     title.innerText = page.titleText;
     sectionCustomers.style.display = page.showCustomers ? `block` : `none`;
};

pages.forEach(page => {
     page.element.addEventListener(`click`, () => changeContent(page));
});
