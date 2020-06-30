window.addEventListener('load', run);

function run() {
    setUpRecognition();
    addListeners();
}

function addListeners() {
    const button = document.querySelector('.push_me');
    button.addEventListener('click', function() {
        window.recognition.start();
    })
}

function setUpRecognition() {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'ru-RU';
    recognition.interimResults = true;

    recognition.onresult = function(recogEvent) {
        const { resultIndex } = recogEvent;
        const result = recogEvent.results[resultIndex][0].transcript;

        console.log(result);
        applyText(result);
    }

    window.recognition = recognition;
}

function applyText(string) {
    const splitted = string.trim().toLowerCase().split(/-|\s/);

    map.forEach(item => {
        item.keywords.forEach(keyword => {
            const text = getLastElems(splitted, keyword.length);

            if (text.indexOf(keyword) !== -1) {
                item.action();
            }
        });
    });
}

function getLastElems(array, count) {
    return array.slice(array.length - count - 1).join(' ');
}

const map = [
    {
        keywords: ['чёрный', 'чорный', 'черный'],
        action: function() {
            document.body.style.backgroundColor = '#000';
        }
    },
    {
        keywords: ['белый'],
        action: function() {
            document.body.style.backgroundColor = '#fff';
        }
    },
    {
        keywords: ['красный'],
        action: function() {
            document.body.style.backgroundColor = '#f00';
        }
    },
    {
        keywords: ['зеленый', 'зелёный', 'зелоный'],
        action: function() {
            document.body.style.backgroundColor = '#0f0';
        }
    },
    {
        keywords: ['синий'],
        action: function() {
            document.body.style.backgroundColor = '#00f';
        }
    },
    {
        keywords: ['стоп'],
        action: function() {
            window.recognition.abort();
        }
    },
    {
        keywords: ['открой ютуб', 'открой youtube'],
        action: function() {
            window.open('https://youtube.com');
        }
    }
];
