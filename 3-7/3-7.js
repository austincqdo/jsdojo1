let hp = 100;
while (hp > 0) {
    const atk = Math.floor(11 * Math.random());
    alert('You dealt ' + atk + ' damage!');
    hp -= atk;
}
alert('You have slain the kraken!');