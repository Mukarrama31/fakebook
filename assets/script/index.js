'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const userModal = document.querySelector('#userModal');
    const postForm = document.querySelector('.postForm');
    const closeBtn = document.querySelector('.close');
    const postsSection = document.querySelector('.postsSection');
    const avatar = document.querySelector('.avatar img');

    if (!userModal || !closeBtn) {
    console.error('Modal or close button not found');
    return;
    }

    const subscriber = new Subscriber(
        '0123',
        'John Stamos',
        'johnStamos123',
        'johnstamos@example.com',
        ['Group1', 'Group2'], 
        ['Page1', 'Page2'],   
        true                  
    );

    if (userModal && subscriber) {
        userModal.innerHTML = subscriber.getInfo();
    } else {
        console.error('User modal or subscriber not found');
    }
    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(postForm);
            const postContent = formData.get('postContent');
            const imageFile = formData.get('image');
            postForm.querySelector('input[type="file"]').value = '';
            await new Promise(resolve => setTimeout(resolve, 500));
            createPost(postContent, imageFile);
         });
    } else {
        console.error('Post form not found');
    }
    if (avatar) {
        avatar.addEventListener('click', () => {
        toggleModal('#userModal');
        });
    }else {
        console.error('Avatar image not found');
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
        toggleModal('#userModal');
        });
    } else {
        console.error('Close button not found');
    }
    userModal.addEventListener('click', (event) => {
        if (event.target === userModal) {
        toggleModal('#userModal');
        }
    });
    function createPost(content, image) {
        const postContainer = document.createElement('div');
        postContainer.classList.add('post-container');
  

        const post = document.createElement('div');
        post.classList.add('post');
    
        const profilePic = document.createElement('img');
        profilePic.classList.add('profile-pic');
        profilePic.src = './assets/image/prof.jpg';
        profilePic.style.width = '50px';
        profilePic.style.height = '50px';
        profilePic.style.borderRadius = '50%';
        profilePic.style.display = 'inline-block';
        profilePic.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        post.appendChild(profilePic);
  
    
        const userInfoContainer = document.createElement('div');
        userInfoContainer.classList.add('user-info-container');
    

        const userName = document.createElement('div');
        userName.classList.add('user-name');
        userName.textContent = 'Kaylee Larson'; 
        userName.style.fontWeight = 'bold';
        userName.style.margin = '0'; 
        userName.style.lineHeight = '50px'; 
        userInfoContainer.appendChild(userName);
    
        post.appendChild(userInfoContainer);
  
        const postContent = document.createElement('div');
        postContent.classList.add('post-content');
        postContent.style.fontSize = '16px';
        postContent.textContent = content;
        post.appendChild(postContent);
    
        if (image && image.type && image.type.startsWith('image/')) {
        const imageElement = document.createElement('img');
        imageElement.classList.add('post-image');
        imageElement.src = URL.createObjectURL(image);
        post.appendChild(imageElement);
        }
    

        postContainer.appendChild(post);
    
        
        postsSection.appendChild(postContainer);
        }
    });
class User {
    constructor(id, name, userName, email) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.email = email;
    }

    getInfo() {
        return `
        <p>ID: ${this.id}</p>
        <p>Name: ${this.name}</p>
        <p>Username: ${this.userName}</p>
        <p>Email: ${this.email}</p>
        `;
    }
}

class Subscriber extends User {
    constructor(id, name, userName, email, groups, pages, canMonetize) {
    super(id, name, userName, email);
    this.groups = groups;
    this.pages = pages;
    this.canMonetize = canMonetize;
    }
    getInfo() {
        return `
        <p><i class="fa-solid fa-circle-info"></i> DETAILS</p>
        ${super.getInfo()}
        <p>Groups: ${this.groups.join(', ')}</p>
        <p>Pages: ${this.pages.join(', ')}</p>
        <p>Can Monetize: ${this.canMonetize ? 'Yes' : 'No'}</p>
        <p> CLICK ABOVE IMAGE TO CLOSE </p>`;
    }
}