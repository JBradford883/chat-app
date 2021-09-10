## **Objective**

To build a chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.

---

## **Key Features**

- A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
and location data.
- Data gets stored online and offline.
---

## **How to set up the development enviroment**

<ul>

#### **Required tools:**
<ul>
<li> VisualStudio Code</li>
<li> Expo </li>
<li> Android Studio (for Android Emulator)</li>
<br>
</ul>

#### **Project Dependencies:**
<ul>
<li>react-native</li>
<li>expo</li>
<li>expo-camera</li>
<li>expo-location</li>
<li>expo-image-picker</li>
<li>firebase</li>
<li>react-native-gifted-chat</li>
<li>react-native-lightbox-v2</li>
<li>react-native-gesture-handler</li>
<li>react-native-async-storage/async-storage</li>
<li>prop-types</li>
</ul>
<br>

### **First you need to make sure that expo is installed globally on your computer.**
<br>

Here is the documentation for how to install Expo<br>
https://docs.expo.dev/get-started/installation/
<br>

#### **In your terminal enter:**
<br>

```
npm install --global-cli
```
<br>

### **Clone this repository**
<br>

Download this repo to your computer, and install the necessary modules by running: 
```
$ npm install
```
<br>

### **Start the development server**
<br>

```
$ expo start
```
<br>
After entering expo start, your browser should open the Metro Bundler and give you a QR code that you can scan with your phone to run it through the expo app. If you have not already done so install the expo app on your mobile device. You can also run simulators/emulators on your personal computer by entering i for IOS and a for Android in your ternimal.
<br>
<br>

### **Cloud Storage Configuration**

At this point the app should open and run on your mobile device or emulator, but you are probably wondering how to set up your cloud storage.

To use Cloud Storage for the application, you need to have a Firebase account and inside <a href="https://firebase.google.com">Firebase</a> first create a new project. Then create a database in 'test mode' and to make sure data can be stored, enable "Anonymous Authentication" in "Authentication > Sign-in method" menu.
<br>
<br>

### **Install firebase to your local machine**
<br>

```
$ expo install firebase
```

In the chat.js file replace lines 19-25 with your own Firebase configuration. The data you are replacing can be found in the project setting section on firebase under "Your Apps" The code should look like this

```
apiKey: "AIzaSyBuzeSRAvL0GYjQRD6rc7_eXgnJoFP5i9s",
authDomain: "chat-app-9d570.firebaseapp.com",
projectId: "chat-app-9d570",
storageBucket: "chat-app-9d570.appspot.com",
messagingSenderId: "828501674686",
appId: "1:828501674686:web:62866aa5ca34bdfef92cef",
measurementId: "G-E4XC370SZ2"
```
<br>

After saving your project run:

```
$ expo start
```

You can now access and save your very own data via firebase cloud storage. Happy Hacking!
