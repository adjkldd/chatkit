<template>
  <div>
    <el-row class="container" :gutter="10">
      <el-col id="room-panel" :span="6" class="panel">
        <div class="panel-title">Rooms</div>
        <el-divider></el-divider>
        <div class="panel-content">
          <ul>
            <i-li v-for="room in rooms" :key="room.id" @click="selectroom(room)"># {{ room.name }}</i-li>
          </ul>
        </div>
      </el-col>

      <el-col id="message-panel" :span="12" class="panel">
        <div class="panel-title">Messages</div>
        <el-divider></el-divider>
        <div class="panel-content">
          <ul>
            <li class="msg-container" v-for="msg in messages" :key="msg.id">
              <el-row>
                <el-col class="msg-username" :span="4">{{ msg.user.name }}</el-col>
              </el-row>
              <el-row>
                <el-col class="msg-text" :span="24">{{ msg.parts[0].payload.content }}</el-col>
              </el-row>
              <el-row>
                <el-col class="msg-created-time" :offset="18" :span="6">{{ msg.created_time }}</el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </el-col>

      <el-col id="member-panel" :span="6" class="panel">
        <div class="panel-title">Members</div>
        <el-divider></el-divider>
        <div class="panel-content">
          <ul>
            <i-li
              v-for="member in members"
              :key="member.id"
              :class="[member.online ? 'online-status' : 'offline-status']"
              @click="selectMember(member)"
            >{{ member.name }}</i-li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <div class="msg-sender-box">
      <el-row class="container" :gutter="10">
        <el-col :offset="6" :span="10">
          <el-input type="text" v-model="currentMsg" placeholder="send a message" />
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="onSubmit">发送</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ILi from "./IList";

export default {
  name: "Dashboard",
  components: {
    ILi
  },
  data() {
    return {
      currentMsg: "",
      rooms: [
        {
          id: "1",
          name: "General"
        },
        {
          id: "2",
          name: "Weapons"
        },
        {
          id: "3",
          name: "Combat"
        }
      ],
      messages: [
        {
          id: 1,
          user: {
            name: "John Wick"
          },
          parts: [
            {
              type: "inline",
              payload: {
                content: "Hi there?"
              }
            }
          ],
          created_time: "2019-12-08 00:00:02"
        },
        {
          id: 2,
          user: {
            name: "David Steve"
          },
          parts: [
            {
              type: "inline",
              payload: {
                content: "Yep? Anything can i do for you?"
              }
            }
          ],
          created_time: "2019-12-08 00:00:08"
        }
      ],
      members: [
        {
          id: 1,
          name: "Alex Broker",
          online: true
        },
        {
          id: 2,
          name: "Ldd",
          online: false
        }
      ]
    };
  },
  methods: {
    onSubmit: function() {
      console.log("submit form");
    },
    selectRoom: function(room) {
      console.log(`${room.name} selected`);
    },
    selectMember: function(member) {
      console.log(`${member.name} selected`);
    }
  }
};
</script>

<style lang="scss">
@import "../element-variables.scss";

.container {
  padding: 0 5px;
}

.online-status {
  color: black;
}

.offline-status {
  color: gray;
}

.panel {
}

.panel-bottom {
}

.msg-sender-box {
  position: fixed;
  bottom: 20px;
  width: 100%;
}

.panel-title {
  margin-top: 12px;
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
</style>
