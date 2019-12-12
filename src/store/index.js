import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

export default {
  state: {
    reconnect: false,
    uid: '',
    currentUser: null,
    currentRoom: null,
    members: [],
    messages: [],
    msgLoading: false,
  },
  setMembers() {
    if (this.state.currentRoom) {
      this.state.members = this.state.currentRoom.users.map(u => ({
        id: u.id,
        name: u.name,
        presence: u.presence.state
      }));
    }
  },
  async createUser(username) {
    try {
      let chatManager = new ChatManager({
        instanceLocator: "v1:us1:c827ab10-b720-46e9-a729-a284a6b448a3",
        userId: username,
        tokenProvider: new TokenProvider({
          url:
            "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/c827ab10-b720-46e9-a729-a284a6b448a3/token"
        }),
        logger: null
      });

      this.state.currentUser = await chatManager.connect();
      this.state.reconnect = false;
      return null;
    } catch (error) {
      return error;
    }
  },
  async deleteUser() {
    await this.state.currentUser.disconnect();
    this.state.currentUser = null;
  },
  async subscribeToRoom(room) {
    let store = this;
    this.state.messages = [];
    this.state.msgLoading = true;
    this.state.currentRoom = await this.state.currentUser.subscribeToRoomMultipart({
      roomId: room.id,
      hooks: {
        onMessage: message => {
          console.log("received message", message)
          store.state.messages.push(message);
        },
        onMessageDeleted: messageId => {
          console.log("message " + messageId + " deleted");
        },
        onUserStartedTyping: user => {
          console.log(`${user.name}(${user.id}) start typing`);
        },
        onUserStoppedTyping: user => {
          console.log(`${user.name}(${user.id}) stop typing`);
        },
        onUserJoined: user => {
          console.log(`${user.name}(${user.id}) joined this room`);
          store.state.members.push(user);
        },
        onUserLeft: user => {
          console.log(`${user.name}(${user.id}) left this room`);
        },
        onPresenceChanged: (stat, user) => {
          console.log(`${user.name}(${user.id}) goes from ${stat.previous} to ${stat.current}`);
          store.setMembers();
        },
        onNewReadCursor: cursor => {
          console.log(`a new read cursor ${cursor} set`);
        }
      },
      messageLimit: 10
    });
    store.state.msgLoading = false;
    this.setMembers();
  },
  async cancelSubscription(roomId) {
    let roomSubscriptions = this.state.currentUser.roomSubscriptions;
    if (roomSubscriptions) {
      await roomSubscriptions[roomId].cancel();
    }
  },
  async fetchRoomMessages(roomId) {
    this.state.messages = await this.state.currentUser.fetchMultipartMessages({
      roomId: roomId,
      initialId: 42,
      direction: 'older',
      limit: 10,
    });
  }
}