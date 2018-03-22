$(function() {

    // Nav Bar
    var $post = $("#post")
    var $status = $("#message-text")
    var $editUserModal = $(".editUserModal")
    var $editUserBtn = $(".editUserBtn")

    $post.on("click", function (){
        $status.value() = ""
    })

    $("#modal").on("click", function() {
        var postForm = $('#post-form')
        postForm.attr('action', '/api/posts')
    })

    // Get and Patch User Info
    $editUserModal.on("click", function(){
        console.log("hey")
        var userId = $(this).attr("id")
        $("#editUser-form").attr("action", `/api/users/${currentUser._id}?_method=PATCH`)
        $("#editUsername").val(currentUser.username)
        $("#editEmail").val(currentUser.email)
        $("#editImageURL").val(currentUser.imageURL)
     })

    // Get and Patch User Info
    $editUserBtn.on("click", function(){
        console.log("hey")
        var userId = $(this).attr("id")
        var urlLocation = `/api/users/${userId}`
        httpClient({url: urlLocation , method: "patch"}).then((serverResponse)=>{
        })
    })
    

    // Feed
    var httpClient = axios.create()
    var $feed = $("#feed")
    var $card = $(".card")
    var posts = []
    
    function updateList(data){
        for(var i = 0; i < data.data.length; i++) {
            var dateCreated = moment(data.data[i].createdAt).format("MMM Do, YYYY h:mm a");
            posts.push(data.data[i])
            $feed.prepend(`
                <div class="post-holder">
                    <div class="card text-left">
                        <div class="row">
                            <div class="col-sm-2 photo-holder">
                                <img id="photo" src="${data.data[i].user.imageURL}" />
                            </div>

                            <div class="col-sm-8 post-right">
                            <h5 class="card-title">@${data.data[i].user.username}</h5>

                            <p class="card-text" id=1${data.data[i]._id}>${data.data[i].body}</p>
                            <span>${dateCreated}</span>
                            ${loggedIn && currentUser._id === data.data[i].user._id ? `
                                <div class="crud-Btn">
                                    <a href="#" id=${data.data[i]._id}  class="btn btn-primary editModal" data-toggle="modal" data-target="#updateModal">Edit</a>
                                    <a href="#" id=${data.data[i]._id}  class="btn btn-primary delete">Delete</a>
                                </div> 
                            ` : ""}
                            </div>
                        </div>
                    </div>
                </div>
            `)
        }
    }

    var options = {
        method: "get",
        url: "/api/posts"
    }

    httpClient(options).then((serverResponse) => {
        updateList(serverResponse)
    })

    $feed.on("click", ".delete" , function(){
        var postId = $(this).attr("id")
        var urlLocation = `/api/posts/${postId}`
    
        httpClient({url: urlLocation , method: "delete"}).then((serverResponse)=>{
        })
        $(this).parents()[4].remove()
    })

    // Get and Patch Post
    $feed.on("click", ".editModal" , function(){
        var postId = $(this).attr("id")
        $("#edit-form").attr("action", `/api/posts/${postId}?_method=PATCH`)
        $("#textValue").text($("#1" + postId).text())
        
     })

    // Get and Patch Post
    $feed.on("click", ".edit" , function(){
        var postId = $(this).attr("id")
        var urlLocation = `/api/posts/${postId}`
        httpClient({url: urlLocation , method: "patch"}).then((serverResponse)=>{
        })
    })
})