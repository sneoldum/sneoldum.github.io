var container = document.getElementById('container');
var score = document.getElementById('score');
var fruits = ['apple', 'banana', 'cherry', 'grape', 'orange', 'pear'];
var count = 0;

function createFruit() {
	var fruit = document.createElement('div');
	var randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
	fruit.className = 'fruit ' + randomFruit;
	fruit.style.top = Math.floor(Math.random() * 350) + 'px';
	fruit.style.left = Math.floor(Math.random() * 550) + 'px';
	fruit.addEventListener('click', function() {
		container.removeChild(fruit);
        count++;
        score.innerText = count;
        if (count === 20) {
        alert('Kazandınız!');
        location.reload();
        }
        });
        container.appendChild(fruit);
        }
        
        setInterval(createFruit, 1000);
