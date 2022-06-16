var blogPosts;

function createBlogPosts(posts) {
  posts.forEach((post) => {
    // create a new div
    const postDiv = document.createElement('div');
    // set the class of the div to post
    postDiv.className = 'post';
    // create a new h3
    const postTitle = document.createElement('h3');
    // create a link to the post
    const postLink = document.createElement('a');
    // set the href to the post's url
    postLink.href = post.uri;
    // append the link to the h3
    postTitle.appendChild(postLink);
    // set the text of the link to the post's title
    postLink.textContent = post.title;
    // append the h3 to the div
    postDiv.appendChild(postTitle);
    // create a new p
    const postContent = document.createElement('p');
    // set the text of the p to the post's summary, parse html entity encoding
    postContent.innerHTML = post.summary.replace(/&rsquo;/g, "'");
    // append the p to the div
    postDiv.appendChild(postContent);
    // append the div to #blog-post-list section
    document.querySelector('#blog-post-list').appendChild(postDiv);
  });
}

fetch('https://blog.illixion.com/searchindex.json')
  .then((response) => response.json())
  .then((data) => (blogPosts = data))
  .then((data) => {
    // create the blog posts, limited to 4
    createBlogPosts(data.posts.slice(0, 4));
  })
  .finally(() => {
    // remove the loading spinner
    document.getElementById('blog-post-loader').remove();
  })
  .catch((error) => {
    console.log(error);
    // add an error message to the page
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'There was an error loading the blog posts.';
    document.querySelector('#blog-post-list').appendChild(errorMessage);
  });

window.onload = () => {
  const showMoreLink = document.querySelector('#show-more-link');
  showMoreLink.addEventListener('click', () => {
    // count the number of posts already displayed
    const postsDisplayed = document.querySelectorAll('.post').length;
    // create the blog posts, limited to 4
    createBlogPosts(blogPosts.posts.slice(postsDisplayed, postsDisplayed + 4));
    // if there are no more posts to display, hide the show more link
    if (blogPosts.posts.length <= postsDisplayed + 4) {
      showMoreLink.style.display = 'none';
    }
    return false;
  });
};
