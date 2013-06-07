function durationInEnglish(milliseconds) {
    var seconds = milliseconds / 1000;
    if(seconds === 0) {
        return 'now';
    } else if(seconds < 60) {
        return seconds + ' seconds ago';
    } else {
        return 'whenever';
    }
}