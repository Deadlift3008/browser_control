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
        const { confidence, transcript: result } = recogEvent.results[resultIndex][0];
        // const { isFinal } = recogEvent.results[resultIndex];

        // TODO: ввести сессию, ориентируясь на isFinal,
        //  прослеживать чтобы в сессии только один раз применялась команда
        console.log(result);
        if (confidence > 0.8) {
            applyText(result);
        }
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
        keywords: ['открой ютуб', 'открой youtube', 'открой ютабе'],
        action: function() {
            window.open('https://youtube.com');
        }
    },
    {
        keywords: ['открой контакт', 'открой вк', 'открой вэка', 'открой вконтакт', 'открой вконтакте', 'открой vkontakte', 'открой vk'],
        action: function() {
            window.open('https://vk.com/');
        }
    },
    {
        keywords: ['открой джимейл', 'открой gmail', 'открой гмейл'],
        action: function() {
            window.open('https://mail.google.com/');
        }
    },
    {
        // keywords: ['скроль вниз', 'скролл вниз', 'скрол вниз'],
        keywords: ['вниз', 'в низ'],
        action: function() {
            window.scroll({
                top: window.scrollY + 300,
                left: 0,
                behavior: 'smooth'
            });
        }
    },
    {
        // keywords: ['скроль вверх', 'скролл вверх', 'скрол вверх', 'скролл верх', 'скрол верх', 'скрол верх'],
        keywords: ['вверх', 'в верх', 'верх'],
        action: function() {
            window.scroll({
                top: window.scrollY - 300,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
];
