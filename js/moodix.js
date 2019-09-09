try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuous = true;
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }

  var noteContent = '';

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

function allowScroll() {
    document.getElementById("blinking").style.visibility = "visible";
    document.getElementsByTagName('html')[0].style.overflow = "scroll";
}


  recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    noteContent += transcript;
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  }

window.onload = function() {
    document.getElementById("start-record-btn").onclick = function() {
        recognition.start();
    }
    document.getElementById("pause-record-btn").onclick = function () {
        recognition.stop();
        split_user_text();
    }
}


function split_user_text () {
    var tally_list = [0,0,0,0,0];
    //1: happy
    //2: sad
    //3: energized
    //4: confused
    //5: angry

    console.log(noteContent);
    noteContent = noteContent.toLowerCase(); 
    var split_noteContent = noteContent.split(" ");
    for(let i=0; i<split_noteContent.length; i++) {
        split_noteContent[i] = stemmer(split_noteContent[i]);
        console.log(split_noteContent[i]);

        if(generate_happy_array().indexOf(split_noteContent[i]) > -1) {
            tally_list[0] = tally_list[0]+1;
        }
        if(generate_sad_array().indexOf(split_noteContent[i]) > -1) {
            tally_list[1] = tally_list[1]+1;
        }
        if(generate_energized_array().indexOf(split_noteContent[i]) > -1) {
            tally_list[2] = tally_list[2]+1;
        }
        if(generate_confused_array().indexOf(split_noteContent[i]) > -1) {
            tally_list[3] = tally_list[3]+1;
        }
        if(generate_angry_array().indexOf(split_noteContent[i]) > -1) {
            tally_list[4] = tally_list[4]+1;
        }
    }
    console.log(tally_list);
    var max = indexOfMax(tally_list);
    if(max === 0) {
        // console.log("happy")
        window.open("happy.html","_self")
    }else if(max ===  1) {
        // console.log("sad")
        window.open("sad.html","_self")
    }else if(max === 2) {
        // console.log("energized")
        window.open("energized.html","_self")
    }else if(max === 3) {
        // console.log("confused")
        window.open("confused.html","_self")
    }else if(max === 4) {
        // console.log("angry")
        window.open("angry.html","_self")
    }
}
function identical(array) {
    for(var i = 0; i < array.length - 1; i++) {
        if(array[i] !== array[i+1]) {
            return false;
        }
    }
    return true;
}
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}
function generate_happy_array () {
    var happy = [
        "laugh",
        "happy",
        "love",
        "excel",
        "joy",
        "success",
        "win",
        "rainbow",
        "smile",
        "please",
        "celebrate",
        "enjoy",
        "health",
        "music",
        "weekend",
        "comedy",
        "joke",
        "rich",
        "victory",
        "christmas",
        "holiday",
        "free",
        "friend",
        "fun",
        "beach",
        "haha",
        "hahaha",
        "lol",
        "candy",
        "delicious",
        "kiss",
        "sunshine",
        "beautiful",
        "outstanding",
        "paradise",
        "sweet",
        "vacation",
        "butterfly",
        "flower",
        "great",
        "sun",
        "award",
        "chocolate",
        "peace",
        "splendid",
        "attract",
        "hero",
        "hug",
        "positive",
        "light",
        "bless",
        "entertain",
        "honest",
        "sky",
        "wonder",
        "wonderful",
        "glory",
        "promote",
        "family",
        "gift",
        "humor",
        "romantic",
        "cupcake",
        "festival",
        "hahahaha",
        "relax",
        "understand",
        "rely",
        "amaze",
        "sympathetic",
        "accept",
        "kind",
        "gay",
        "fortune",
        "glee",
        "thank",
        "glad",
        "merry",
        "elate",
        "alive",
        "live",
        "play",
        "spirit",'happiest', 'happiness', 'bliss', 'celebrating', 'jubilant', 'ecstatic', 'elation', 'beaming', 'bestdayever', 'loveee', 'celebration', 'awesomeness', 'joy', 'happily', 'fabulous', 'exuberance', 'excitement', 'joyous', 'makesmehappy', 'euphoria', 'lovee', 'gratitude', 'happydance', 'merriment', 'spectacular', 'overjoyed', 'purebliss', 'triumphant', 'lovelovelove', 'ecstasy', 'cheerful', 'cheer', 'elated', 'jolly', 'lovethis', 'peaceofmind', 'delighted', 'exhilaration', 'excitation', 'pleasures', 'laugh', 'marvelously', 'blissful', 'loving', 'outstanding', 'joyful', 'pleasurable', 'overthemoon', 'lovinglife', 'yaaaay', 'happyplace', 'iloveher', 'glee', 'enthusiastic', 'sohappy', 'superb', 'laughing', 'woohoo', 'wonderful', 'ilovechristmas', 'hooray', 'brilliant', 'cheering', 'glory', 'tearsofjoy', 'magnificent', 'hallelujah', 'yayyyy', 'celebrated', 'loved', 'exciting', 'heavenly', 'thrilled', 'mademyday', 'hohoho', 'wonderfully', 'blessing', 'favoriteholiday', 'celebrate', 'celebrations', 'blessed', 'festive', 'sweetness', 'paradise', 'marvellous', 'compliment', 'enchanting', 'smiling', 'allsmiles', 'love', 'homesweethome', 'thankyougod', 'marvelous', 'laughter', 'goodmood', 'happyheart', 'joys', 'sensational', 'celebratory', 'excellence', 'delightful', 'goodness', 'excited', 'rejoicing', 'greatful', 'jovial', 'glorious', 'victorious', 'excellent', 'bonanza', 'rejoice', 'splendid', 'enjoy', 'lovemaking', 'greatday', 'smiley', 'goodtimes', 'whatmakesmesmile', 'happyday', 'myfavorite', 'yeahhhh', 'gladness', 'yayyy', 'pleasure', 'thankyoulord', 'giggle', 'lovinlife', 'yesss', 'happytweet', 'success', 'dancing', 'lovemylife', 'happier', 'magnificence', 'grateful', 'happy', 'amuse', 'splendor', 'fun', 'glorify', 'solucky', 'glad', 'enchanted', 'sothankful', 'radiant', 'beautiful', 'giggling', 'perfection', 'christmassy', 'heavens', 'romance', 'thrilling', 'happyvalentinesday', 'entertain', 'cheered', 'positivity', 'congrats', 'cheers', 'lovable', 'miraculous', 'fiesta', 'funday', 'enjoying', 'amused', 'smiles', 'lifeisgood', 'thebest', 'cuddling', 'sosweet', 'christmasspirit', 'goodfeeling', 'delight', 'orgasm', 'party', 'positive', 'enlighten', 'cheerfulness', 'miracles', 'sweetheart', 'giddy', 'christmastime', 'pleasing', 'gratify', 'smile', 'laughs', 'greatness', 'friendliness', 'happyholidays', 'romantic', 'blessings', 'tistheseason', 'frolic', 'positiveenergy', 'rewarding', 'magical', 'miracle', 'selflove', 'jubilee', 'triumph', 'goodvibes', 'enthusiasm', 'feelgood', 'prosperity', 'passionate', 'admiration', 'feelinggood', 'tgif', 'victory', 'enchant', 'vivacious', 'luxurious', 'behappy', 'greatnight', 'goodday', 'glorification', 'glowing', 'sing', 'breathtaking', 'yessss', 'fulfillment', 'atpeace', 'hurrah', 'merry', 'santa', 'award', 'christmasbreak', 'thankful', 'cheery', 'win', 'pleased', 'inspiration', 'radiance', 'uplift', 'optimistic', 'holidays', 'thrill', 'heaven', 'godisgreat', 'lucky', 'amusement', 'congratulatory', 'harmony', 'brighten', 'lover', 'perfect', 'lovely', 'thriving', 'praising', 'utopian', 'xmas', 'heartfelt', 'luxury', 'treasures', 'magic', 'bestfeeling', 'merrychristmas', 'achievement', 'holiday', 'yay', 'luckiest', 'intimate', 'yaaay', 'chuckle', 'rave', 'soblessed', 'proud', 'cherish', 'sweetest', 'amazingly', 'optimism', 'fuckyeah', 'goodnews', 'cuddled', 'satisfying', 'beautification', 'truelove', 'lovelife', 'gooood', 'goodlife', 'appreciates', 'winning', 'yaay', 'entertained', 'excite', 'newbeginnings', 'praisejesus', 'birthday', 'exquisite', 'content', 'godsend', 'thankyoujesus', 'adoration', 'angelic', 'greatfriends', 'favorite', 'metime', 'honored', 'holidayseason', 'entertaining', 'majestic', 'brightens', 'exaltation', 'goodhealth', 'smiled', 'bestfriends', 'memoriesiwontforget', 'precious', 'luscious', 'appreciated', 'tranquility', 'embrace', 'marry', 'positively', 'grin', 'giggles', 'enliven', 'bday', 'relaxation', 'hug', 'hilarious', 'contentment', 'weeeee', 'dearest', 'accomplished', 'fulfilled', 'adore', 'bountiful', 'victor', 'boisterous', 'fulfill', 'cuddles', 'prosperous', 'serenity', 'glow', 'encouraged', 'christmaseve', 'appreciation', 'happynewyear', 'satisfy', 'innerpeace', 'captivate', 'besties', 'romanticism', 'humor', 'pleasant', 'satisfaction', 'praised', 'abundance', 'treasure', 'praises', 'engaged', 'relaxing', 'fortunes', 'nothingbetter', 'complement', 'affection', 'relieved', 'carnival', 'uplifting', 'divine', 'champion', 'thanksgiving', 'achieve', 'jackpot', 'priceless', 'saintly', 'sensuality', 'wedding', 'harmoniously', 'honeymoon', 'exalt', 'twinkle', 'cuddle', 'felicity', 'peaceful', 'yayy', 'winner', 'reverie', 'climax', 'comforting', 'xoxo', 'reward', 'gorgeous', 'praisegod', 'generosity', 'hearts', 'stargazing', 'snuggling', 'fondness', 'amusing', 'sweet', 'brighter', 'festival', 'sex', 'kind', 'parade', 'genial', 'applause', 'beauty', 'fulfilling', 'aspiring', 'newlife', 'godbless', 'virtuous', 'kiss', 'rainbows', 'generous', 'christmas', 'enlightenment', 'winnings', 'playful', 'super', 'awards', 'praiseworthy', 'rekindle', 'adorable', 'elegance', 'independence', 'amour', 'kindness', 'inspired', 'wonder', 'successful', 'heheh', 'onelove', 'hilarity', 'freely', 'surprises', 'entertainment', 'passion', 'whimsical', 'beautify', 'stressfree', 'sunrise', 'godisgood', 'revere', 'snuggled', 'accomplishment', 'jesus', 'angel', 'goodmusic', 'inspire', 'flirt', 'thankgod', 'whoo', 'goodies', 'peacefully', 'fanfare', 'friendship', 'heroic', 'summer', 'fortune', 'highest', 'singing', 'exalted', 'woot', 'contented', 'overflowing', 'rollicking', 'hope', 'accolade', 'cozy', 'delicious', 'ambition', 'friendly', 'praise', 'raving', 'sensuous', 'picturesque', 'thelife', 'everlasting', 'darling', 'sparkle', 'yeahhh', 'flattering', 'succeeding', 'peace', 'heroism', 'luckygirl', 'sensual', 'grace', 'special', 'livelife', 'tantalizing', 'pumped', 'relax', 'hero', 'sweets', 'admirable', 'yey', 'surprise', 'hugs', 'prosper', 'revels', 'sunny', 'prevail', 'liking', 'humorous', 'worthwhile', 'superstar', 'bless', 'favorable', 'tenderness', 'newyear', 'freedom', 'masterpiece', 'dreams', 'hopeful', 'home', 'cruising', 'gracias', 'faithfulness', 'eagerness', 'closeness', 'sunshine', 'comfy', 'gift', 'bonus', 'daughter', 'vacation', 'confidence', 'zeal', 'astonishment', 'heart', 'completion', 'gifts', 'mistletoe', 'elite', 'good', 'celestial', 'illuminate', 'lifted', 'goodmorning', 'charmed', 'encouragement', 'sublime', 'dance', 'recreation', 'gush', 'god', 'free', 'freshstart', 'savior', 'sanctuary', 'grandchildren', 'wellness', 'revel', 'alive', 'bridal', 'inspirational', 'vitality', 'liberation', 'holiness', 'firstborn', 'money', 'rainbow', 'dayoff', 'serene', 'confident', 'soothing', 'music', 'matrimony', 'soar', 'savor', 'fab', 'mastery', 'warmth', 'elegant', 'glimmer', 'blossom', 'illumination', 'welcomed', 'treat', 'faithful', 'snuggles', 'laurels', 'commendable', 'strengthening', 'succeed', 'aspire', 'abundant', 'powerful', 'almighty', 'jingle', 'silly', 'remarkable', 'zest', 'pride', 'brotherly', 'greeted', 'presents', 'resplendent', 'fancy', 'noschool', 'leisure', 'vivid', 'thanking', 'therapeutic', 'familytime', 'zen', 'reunited', 'animated', 'comfort', 'princely', 'shining', 'complete', 'kudos', 'payday', 'cutie', 'coronation', 'spirit', 'newme', 'kid', 'marriage', 'relationship', 'daymade', 'godly', 'spouse', 'intimately', 'achieved', 'soulful', 'welcoming', 'satisfied', 'family', 'meritorious', 'purr', 'motherhood', 'carefree', 'gem', 'excel', 'healthy', 'surreal', 'diamond', 'charitable', 'inviting', 'erotic', 'memorable', 'veracity', 'friends', 'stressrelief', 'holyspirit', 'respect', 'beach', 'nature', 'dignity', 'bloom', 'accomplish', 'christ', 'encourage', 'teamjesus', 'visionary', 'baby', 'refreshed', 'aura', 'health', 'liberty', 'oasis', 'yehey', 'approved', 'rapture', 'loyal', 'aspiration', 'inseparable', 'betrothed', 'privileged', 'crescendo', 'crowning', 'gentle', 'liberate', 'nocomplaints', 'engaging', 'bounty', 'prestige', 'yummy', 'chocolate', 'desire', 'heyday', 'selfworth', 'dream', 'transcendence', 'luck', 'creativity', 'bouquet', 'aloha', 'trophy', 'fete', 'destiny', 'datenight', 'boyfriend', 'commemoration', 'intelligence', 'readiness', 'friend', 'enthusiast', 'bride', 'lush', 'inheritance', 'calming', 'soothe', 'adventure', 'kiddo', 'nostalgia', 'tickle', 'massage', 'purring', 'bonding', 'eternal', 'benevolence', 'nurture', 'giving', 'princess', 'pretty', 'amicable', 'getaway', 'goals', 'humanitarian', 'luster', 'bridegroom', 'pray', 'rest', 'heartily', 'child', 'salutary', 'invite', 'beam', 'reminiscing', 'tropical', 'befriend', 'hee', 'ceremony', 'friday', 'elevation', 'sonice', 'aesthetics', 'scholarship', 'kindred', 'mindfulness', 'freshair', 'birth', 'scenery', 'faith', 'namaste', 'vindication', 'allure', 'noworries', 'commemorate', 'approve', 'forgiveness', 'waterfall', 'journey', 'meditation', 'relaxed', 'weekend', 'tranquil', 'tender', 'present', 'righteousness', 'sharing', 'lyrical', 'esteem', 'nostalgic', 'prayer', 'unbeaten', 'share', 'eager', 'strength', 'meditate', 'newday', 'husband', 'life', 'sonnet', 'relief', 'mighty', 'warm', 'winterbreak', 'movingforward', 'buddy', 'oneness', 'medal', 'unsurpassed', 'carols', 'candlelight', 'amen', 'reverence', 'ejaculation', 'healthful', 'unconstrained', 'thelittlethings', 'wealth', 'graduation', 'glitter', 'lml', 'ease', 'sledding', 'safe', 'frisky', 'energy', 'calmness', 'symphony', 'helpful', 'musical', 'beginnings', 'nostress', 'soundness', 'promise', 'reunite', 'mother', 'salvation', 'poems', 'purify', 'travel', 'lavender', 'aromatherapy', 'inauguration', 'clown', 'immaculate', 'lighten', 'star', 'completing', 'heal', 'live', 'cash', 'companion', 'opportune', 'charity', 'flowers', 'wishing', 'income', 'soul', 'munchies', 'progress', 'indescribable', 'christian', 'emancipation', 'equality', 'rhythmical', 'childhood', 'calm', 'picnic', 'together', 'fullness', 'hammock', 'movies', 'zealous', 'choir', 'goofy', 'humanity', 'adventures', 'affluence', 'playground', 'starry', 'meaningful', 'auspicious', 'littlethings', 'warms', 'gesture', 'witty', 'shopping', 'vow', 'communion', 'jump', 'vibes', 'worship', 'reverend', 'unique', 'scenic', 'courtship', 'reunion', 'rising', 'full', 'redeemed', 'unforgettable', 'mirth', 'hymn', 'simplicity', 'spirits', 'youth', 'beaches', 'experience', 'advance', 'sonorous', 'baptismal', 'alliance', 'grant', 'moonlight', 'kitten', 'authentic', 'conciliation', 'sanctification', 'improve', 'pure', 'improves', 'weightloss', 'raspberries', 'feeling', 'devotional', 'fidelity', 'listenting', 'proficiency', 'jest', 'independent', 'tinsel', 'revival', 'sanctify', 'cocoa', 'giver', 'purpose', 'romp', 'deliverance', 'dolphin', 'unification', 'roaring', 'melody', 'choral', 'favor', 'exceed', 'hotyoga', 'electric', 'nowork', 'hedonism', 'pledge', 'humble', 'kiddos', 'thx', 'fruits', 'newstart', 'manicure', 'cookies', 'date', 'roadtrip', 'voluptuous', 'celebrity', 'rhythm', 'bridesmaid', 'obliging', 'familiarity', 'spa', 'connoisseur', 'coffee', 'edification', 'partner', 'garden', 'renovation', 'gazing', 'dawn', 'snowday', 'young', 'foodie', 'synchronize', 'saint', 'carol', 'hobby', 'noregrets', 'amnesty', 'healing', 'tribulation', 'TRUE', 'chirping', 'psalm', 'pedicure', 'respite', 'mellow', 'recreational', 'classics', 'cousins', 'restorative', 'lazyday', 'reconciliation', 'superman', 'living', 'simplify', 'recovery', 'relight', 'sunset', 'crafts', 'pony', 'deal', 'presto', 'fitness', 'sterling', 'wisdom', 'dove', 'playhouse', 'woods', 'muchneeded', 'progression', 'lord'
    ]
    return happy;
}
function generate_sad_array () {
    var sad = [
        "sad", "sorrow","pain","grief","anguish","desolate","desperate",
        "unhappy","pessimistic","lonely","mourn","dismay","crush",
        "torment","deprive","torture","deject","reject","injure",
        "offend","afflict","ache","victim","heartbroke","heartbroken",
        "humiliate","wrong","alienated","lone","fear","terrify",
        "suspicious","lousy","disappoint","discourage",
        "ashame","diminish","guilt","guilty","dissatisfy",
        "misery","miserable","detest","repugnant","despic",
        "disgust","sulk","sulky","terrible","bad","lose",
        "loss","incapable","inferior","fatigue","stress",
        "woe","tragic","empty","useless",'heartbreaking', 'mourning', 'tragic', 'holocaust', 'suicidal', 'misery', 'massacre', 'euthanasia', 'depression', 'fatal', 'bereavement', 'grieving', 'bereaved', 'devastation', 'death', 'suicide', 'devastated', 'catastrophe', 'horrifying', 'tragedy', 'died', 'depressing', 'anguish', 'agony', 'deadly', 'weeping', 'deceased', 'stillbirth', 'murderer', 'cancer', 'dying', 'rape', 'devastating', 'sadness', 'morbidity', 'execution', 'abandonment', 'crucifixion', 'grief', 'depressed', 'perish', 'traumatic', 'atrocity', 'cadaver', 'betrayed', 'treachery', 'funeral', 'grieve', 'murderous', 'miserable', 'hopelessness', 'persecution', 'sad', 'suffering', 'sorrow', 'homicide', 'slaughtering', 'destroyed', 'horrific', 'unhappiness', 'crippled', 'bloodshed', 'pained', 'manslaughter', 'carnage', 'unbearable', 'stillborn', 'torment', 'helplessness', 'annihilation', 'slavery', 'annihilated', 'enslaved', 'casualty', 'horrors', 'murder', 'mourn', 'morbid', 'abandoned', 'sickness', 'mutilation', 'miscarriage', 'starvation', 'cruelty', 'childloss', 'disgrace', 'killing', 'oppression', 'terrorism', 'failure', 'famine', 'heartache', 'burial', 'saddens', 'distraught', 'despair', 'sadly', 'mournful', 'bloody', 'inhumanity', 'perishing', 'malignancy', 'mortification', 'kill', 'lifeless', 'dreadful', 'slave', 'desolation', 'devastate', 'perished', 'assassination', 'mortuary', 'dreadfully', 'leukemia', 'sarcoma', 'lethal', 'gallows', 'brokenheart', 'banishment', 'afflict', 'disheartened', 'bury', 'desecration', 'demoralized', 'tumour', 'terrorize', 'crying', 'heartbreak', 'die', 'lynch', 'sufferer', 'loneliness', 'abortion', 'dismemberment', 'diseased', 'fearful', 'destitute', 'torture', 'slayer', 'cemetery', 'fatality', 'condolence', 'doomed', 'painfully', 'moribund', 'disaster', 'depress', 'condemnation', 'victimized', 'obliteration', 'depressive', 'terrorist', 'guilt', 'incest', 'pandemic', 'unhappy', 'defeated', 'painful', 'deplorable', 'damnation', 'doomsday', 'corpse', 'abduction', 'sorrowful', 'regretful', 'desperation', 'cry', 'sickening', 'hemorrhage', 'unfairness', 'molestation', 'exile', 'abysmal', 'hellish', 'exterminate', 'disgraced', 'homeless', 'destroying', 'battered', 'betrayal', 'horrid', 'warfare', 'assassin', 'disastrous', 'lonesome', 'miserably', 'morgue', 'slaughter', 'earthquake', 'orphan', 'listless', 'grave', 'emptiness', 'unfortunately', 'alienated', 'fraught', 'forsaken', 'leprosy', 'cried', 'paralysis', 'malicious', 'ashamed', 'woe', 'danger', 'disheartening', 'heartless', 'violently', 'cripple', 'horror', 'atrophy', 'missing', 'emaciated', 'pain', 'demise', 'sickly', 'disgruntled', 'violence', 'rejected', 'torn', 'calamity', 'grim', 'grievous', 'hearse', 'extinct', 'crushed', 'isolation', 'meltdown', 'obit', 'paralyzed', 'carcinoma', 'suffocating', 'deformed', 'inhuman', 'punishing', 'incurable', 'strangle', 'disfigured', 'victim', 'deformity', 'slaughterhouse', 'decomposition', 'humiliate', 'buried', 'oppressor', 'abandon', 'tearful', 'isolate', 'lifesucks', 'hell', 'ruinous', 'banish', 'ruined', 'accursed', 'widow', 'vanished', 'displaced', 'poverty', 'illness', 'hopeless', 'travesty', 'deserted', 'regretting', 'loss', 'pathetic', 'nohope', 'stab', 'shooting', 'foreveralone', 'imprisoned', 'insanity', 'hurtful', 'terminal', 'epidemic', 'hurt', 'depraved', 'banished', 'infidelity', 'neglected', 'sob', 'teary', 'dementia', 'widower', 'hospice', 'dismissal', 'alienation', 'hardship', 'kidnap', 'choke', 'bleeding', 'outcast', 'despairing', 'woefully', 'belittle', 'evil', 'disparage', 'feelingdown', 'imprisonment', 'frightful', 'punished', 'missingyou', 'wretched', 'abortive', 'obituary', 'gory', 'wretch', 'poison', 'coffin', 'deprivation', 'malevolent', 'wail', 'disabled', 'decomposed', 'barren', 'poisoned', 'executioner', 'disease', 'oppress', 'disembodied', 'tear', 'hate', 'lonely', 'dreary', 'blighted', 'ailing', 'demonic', 'peril', 'jail', 'lamenting', 'shitty', 'polio', 'mangle', 'ruin', 'weep', 'steal', 'casket', 'bleak', 'carcass', 'regretted', 'beating', 'cowardice', 'disability', 'affliction', 'emergency', 'hatred', 'termination', 'awful', 'exorcism', 'sinful', 'scourge', 'perilous', 'poisonous', 'worry', 'drown', 'infertility', 'shroud', 'powerless', 'woeful', 'failing', 'terribly', 'inequality', 'incarceration', 'stricken', 'psychosis', 'disappointed', 'demolish', 'dismay', 'lament', 'burdensome', 'mausoleum', 'shattered', 'tyrant', 'disappointing', 'insurmountable', 'wound', 'impotence', 'wrecked', 'abuse', 'demolished', 'palsy', 'lost', 'posthumous', 'gloom', 'schizophrenia', 'cursed', 'undesired', 'forlorn', 'terminate', 'dishonor', 'regret', 'bitterly', 'hurting', 'duress', 'oppressive', 'deteriorate', 'soulless', 'divorce', 'melancholy', 'cremation', 'bomb', 'forsake', 'worried', 'plight', 'unforgiving', 'sepsis', 'overwhelmed', 'fearfully', 'languishing', 'alcoholism', 'irreparable', 'bankrupt', 'gore', 'debacle', 'cruel', 'injured', 'faithless', 'ugliness', 'derogatory', 'injure', 'disappoint', 'crushing', 'shackle', 'dire', 'sacrifices', 'breakup', 'subjugation', 'excluded', 'sinner', 'degrading', 'worthless', 'guilty', 'shatter', 'disparaging', 'dilapidated', 'shameful', 'curse', 'anthrax', 'robbery', 'alone', 'angst', 'losing', 'prison', 'somber', 'contaminated', 'deprived', 'martyrdom', 'irreconcilable', 'poaching', 'bawl', 'eviction', 'ill', 'helpless', 'downfall', 'deportation', 'crumbling', 'distress', 'disappointment', 'demon', 'nothingness', 'condolences', 'crypt', 'longing', 'shame', 'captivity', 'obliterate', 'chaos', 'violation', 'vendetta', 'broken', 'abyss', 'petloss', 'offender', 'remorse', 'betray', 'dysentery', 'blight', 'melancholic', 'rupture', 'traitor', 'haggard', 'lie', 'cholera', 'degeneracy', 'undesirable', 'gloomy', 'turmoil', 'terrible', 'frighten', 'unwell', 'bully', 'bitterness', 'discrimination', 'whine', 'humiliation', 'sordid', 'immoral', 'harmful', 'interment', 'denied', 'damage', 'delirium', 'captive', 'pessimism', 'deplore', 'whimper', 'disliked', 'devil', 'damages', 'hateful', 'bigoted', 'perdition', 'adultery', 'corrupting', 'worsening', 'flog', 'dismal', 'comatose', 'autopsy', 'worrying', 'deceive', 'tomb', 'deceit', 'wallow', 'pessimist', 'rejection', 'sadday', 'shipwreck', 'deceitful', 'urn', 'punitive', 'injury', 'resentment', 'endocarditis', 'rheumatism', 'infliction', 'expire', 'tyranny', 'anathema', 'pauper', 'runaway', 'upset', 'departed', 'martyr', 'smite', 'malaria', 'hanging', 'chagrin', 'malaise', 'memorial', 'resignation', 'absence', 'imissyou', 'bummed', 'unkind', 'isolated', 'plague', 'shot', 'bomber', 'hydrocephalus', 'surrendering', 'unfulfilled', 'discourage', 'disillusionment', 'reject', 'shun', 'pity', 'glum', 'nefarious', 'groan', 'concussion', 'dark', 'incrimination', 'weakly', 'aching', 'discontent', 'undertaker', 'assailant', 'deterioration', 'sorely', 'antisocial', 'homesick', 'confined', 'inimical', 'attacking', 'tarnish', 'forfeiture', 'theft', 'outburst', 'fooled', 'disgust', 'embolism', 'requiem', 'console', 'dispossessed', 'disparity', 'sick', 'prisoner', 'embarrassment', 'ache', 'inflict', 'neurosis', 'epitaph', 'penance', 'sullen', 'grievance', 'relapse', 'forgotten', 'unpleasant', 'disable', 'defenseless', 'defunct', 'ridicule', 'misfortune', 'blindness', 'unfriendly', 'delusion', 'wither', 'stifled', 'elimination', 'unlucky', 'sore', 'retard', 'vegetative', 'stripped', 'sin', 'sequestration', 'displeased', 'accident', 'dumps', 'hideous', 'weakness', 'decayed', 'unrequited', 'dictatorship', 'complain', 'lose', 'regrettable', 'insecure', 'witchcraft', 'drugged', 'disrespectful', 'unfair', 'gonorrhea', 'disturbed', 'rot', 'negative', 'howl', 'dolor', 'mortality', 'mad', 'atherosclerosis', 'impossible', 'crash', 'injurious', 'chronic', 'frowning', 'discomfort', 'intolerant', 'ungodly', 'aftermath', 'explode', 'cringe', 'battled', 'deport', 'nauseous', 'exclusion', 'aggravating', 'senile', 'anxiety', 'weary', 'cytomegalovirus', 'prosecute', 'difficulty', 'bier', 'bankruptcy', 'endemic', 'offended', 'damper', 'messedup', 'coma', 'evict', 'derogation', 'rob', 'shriek', 'recession', 'evasion', 'wrongful', 'resign', 'coward', 'moan', 'weariness', 'inadequate', 'disturbance', 'insult', 'frailty', 'adversity', 'repress', 'wince', 'worn', 'nasty', 'sabotage', 'criticism', 'arsenic', 'reprisal', 'beg', 'hospital', 'offense', 'broke', 'infectious', 'dishonest', 'decay', 'dissolution', 'lowest', 'unhealthy', 'irritation', 'perversion', 'disapproval', 'moody', 'vulnerability', 'penal', 'domination', 'unfavorable', 'illegal', 'uncaring', 'leftout', 'segregate', 'collusion', 'unfortunate', 'sedition', 'penalty', 'pernicious', 'ail', 'conflict', 'dashed', 'uneasiness', 'convict', 'collapse', 'fallout', 'expulsion', 'frustrate', 'criticize', 'measles', 'recidivism', 'frayed', 'infamy', 'plunder', 'depreciated', 'wane', 'badly', 'unlawful', 'gone', 'scarcity', 'secluded', 'memorials', 'surrender', 'inability', 'tribulation', 'perplexity', 'inhospitable', 'invade', 'worse', 'disapprove', 'wrongly', 'revolver', 'vulgarity', 'bittersweet', 'discriminate', 'foreclose', 'upheaval', 'wreck', 'despotism', 'fell', 'frown', 'confiscate', 'criticise', 'doldrums', 'refugee', 'avalanche', 'lowly', 'lone', 'guillotine', 'encumbrance', 'annulment', 'delirious', 'confinement', 'badday', 'bummer', 'underpaid', 'detainee', 'restriction', 'stigma', 'fugitive', 'sympathize', 'indigent', 'bum', 'pensive', 'paucity', 'blues', 'emotional', 'diminish', 'disapproving', 'disapproved', 'darkened', 'apathetic', 'imprudent', 'abscess', 'insignificant', 'animosity', 'cancellation', 'problem', 'forbid', 'lunacy', 'dislocated', 'disagreement', 'lethargy', 'rejects', 'disconnected', 'absent', 'departure', 'ghetto', 'unattainable', 'futile', 'coercion', 'deflate', 'insolvency', 'farewell', 'appendicitis', 'bothering', 'disqualified', 'tripping', 'sunk', 'draining', 'lastday', 'varicella', 'retribution', 'cardiomyopathy', 'scarce', 'thief', 'unequal', 'cutting', 'neuralgia', 'unwelcome', 'haunted', 'insolvent', 'rip', 'cyst', 'jarring', 'deviation', 'wrongdoing', 'bad', 'handicap', 'dispassionate', 'falling', 'beggar', 'difficulties', 'invader', 'drab', 'fall', 'illegitimate', 'expel', 'darkness', 'meaningless', 'syncope', 'obnoxious', 'darken', 'enmity', 'bitch', 'confine', 'hoax', 'precarious', 'feudalism', 'wildfire', 'fatigued', 'fault', 'stroke', 'subjected', 'fury', 'unsatisfied', 'spank', 'deluge', 'sigh', 'spinster', 'blue', 'owing', 'needalife', 'embarrass', 'pitfall', 'seriousness', 'pointless', 'cage', 'brute', 'exhausted', 'debt', 'condescension', 'reproach', 'noose', 'insulting', 'ifonly', 'stretcher', 'trickery', 'punch', 'coldness', 'dwarfed', 'ravenous', 'feeble', 'inefficient', 'refused', 'daemon', 'banshee', 'monsoon', 'rue', 'ineptitude', 'subvert', 'jealousy', 'geriatric', 'miss', 'struggle', 'inexcusable', 'entangled', 'descent', 'ashes', 'inconsiderate', 'sucks', 'blackness', 'slump', 'noncompliance', 'scar', 'murky', 'funk', 'landslide', 'disqualify', 'wasting', 'exhaustion', 'goodbye', 'sympathy', 'oust', 'parting', 'withdraw', 'inferior', 'prostitution', 'dispel', 'overcast', 'rabid', 'unattractive', 'delay', 'apologize', 'crazy', 'bastard', 'deteriorated', 'inter', 'empty', 'mocking', 'adder', 'perpetrator', 'hindering', 'affront', 'arraignment', 'fruitless', 'unable', 'disconnect', 'defendant', 'corse', 'obesity', 'taunt', 'servile', 'misunderstanding', 'austere', 'doubt', 'wrangling', 'hunter', 'unsuccessful', 'inefficiency', 'consecration', 'tremor', 'unemployed', 'fuss', 'unpopular', 'fainting', 'numbness', 'flounder', 'idiocy', 'lockup', 'plaintive', 'unrest', 'spoiler', 'intervention', 'waste', 'wimpy', 'absentee', 'flaw', 'desert', 'cumbersome', 'specter', 'resigned', 'furrow', 'lagging', 'forfeit', 'uninspired', 'plea', 'intercede', 'stained', 'litigate', 'blindly', 'attenuation', 'militia', 'surgery', 'detention', 'lawsuit', 'thrash', 'uninvited', 'unaccountable', 'myopia', 'mishap', 'probation', 'severance', 'disagreeing', 'incompetent', 'nether', 'endless', 'dependence', 'disallowed', 'bondage', 'soreness', 'unacknowledged', 'squall', 'unacceptable', 'adrift', 'nepotism', 'sterile', 'bacteria', 'leave', 'scold', 'flaccid', 'hobo', 'fragile', 'stingy', 'sue', 'scarcely', 'wan', 'committal', 'mistake', 'clouded', 'skid', 'defy', 'thresh', 'fatty', 'nostalgia', 'inhibit', 'evanescence', 'ulcer', 'hamstring', 'nonsensical', 'conceal', 'blemish', 'resisting', 'sympathetic', 'bugaboo', 'confess', 'opium', 'alas', 'incase', 'halting', 'incompatible', 'migraine', 'mislead', 'toocold', 'suppress', 'inappropriate', 'discontinuity', 'setback', 'dull', 'weak', 'subsidence', 'wrinkled', 'hermit', 'moving', 'shrink', 'shiver', 'tramp', 'unimportant', 'constraint', 'rubble', 'negro', 'grey', 'flinch', 'apathy', 'confession', 'down', 'remove', 'unseat', 'wearily', 'taint', 'excluding', 'overdue', 'shortage', 'grumpy', 'flop', 'revoke', 'adverse', 'black', 'scrapie', 'timid', 'senseless', 'knell', 'soldier', 'humbled', 'confusion', 'throb', 'jurisprudence', 'gray', 'shack', 'mixedemotions', 'obstacle', 'lax', 'remiss', 'slur', 'unrealistic', 'drifted', 'eternity', 'leaving', 'inconvenient', 'misrepresentation', 'restrict', 'stagnant', 'disservice', 'nosun', 'backwater', 'wilderness', 'error', 'anchorage', 'unexplained', 'humbug', 'gullible', 'speculation', 'communism', 'uneducated', 'tempest', 'bang', 'labored', 'incomplete', 'wasteful', 'pine', 'undying', 'older', 'demonstrative', 'melodrama', 'rainyday', 'necessity', 'boredom', 'cloudy', 'hollow', 'burke', 'trash', 'pale', 'depart', 'uninteresting', 'sentence', 'void', 'cancel', 'foggy', 'warp', 'misty', 'blockade', 'healing', 'case', 'rainy', 'onerous', 'bottom', 'uninterested', 'fasting', 'coping', 'discolored', 'thirst', 'boooo', 'pious', 'blunder', 'indifference', 'dole', 'cocaine', 'tough', 'revolution', 'fat', 'arid', 'sluggish', 'yucky', 'sprain', 'chilly', 'lower', 'chargeable', 'hoary', 'wanting', 'progression', 'closure', 'unbeaten', 'rack', 'halter', 'meh', 'cold', 'tease', 'splitting', 'rumor', 'cataract', 'invalid', 'heartfelt', 'oddity', 'veal', 'retirement', 'interrupted', 'concerned', 'sarcasm', 'strip', 'feeling', 'sap', 'memories', 'eschew', 'esteem', 'cupping', 'overload', 'divided', 'destination', 'nosnow', 'limited', 'rain'
    ]
    return sad;
}
function generate_energized_array () {
    var energized = ['energiz','energy','pleasure', 'excitement', 'enthusiasm', 'delight', 'anticipation', 
    'ecstasy', 'kick', 'wonder', 'satisfaction', 'adventure', 'amusement', 'appreciation', 
    'buzz', 'delectation', 'enchantment', 'enjoyment', 'expectancy', 'fever', 'fever', 
    'fever', 'flutter', 'glow', 'gold', 'gratification', 'imagination', 'luster', 'morale', 
    'nibble', 'relish', 'romance', 'rush', 'schadenfreude', 'spice', 'spring', 'triumph']
    return energized;
}
function generate_confused_array () {
    var confused = ['confu','addle', 'baffle', 'bamboozle', 'beat', 'befog', 'befuddle', 'bemuse', 
    'bewilder', 'buffalo', 'confound', 'discombobulate', 'disorient', 'flummox', 'fox', 
    'fuddle', 'get', 'gravel', 'maze', 'muddle', 'muddy', 'mystify', 'perplex', 'pose', 
    'puzzle', 'vex', 'stick', 'stump', 'weird out', 'abash', 'discomfit', 'disconcert', 
    'discountenance', 'embarrass', 'faze', 'fluster', 'mortify', 'nonplus', 'rattle', 
    'agitate', 'bother', 'chagrin', 'discomfort', 'discompose', 'dismay', 'disquiet', 
    'distress', 'disturb', 'perturb', 'stun', 'unhinge', 'unsettle', 'upset', 'beguile', 
    'cozen', 'deceive', 'delude', 'dupe', 'fool', 'gull', 'hoax', 'hoodwink', 'humbug', 
    'misguide', 'mislead', 'snow', 'string along', 'take in', 'trick', 'assure', 
    'reassure', 'satisfy', 'enlighten', 'inform', 'becloud', 'befog', 'blur', 'cloud', 
    'fog', 'muddy', 'obfuscate', 'complicate', 'perplex', 'sophisticate', 'entangle', 
    'snarl', 'tangle', 'disarrange', 'disarray', 'discompose', 'dishevel', 'disorder', 
    'disrupt', 'disturb', 'jumble', 'muddle', 'scramble', 'shuffle', 'tousle', 'upset', 
    'conflate', 'confound', 'mistake', 'misapply', 'miscall', 'misidentify', 'misname', 
    'abash', 'confound', 'discomfit', 'disconcert', 'discountenance', 'embarrass', 'faze', 
    'luster', 'mortify', 'nonplus', 'rattle', 'agitate', 'bother', 'chagrin', 'discomfort',
    'discompose', 'dismay', 'disquiet', 'distress', 'disturb', 'perturb', 'put off', 
    'put out', 'unhinge', 'unsettle', 'upset', 'debase', 'degrade', 'demean', 'humble', 
    'humiliate', 'queer', 'shame', 'derange', 'disarrange', 'disarray', 'discompose', 
    'dishevel', 'disjoint', 'dislocate', 'disorder', 'disorganize', 'disrupt', 'disturb', 
    'hash', 'jumble', 'muddle', 'muss', 'rumple', 'scramble', 'shuffle', 'tousle', 'tumble', 
    'upset', 'embroil', 'entangle', 'snarl', 'tangle', 'agitate', 'perturb', 'unsettle', 
    'clutter']
    return confused;
}
function generate_angry_array () {
    var angry = ['angry','acrimonious', 'firery', 'irritated', 'affronted', 'frustrated', 
    'mad', 'aggravated', 'fuming', 'offended', 'agitated', 'furious', 'outraged', 
    'angry', 'galled', 'overwrought', 'annoyed', 'grouchy', 'peeved', 'antagonistic', 
    'grumpy', 'piqued', 'belligerent', 'hateful', 'provoked', 'beside', 'oneself', 
    'heated', 'rage', 'boiling', 'hostile', 'resentful', 'bristling', 'hot', 'riled', 
    'burned', 'up', 'huffy', 'seething', 'chafed', 'ill-tempered', 'simmering', 
    'choleric', 'impatient', 'smouldering', 'crabby', 'incensed', 'sore', 'cranky', 
    'indignant', 'sullen', 'cross', 'infuriated', 'testy', 'displeased', 'irascible', 
    'vexed', 'enraged', 'irate', 'worked', 'up', 'exasperated', 'ireful', 'wrathful',
    'abuse', 'assault', 'attack', 'backlash', 'beat', 'blast', 'bomb', 'break', 'conflict',
     'crush', 'curse', 'destroy', 'disgusting', 'envy', 'evil', 'fired', 'force', 'hate', 
     'hijack', 'jerk', 'kill', 'punch', 'revenge', 'revolting', 'scream', 'shatter', 
     'strangle', 'strike', 'stupid', 'toxic', 'violate', 'abuse', 'act', 'anger', 'antagonize', 
     'apologize', 'argue', 'backstab', 'bash', 'beg', 'behave', 'bemoan', 'betray', 'bicker', 
     'bitch', 'blame', 'break', 'bully', 'care', 'cause', 'gossip', 'harm', 'hate', 'humiliate', 
     'hurt', 'injure', 'insult', 'leave', 'lie', 'loath', 'love', 'manipulate', 'mend', 'mistreat', 
     'offend', 'pity', 'provoke', 'punish', 'con', 'control', 'criticize', 'crush', 'cry', 'damage', 
     'deceive', 'deplore', 'deserve', 'despair', 'destroy', 'disagree', 'disappoint', 'disgrace', 
     'distress', 'distrust', 'double-cross', 'dupe', 'embarrass', 'embitter', 'exploit', 'fabricate', 
     'fail', 'falsify', 'feel', 'fight', 'regret', 'resent', 'rob', 'ruin', 'scam', 'scar', 'shaft', 
     'steal', 'stray', 'strike', 'suck', 'suffer', 'swindle', 'thieve', 'trick', 'upset', 'vex', 'violate', 
     'whine', 'wound', 'wrong','outraged', 'brutality', 'hatred', 'hateful', 'terrorize', 'infuriated',
     'violently', 'furious', 'enraged', 'furiously', 'screwyou', 'murderer', 'fury', 'execution',
     'angered', 'savagery', 'slaughtering', 'veryangry', 'assassinate', 'annihilation', 'fuckoff', 'rage',
     'loathe', 'damnation', 'fucktard', 'homicidal', 'roadrage', 'furor', 'hostile', 'annihilate',
     'murder', 'raging', 'explosive', 'infuriates', 'pissed', 'ferocious', 'obliterated',
     'rape', 'vengeful', 'sopissed', 'killing', 'combative', 'gofuckyourself', 'vengeance',
     'wrath', 'torment', 'vicious', 'massacre', 'threatening', 'abhorrent', 'pissoff', 
     'bloodthirsty', 'fighting', 'attacking', 'annihilated', 'bloodshed', 'angriest', 'smite', 'brawl', 
     'malicious', 'tirade', 'assault', 'hostility', 'explode', 'assassination', 'strangle', 'loathsome', 
     'murderous', 'attack', 'hell', 'malice', 'terrorism', 'beating', 'desecration', 'pissingmeoff', 'outrage', 
     'destroying', 'irate', 'infuriate', 'stab', 'violent', 'tumultuous', 'abomination', 'slaughter', 
     'obliterate', 'belligerent', 'dumbbitch', 'detest', 'hostilities', 'prick', 'torture', 'rabid', 
     'rampage', 'horrid', 'cruelty', 'despicable', 'tyrannical', 'demonic', 'hating', 'ragemode', 'hate', 'satanic', 
     'ruinous', 'condemn', 'dickhead', 'demolish', 'angry', 'riots', 'extermination', 'livid', 'madman', 'vindictive', 
     'terrorist', 'threaten', 'hateyou', 'effyou', 'ferocity', 'venomous', 'abhor', 'savage', 'atrocity', 'carnage', 
     'angrytweet', 'barbaric', 'vendetta', 'destroyer', 'pissedoff', 'abuse', 'fuming', 'pissesmeoff', 'berserk', 'fierce', 
     'fucksake', 'tyrant', 'anger', 'pieceofshit', 'homicide', 'slam', 'punching', 'bitch', 'fights', 'punched', 'ruthless', 
     'destructive', 'villainous', 'slap', 'yelling', 'ragetweet', 'punishing', 'diabolical', 'riot', 'growthefuckup', 'destroyed', 
     'retaliatory', 'slaughterhouse', 'manslaughter', 'clash', 'detonation', 'sinister', 'hellish', 'quarrel', 'bloody', 
     'loath', 'treacherous', 'fumin', 'hateeee', 'accusing', 'horrific', 'revulsion', 'madder', 'retaliate', 'scorn', 
     'deplorable', 'bomb', 'resent', 'devastation', 'anarchist', 'firestorm', 'contemptible', 'shittest', 'smash', 
     'cruel', 'soangry', 'rant', 'deadly', 'outburst', 'snarl', 'offend', 'crazed', 'revolting', 'aggravating', 'horror', 
     'despise', 'dontmesswithme', 'stfu', 'growling', 'profane', 'vulgarity', 'douchebags', 'fuckedoff', 'violence', 
     'molestation', 'screaming', 'erupt', 'horrible', 'threat', 'bastards', 'revenge', 'catastrophe', 'menacing', 
     'damn', 'demon', 'crushing', 'thrash', 'riotous', 'fedup', 'deplore', 'warfare', 'argue', 'vehement', 'persecute', 
     'flog', 'revolt', 'altercation', 'warlike', 'shitday', 'castrate', 'mutiny', 'sabotage', 'malevolent', 'strike', 
     'disaster', 'disastrous', 'madden', 'scream', 'arseholes', 'brutal', 'horseshit', 'bastarding', 'tumult', 'disdain', 
     'devil', 'slay', 'aggravates', 'treachery', 'vermin', 'scorching', 'choke', 'spiteful', 'mutilation', 'mangle', 'criminal', 
     'anarchism', 'punch', 'denunciation', 'holocaust', 'virulence', 'fatal', 'blasphemous', 'hurting', 'dontlikeyou', 'dumbasses', 
     'battled', 'crucifixion', 'irritated', 'evil', 'atrocious', 'deranged', 'kidnap', 'aggravated', 'assassin', 'scolding', 'dicks', 
     'slayer', 'intimidation', 'persecution', 'aggression', 'armed', 'poison', 'venom', 'snarling', 'battle', 'disgruntled', 'assailant', 
     'resentment', 'insidious', 'lynch', 'contemptuous', 'infanticide', 'imprisonment', 'temper', 'terrible', 'mad', 'lunatic', 'domination', 
     'peeved', 'makesmemad', 'bully', 'curse', 'disparage', 'volatility', 'eradication', 'devastate', 'tantrum', 'scoundrel', 'eradicate', 
     'aggressively', 'agitation', 'dictatorship', 'irritates', 'profanity', 'shot', 'expletive', 'nasty', 'crime', 'poisonous', 'corrupting', 
     'dastardly', 'shoot', 'shove', 'condemnation', 'aggravation', 'wreak', 'egregious', 'contempt', 'crushed', 'harmful', 'cruelly', 'maniac', 
     'combat', 'aggressive', 'hit', 'fight', 'shout', 'cutthroat', 'irritable', 'odious', 'shooting', 'hateeveryone', 'kick', 'eruption', 
     'enemy', 'punished', 'ambush', 'yell', 'harass', 'incense', 'gore', 'malignant', 'grudge', 'antichrist', 'aggressor', 'expel', 
     'destruction', 'cranky', 'growl', 'slave', 'spank', 'denounce', 'reprisal', 'insulting', 'clashing', 'insurrection', 'offended', 
     'animosity', 'growls', 'executioner', 'twat', 'doomsday', 'arson', 'grr', 'daemon', 'spat', 'obscenity', 'havoc', 'shackle', 
     'accused', 'feud', 'expulsion', 'indignant', 'reprimand', 'inexcusable', 'bombard', 'somad', 
     'spanking', 'suicidal', 'anarchy', 'combatant', 'hanging', 'poisoned', 'frustrated', 'wound', 
     'glaring', 'batter', 'disgusting', 'kicking', 'inflict', 'wrecked', 'grievous', 'prosecute', 
     'agitated', 'cheat', 'swastika', 'raid', 'cursing', 'harassing', 'provocation', 'strife', 'suffocation', 
     'defamatory', 'scourge', 'injure', 'enslaved', 'indict', 'betray', 'thundering', 'arsehole', 'jerk', 'insane', 
     'retaliation', 'deprivation', 'convict', 'theft', 'irritate', 'fiend', 'cussed', 'turmoil', 'smack', 'retribution', 
     'slavery', 'irritability', 'bitterly', 'battery', 'antagonism', 'twats', 'oppressor', 'injurious', 'intolerable', 'gang', 
     'rebellion', 'collision', 'adverse', 'disgraced', 'revolution', 'diatribe', 'asshole', 'ranting', 'thug', 'antagonistic', 
     'blast', 'sickening', 'irritating', 'irks', 'bombardment', 'discrimination', 'frustrate', 'oppression', 'insult', 'tiredofit', 
     'manipulation', 'bigot', 'tension', 'hurtful', 'disgust', 'spite', 'intrusive', 'harshness', 'slur', 'wretch', 'invasion', 'morbidity', 
     'assail', 'tempest', 'miserable', 'puncture', 'casualty', 'bitterness', 'inferno', 'storming', 'consternation', 
     'raving', 'guilty', 'depraved', 'immoral', 'forcibly', 'overpowering', 'guillotine', 'recalcitrant', 'accursed', 
     'invader', 'scare', 'screwed', 'soannoyed', 'jealousy', 'indignation', 'vexed', 'confront', 'brute', 'throttle', 
     'bickering', 'coup', 'defiant', 'criminality', 'provoking', 'conflict', 'revolver', 'butcher', 'lash', 'incarceration', 
     'contentious', 'shutit', 'yousuck', 'damage', 'wreck', 'pillage', 'shutup', 'blaze', 'slut', 'cancer', 'blasphemy', 'disturbance', 
     'dontmess', 'standoff', 'pernicious', 'alienation', 'gun', 'discord', 'grope', 'chaotic', 'frustration', 'gory', 'condescension', 'discriminate',
      'friggen', 'death', 'lunacy', 'jab', 'oppressive', 'cursed', 'monstrosity', 'scandalous', 'sneer', 'shit', 'slash', 'disparaging', 'unfair', 
      'gallows', 'escalate', 'intolerant', 'lawlessness', 'grouchy', 'bellows', 'traitor', 'frightful', 'perdition', 'slander', 'taunt', 'invade', 
      'wrangling', 'malign', 'bluddy', 'arghh', 'dreadful', 'bearish', 'derogatory', 'glare', 'deceived', 'torpedo', 'retards', 'beast', 'cross', 
      'hurt', 'banshee', 'uncontrollable', 'shatter', 'jeopardize', 'devastating', 'conflagration', 'thief', 'idiots', 'fits', 'grating', 'rave', 
      'dissension', 'betrayal', 'disturbed', 'subjugation', 'stomped', 'grab', 'ticked', 'grievance', 'masochism', 'defiance', 'blackmail', 
      'offensive', 'decry', 'sin', 'violation', 'confine', 'fustrated', 'overbearing', 'deceive', 'misery', 'rebel', 'punishment', 'firearms', 
      'darkside', 'arghhhh', 'disparity', 'frustrates', 'disgraceful', 'shrill', 'ire', 'preposterous', 'hadenough', 'stolen', 'prejudice', 
      'annoyin', 'humiliate', 'resentful', 'conspirator', 'callous', 'ruined', 'adversary', 'menace', 'wanker', 'antagonist', 'skirmish', 
      'tackle', 'heated', 'foul', 'argument', 'sting', 'grumble', 'robbery', 'entangled', 'outcry', 'irreconcilable', 'resistance', 'obstructive', 
      'dismay', 'mob', 'juststop', 'badness', 'ridicule', 'incendiary', 'flares', 'uprising', 'twofaced', 'exacerbation', 'dispute', 'whip', 'communism', 'prejudicial', 'intruder', 'belittle', 'confinement', 'unbridled', 'allegation', 'reckless', 'degeneracy', 'dictatorial', 'unjustifiable', 'bigoted', 'unjust', 'hassle', 'perversion', 'offender', 'fiesty', 'tackled', 'dissonance', 'renegade', 'hot', 'prison', 'cantstandit', 'trespass', 'suicide', 'annoy', 'leavemealone', 'dishonest', 'depravity', 'distrust', 'broil', 'idiotic', 'treason', 'venting', 'tortious', 'duress', 'criticize', 'grrr', 'inimical', 'disrespectful', 'cretins', 'prisoner', 'divorce', 'chaos', 'coercion', 'unforgiving', 'unkind', 'frustrating', 'bile', 'unleash', 'argumentation', 'jerks', 'pow', 'grump', 'hangry', 'victimized', 'poachers', 'scold', 'poaching', 'roar', 'tussle', 'bane', 'repudiation', 'accusation', 'enmity', 'banish', 'disfigured', 'storm', 'fear', 'crazy', 'anguish', 'confined', 'scoff', 'shun', 'derogation', 'banished', 'hammering', 'brunt', 'possessed', 'nobodycares', 'frenzied', 'ordeal', 'delusional', 'reject', 'obstruct', 'foaming', 'intractable', 'bout', 'brazen', 'patronising', 'rejects', 'fervor', 'dominate', 'derision', 'spear', 'suppression', 'animus', 'unruly', 'disrupting', 'malpractice', 'defy', 'injustice', 'antithesis', 'getoveryourself', 'toughness', 'stupidpeople', 'madness', 'sinful', 'oppress', 'avarice', 'revoke', 'incest', 'smuggler', 'avenger', 'disapproved', 'demand', 'stayaway', 'claw', 'infraction', 'cutting', 'pervert', 'fricking', 'anathema', 'annoyed', 'disobedient', 'alienate', 'disservice', 'abolish', 'inhuman', 'dissident', 'complaint', 'usurp', 'obnoxious', 'deceit', 'disgrace', 'opposed', 'renounce', 'litigious', 'imprisoned', 'mocking', 'blame', 'penalty', 'thresh', 'upheaval', 'restrain', 'strained', 'sucker', 'rivalry', 'oust', 'suspicious', 'turbulence', 'pound', 'coldness', 'ungrateful', 'battalion', 'stoopid', 'adversity', 'ram', 'gall', 'infidel', 'annoying', 'friction', 'hostage', 'jealous', 'accuser', 'feudalism', 'subversion', 'armament', 'dispossessed', 'distress', 'intolerance', 'subversive', 'opposition', 'exile', 'plunder', 'recidivism', 'objection', 'steal', 'offense', 'complain', 'huff', 'simmer', 'selfish', 'backoff', 'incite', 'angermanagement', 'perpetrator', 'disobey', 'disruption', 'smother', 'injury', 'selfishness', 'insanity', 'stifled', 'thump', 'dislike', 'areyoukidding', 'mug', 'agony', 'arrogant', 'elimination', 'picketing', 'haughty', 'sux', 'vent', 'grated', 'clamor', 'constraint', 'stubbed', 'impermeable', 'illegality', 'dying', 'flagrant', 'idiocy', 'busted', 'crabby', 'illicit', 'veto', 'troublesome', 'mislead', 'bad', 'despotism', 'struggle', 'usurped', 'disagreeing', 'hysterical', 'desist', 'godless', 'suppress', 'disapproving', 'displeased', 'bayonet', 'intense', 'unlawful', 'wrongly', 'repellent', 'psychosis', 'foe', 'wrongful', 'dishonor', 'wasted', 'aversion', 'schism', 'gahhh', 'punitive', 'knuckles', 'upset', 'effigy', 'ultimatum', 'deleterious', 'mucked', 'irritation', 'worthless', 'ransom', 'separatist', 'fugitive', 'deny', 'abandonment', 'stupidity', 'oblivion', 'segregate', 'payback', 'eviction', 'incongruous', 'collusion', 'rob', 'infidelity', 'ravenous', 'overrun', 'incredulous', 'stupidrain', 'martial', 'painful', 'harbinger', 'getoverit', 'rejection', 'defense', 'unsympathetic', 'banger', 'gonorrhea', 'fallacious', 'indecency', 'exasperation', 'fuss', 'concealment', 'powerful', 'fraudulent', 'defraud', 'enforce', 'censor', 'greed', 'disobedience', 'commotion', 'discontent', 'penitentiary', 'nettle', 'duel', 'banishment', 'barb', 'deportation', 'sarcasm', 'penetration', 'bang', 'scar', 'cracked', 'sedition', 'annoyance', 'cur', 'snubbed', 'misrepresented', 'blatant', 'force', 'perverse', 'wring', 'grim', 'bastion', 'sordid', 'nothappy', 'moody', 'tiff', 'surly', 'hunting', 'indenture', 'areyoukiddingme', 'reproach', 'compulsion', 'sham', 'cantwin', 'supremacy', 'disappoint', 'squelch', 'forfeit', 'awful', 'detainee', 'implicate', 'blockade', 'sneak', 'contradict', 'inept', 'lying', 'antipathy', 'delusion', 'unthinkable', 'wop', 'tremor', 'onerous', 'forsaken', 'inequality', 'badger', 'cacophony', 'wrongdoing', 'epidemic', 'rail', 'nuisance', 'scrapie', 'arguments', 'affront', 'traumatic', 'sodding', 'libel', 'annoys', 'soslow', 'watchout', 'frenetic', 'remiss', 'barge', 'fraud', 'howl', 'confiscate', 'boxing', 'nag', 'actionable', 'illegal', 'keyed', 'disrespect', 'dangit', 'extinguish', 'sue', 'untoward', 'rabble', 'unfriendly', 'whatsthepoint', 'brimstone', 'earthquake', 'grrrrr', 'rigged', 'argh', 'pique', 'recklessness', 'dissolution', 'disagree', 'lawsuit', 'despair', 'disused', 'immorality', 'incurable', 'pokes', 'falsification', 'coerce', 'touchy', 'firstworldprobs', 'sore', 'difficulty', 'rifle', 'sizzle', 'picket', 'concussion', 'stuckup', 'pessimism', 'remand', 'pitfall', 'rawr', 'cannon', 'infantile', 'disillusionment', 'sly', 'petpeeve', 'militia', 'faulty', 'inhibit', 'vindicate', 'nepotism', 'distressing', 'schizophrenia', 'skewed', 'disreputable', 'forbidding', 'conquest', 'bark', 'leukemia', 'unhappy', 'burke', 'warrior', 'disapprove', 'challenge', 'retarded', 'belt', 'barks', 'opinionated', 'restriction', 'incompetence', 'polemic', 'loudness', 'paucity', 'controversial', 'aftermath', 'disliked', 'litigate', 'sectarian', 'cad', 'broken', 'interrupting', 'fussy', 'wench', 'remove', 'misbehavior', 'brat', 'gruff', 'scarcity', 'losing', 'timewasters', 'lie', 'stigma', 'untrustworthy', 'deserted', 'disagreement', 'disappointed', 'retract', 'ulcer', 'pest', 'hardened', 'defect', 'bias', 'evade', 'antisocial', 'unreliable', 'misleading', 'stingy', 'anxiety', 'stripped', 'impotence', 'unsettled', 'shaky', 'bothering', 'pirate', 'negation', 'shoddy', 'disclaim', 'deterioration', 'interminable', 'meddle', 'disease', 'warp', 'averse', 'alcoholism', 'infamous', 'row', 'staticky', 'illegitimate', 'encumbrance', 'witchcraft', 'paralyzed', 'ill', 'interrupt', 'scorpion', 'sinner', 'hulk', 'inconsiderate', 'disqualified', 'tighten', 'opponent', 'phony', 'resisting', 'fib', 'spammers', 'dislocated', 'brrr', 'dashed', 'prohibited', 'grumpy', 'victim', 'crusade', 'scapegoat', 'hiss', 'inappropriate', 'haye', 'loss', 'eschew', 'neglected', 'trickery', 'canker', 'crunch', 'criticism', 'queues', 'duplicity', 'muff', 'shriek', 'depreciate', 'dramaqueen', 'carelessness', 'dumps', 'dupe', 'chaff', 'poverty', 'mortality', 'dismissal', 'deflate', 'revving', 'disallowed', 'boisterous', 'thoughtless', 'burial', 'sullen', 'theocratic', 'wince', 'involution', 'stalemate', 'talons', 'hoax', 'depreciated', 'wasteful', 'getyourown', 'senseless', 'depressed', 'taxed', 'misuse', 'paralysis', 'displaced', 'limited', 'disapointment', 'orc', 'ridiculous', 'spine', 'sharpen', 'presumptuous', 'teasing', 'homeless', 'react', 'barrier', 'hoot', 'twitchy', 'myopia', 'incompatible', 'disconnects', 'delinquent', 'contraband', 'lagging', 'shiver', 'agh', 'restitution', 'flexin', 'spam', 'foray', 'noncompliance', 'buffering', 'unfairness', 'troll', 'nether', 'immaturity', 'uncaring', 'bugaboo', 'bogus', 'shock', 'feisty', 'rapping', 'nopoint', 'feminism', 'pry', 'humbug', 'inoperative', 'defendant', 'latent', 'notamorningperson', 'quandary', 'inconvenient', 'bear', 'interrupts', 'fluctuation', 'exaggerate', 'lose', 'stone', 'soldier', 'furnace', 'shoplifting', 'tease', 'patter', 'incompetent', 'indoctrination', 'attentionseeker', 'unfollow', 'nonsense', 'complicate', 'tripping', 'untrue', 'notoriety', 'falsehood', 'mastery', 'socialist', 'skid', 'rocket', 'noisy', 'lawyer', 'pouting', 'cane', 'fenced', 'obstacle', 'dontunderstand', 'detract', 'halter', 'vampire', 'capslock', 'witch', 'ringer', 'frowning', 'saber', 'hunger', 'tariff', 'lava', 'dabbling', 'shell', 'imtryingtosleep', 'rascal', 'recession', 'failing', 'politics', 'wokemeup', 'undesirable', 'versus', 'copycat', 'darkness', 'resign', 'soaked', 'unfulfilled', 'abandoned', 'unattainable', 'owing', 'bankruptcy', 'confusion', 'warden', 'somethingigetalot', 'tool', 'compress', 'misconception', 'whiny', 'unhelpful', 'mosquito', 'twitching', 'nosey', 'adder', 'overpriced', 'shortage', 'melodrama', 'harry', 'possession', 'overplayed', 'desert', 'unlucky', 'unpaid', 'backbone', 'powerless', 'sentence', 'uninvited', 'rook', 'pout', 'arraignment', 'inefficient', 'court', 'endless', 'misstatement', 'delay', 'distracted', 'adverts', 'misunderstanding', 'inadmissible', 'excite', 'lightning', 'mournful', 'preclude', 'incase', 'insecure', 'rating', 'claimant', 'mistress', 'insist', 'pare', 'distracting', 'mutter', 'opium', 'willful', 'deserve', 'insists', 'treat', 'liberate', 'peice', 'excitation', 'misplace', 'hormonal', 'mighty', 'thanksalot', 'indecisive', 'fee', 'gibberish', 'fleece', 'yelp', 'hamstring', 'mule', 'insufficiency', 'insignificant', 'unequal', 'bargaining', 'attentionseekers', 'forearm', 'indifference', 'coop', 'rheumatism', 'attorney', 'uncertain', 'justthebeginning', 'disinformation', 'pretending', 'involvement', 'underpaid', 'bee', 'campaigning', 'hopelessness', 'feeling', 'legalized', 'caution', 'sterling', 'obliging', 'subsidy', 'morals', 'wimpy', 'bummer', 'geez', 'repay', 'blemish', 'misspell', 'surcharge', 'saloon', 'birch', 'noob', 'honk', 'orchestra', 'wireless', 'standstill', 'competitive', 'mosque', 'inattention', 'reversal', 'lace', 'elbow', 'instinctive', 'chant', 'lonely']
      return angry;
}
function stemmer(word) {
    if(word.slice(-5) == "iness") {
        word = word.substring(0,word.length-5) + 'y';
    }
    if(word.slice(-4) == "ness") {
        word = word.substring(0,word.length-4);
    }
    if(word.slice(-3) == "ful" ){
        word = word.substring(0,word.length-3);
    }
    if(word.slice(-2) == "ed" ){
        word = word.substring(0,word.length-2);
    }
    if(word.slice(-1) == "s" ){
        word = word.substring(0,word.length-1);
    }
    return word;
}
