document.getElementById('uploadForm').addEventListener('submit', function(e){
e.preventDefault();
document.getElementById('status').innerText = 'Video uploaded successfully!';
});
