function generateNumbers() {
    const areaCode = document.getElementById("areaCode").value;
    const limit = parseInt(document.getElementById("limit").value, 10);
    const resultDiv = document.getElementById("result");
    const downloadBtn = document.getElementById("downloadBtn");

    if (!areaCode.match(/^\d{3}$/)) {
        resultDiv.textContent = "Please enter a valid 3-digit US area code.";
        downloadBtn.style.display = "none";
        return;
    }
    if (isNaN(limit) || limit < 1 || limit > 5000) {
        resultDiv.textContent = "Please enter a number between 1 and 5000.";
        downloadBtn.style.display = "none";
        return;
    }

    let numbers = [];
    let used = new Set();
    while (numbers.length < limit) {
        let num = Math.floor(2000000 + Math.random() * 7999999); // 7 digit number
        if (!used.has(num)) {
            used.add(num);
            numbers.push(`+1${areaCode}${num.toString().padStart(7, '0')}`);
        }
    }
    resultDiv.textContent = numbers.join("\n");
    downloadBtn.style.display = "inline-block";
    window.generatedNumbers = numbers;
}

function downloadNumbers() {
    if (!window.generatedNumbers) return;
    const blob = new Blob([window.generatedNumbers.join("\n")], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "whatsapp_numbers.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
