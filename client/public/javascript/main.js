var deleteBtn = document.querySelectorAll('.delete-btn');
var form_all = document.getElementById('form-all');
var editBtn = document.querySelectorAll('.edit-btn');
var edit = document.querySelector('.edit-container');
var saveBtn = document.querySelector('.save-btn');
var cancleBtn = document.querySelector('.cancle-btn');


deleteBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        var id = e.target.attributes[1].value;
        $.ajax({
            url: 'http://localhost:3000/delete/' + id, 
            type: 'DELETE'
        }).done(function (data) {
            location.reload()
        })
        
    })
})

editBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        var id = e.target.attributes[1].value;
        console.log(id);
        edit.style.display = 'block';
    })
})

cancleBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        var id = e.target.attributes[1].value;
        console.log(id);
        edit.style.display = 'none';
    })
})

saveBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        var id = e.target.attributes[1].value;
        console.log(id);
        edit.style.display = 'none';
    })
})



