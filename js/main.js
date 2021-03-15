/* -------------------------------------------

Name: 	    My Notebooke
Version:    1.0
Author:		Ebrahim - PapiDon
linkedin:   https://www.linkedin.com/in/ebrahim-keighobadi-3746ba180/

------------------------------------------- */


class Post 
{
    constructor(title, body){
        this.title = title;
        this.body  = body;
    }
}

class UI
{
    // Add Post
    addPostToList(post)
    {
        const list = document.getElementById('post-list');
        const row  = document.createElement("tr");
        row.className = 'text-center';

        // Insert cols
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.body}</td>
            <td><i class="fas fa-eraser text-danger delete"></i></td>
        `;

        list.appendChild(row);
    }

    // Alert 
    showAlert(message, className)
    {
        const div     = document.createElement('div');
        div.className = `alert alert-${className} rounded-0 boxShadow`;
        div.appendChild(document.createTextNode(message));

        const container  = document.querySelector('.container');
        const card       = document.querySelector('.card');

        container.insertBefore(div, card);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // Delete
    deletePost(target)
    {
        target.parentElement.parentElement.remove();
    }

    // clear Fields
    clearFields()
    {
        const title = document.getElementById('title').value = '';
        const body  = document.getElementById('body').value  = '';
    }

}

// localStorage Class
class Store 
{
    static getPosts()
    {
        let posts;
        if(localStorage.getItem('posts') === null){
            posts = [];
        }else{
            posts = JSON.parse(localStorage.getItem('posts'));
        }

        return posts;
    }

    static displayPosts()
    {
        const posts = Store.getPosts();

        posts.forEach(function(post){
            const ui = new UI;
            ui.addPostToList(post);
        });
    }

    static addPost(post)
    {
        const posts = Store.getPosts();
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    static removePost(title)
    {
        const posts = Store.getPosts();
        posts.forEach(function(post, index){
            if(post.title === title){
                posts.splice(index, 1);
            }
        });
        localStorage.setItem('posts', JSON.stringify(posts));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayPosts);

// Event Listener for add post
document.getElementById('post-form').addEventListener('submit', function(e){

    e.preventDefault();

    const title = document.getElementById('title').value;
    const body  = document.getElementById('body').value;

    // Instantiate Post and UI
    const post = new Post(title, body);
    const ui   = new UI();

    // Validation
    if(title === '' || body === ''){
        ui.showAlert('All fields are required !', 'danger');
    }
    else{
        ui.addPostToList(post);
        Store.addPost(post);
        ui.showAlert('Successfully added.', 'success');
        ui.clearFields();
    }

});

// Event Listener for delete
document.getElementById('post-list').addEventListener('click', function(e){

    e.preventDefault();
    const ui = new UI();
    if(e.target.classList.contains('delete')){

        if (confirm('Are you sure you want to delete ?')) {
            ui.deletePost(e.target);
            const tr    = e.target.parentElement.parentElement;
            const title = tr.firstElementChild.textContent;
            Store.removePost(title);
            ui.showAlert('Post deleted.', 'success');
        }

    }
    
});