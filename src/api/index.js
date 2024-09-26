import axios from 'axios';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = 'AIzaSyDtwJvr-S0F-lMYxcZN-xK45qRXjnZFpUs';


async function chatWithGemini(userMessage) {
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const responseData = response.data;
        const responseText = responseData.candidates[0]?.content?.parts[0]?.text || '';
  
      return responseText;
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
  
  export { chatWithGemini };