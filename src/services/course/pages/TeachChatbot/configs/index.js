// Config starter code
import { createChatBotMessage } from 'react-chatbot-kit';
import OutcomeChartLessonInsightsFormQuestions from 'services/course/pages/Charts/components/OutcomeChartLessonInsightsFormQuestions';

const botName = 'TeachBot';

const config = { 
  initialMessages: [createChatBotMessage(`Hello world outcome`)],
  widgets: [    
    {      
      widgetName: 'LessonInsights',      
      widgetFunc: (props) => <OutcomeChartLessonInsightsFormQuestions { ...props }/>
    },  
  ],
  botName: botName,  
  customStyles: { 
    botMessageBox: { 
      backgroundColor: '#376B7E',   
    },    chatButton: {      
      backgroundColor: '#5ccc9d',    
    },  
  },
};

export default config;

//https://stackoverflow.com/questions/71972757/passing-props-between-components-when-one-component-is-not-a-function
//https://codesandbox.io/s/rhzud
//https://codesandbox.io/s/rhzud?file=/src/chatbot/ActionProvider.js:90-102