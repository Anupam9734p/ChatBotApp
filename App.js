import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { chatWithGemini } from './src/api';

const App = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'admin' }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    if (inputText.trim()) {
   
      setMessages(prevMessages => [
        ...prevMessages,
        { id: String(prevMessages.length + 1), text: inputText, sender: 'user' }
      ]);

      setInputText('');

      try {
        const data = await chatWithGemini(inputText);

        setMessages(prevMessages => [
          ...prevMessages,
          { id: String(prevMessages.length + 1), text: data, sender: 'admin' }
        ]);
      } catch (error) {
        console.log("Error: " + error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Ask Any Questions</Text>
        </View>

        {/* Message List */}
        <ScrollView style={styles.messageList}>
          {messages.map((item, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                item.sender === 'user' ? styles.userMessage : styles.adminMessage
              ]}
            >
              <Text style={item.sender === 'user' ? styles.userText : styles.adminText}>
                {item.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  // Title Styles
  titleContainer: {
    marginTop: 40,
    paddingVertical: 10,
    backgroundColor: '#0084ff',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Message list container
  messageList: {
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: '70%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    borderTopRightRadius: 0,
  },
  adminMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
    borderTopLeftRadius: 0,
  },
  userText: {
    color: 'white',
  },
  adminText: {
    color: 'black',
  },
  // Input area styles
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#0084ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App
