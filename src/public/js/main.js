const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// Lấy thông tin trạng thái đăng nhập từ server
fetch('/user/check-login')
    .then((response) => response.json())
    .then((data) => {
        const isLoggedIn = data.isLoggedIn;
        const accountBtn = $('#accountBtn');
        const sidebarAdminName = $('.sidebar-profile-name');
        const adminName = $('.navbar-profile-name');
        const adminAvatar = $$('.profile-avatar');
        const userAvatar = $('.review-user-avatar');
        const userName = $('.review-user-name');
        if (isLoggedIn) {
            if (data.user.isAdmin) {
                for (let i = 0; i < adminAvatar.length; i++) {
                    adminAvatar[i].src = data.user.avatar;
                }
                adminName.innerText = data.user.username;
                sidebarAdminName.innerText = data.user.username;
            }
            accountBtn.innerHTML = `
                <a class="nav-link" href="/user/login" id="accountDropdown" href="#" data-bs-toggle="dropdown">
                    <img src="${data.user.avatar}" alt="${data.user.username}" style="width: 50px; height: 48px; border-radius: 50%;">
                </a>
                <ul class="dropdown-menu navbar__menu" aria-labelledby="accountDropdown">
                    <li><a class="dropdown-item" href="#">Thông tin đơn hàng</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/user/account/${data.user._id}">Tài khoản</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/user/logout">Đăng xuất</a></li>
                </ul>
            `;
            // userAvatar.src = data.user.avatar;
            userName.innerText = data.user.username;
        } else {
            accountBtn.innerHTML = `
                <a class="nav-link" href="/user/login">
                    <button class="navbar__btn">Tài khoản</button>
                </a>
            `;
        }
    })
    .catch((error) => {
        console.error('Error checking login status:', error);
    });

// more reviews
handleReviews = () => {
    const moreReviews = $('.more-reviews');
    const reviewsString = moreReviews.getAttribute('data-reviews');
    // Convert reviewsString to an array
    const reviews = JSON.parse(reviewsString);
    console.log('typeof:', typeof reviews);
    const templateCode = `
    <% if (reviews.length > 0) { %>
      <% reviews.forEach(review => { %>
        <% const user = review.userId; %>
        <% tour = review.tourId %>
        <div class="horizontalLine"></div>
        <div class="review-detail pt-4 pb-4">
            <div class="row">
                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-2">
                    <div class="row">
                        <div class="col-xs-12 vspacing3 customerReviewName">
                            <img width="50px" height="50px" src="<%= user.avatar %>" alt="avatar" />
                            <span><%= user.username %></span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-9 col-md-9 col-lg-10">
                    <div class="row">
                        <div class="col-xs-12 mb-3">
                            <span class="scoreSpan"><%= review.rating %></span>
                            <span class="scoreReviewDate"><%= review.updatedAt %></span>
                        </div>
                        <div class="col-xs-12">
                            <span class="customerReviewContent"> <%= review.comment %> </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <% }) %>
    <% } else { %>
      <div class="col-xs-12">
          <p>Không có đánh giá nào cho tour này.</p>
      </div>
    <% } %>
  `;
    // Compile the template
    const compiledTemplate = ejs.compile(templateCode);
    // Render the template with data
    const renderedHTML = compiledTemplate({ reviews });
    // Insert the rendered HTML into the DOM
    const reviewsContainer = $('.review-detail-container');
    reviewsContainer.innerHTML = renderedHTML;
    moreReviews.style.display = 'none';
};
