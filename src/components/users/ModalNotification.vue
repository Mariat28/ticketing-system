<template>
  <div class="overlay">
      <div class="body">
        <div class="cancel" @click="closeNotification"><i class="fa fa-times"></i></div>
        <div class="title"><b>{{notificationTitle}}</b></div>
        <div class="message">{{message}}</div>
        <div class="confirm btn btn-primary font-size-10 mt-4" @click="confirmNotification">Okay</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'ModalNotification',
    props: {
        closeNotification: Function,
        confirmNotification: Function,
        message: String,
        notificationTitle: String,
    }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: start;
}
.body {
    margin-top: 150px;
    width: 460px;
    height: 180px;
    background: white;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}
.cancel {
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    margin-top: 20px;
}
.cancel:hover {
    cursor: pointer;
}
.message {
    display: flex;
    justify-content: center;
    align-items: center;
}
.confirm {
    padding: 5px !important;
    margin-bottom: 20px;
}
</style>