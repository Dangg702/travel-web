function toDate(dateStr) {
    var parts = dateStr.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

// create form data for fetching
let formData = new FormData();
// handel input name
let searchInput = document.querySelector('.search-input');
searchInput.addEventListener('change', function () {
    formData.append('name', searchInput.value);
    console.log(formData);
});

// handle for search form (Date input field)

// Calculate tomorrow's date
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// Format tomorrow's date as "d-m-Y" and Set the default value
let tomorrowStr = tomorrow
    .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    .split('/')
    .join('-');
formData.append('dateGo', toDate(tomorrowStr));
let defaultSelection = luxon.DateTime.fromFormat(tomorrowStr, 'dd-MM-yyyy');
let defaultSelectionDateOfWeek = defaultSelection.setLocale('vi').toFormat('EEEE');

document.getElementById('DateOfWeekCheckinStr').textContent = defaultSelectionDateOfWeek;
document.getElementById('DateCheckinStr').textContent = tomorrowStr;

// onClose callback để lắng nghe sự kiện khi người dùng chọn một ngày và datepicker đã được đóng.
// Các tham số selectedDates, dateStr và instance được truyền vào hàm callback.
flatpickr('#dateInput', {
    dateFormat: 'd-m-Y',
    minDate: tomorrow,
    defaultDate: tomorrow,
    onClose: function (selectedDates, dateStr, instance) {
        // Luxon's DateTime class to parse the selected date from the dateStr
        // and set the locale to Vietnamese ('vi') and use the toFormat method to obtain the weekday in Vietnamese format ('EEEE').
        let selectedDate = luxon.DateTime.fromFormat(dateStr, 'dd-MM-yyyy');
        let dayOfWeekVietnamese = selectedDate.setLocale('vi').toFormat('EEEE');

        formData.set('dateGo', toDate(dateStr));
        document.getElementById('DateOfWeekCheckinStr').textContent = dayOfWeekVietnamese;
        document.getElementById('DateCheckinStr').textContent = dateStr;
    },
});

// ===============================================================

// hadle for search form (departure field)
// List of cities
let cities = [
    'Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Cần Thơ',
    'Hải Phòng',
    'Nha Trang',
    'Đà Lạt',
    'Hội An',
    'Huế',
    'Phú Yên',
    'Quy Nhơn',
    'Quảng Bình',
    'Bình Thuận',
    'Ninh Thuận',
];
let sortCities = cities.sort();
// Set the default value
let defaultCity = 'Hồ Chí Minh';
document.getElementById('selectedCity').textContent = defaultCity;
formData.append('departure', defaultCity);

// Create the popover content
let popoverContent = '';
sortCities.forEach(function (city) {
    popoverContent += '<div class="departure-popover__item">' + city + '</div>';
});

// Set the popover content
document.getElementById('departure-popover').innerHTML = popoverContent;

// Handle the city selection
let cityOptions = document.getElementsByClassName('departure-popover__item');
Array.from(cityOptions).forEach(function (option) {
    option.addEventListener('click', function () {
        let selectedCity = option.textContent;
        formData.set('departure', selectedCity);
        document.getElementById('selectedCity').textContent = selectedCity;
    });
});
// show/hide the popover from departure
document.getElementById('departure-field').addEventListener('click', function () {
    document.querySelector('.departure-popover').classList.toggle('show');
});

// =============================================
// Make API call using formData
let searchButton = document.getElementById('home-search');
searchButton.addEventListener('click', function () {
    fetch('api/tour/get-tour/:name', {
        method: 'POST',
        body: formData,
    }).then(function (response) {
        // Handle the API response
        return response.json();
    });
});
