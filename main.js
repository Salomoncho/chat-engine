
 // create a new instance of ChatEngine
 ChatEngine = ChatEngineCore.create({
     publishKey: 'pub-c-e3937e28-e0ea-494f-a406-149fc1c164a0',
     subscribeKey: 'sub-c-0929d376-d178-11e7-aee1-6e8e9d2d00b1'
 });

 let userTemplate = Handlebars.compile($("#message-response-template").html());
 let peopleTemplate = Handlebars.compile($("#person-template").html());
 let meTemplate = Handlebars.compile($("#message-template").html());


 let newPerson = generatePerson(true);
 ChatEngine.connect(newPerson.uuid, newPerson);

 ChatEngine.on('$.ready', function(data) {
   // store my new user as `me`
   me = data.me;

   // create a new ChatEngine Chat
   myChat = new ChatEngine.Chat('chatengine-demo-chat');

   // when we recieve messages in this chat, render them
   myChat.on('message', (message) => {
       renderMessage(message);
   });
   // emit the `message` event to everyone in the Chat
   $('#sendMessage').on('submit', sendMessage)
 });


 // send a message to the Chat
const sendMessage = () => {

    // emit the `message` event to everyone in the Chat
    myChat.emit('message', {
      text: $('#message-to-send').val().trim()
      // text: "Prueba desde pagina"
    });

    // clear out the text input
    $('#message-to-send').val('');

    // stop form submit from bubbling
    return false;

};




 const renderMessage = (message) => {

    //  render the message
     $('.chat-history ul').append(userTemplate({
         messageOutput: message.data.text,
         time: getCurrentTime(),
         user: message.sender.state
     }));

     // scroll to the bottom of the chat
     scrollToBottom();

 };

 const scrollToBottom = () => {
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
};

const getCurrentTime = () => {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
};
