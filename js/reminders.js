var remindersList = [];

var reminder = function(title, startTime, endTime) { //EMAIL CLASS
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
};

function createReminder() {
    var title = $('#title').val();
    var startTime = $('#startTime').val();
    var endTime = $('#endTime').val();
    var reminder1 = new reminder(title, startTime, endTime);
    remindersList.push(reminder1);
    $('#reminderslist').append(reminder1.title + "  " + reminder1.startTime + "    endTime: " + reminder1.endTime);
}
