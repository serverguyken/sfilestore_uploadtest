// Variables and DOM
const api_url = 'https://sfs.filestore.com/api/v1' //'http://10.0.0.41:3001/api/v1';
let  upload_url = `${api_url}/upload`;
const uploadType = document.getElementById('upload_type');
const uploadBtn = document.getElementById('upload_button');
const fileInput = document.getElementById('file_input');
const fileError = document.getElementById('file_error');
const file_preview_img = document.getElementById('file_preview_img');
const file_preview_video = document.getElementById('file_preview_video');
// Functions and Event Listeners
const generateFileName = () => {
    let name = Math.random().toString(36).substring(7);
    return name;
};
const UploadFile = (e) => {
    const file = fileInput.files[0];
    const uType = uploadType.value;
    const formData = new FormData();
    fileError.innerHTML = '';
    if (file === undefined) {
        fileError.innerHTML = 'Please select a file';
        return;
    }
    if (uType === "") {
        fileError.innerHTML = 'Please select a file type';
        return;
    }
    if (uType.toLowerCase() === 'profile') {
        formData.append('profile', file);
        handleUpload(formData, 'profile');
    }
    else if (uType.toLowerCase() === 'image') {
        formData.append('image', file);
        handleUpload(formData, 'image');
    }
    else if (uType.toLowerCase() === 'video') {
        formData.append('video', file);
        handleUpload(formData, 'video');
    } 
    else {
        fileError.innerHTML = 'UnSupported File Type';
    }
};

const handleUpload = (formData, type) => {
    FETCH(upload_url+`?type=${type}`, 'POST', formData)
        .then(res => {
            console.log(res);
            if (res.status === 'error') {
                fileError.innerHTML = res.message;
            }
            else {
                file_preview_img.src = res.url;
                file_preview_video.src = res.url;
            }
        })
        .catch(err => console.log(err));
}
const FETCH = (url, method, data) => {
    return fetch(url, {
        method: method,
        body: data
    })
        .then(res => res.json())
        .catch(err => console.log(err) );
};

uploadBtn.addEventListener('click', UploadFile);
