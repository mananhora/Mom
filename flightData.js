function writeToFile(time, geo) {
    function WriteFile() {
        console.log("typing");
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var fh = fso.OpenTextFile("Testing123.txt", true);
        fh.WriteLine(time + "\n");
        fh.WriteLine(geo + "\n\n");

        fh.Close();
        console.log(fh);
    }
}
writeToFile("2PM", "church");


function writeFile(filename) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile(filename, true);
    fh.WriteLine(time + "\n");
    fh.WriteLine(geo + "\n\n");

    fh.Close();
    console.log(fh);
}
