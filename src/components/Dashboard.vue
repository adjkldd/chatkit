<template>
  <el-row class="container" :gutter="10">
    <el-col id="room-panel" :span="6" class="panel">
      <div class="panel-title">Rooms</div>
      <el-divider></el-divider>
      <div class="panel-content">
        <ul>
          <i-li
            :class="[state.currentRoom && state.currentRoom.id === room.id ? 'active-room': '']"
            v-for="room in rooms"
            :key="room.id"
            @click="enterRoom(room)"
          >
            # {{ room.name }}
            <i
              :class="{'el-icon-loading': currentRoomId === room.id && state.msgLoading}"
            ></i>
          </i-li>
        </ul>
      </div>
    </el-col>

    <el-col id="message-panel" :span="12" class="panel">
      <div class="panel-title">Messages</div>
      <el-divider></el-divider>
      <div class="panel-content" v-chat-scroll>
        <ul>
          <li class="msg-container" v-for="msg in state.messages" :key="msg.id">
            <el-row>
              <el-col class="msg-username" :span="4">{{ msg.sender.name }}</el-col>
            </el-row>
            <el-row>
              <el-col class="msg-text" :span="24">{{ msg.parts[0].payload.content }}</el-col>
            </el-row>
            <el-row>
              <el-col
                class="msg-created-time"
                :offset="14"
                :span="10"
              >{{ moment(msg.createdAt).format('h:mm:ss a D-MM-YYYY') }}</el-col>
            </el-row>
          </li>
        </ul>
      </div>

      <el-row class="msg-sender-box" :gutter="10">
        <el-col :lg="{span: 20}" :sm="{span: 18}" class="msg-send-content">
          <el-input type="textarea" v-model="currentMsg" placeholder="send a message" />
        </el-col>
        <el-col :lg="{span: 4}" :sm="{span: 6}" class="msg-send-btn-wrapper">
          <el-button :loading="msgSending" class="msg-send-btn" type="primary" @click="onSubmit">发送</el-button>
        </el-col>
      </el-row>
    </el-col>

    <el-col id="member-panel" :span="6" class="panel">
      <div class="panel-title">Members</div>
      <el-divider></el-divider>
      <div class="panel-content">
        <ul v-if="state.currentRoom">
          <i-li
            v-for="member in state.members"
            :key="member.id"
            :class="[member.presence === 'online' ? 'online-status' : 'offline-status']"
          >{{ member.name }}</i-li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import ILi from "./IList";
import store from "../store";
import moment from "moment";

export default {
  name: "Dashboard",
  components: {
    ILi
  },
  data() {
    return {
      currentRoomId: "",
      msgSending: false,
      currentMsg: "",
      state: store.state,
      moment: moment
    };
  },
  computed: {
    rooms() {
      return this.state.currentUser && this.state.currentUser.rooms;
    }
  },
  methods: {
    onSubmit() {
      let vm = this;

      if (vm.currentMsg === "") {
        return;
      }

      vm.msgSending = true;
      this.state.currentUser
        .sendSimpleMessage({
          roomId: vm.state.currentRoom.id,
          text: vm.currentMsg
        })
        .then(messageId => {
          vm.msgSending = false;
          console.log(
            `Added message ${messageId} to ${vm.state.currentRoom.name}`
          );
          vm.currentMsg = "";
        })
        .catch(err => {
          console.log(
            `Error adding message to ${vm.state.currentRoom.name}: ${err}`
          );
        });
    },
    enterRoom(room) {
      if (this.state.currentRoom == room) {
        return;
      }
      this.currentRoomId = room.id;

      console.log(`${room.name} selected`);
      store.subscribeToRoom(room);
    }
  }
};
</script>

<style lang="scss">
@import "../element-variables.scss";

.container {
  height: calc(100% - 50px);
  padding: 0 5px;
}

.online-status {
  color: black;
}

.offline-status {
  color: gray;
}

.panel {
  height: 100%;
  position: relative;
}

.panel-content {
  height: calc(83% - 25px);
  overflow-y: scroll;
}

.panel-title {
  height: 5%;
  padding-top: 12px;
}
.el-divider.el-divider--horizontal {
  margin: 12px 0;
}

.msg-container {
  border: 1px solid $--color-primary;
  margin-bottom: 12px;
  padding: 5px 10px;
}

.msg-username {
  font-weight: 500;
  color: black;
}

.msg-text,
.msg-created-time {
  color: gray;
}

.el-row.msg-sender-box {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 12%;
  padding-bottom: 20px;
}

.msg-send-content {
  flex: 1 1 auto;
}
.msg-send-btn-wrapper {
  flex: 1 1 100px;
}

.msg-send-btn {
  width: 100%;
}

.active-room {
  background-color: $--color-primary;
}
</style>
