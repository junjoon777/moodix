# MOODix
VandyHacks submission

### Developers
* Project Leader        = Brian Lee
* Tech contributor      = Junhyuk Jeon
* Designer              = Hane Yie

### Language Used

* Javascript
* HTML5
* CSS3
* SpeechAPI

### Inspiration

The building process of MOODix was initiated by a simple curiosity of voice recognition. Through simple browsing, our team figured utilizing Google Cloud API in regards to speech recognition and adding our own codes on top of it can yield a meaningful project. During the opening ceremony of VandyHacks, we were informed of Centene Corporation, one of VandyHacks’ sponsoring companies, and their vision of ensuring community healthcare. The combination of ideas related to voice recognition and healthcare stimulated us to make MOODix.

### What it does
MOODix is an analytical platform that diagnoses a user’s mood based on speech recognition. MOODix mainly functions on the basis of Google Cloud MDN API and JavaScript Array object. MOODix’s role begins as the user verbally talks about his or her feelings to our platform. When certain choices of words, which are stored in our JavaScript Array object, are spoken out by a user, the occurrences of each words get numerically tallied up. Each emotional array categories (Happy, Sad, Energized, Confused, and Angry) store list of related words, an example being Happy array contains the word “depressed”. Consequently, emotional categories get ranked according to the numeric value tallied by the frequency of word occurrences.\

Simply explained, the user’s current psychological status gets diagnosed by MOODix according to the words they speak out. In addition, short clips are provided as remedies to each emotional status to encourage or suggest a change to the user to live a healthy life. Online therapist, that is what MOODix aims to be.

### How I built it
First, our team obtained MDN API provided by Google Cloud Platform that enabled voice recognition, indicating transformation of user’s voice input to textual input in our code. Our second task was to categorize emotions into different branches; Happy, Sad. Energized, Confused, and Angry. We created a simple algorithm in Python to parse data collected from a psychological perspective and categorized them under each emotion category using array function. As a result, arrays and lists were created in our project. Whenever a user speaks out a word that corresponds to any of the words under any categories, that word receives a numeric value. The numeric values get tallied up using tally list function and the categories get rank accordingly. The category that receives the highest numeric value comes out as an output. As the last step, we connected distinct HTML links to each potential outputs. By doing so, the users were redirected to remedial videos that became our final output.
