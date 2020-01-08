var deleteBtn = document.querySelectorAll('.delete-btn');
var form_all = document.getElementById('form-all');
var editBtn = document.querySelectorAll('.edit-btn');
var edit = document.querySelector('.edit-container');
var saveBtn = document.getElementById('save-btn');
var cancleBtn = document.querySelectorAll('.cancle-btn');
// var cancleBtn2 = document.querySelectorAll('.cancle-btn2');

var addContainer = document.querySelector('.add-container');
var addBtn = document.querySelectorAll('.addRestaurant');



// cancleBtn2.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         var id = e.target.attributes[1].value;
//         addContainer.style.display = 'none';
//     })
// })

addBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        addContainer.style.display = 'block';
    })
})

deleteBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        var id = e.target.attributes[1].value;
        $.ajax({
            url: 'https://restaurant-rating-nackademin.herokuapp.com/delete' + id, 
            type: 'DELETE'
        }).done(function (data) {
            location.reload()
        })
        
    })
})

editBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        var id = e.target.attributes[1].value;
        console.log(id);
        edit.style.display = 'block';
        document.querySelector(`#edit-form-${id}`).style.display = 'block';
        document.querySelector(`#edit-form-${id}`).attributes[1].value = `/edit/${id}?_method=put`;
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

saveBtn.addEventListener('click', () => {
        
        editForm.submit();

})




