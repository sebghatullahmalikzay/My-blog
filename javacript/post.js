const API_URL = "http://localhost:4000/api/post/";
const API_BASE_URL = "http://localhost:4000/";


window.onload = () => {
    getPost();




}

const getPostIdPram = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}
const getPost = () => {

    const postId = getPostIdPram();

    const url = `${API_URL}${postId}`;
    fetch(url, {
        method: `GET`
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildPots(data);
    });

}

const buildPots = (data) => {
    const postDate = new Date(parseInt(data.added_date)).toDateString();
    const postImage = ` ${API_BASE_URL}${data.post_image}`;

    document.querySelector("header").style.backgroundImage = `url(${postImage})`;
    document.getElementById("individual-post-title").innerText = data.title;
    document.getElementById("individual-post-date").innerText = `published on ${postDate}`;
    document.getElementById("individual-post-content").innerText = data.content;
}