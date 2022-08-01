<script >
  import {pubnub} from './config/pubnub.js'
  import { faker } from '@faker-js/faker';
import Swal from 'sweetalert2'


  let youname = faker.name.findName();
  let youavatar = faker.image.avatar();
  let youid = Math.random()
  let users = []
  let data = [];


// FOR SWEETALERT CONFIG
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


pubnub.subscribe({
    channels: ["hello_world"],
    withPresence:true
});

 // DETECT IF USER CHANGED PUBLISH
 pubnub.addListener({
  message: async function (event) {
    // handle messages    // SEND ALERT IF LEAVE
      if(event.message.online !== false){
        data.push({
          name:event.message.onlineuser,
          online:event.message.online,
          id:event.message.userid,
          image:event.message.image
        })
        users = await data
    // SEND NOTIF IF SOMEONE JOIN THE GROUP
      Toast.fire({
  icon: 'success',
  title: `${event.message.onlineuser} Join the group`,
  timer:2500
})
      }

  },
  presence: function (p) {
    // handle presence  
    if(p.action == "join"){
      pubnub.publish({
        channel:"hello_world",
        message:{
          onlineuser : youname,
          userid:youid,
          image:youavatar,
          status:"add",
          online:true
        }

      })
    }
    // IF USER LEAVE THIS GROUP , SEND NOTIF TO 
     if(p.action == "leave"){
      data = []
      users = []
      // SEND ALERT IF LEAVE
      Toast.fire({
  icon: 'error',
  title: `${youname} leave the group`,
  timer:2500
})
      pubnub.publish({
        channel:"hello_world",
        message:{
          onlineuser : youname,
          userid:youid,
          image:youavatar,
          status:"remove",
          online:false
        }

      })
    }
  },
}) 
</script>

<div>
  <div>
    <img src={youavatar}> <br>
    name : {youname} 
    id : {youid}
  </div>
  <hr>
  <br>
  <h1>You friend online chats</h1>
<br>
{#each users as a}
  {#if a.online === true && a.name !== youname}
  <li>
    <img src={a.image} style="width: 100px"/>
    <br>
    <h5>{a.name} </h5>
    <br>
    is online : {a.online}
  </li>
  {/if}
{/each}

  </div>
